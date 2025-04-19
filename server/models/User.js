import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "Жаңа қолданушы", 
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    default: "", 
  },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
}, { timestamps: true }); 

export default mongoose.model("User", userSchema);
