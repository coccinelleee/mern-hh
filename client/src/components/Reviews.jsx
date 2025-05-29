import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ message: '', rating: 5 });
  const [hover, setHover] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(res => {
        setReviews(res.data);
        if (user) {
          const existing = res.data.find(r => r.userId === user.id);
          if (existing) {
            setHasReviewed(true);
            setEditingReview(existing);
            setForm({ message: existing.message, rating: existing.rating });
          }
        }
      })
      .catch(err => console.error("Қате:", err.message));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn || !user) return;

    const payload = {
      userId: user.id,
      name: user.fullName,
      avatar: user.imageUrl,
      message: form.message,
      rating: form.rating
    };

    try {
      let res;
      if (editingReview) {
        res = await axios.put(`http://localhost:5000/api/reviews/${editingReview._id}`, payload);
        setReviews(prev => prev.map(r => r._id === res.data._id ? res.data : r));
      } else {
        res = await axios.post('http://localhost:5000/api/reviews', payload);
        setReviews(prev => [res.data, ...prev]);
        setHasReviewed(true);
      }
      setForm({ message: '', rating: 5 });
    } catch (err) {
      alert(err.response?.data?.message || "Қате орын алды.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">Пайдаланушы пікірлері</h2>
        {averageRating && (
          <p className="text-center text-lg text-yellow-600 mb-6">
            ⭐ Орташа рейтинг: <span className="font-semibold">{averageRating} / 5</span>
          </p>
        )}

        <AnimatePresence>
          {hasReviewed && (
            <motion.div
              key="review-success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-green-100 text-green-800 border border-green-300 px-6 py-3 rounded-lg shadow-md flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Сіз пікір қалдырдыңыз!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isSignedIn && user && (
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl px-8 py-6 mb-12 w-full max-w-2xl mx-auto space-y-5 border border-gray-200">
            <div className="flex items-center gap-4">
              <img src={user.imageUrl} alt="avatar" className="w-12 h-12 rounded-full border" />
              <p className="text-xl font-semibold">{user.fullName}</p>
            </div>
            <textarea
              placeholder="Сіздің пікіріңіз..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
              rows={4}
              required
            />
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-700">Баға:</p>
              <div className="flex items-center gap-1">
                {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
                  <span
                    key={value}
                    onClick={() => setForm({ ...form, rating: value })}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(null)}
                    className={`cursor-pointer text-lg ${value <= (hover || form.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    {value % 1 === 0 ? <FaStar /> : <FaStarHalfAlt />}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded w-full"
            >
              {editingReview ? "Пікірді жаңарту" : "Пікір қалдыру"}
            </button>
          </form>
        )}

        {reviews.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev) => (
              <div key={rev._id} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-3 border border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src={rev.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.name)}`}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{rev.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(rev.date).toLocaleDateString('kk-KZ', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {renderStars(rev.rating)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{rev.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Әлі пікір жоқ.</p>
        )}
      </div>
    </div>
  );
}
