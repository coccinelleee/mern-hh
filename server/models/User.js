import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  clerkId: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true },
  image: { type: String, required: true },
  resume: { type: String },
});


const User = mongoose.model("User", userSchema);

export default User;
