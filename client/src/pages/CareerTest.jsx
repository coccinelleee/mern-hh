import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const questions = [
  {
    question: 'Қандай жұмыс түрін ұнатасыз?',
    answers: {
      'Бағдарламалық жасақтама әзірлеу': 3,
      'Дизайн жасау': 2,
      'Сандық маркетинг': 1,
    },
  },
  {
    question: 'Қандай тапсырмалар қызықтырады?',
    answers: {
      'Жасанды интеллект': 3,
      'Бұлттық есептеу': 2,
      'IoT әзірлеу': 1,
    },
  },
  {
    question: 'Қандай жұмыс ортасын қалайсыз?',
    answers: {
      'Желілік технологиялар': 3,
      'Киберқауіпсіздік': 2,
      'Сапаны қамтамасыз ету': 1,
    },
  },
  {
    question: 'Командада қандай рөлде болған ұнайды?',
    answers: {
      'Басқару': 3,
      'Өнімді басқару': 2,
      'Сатылым инженериясы': 1,
    },
  },
  {
    question: 'Жұмыста қандай қабілеттеріңізді пайдаланғыңыз келеді?',
    answers: {
      'Техникалық жазба және құжаттама': 3,
      'Маркетинг': 2,
      'Сандық маркетинг': 1,
    },
  },
];

const CareerTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (field, points) => {
    setScores(prevScores => ({
      ...prevScores,
      [field]: (prevScores[field] || 0) + points,
    }));

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);

  const sortedResults = Object.entries(scores)
    .map(([field, score]) => ({
      field,
      percentage: Math.round((score / totalScore) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-center text-blue-900 mb-6"
        >
          🧭 IT мамандықтар бойынша кәсіптік бағдарлау тесті
        </motion.h2>

        {!showResults ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {Object.entries(questions[currentQuestion].answers).map(([field, points]) => (
                <button
                  key={field}
                  onClick={() => handleAnswer(field, points)}
                  className="w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-800 px-4 py-2 rounded-lg transition"
                >
                  {field}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white shadow-xl rounded-xl p-6"
          >
            <h3 className="text-2xl font-semibold mb-4">✅ Сіздің нәтижелеріңіз:</h3>
            <ul className="space-y-2">
              {sortedResults.map(({ field, percentage }) => (
                <li key={field} className="flex justify-between items-center">
                  <span className="font-medium">{field}</span>
                  <span className="text-blue-600 font-semibold">{percentage}%</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScores({});
                setShowResults(false);
              }}
              className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Қайталау 🔄
            </button>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CareerTest;
