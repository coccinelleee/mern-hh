import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Cookies = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <motion.div
          variants={fadeInUp}
          className="bg-indigo-50 p-8 rounded-xl shadow-xl border border-indigo-200"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-extrabold text-indigo-900 mb-8 text-center"
          >
            🍪 Cookie файлдары туралы толық ақпарат
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Біздің платформа сіздің жеке өміріңіз бен деректеріңіздің қауіпсіздігіне ерекше көңіл бөледі.
            Cookie файлдары - сайттың дұрыс жұмыс істеуіне және сіздің тәжірибеңізді жақсартуға арналған
            маңызды құралдар. Бұл бетте cookie файлдарының түрлері, олардың рөлі және сіздің құқықтарыңыз туралы
            кең ақпарат берілген.
          </motion.p>

          {/* Cookie Types */}
          <motion.section variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-5 border-b border-indigo-300 pb-2">
              Cookie файлдарының түрлері
            </h2>
            <ul className="list-disc list-inside space-y-4 text-gray-700 max-w-4xl mx-auto">
              <li>
                <strong>Қажетті cookie файлдары:</strong> Сайтқа кіру мен аутентификацияны қамтамасыз етеді, қауіпсіздікті арттырады.
              </li>
              <li>
                <strong>Талдамалық cookie файлдары:</strong> Қолданушының сайттағы әрекеттерін бақылап, статистика құрады және
                сайтты жетілдіруге көмектеседі.
              </li>
              <li>
                <strong>Функционалдық cookie файлдары:</strong> Сіз таңдаған тіл, тақырып, және басқа да баптауларды сақтайды.
              </li>
              <li>
                <strong>Жарнамалық cookie файлдары:</strong> Жеке қызығушылықтарыңызға сай жарнамаларды көрсету үшін пайдаланылады.
              </li>
            </ul>
          </motion.section>

          {/* Управление cookie */}
          <motion.section variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-5 border-b border-indigo-300 pb-2">
              Cookie файлдарын басқару
            </h2>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Барлық браузерлер cookie файлдарын басқаруға мүмкіндік береді. Сіз cookie файлдарын өшіре, қабылдамауға
              немесе жоюға болады. Бұл үшін браузердің қауіпсіздік баптауларын пайдаланыңыз. Алайда, кейбір функциялар
              дұрыс жұмыс істемеуі мүмкін екенін ескеріңіз.
            </p>
          </motion.section>

          {/* Ең үздік тәжірибелер */}
          <motion.section variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-5 border-b border-indigo-300 pb-2">
              Ең үздік тәжірибелер мен ұсыныстар
            </h2>
            <ul className="list-decimal list-inside space-y-4 text-gray-700 max-w-4xl mx-auto">
              <li>
                Веб-сайтқа кірген кезде cookie файлдары туралы хабарламаға назар аударыңыз және қажетті ақпаратты оқыңыз.
              </li>
              <li>
                Браузеріңіздің cookie баптауларын үнемі тексеріп, жаңартып отырыңыз.
              </li>
              <li>
                Қауіпсіздік мақсатында жеке ақпараттарды тек сенімді сайттарда ғана сақтаңыз.
              </li>
              <li>
                Егер сізде cookie файлдарына қатысты сұрақтар туындаса, біздің қолдану шарттарымызды және
                жеке мәліметтер саясатын қараңыз.
              </li>
            </ul>
          </motion.section>

          {/* Қорытынды */}
          <motion.section variants={fadeInUp} className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-center">
              Cookie файлдары сіздің сайттағы тәжірибеңізді жақсартуға көмектеседі және біздің қызметіміздің сапасын арттырады.
              Біз сіздің жеке деректеріңіздің қауіпсіздігін қамтамасыз етуге міндеттіміз.
            </p>
          </motion.section>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Cookies;
