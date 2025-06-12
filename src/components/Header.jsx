
import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-20 relative overflow-hidden pt-22">
      {/* Background Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-12 h-12 text-white opacity-20 animate-float-rotate"
          style={{ top: '10%', left: '15%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm1-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
        <svg
          className="absolute w-16 h-16 text-white opacity-20 animate-float-rotate-delayed"
          style={{ top: '30%', right: '10%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
        <svg
          className="absolute w-14 h-14 text-white opacity-20 animate-float"
          style={{ bottom: '20%', left: '20%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
        <svg
          className="absolute w-10 h-10 text-white opacity-20 animate-float-delayed"
          style={{ bottom: '15%', right: '25%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 10h-3V3h-2v7h-3l4 4 4-4zm-9 8c-3.31 0-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8h-2c0 3.31-2.69 6-6 6z" />
        </svg>
      </div>

      <div className="md:w-1/2 flex flex-col items-start justify-center gap-9 py-4 m-auto md:py-[10vh] md:mb-[-30px] animate-fade-in-scale">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight animate-bounce">
          We Provide Eye Health Care Solutions
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light animate-slide-in-right">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p className="md:flex md:items-center sm:justify-center">
            Protect Your Health And Take Care Of Your Eyesight
          </p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-4 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 transition-all duration-300 group hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 hover:border hover:border-blue-300 hover:animate-pulse"
        >
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-glow bg-gradient-to-r from-blue-500 to-purple-500 pointer-events-none transition-all duration-300"></span>
          Create Account
          <img
            className="w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45 group-hover:animate-spin-slow"
            src={assets.arrow_icon}
            alt=""
          />
        </button>
      </div>

      <div className="md:w-1/2 relative animate-slide-in-left">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg animate-wave"
          src={assets.header_img}
          alt=""
        />
      </div>

      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes float-rotate {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
            100% {
              transform: translateY(0px) rotate(360deg);
            }
          }

          @keyframes float-rotate-delayed {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
            100% {
              transform: translateY(0px) rotate(360deg);
            }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes wave {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1.02);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }

          @keyframes spinSlow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes glow {
            0% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
            }
            50% {
              box-shadow: 0 0 10px 5px rgba(59, 130, 246, 0.5);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
            }
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

          .animate-bounce {
            animation: bounce 1.5s ease-in-out infinite;
          }

          .animate-slide-in-left {
            animation: slideInLeft 1s ease-in-out forwards;
          }

          .animate-slide-in-right {
            animation: slideInRight 1s ease-in-out forwards 0.3s;
          }

          .animate-wave {
            animation: wave 4s ease-in-out infinite;
          }

          .animate-spin-slow {
            animation: spinSlow 2s linear infinite;
          }

          .animate-glow {
            animation: glow 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Header;