import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const reqBody = req.body;

    if (!reqBody) {
      return res.status(400).json({ error: "Missing request body" });
    }

    const { data, type } = reqBody;
    console.log("📦 Webhook event:", type);
    console.log("📄 Data:", JSON.stringify(data, null, 2));

    if (!data || !type) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    await webhook.verify(JSON.stringify(reqBody), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    switch (type) {
      case "user.created": {
        const email = data.email_addresses?.[0]?.email_address;
        const image = data.image_url || data.profile_image_url;
        const id = data.id;
      
        if (!id || !email || !image) {
          console.log("❌ Не хватает данных для создания пользователя");
          return res.status(400).json({ error: "Missing required fields" });
        }
      
        // ✅ Проверка — если уже есть, не создаём
        const existingUser = await User.findById(id);
        if (existingUser) {
          console.log("ℹ️ Пользователь уже существует:", id);
          return res.status(200).json({ message: "User already exists" });
        }
      
        const userData = {
          _id: id,
          clerkId: id,
          email,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image,
          resume: "",
        };
      
        await User.create(userData);
        console.log("✅ Пользователь успешно создан:", userData);
        return res.json({});
      }

      case "user.updated": {
        const updateData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || data.profile_image_url,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, updateData);
        console.log("🔄 Пользователь обновлён:", data.id);
        return res.json({});
      }

      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        console.log("🗑️ Пользователь удалён:", data.id);
        return res.json({});
      }

      default:
        return res.status(400).json({ error: "Unhandled event type" });
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return res.status(500).json({ success: false, message: "Webhooks Error" });
  }
};
