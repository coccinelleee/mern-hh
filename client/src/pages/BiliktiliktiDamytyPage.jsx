import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const freeResources = [
  {
    name: "FreeCodeCamp",
    desc: "Интерактивті тапсырмалар арқылы веб-әзірлеуді үйрену",
    url: "https://www.freecodecamp.org/",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png"
  },
  {
    name: "CS50 by Harvard",
    desc: "Компьютерлік ғылымға кіріспе курсы (қазақша субтитрмен)",
    url: "https://cs50.harvard.edu/x/",
    image: "https://camo.githubusercontent.com/2485cdb92cc1563cb21703bd1dc5474a727cd17b4d8243b27b9906468ec4e945/68747470733a2f2f676f6f2e676c2f6d4a774e5543"
  },
  {
    name: "Frontend Mentor",
    desc: "HTML, CSS, JavaScript тәжірибесі үшін нақты жобалар",
    url: "https://www.frontendmentor.io/",
    image: "https://avatars.githubusercontent.com/u/47983367?s=280&v=4"
  },
  {
    name: "Scrimba",
    desc: "JavaScript пен React визуалды курс платформасы",
    url: "https://scrimba.com/",
    image: "https://avatars.githubusercontent.com/u/20739665?s=200&v=4"
  },
  {
    name: "Google Digital Garage",
    desc: "Цифрлық сауаттылық пен маркетинг негіздері",
    url: "https://learndigital.withgoogle.com/digitalgarage",
    image: "https://digitalpovertyalliance.org/wp-content/uploads/2022/12/google_digital_garage.webp"
  },
  {
    name: "Kaggle",
    desc: "Машина оқыту бойынша деректермен жұмыс тәжірибесі",
    url: "https://www.kaggle.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png"
  }
];

const BiliktiliktiDamytyPage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16 text-gray-800 space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-indigo-800"
        >
          🚀 Біліктілікті дамыту: IT саласында үздіксіз өсу жолы
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 text-center max-w-3xl mx-auto"
        >
          Бүгінгі таңда технологияның қарқынды дамуы – кәсіби мамандардан үнемі жаңарып отыруды талап етеді.
          Бұл бет сізге өз біліктілігіңізді дамытып, бәсекеге қабілетті болуға көмектесетін құралдар мен идеяларды ұсынады.
        </motion.p>

        {/* Info Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-indigo-50 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">🎯 Неге біліктілікті дамыту қажет?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Жаңа технологиялармен қадамдас болу.</li>
              <li>Мансаптық өсу мен жалақының жоғарылауы.</li>
              <li>Табысты жобалар мен стартаптарға қатысу мүмкіндігі.</li>
              <li>Сапалы портфолио құру.</li>
              <li>Жаңа бағыттарға өту (мысалы, backend → DevOps).</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-indigo-50 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">🧠 Қандай ресурстар көмектеседі?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Онлайн курстар: Coursera, Udemy, Stepik, Codecademy, Sololearn</li>
              <li>Кітаптар: "Clean Code", "You Don't Know JS", "The Pragmatic Programmer"</li>
              <li>YouTube арналар: FreeCodeCamp, Fireship, Traversy Media</li>
              <li>Менторлық платформалар: ADPList, MentorCruise</li>
              <li>Хакатондар мен IT қауымдастықтар</li>
            </ul>
          </motion.div>
        </div>

        {/* Skill Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">📈 Қадамдық жоспар (Skill Roadmap)</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Негізгі концепцияларды түсіну (data structures, algorithms, OOP)</li>
            <li>Бір бағдарламалау тілін терең меңгеру (Python, JavaScript)</li>
            <li>Жобалар құру (ToDo, e-commerce, REST API)</li>
            <li>Git және GitHub үйрену</li>
            <li>Жаңа технологиямен танысу (React, Node.js, Docker)</li>
            <li>Портфолио мен резюме дайындау</li>
            <li>Сертификаттар алу және интервьюге дайындалу</li>
          </ol>
        </motion.div>

        {/* Resource Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-10">📚 Ұсынылатын тегін ресурстар:</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeResources.map(({ name, desc, url, image }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl shadow hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <img
                  src={image}
                  alt={name}
                  className="h-40 w-full object-contain bg-white p-2 rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-bold text-indigo-800 text-lg">{name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            💡 Есіңізде болсын: даму — үздіксіз процесс. Бүгін жасаған қадамыңыз ертеңгі үлкен жетістіктің бастауы.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BiliktiliktiDamytyPage;
