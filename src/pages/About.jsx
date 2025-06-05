import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="relative overflow-hidden bg-white px-4 md:px-16 py-10 pt-24 mt-1  dark:bg-gray-900 ">

      {/* Floating Animated Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute w-12 h-12 text-primary opacity-10 animate-float-rotate" style={{ top: '10%', left: '15%' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
        <svg className="absolute w-16 h-16 text-primary opacity-10 animate-float-rotate-delayed" style={{ top: '30%', right: '10%' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
        <svg className="absolute w-14 h-14 text-primary opacity-10 animate-float" style={{ bottom: '20%', left: '20%' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
        <svg className="absolute w-10 h-10 text-primary opacity-10 animate-float-delayed" style={{ bottom: '15%', right: '25%' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 10h-3V3h-2v7h-3l4 4 4-4z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center text-4xl pt-10 pb-8 text-gray-500 animate-fade-in-scale dark:text-white">
          <p>
            ABOUT <span className="text-gray-700 font-medium dark:text-white">US</span>
          </p>
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-12 animate-slide-in-left">
          <img className="w-full md:max-w-[360px] rounded-md" src={assets.aboutimg2} alt="About Us" />
          <div className="flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600">
            <p className="text-[18px] dark:text-white">
              ClearSight is a cutting-edge AI-powered application designed to provide instant insights...
            </p>
            <b className="text-gray-800 font-bold text-xl dark:text-white">Our Vision</b>
            <p className="text-[18px] dark:text-white">
              At ClearSight, we envision a future where AI-powered vision enhances everyday life...
            </p>
          </div>
        </div>

        <div className="text-2xl my-4 animate-fade-in-scale">
          <p>
            WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row mb-20 gap-4 animate-slide-in-right">
          {[
            { title: "ACCURACY", desc: "Advanced AI-powered image recognition ensures precise..." },
            { title: "SPEED", desc: "Real-time processing provides instant feedback..." },
            { title: "ACCESSIBILITY", desc: "User-friendly design enables anyone to capture..." },
          ].map((item, index) => (
            <div key={index} className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[18px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer bg-white rounded-lg shadow-md">
              <b>{item.title} :</b>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles or Move to Global CSS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes float-rotate {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
          }

          @keyframes float-rotate-delayed {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
          }

          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 6s ease-in-out infinite 2s;
          }

          .animate-float-rotate {
            animation: float-rotate 8s ease-in-out infinite;
          }

          .animate-float-rotate-delayed {
            animation: float-rotate 8s ease-in-out infinite 3s;
          }

          .animate-fade-in-scale {
            animation: fadeInScale 1s ease-in-out forwards;
          }

          .animate-slide-in-left {
            animation: slideInLeft 1s ease-in-out forwards;
          }

          .animate-slide-in-right {
            animation: slideInRight 1s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default About;
