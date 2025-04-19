import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) return res.status(400).json({ message: "Webhook secret missing" });

  const payload = JSON.stringify(req.body);
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const event = evt;

  try {
    if (event.type === "user.created") {
      const clerkUser = event.data;

      const existingUser = await User.findOne({ clerkId: clerkUser.id });
      if (existingUser) {
        return res.status(200).json({ success: true, message: "User already exists" });
      }

      const newUser = new User({
        clerkId: clerkUser.id,
        email: clerkUser.email_addresses[0]?.email_address || "",
        name: `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim(),
        image: clerkUser.image_url || "",
        resume: "",
      });

      await newUser.save();

      return res.status(201).json({ success: true, message: "User created" });
    }

    return res.status(200).json({ success: true, message: "Unhandled event" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
