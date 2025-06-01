import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import CareerMap from '../components/CareerMap';
import careerMap from '../assets/career-map.png';

const questions = [
  {
    question: 'Сізге қандай жұмыс түрі ұнайды?',
    answers: {
      'Бағдарламалық жасақтама әзірлеу': 3,
      'Дизайн жасау': 2,
      'Сандық маркетинг': 1,
    },
  },
  {
    question: 'Қай саладағы тапсырмалар сізге қызықты?',
    answers: {
      'Жасанды интеллект': 3,
      'Бұлттық есептеу': 2,
      'IoT әзірлеу': 1,
    },
  },
  {
    question: 'Сіз қандай ортада жақсы жұмыс істейсіз?',
    answers: {
      'Желілік технологиялар': 3,
      'Киберқауіпсіздік': 2,
      'Сапаны қамтамасыз ету': 1,
    },
  },
  {
    question: 'Сізге қайсысы жақын?',
    answers: {
      'Өнімді басқару': 3,
      'Техникалық жазу': 2,
      'Сатылым инженериясы': 1,
    },
  },
  {
    question: 'Сізде қандай қабілеттер бар?',
    answers: {
      'Аналитикалық ойлау': 3,
      'Коммуникация': 2,
      'Шығармашылық': 1,
    },
  },
  {
    question: 'Сіз үшін мансапта не маңызды?',
    answers: {
      'Жаңашыл технологиялармен жұмыс': 3,
      'Пайдаланушыларға көмектесу': 2,
      'Кәсіби тұрақтылық': 1,
    },
  },
];

const explanations = {
  'Бағдарламалық жасақтама әзірлеу': 'Сіз техникалық логика мен шешім қабылдауға бейімсіз.',
  'Дизайн жасау': 'Сізге шығармашылық ойлау мен интерфейс құру ұнайды.',
  'Сандық маркетинг': 'Сіз адамдармен жұмыс істеуді, жарнама жасауды қалайсыз.',
  'Жасанды интеллект': 'Сізге деректермен жұмыс істеу және алгоритмдер қызық.',
  'Бұлттық есептеу': 'Сіз үлкен жүйелермен жұмыс істегенді ұнатасыз.',
  'IoT әзірлеу': 'Сіз аппараттық құралдар мен құрылғыларды біріктіруге бейімсіз.',
  'Желілік технологиялар': 'Сіз инфрақұрылымды қолдауға және жүйелерге жауаптысыз.',
  'Киберқауіпсіздік': 'Сіз қауіпсіздік пен жүйелік қорғанысқа мән бересіз.',
  'Сапаны қамтамасыз ету': 'Сіз егжей-тегжейге назар аударасыз, сапа сіз үшін маңызды.',
};

const interestOptions = ['AI', 'Cloud', 'UX/UI', 'Security', 'DevOps'];

const CareerGuidance = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState('');

  useEffect(() => {
    let interval;
    if (showModal && !showResults) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showModal, showResults]);

  const handleAnswer = (field, points) => {
    setScores(prev => ({
      ...prev,
      [field]: (prev[field] || 0) + points,
    }));
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScores({});
    setShowResults(false);
    setTimer(0);
    setSelectedInterest('');
  };

  const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
  const sortedResults = Object.entries(scores)
    .map(([field, score]) => ({
      field,
      percentage: Math.round((score / totalScore) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);
  const topField = sortedResults[0]?.field;
  const formatTime = sec => `${Math.floor(sec / 60)}:${('0' + (sec % 60)).slice(-2)}`;

  return (
    <>
      <Navbar />
      <div className={`relative ${showModal ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-blue-900 text-center"
          >
            🎯 Кәсіптік бағдар беру
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-700 text-center max-w-3xl mx-auto"
          >
            IT саласына бағыт алу үшін өз бейімділігіңізді анықтаңыз. Қысқа тесттен өтіп, нәтижені біліңіз.
          </motion.p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 shadow-md transition"
            >
              🧪 Тесті бастау
            </button>
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md transition"
            >
              ← Басты бетке оралу
            </a>
          </div>

          <motion.img
            src={careerMap}
            alt="Карта"
            className="mx-auto rounded-xl border mt-12 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />

          <CareerMap />
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  resetTest();
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ❌
              </button>

              {!showResults ? (
                <>
                  <div className="mb-2 text-sm text-gray-500">⏱ Уақыт: {formatTime(timer)}</div>
                  <div className="mb-4">
                    <div className="text-sm text-blue-700 mb-1">
                      Сұрақ {currentQuestion + 1} / {questions.length}
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all duration-300"
                        style={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-800">
                    {questions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(questions[currentQuestion].answers).map(([field, point]) => (
                      <motion.button
                        key={field}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleAnswer(field, point)}
                        className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-800 px-4 py-2 rounded-md transition shadow-sm"
                      >
                        {field}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">📌 Қосымша қызығушылық:</h4>
                    <div className="space-y-1">
                      {interestOptions.map(option => (
                        <label key={option} className="block text-sm">
                          <input
                            type="radio"
                            name="interest"
                            value={option}
                            checked={selectedInterest === option}
                            onChange={(e) => setSelectedInterest(e.target.value)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-green-700 mb-4">✅ Нәтиже</h3>
                  <p className="mb-2">
                    Сізге ең қолайлы бағыт:{" "}
                    <span className="font-bold text-blue-800">{topField}</span>
                  </p>
                  <p className="text-gray-700 italic mb-4">
                    Неліктен: {explanations[topField]}
                  </p>
                  <div className="space-y-3">
                    {sortedResults.map(({ field, percentage }) => (
                      <div key={field}>
                        <div className="flex justify-between text-sm text-gray-700 mb-1">
                          <span>{field}</span>
                          <span className="font-semibold text-blue-700">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Таңдаған қызығушылығыңыз:{" "}
                    <span className="font-medium text-blue-600">
                      {selectedInterest || 'таңдалмаған'}
                    </span>
                  </p>
                  <button
                    onClick={resetTest}
                    className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Қайтадан өту 🔁
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default CareerGuidance;
