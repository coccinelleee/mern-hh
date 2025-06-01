import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    title: "💻 Бағдарламалау",
    desc: "Қосымшалар, веб-сайттар және бағдарламалық жасақтамаларды құру.",
    items: ["Frontend", "Backend", "Full-stack", "Mobile әзірлеу"],
  },
  {
    title: "☁️ Бұлттық есептеу",
    desc: "Деректер мен қосымшаларды қашықтан басқару технологиялары.",
    items: ["AWS", "Azure", "Google Cloud", "DevOps"],
  },
  {
    title: "🤖 Жасанды интеллект",
    desc: "Компьютердің ойлау қабілетін дамытып, интеллектуалды жүйелер жасау.",
    items: ["Machine Learning", "Data Science", "Компьютерлік көру", "NLP"],
  },
  {
    title: "🌐 Желілер мен байланыс",
    desc: "Желілік инфрақұрылымды құру және оны қауіпсіз басқару.",
    items: ["Network Engineer", "System Administrator", "Cybersecurity"],
  },
  {
    title: "🧑‍💼 Өнімдерді басқару",
    desc: "Өнімді жоспарлау, әзірлеу және нарыққа шығару стратегиясы.",
    items: ["Product Manager", "UX зерттеушісі", "Бизнес аналитик"],
  },
  {
    title: "📈 Маркетинг",
    desc: "Өнімді жарнамалау, брендті дамыту және нарықтағы орнықтыру.",
    items: ["Цифрлық маркетинг", "SEO маманы", "Контент маркетинг"],
  },
  {
    title: "🔐 Киберқауіпсіздік",
    desc: "Ақпаратты қорғау, қауіпсіздікті қамтамасыз ету шаралары.",
    items: ["Ethical Hacker", "Security Analyst", "Қауіпсіздік инженері"],
  },
  {
    title: "🚀 Сату және инженерия",
    desc: "Өнімдерді техникалық тұрғыда сату және қолдау көрсету.",
    items: ["Sales Engineer", "Technical Support", "Client Relations"],
  },
  {
    title: "✍️ Техникалық жазу",
    desc: "Күрделі техникалық ақпаратты қарапайым тілде түсіндіру.",
    items: ["Құжаттама жасау", "Нұсқаулықтар жазу", "Контент әзірлеу"],
  },
  {
    title: "📡 IoT әзірлеу",
    desc: "Заттарды интернет арқылы байланыстыратын технологияларды дамыту.",
    items: ["Embedded жүйелер", "Сенсорлармен жұмыс", "Ақылды құрылғылар"],
  },
  {
    title: "✅ Сапаны бақылау",
    desc: "Бағдарламалық өнімнің сапасын тексеру мен тестілеу.",
    items: ["QA инженер", "Автоматтандырылған тестілеу", "Manual Testing"],
  },
  {
    title: "🎨 Дизайн",
    desc: "Өнімнің пайдаланушылық интерфейстері мен тәжірибесін жақсарту.",
    items: ["UX/UI дизайн", "Графикалық дизайн", "Интерактивті дизайн"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const CareerMap = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-10 shadow-2xl my-12">
      <h2 className="text-3xl font-bold text-indigo-900 text-center mb-4">🗺️ IT мансап картасы</h2>
      <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
        IT саласындағы әр түрлі бағыттарды егжей-тегжейлі зерттеп, болашағыңызды бүгіннен бастаңыз.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">
              {category.title}
            </h3>
            <p className="text-gray-600 mb-4">{category.desc}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {category.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerMap;
