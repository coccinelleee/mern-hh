import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Support = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-indigo-50 p-6 rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
            🛠️ Тұтынушыларды қолдау
          </h1>
          <p className="text-gray-700 mb-10 text-lg text-center">
            Сіздің ыңғайыңыз үшін біз барлық маңызды ақпаратты жинадық. Бұл бөлімде жиі қойылатын техникалық сұрақтарға жауаптар, компаниялар мен ізденушілерге арналған нақты шешімдер, сонымен қатар қауіпсіздік пен байланыс мүмкіндіктері көрсетілген.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">🔐 Кіру немесе тіркелу</h2>
              <p>
                Google немесе email арқылы тіркеліңіз. Парольді ұмытып қалсаңыз — қалпына келтіру батырмасын қолданыңыз. Қауіпсіздік жүйесі Clerk арқылы қорғалған.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">📤 Түйіндеме жүктеу</h2>
              <p>
                PDF форматында файл жүктеу қажет (2MB дейін). Егер ақау болса, басқа браузерді қолданып көріңіз немесе файлды тексеріңіз.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">📩 Пошта растауы</h2>
              <p>
                Растау хаты келмесе, "Спам" папкасын тексеріңіз. Қайта жіберу үшін тіркелу парағына оралыңыз.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">🏢 Компаниялар үшін</h2>
              <p>
                Компаниялар жұмыс жариялау кезінде нақты ақпарат көрсетуі қажет. Қабылданған өтініштерді басқару оңай — қабылдау немесе қабылдамау бір батырмамен.
              </p>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">🛡️ Деректер қауіпсіздігі</h2>
              <p>
                Сіздің барлық деректеріңіз шифрланады және қауіпсіз ортада сақталады. Біз үшін сіздің сеніміңіз — басты құндылық. Үшінші тараппен ешқандай мәліметтер бөліспейміз.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4 text-lg">
              Егер бұл ақпарат көмектеспесе, бізге тікелей Gmail арқылы жазыңыз — қолдау тобы 24 сағат ішінде жауап береді.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=devmdk@contact.kz&su=Қолдау сұрауы&body=Сәлеметсіз бе, менің мәселем:"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              📧 Gmail арқылы қолдау қызметіне жазу
            </a>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Support;
