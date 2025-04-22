import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import bgimage from "../assets/bg-image-main.jpg";
import companyLogo from "../assets/facebook-1-logo-svgrepo-com.svg";
import companyLogo1 from "../assets/linkedin-logo-svgrepo-com.svg";
import companyLogo2 from "../assets/slack-logo-svgrepo-com.svg";
import companyLogo6 from "../assets/microsoft_logo.svg";
import companyLogo3 from "../assets/instagram-logo-svgrepo-com.svg";
import companyLogo7 from "../assets/twitter_icon.svg";
import companyLogo8 from "../assets/google-1-1-logo-svgrepo-com.svg";
import { motion } from "framer-motion";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const [titleInput, setTitleInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const onSearch = () => {
    setSearchFilter({
      title: titleInput,
      location: locationInput,
    });
    setIsSearched(true);
  };

  return (
    <motion.div
      style={{ willChange: "transform, opacity" }}
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
    >
      <div className="container 2xl:px-20 mx-auto my-10">
        <div className="bg-gradient-to-r from-[#004AADC2] to-[#20C0D8C2] text-white py-[130px] text-center mx-3 rounded-xl relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5 z-0"
            style={{ backgroundImage: `url(${bgimage})` }}
          ></div>

          <div className="relative z-5">
            <h2 className="text-[25px] lg:text-[38px] md:text-[28px] font-bold sm:mb-4 font-primary leading-[32px] lg:leading-[42px]">
              Ең үздік қадамыңызды жасау үшін,<br />
              <span className="font-primary text-secondary">
                армандағы жұмысыңызды
              </span>
              <br />
              таңдаңыз<br />
            </h2>
          </div>

          <p className="mb-8 max-w-xl mx-auto text-sm lg:text-[12px] font-light px-5 leading-tight p-2">
            Сіздің келесі үлкен мансаптық қадамыңыз дәл осы жерден басталады - ең жақсы жұмысты зерттеңіз
            Мүмкіндіктер және болашағыңызға алғашқы қадам жасаңыз
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg text-gray-600 py-[15px] px-[12px] pl-4 lg:pl-5 max-w-5xl mx-5 sm:mx-auto sm:p-3 sm:m-2 gap-4 sm:gap-0">
            <div className="flex items-center flex-1 w-full">
              <img className="h-4 sm:h-7" src={assets.search_icon} alt="Search Icon" />
              <input
                type="text"
                placeholder="Жұмыс іздеу..."
                className="max-sm:text-xs p-2 sm:pl-5 rounded outline-none w-full"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
            </div>
            <div className="flex items-center flex-1 w-full">
              <img className="h-4 sm:h-7" src={assets.location_icon} alt="Location Icon" />
              <input
                type="text"
                placeholder="Орналасқан жері..."
                className="max-sm:text-xs p-2 sm:pl-5 rounded outline-none w-full"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
            </div>
            <div className="relative group">
              <button
                onClick={onSearch}
                className="relative inline-block p-px font-semibold leading-6 shadow-2xl rounded-xl shadow-zinc-500 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-5 block px-6 py-3 sm:px-12 sm:py-4 rounded-xl bg-primary hover:bg-slate-600 duration-500">
                  <div className="relative z-5 flex items-center space-x-2">
                    <span className="text-white transition-all duration-500 ease-in-out font-primary">
                      Іздеу
                    </span>
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="border border-[#CFCFCF] shadow-md mx-2 mt-5 p-6 rounded-md flex flex-col sm:flex-row sm:items-center">
          <div className="w-full sm:w-auto sm:mr-4 flex justify-center sm:justify-start">
            <p className="font-medium text-center sm:text-left sm:p-4">Сенім білдірген </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-20 flex-grow">
            <img className="h-[70px] w-[70px] grayscale hover:grayscale-0 transition-all duration-300" src={companyLogo} alt="Logo 8" />
            <img className="h-[70px] w-[70px] grayscale hover:grayscale-0 transition-all duration-300" src={companyLogo1} alt="Logo 8" />
            <img className="h-[70px] w-[70px] grayscale hover:grayscale-0 transition-all duration-300" src={companyLogo8} alt="Logo 4" />
            <img className="h-[70px] w-[70px] grayscale hover:grayscale-0 transition-all duration-300" src={companyLogo6} alt="Logo 6" />
            <img className="h-[70px] w-[70px] grayscale hover:grayscale-0 transition-all duration-300" src={companyLogo7} alt="Logo 7" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
