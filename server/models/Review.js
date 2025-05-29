import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  message: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 5 },
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
