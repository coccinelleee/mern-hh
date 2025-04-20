// controller/clerkWebhooks.js
import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  const payload = req.body;
  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  const wh = new Webhook(webhookSecret);

  try {
    const evt = wh.verify(payload, headers); // 👈 raw body!
    const { data, type } = evt;

    console.log("📦 Webhook Event:", type);

    if (type === "user.created") {
      const clerkId = data.id;
      const email = data.email_addresses?.[0]?.email_address;
      const name = `${data.first_name || ""} ${data.last_name || ""}`.trim();
      const image = data.image_url || data.profile_image_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

      if (!clerkId || !email) return res.status(400).json({ message: "Missing required fields" });

      const exists = await User.findOne({ clerkId });
      if (exists) return res.status(200).json({ message: "User already exists" });

      await User.create({ clerkId, email, name, image, resume: "" });

      console.log("✅ User created");
      return res.status(200).json({ message: "User created" });
    }

    if (type === "user.updated") {
      const updateData = {
        email: data.email_addresses?.[0]?.email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url || data.profile_image_url,
      };
      await User.findOneAndUpdate({ clerkId: data.id }, updateData);
      console.log("🔄 User updated");
      return res.status(200).json({ message: "User updated" });
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
      console.log("🗑️ User deleted");
      return res.status(200).json({ message: "User deleted" });
    }

    return res.status(200).json({ message: "Event type not handled" });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
};
