import { Webhook } from "svix";
import User from "../models/User.js";

// Clerk жүйесінен келетін webhook сұраныстарын өңдеу
export const clerkWebhooks = async (req, res) => {
  try {
    // Clerk вебхугының құпия кілтімен тексеру
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

    // Сұранысты тексеру — қолтаңба арқылы
    await webhook.verify(JSON.stringify(reqBody), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Webhook оқиғасын өңдеу
    switch (type) {
      case "user.created": {
        const email = data.email_addresses?.[0]?.email_address;
        const image = data.image_url || data.profile_image_url;
        const id = data.id;

        // Міндетті өрістерді тексеру
        if (!id || !email || !image) {
          console.log("❌ Қолданушыны құру үшін деректер жеткіліксіз");
          return res.status(400).json({ error: "Міндетті деректер жоқ" });
        }

        // Қолданушы бұрыннан бар болса, қайта құрмау
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log("⚠️ Бұл электрондық поштасы бар пайдаланушы бұрыннан бар");
          return res.status(200).json({ message: "User already exists" });
        }

        // Қолданушыны құру
        const userData = {
          _id: id,
          clerkId: id,
          email,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image,
          resume: "",
        };

        await User.create(userData);
        console.log("✅ Қолданушы сәтті құрылды:", userData);
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
