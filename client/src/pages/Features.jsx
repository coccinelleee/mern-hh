import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center">
          🌐 Web-сайттың мүмкіндіктері
        </h1>

        <section className="mb-12 space-y-4">
          <p className="text-lg leading-relaxed">
            Бұл <strong>web-платформа</strong> — жұмыс іздеушілер мен жұмыс берушілерді біріктіретін тиімді құрал. 
            Жүйе қолданушыға ыңғайлы, қауіпсіз және заманауи технологияларға негізделген.
          </p>
          <p className="text-lg leading-relaxed">
            Сайт MERN (MongoDB, Express, React, Node.js) стек арқылы жасалған және <strong>Clerk</strong> арқылы Google авторизациясын қолдайды. 
            Бұл платформа жұмыс табуға немесе маман іздеуге көмектесетін сенімді шешім.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">🔍 Негізгі мүмкіндіктер</h2>
          <ul className="space-y-4 list-disc list-inside text-lg leading-relaxed">
            <li><strong>Жұмыс іздеу жүйесі:</strong> Қолданушылар фильтр арқылы өздеріне сай жұмыс таба алады.</li>
            <li><strong>Рекруитер панелі:</strong> Компаниялар жұмыс жариялап, үміткерлерді бақылай алады.</li>
            <li><strong>Қолданушы пікірлері:</strong> Реалды пікір қалдыру арқылы сенімділік деңгейі артады.</li>
            <li><strong>Clerk авторизациясы:</strong> Google арқылы қауіпсіз және тез тіркелу мүмкіндігі.</li>
            <li><strong>Tailwind интерфейс:</strong> Жеңіл, заманауи және мобильдіге бейімделген дизайн.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">💼 Жұмыс беруші мен іздеушіге пайдалы</h2>
          <ul className="space-y-4 list-disc list-inside text-lg leading-relaxed">
            <li><strong>Жұмыс іздеушіге:</strong> бірнеше рет басу арқылы жұмысқа өтінім беру мүмкіндігі.</li>
            <li><strong>Компанияларға:</strong> аналитика, қабылданған өтінімдер және рейтингтер арқылы сүзгілеу.</li>
            <li><strong>Рекруитерлерге:</strong> түйіндеме көру және қабылдау оңайлатылған.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">📊 Аналитика және статистика</h2>
          <p className="text-lg leading-relaxed">
            Әрбір қолданушы өз өтінімдерінің күйін бақылай алады. Жұмыс берушілер жұмыс саны, өтінім саны және қаралымдар бойынша нақты мәлімет алады.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">🔐 Қауіпсіздік және деректерді сақтау</h2>
          <p className="text-lg leading-relaxed">
            Барлық деректер қауіпсіз серверлерде сақталады және тек рұқсат етілген қолданушыларға ғана қолжетімді.
            Cloudinary арқылы суреттер сенімді жүктеледі.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">📱 Мобильді құрылғыларды қолдау</h2>
          <p className="text-lg leading-relaxed">
            Web-платформа барлық құрылғыларға бейімделген: смартфон, планшет немесе компьютер — кез келген жерде қолдануға болады.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">🎓 Білім мен мансапқа қолдау</h2>
          <p className="text-lg leading-relaxed">
            Бұл web-сайт тек жұмыс табу құралы емес, сонымен қатар кәсіби дамуға ықпал ететін алаң. 
            Мансаптық кеңестер мен жаңартулар қосылып отырады.
          </p>
        </section>

        <section className="mb-16 text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg"
          >
            ← Басты бетке оралу
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Features;
