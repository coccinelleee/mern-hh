import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      question: "Жұмысқа қалай өтініш беремін?",
      answer:
        "Сайтқа тіркеліп, түйіндемеңізді жүктегеннен кейін кез келген бос жұмыс орнына өтініш бере аласыз.",
    },
    {
      question: "Қазақстанда фриланс арқылы жұмыс табуға бола ма?",
      answer:
        "Иә, сайтта қашықтан және фриланс жұмыс ұсыныстары да бар. Фильтр арқылы таңдап іздеңіз.",
    },
    {
      question: "Түйіндемені қалай жаңартамын?",
      answer:
        "Профиль бетіне кіріп, 'Түйіндемені жаңарту' батырмасын басыңыз және жаңартылған PDF-файлды жүктеңіз.",
    },
    {
      question: "Компаниялар менімен қалай хабарласады?",
      answer:
        "Компаниялар сіздің көрсетілген электрондық поштаңыз арқылы хабарласады. Хабарландыруды тексеріп отырыңыз.",
    },
    {
      question: "Сұхбат қалай өтеді?",
      answer:
        "Сұхбат әдетте онлайн немесе оффлайн түрде өтеді. Компания өз форматын хабарлайды.",
    },
    {
      question: "Сайтта қандай IT мамандықтар ұсынылады?",
      answer:
        "UI/UX дизайнер, Backend және Frontend developer, Data analyst, DevOps және басқа да IT бағыттар.",
    },
    {
      question: "Сайтта жарияланған жұмыс орындары сенімді ме?",
      answer:
        "Әрбір компания верификациядан өтеді. Егер күмән туындаса, бізге хабарласыңыз.",
    },
    {
      question: "Қаламаған компанияларды қалай жасырамын?",
      answer:
        "Профиль баптауларында 'Қара тізімге қосу' опциясын қолданыңыз.",
    },
    {
      question: "Жаңа жұмыс туралы хабарландыруды қалай аламын?",
      answer:
        "Профильде ескертулерді қосыңыз. Біз жаңа жұмыс шыққанда email арқылы хабарлаймыз.",
    },
    {
      question: "Тіркелу тегін бе?",
      answer:
        "Иә, тіркелу және жұмысқа өтініш беру толығымен тегін.",
    },
    {
      question: "Платформада internship (тәжірибе) бар ма?",
      answer:
        "Иә, көптеген компаниялар junior және trainee бағдарламаларын жариялайды.",
    },
    {
      question: "Менің түйіндемемді сайтқа қосуға болады ма?",
      answer:
        "Иә, болады, «Түйіндеме құрушысы» парақшасы арқылы pdf форматында түйіндеме қосуға болады",
    },
    {
      question: "Қолдау қызметіне қалай жаза аламын?",
      answer:
        "Беттің төменгі жағында көрсетілген пошта арқылы немесе байланыс формасы арқылы жаза аласыз.",
    },
  ];  

  const toggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-3">
          📘 Сұрақтар мен Жауаптар (FAQ)
        </h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
          Бұл бетте сіз Қазақстандағы IT саласындағы жұмыс іздеуге қатысты ең жиі қойылатын
          сұрақтарға жауап таба аласыз. Егер сізде басқа сұрақтар болса, бізге хабарласыңыз.
        </p>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-indigo-200 rounded-lg p-4 shadow-sm"
            >
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => toggle(index)}
              >
                <h2 className="text-lg font-semibold text-indigo-700">
                  {item.question}
                </h2>
                <span>{expanded === index ? "▲" : "▼"}</span>
              </div>
              <AnimatePresence>
                {expanded === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-gray-700"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-indigo-800 mb-2">
            Қосымша сұрақтарыңыз бар ма?
          </h3>
          <p className="mb-4 text-gray-600">
            Бізбен тікелей байланысыңыз — біз сізге көмектесуге әрқашан дайынбыз.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=devmdk@contact.kz&su=FAQ сұрағы&body=Сәлеметсіз бе, менің сұрағым:"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            📧 devmdk@contact.kz - Gmail арқылы байланысу
          </a>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default FAQ;
