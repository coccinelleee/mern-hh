import React, { useState } from "react";
import logo from "../assets/logo-transparent.png";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim() === "") return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="pt-16 pb-7 bg-gray-900 mt-[10rem]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-12 pb-12 border-b-2 border-gray-700 max-lg:gap-7">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="font-primary font-bold text-4xl leading-tight text-white mb-2 max-lg:text-center">
                DevMDK жүйесіне тіркеліңіз
              </h2>
              <p className="text-base text-gray-400 font-normal max-lg:text-center">
                Ең соңғы жұмыс мүмкіндіктері, жаңартулар және хабарландырулар туралы хабардар болыңыз.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 items-center">
              <div className="flex items-center justify-between bg-gray-800 w-full max-w-md mx-auto lg:mr-0 rounded-full p-2.5 pl-8 border border-gray-700 transition-all duration-300 hover:border-primary focus-within:border-gray-400">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-base font-normal text-white placeholder-gray-500 focus:outline-none"
                  placeholder="Email енгізіңіз"
                />
                <button
                  onClick={handleSubmit}
                  className="py-3 px-7 hidden min-[470px]:block rounded-full bg-primary text-base font-semibold text-white shadow-sm transition-all duration-500 hover:bg-[#444444] focus:outline-none"
                >
                  Жіберу
                </button>
              </div>
              <button
                onClick={handleSubmit}
                className="py-3 px-7 min-[470px]:hidden rounded-full bg-violet-500 text-base font-semibold text-white shadow-sm transition-all duration-500 hover:bg-violet-700 focus:outline-none"
              >
                Жіберу
              </button>
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-green-400 text-sm mt-2"
                  >
                    📩 Email сәтті жіберілді!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-y-8 py-14 border-b-2 border-gray-700">
            <div>
              <h6 className="text-xl font-bold text-white mb-7 font-primary">devMDK</h6>
              <ul className="flex flex-col gap-6">
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Басты бет</a></li>
                <li><a href="/dashboard" className="text-lg font-normal text-gray-400 hover:text-violet-400">Бақылау тақтасы</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Жұмыс орындары</a></li>
                <li><a href="/features" className="text-lg font-normal text-gray-400 hover:text-violet-400">Ерекшеліктер</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xl font-bold text-white mb-7 font-primary">Жұмыс іздеушілер</h6>
              <ul className="flex flex-col gap-6">
                <li><a href="/applications" className="text-lg font-normal text-gray-400 hover:text-violet-400">Түйіндеме құрастырушысы</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Жұмыс тізімдері</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Кәсіптік бағдар беру</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Біліктілікті дамыту</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xl font-bold text-white mb-7 font-primary">Ресурстар</h6>
              <ul className="flex flex-col gap-6">
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Жиі қойылатын сұрақтар</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Жылдам іске қосу</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Құжаттама</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Пайдаланушы нұсқаулығы</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xl font-bold text-white mb-7 font-primary">Қолдау</h6>
              <ul className="flex flex-col gap-6">
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Тұтынушыларды қолдау</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Cookie файлдары</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Лицензия</a></li>
                <li><a href="/" className="text-lg font-normal text-gray-400 hover:text-violet-400">Шарттар мен талаптар</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-3 flex flex-col min-[500px]:flex-row items-center justify-between">
            <a href="/" className="py-1.5">
              <img src={logo} alt="Prodigy Logo" width="190" height="33" className="filter invert" />
            </a>
            <p className="text-sm text-gray-400 mt-4 min-[500px]:mt-0 px-10">
              © 2025 devMDK | diploma Murat Dilnaz Khalelovna
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;