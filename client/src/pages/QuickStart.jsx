import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const QuickStart = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          🚀 Жылдам іске қосу
        </h1>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-10">
          Бұл бет жаңа қолданушылар үшін платформада жұмыс іздеуді оңай бастауға арналған. Қадамдарды орындап, алғашқы өтінішіңізді жіберіңіз.
        </p>

        <div className="space-y-10">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-50 p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold text-indigo-700 mb-2">1. Тіркелу</h2>
            <p className="text-gray-800">
              Платформаға тіркелу үшін жоғарғы оң жақтағы{" "}
              <strong>"Кіру / Тіркелу"</strong> батырмасын басыңыз. Бұл арқылы сіз барлық функционалға қол жеткізесіз.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-50 p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold text-indigo-700 mb-2">2. Профильді толтыру</h2>
            <p className="text-gray-800">
              Жеке кабинетке кіріп, профиліңізді толтырыңыз және түйіндемеңізді <strong>PDF</strong> форматында жүктеңіз.
              Бұл жұмыс берушілер үшін өте маңызды.
            </p>
            <Link to="/applications" className="text-indigo-600 underline mt-2 inline-block">
              Профильге өту
            </Link>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-50 p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold text-indigo-700 mb-2">3. Жұмыс іздеу</h2>
            <p className="text-gray-800">
              Басты беттегі іздеу жолағы арқылы қалаған сала, қала немесе позиция бойынша жұмыс таба аласыз.
            </p>
            <Link to="/" className="text-indigo-600 underline mt-2 inline-block">
              Басты бетке өту
            </Link>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-50 p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold text-indigo-700 mb-2">4. Өтініш беру</h2>
            <p className="text-gray-800">
              Жұмыстың сипаттамасын қарап шығып,{" "}
              <strong>«Қазір өтініш беру»</strong> батырмасын басыңыз. Сіздің түйіндемеңіз автоматты түрде тіркеледі.
            </p>
          </motion.div>

          {/* Step 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-50 p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold text-indigo-700 mb-2">5. Жауап күту</h2>
            <p className="text-gray-800">
              Егер сіздің профиліңіз жұмыс берушіні қызықтырса, сізге көрсеткен поштаңыз арқылы хабарласады.
              <br /> Ескерту: Хабарландыруды жіберіп алмау үшін электрондық поштаңызды тексеріп отырыңыз.
            </p>
          </motion.div>
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center">
        <p className="text-gray-600">Көмек қажет пе?</p>
        <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=devmdk@contact.kz&su=Қолдау туралы сұрау&body=Сәлеметсіз бе, мен көмек қажет етемін:"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg mt-2 hover:bg-indigo-700 transition"
        >
            📩 Gmail арқылы қолдау қызметіне жазу
        </a>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default QuickStart;
