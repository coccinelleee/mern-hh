import { Webhook } from "svix";
import User from "../models/User.js";

// Clerk жүйесінен келетін webhook сұраныстарын өңдеу
export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const reqBody = req.body;

    if (!reqBody) {
      return res.status(400).json({ error: "Сұраныс денесі бос" });
    }

    const { data, type } = reqBody;
    console.log("📦 Webhook оқиғасы:", type);
    console.log("📦 RAW DATA:", JSON.stringify(data, null, 2));

    if (!data || !type) {
      return res.status(400).json({ error: "Сұраныс дұрыс емес" });
    }

    await webhook.verify(JSON.stringify(reqBody), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    switch (type) {
      case "user.created": {
        const email = data.email_addresses?.[0]?.email_address;
        const clerkId = data.id;
        const name = `${data.first_name || ""} ${data.last_name || ""}`.trim();
        const image = data.image_url || data.profile_image_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      
        console.log("📧 Email:", email);
        console.log("🧠 Clerk ID:", clerkId);
        console.log("🖼 Image:", image);
      
        if (!clerkId || !email) {
          return res.status(400).json({ error: "Clerk ID және Email қажет" });
        }
      
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(200).json({ message: "User already exists" });
        }
      
        const userData = {
          clerkId: data.id,
          email,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image,
          resume: "",
        };
      
        await User.create(userData);
        console.log("✅ Қолданушы құрылды:", userData);
        return res.json({});
      }      

      case "user.updated": {
        const updateData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || data.profile_image_url,
        };

        await User.findOneAndUpdate({ clerkId: data.id }, updateData);
        console.log("🔄 Қолданушы жаңартылды:", data.id);
        return res.json({});
      }

      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        console.log("🗑️ Қолданушы жойылды:", data.id);
        return res.json({});
      }

      default:
        return res.status(400).json({ error: "Белгісіз оқиға түрі" });
    }
  } catch (error) {
    console.error("❌ Webhook қатесі:", error.message);
    return res.status(500).json({ success: false, message: "Webhook өңдеу қатесі" });
  }
};
