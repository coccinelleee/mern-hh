import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: 0.15, duration: 0.7, ease: "easeOut" } 
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const License = () => {
  return (
    <>
      <Navbar />
      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        // добавляем горизонтальные отступы по краям, чтобы рамка не прилипала к краю экрана
        className="max-w-3xl mx-auto px-4 sm:px-8 md:px-12 py-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl shadow-2xl border border-indigo-300 mt-16 mb-24"
        style={{ minWidth: 0 }} // предотвращаем выход содержимого за рамки на маленьких экранах
      >
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-10 text-center tracking-wide drop-shadow-lg leading-tight"
          style={{ wordBreak: "break-word" }} // чтобы заголовок красиво переносился при маленькой ширине
        >
          📜 Лицензия және Қолдану шарттары
        </motion.h1>

        <motion.section variants={itemVariants} className="mb-10 px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-4 border-l-8 border-indigo-600 pl-4 shadow-md leading-snug">
            Жобаның лицензиясы туралы толық ақпарат
          </h2>
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Бұл веб-платформа MIT лицензиясы бойынша қолданылады. MIT лицензиясы — ең ашық және икемді лицензиялардың бірі,
            ол пайдаланушыларға бағдарламалық қамтамасыз етуді еркін пайдалану, көшіру, өзгерту және тарату құқығын береді.
            Бірақ осы құқықтарды пайдалану кезінде бастапқы лицензия мәтінін және авторлық құқық туралы ақпаратты сақтау міндетті.
            Бұл лицензия біздің жобамызды ашық әрі сенімді етеді, кез келген мақсатқа бейімделуі мүмкін.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-10 px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-4 border-l-8 border-indigo-600 pl-4 shadow-md leading-snug">
            Қолдану құқықтары мен міндеттемелері
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            <li>Бағдарламалық құралды жеке, академиялық және коммерциялық мақсатта еркін пайдалануға болады.</li>
            <li>Кодтың өзгертілген нұсқаларын тарату кезінде бастапқы лицензия туралы ақпаратты міндетті түрде қосу қажет.</li>
            <li>Бағдарламаны пайдалану кезіндегі кез келген зиян немесе ақаулық үшін авторлар жауап бермейді.</li>
            <li>Барлық пайдаланушылар авторлық құқықты құрметтеп, құқықтық шарттарды сақтау қажет.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-10 px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-4 border-l-8 border-indigo-600 pl-4 shadow-md leading-snug">
            Қосымша ақпарат және байланыс
          </h2>
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Лицензия шарттары бойынша сұрақтар туындаған жағдайда, заңгерлік кеңес алу ұсынылады.
            Сонымен қатар, жобаның ресми репозиторийіндегі лицензия мәтінін толық қарап шығуға кеңес береміз.
          </p>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="text-center mt-12 max-w-xl mx-auto text-gray-700 text-xs sm:text-sm"
        >
          <p>Құқықтық мәселелерге қатысты сұрақтар туындаған жағдайда, біз жауап бермейміз.</p>
          <p className="font-semibold mt-2">Барлық құқықтар қорғалған.</p>
        </motion.section>
      </motion.main>
      <Footer />
    </>
  );
};

export default License;
