import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Получить все отзывы
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Ошибка при получении отзывов:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Добавить отзыв
router.post('/', async (req, res) => {
  try {
    const { userId, name, message, avatar, rating } = req.body;
    const existing = await Review.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'Отзыв уже оставлен' });
    }

    const newReview = new Review({ userId, name, avatar, message, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Ошибка при добавлении отзыва:', err);
    res.status(400).json({ message: 'Ошибка при сохранении' });
  }
});

// Обновить отзыв
router.put('/:id', async (req, res) => {
  try {
    const { userId, message, rating, avatar, name } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Нет доступа к редактированию этого отзыва' });
    }

    review.message = message;
    review.rating = rating;
    review.avatar = avatar || review.avatar;
    review.name = name || review.name;
    review.date = new Date();

    await review.save();
    res.status(200).json(review);
  } catch (err) {
    console.error('Ошибка при обновлении отзыва:', err);
    res.status(500).json({ message: 'Ошибка при обновлении' });
  }
});

export default router;
