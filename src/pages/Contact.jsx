import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-12 h-12 text-gray-300 opacity-20 animate-float"
          style={{ top: '10%', left: '15%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm1-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
        <svg
          className="absolute w-16 h-16 text-gray-400 opacity-20 animate-float-delayed"
          style={{ top: '30%', right: '10%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
        <svg
          className="absolute w-14 h-14 text-gray-500 opacity-20 animate-float"
          style={{ bottom: '20%', left: '20%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
        <svg
          className="absolute w-10 h-10 text-gray-400 opacity-20 animate-float-delayed"
          style={{ bottom: '15%', right: '25%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 10h-3V3h-2v7h-3l4 4 4-4zm-9 8c-3.31 0-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8h-2c0 3.31-2.69 6-6 6z" />
        </svg>
      </div>

      <div className="animate-fade-in">
        <div className="text-center text-4xl pt-10 pb-8 text-gray-500">
          <p className="animate-bounce">
            CONTACT <span className="text-gray-700 font-medium">US</span>
          </p>
        </div>
        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
          <img
            className="w-full md:max-w-[360px] rounded-lg shadow-lg transform transition duration-500 hover:shadow-xl hover:scale-105 animate-slide-in-left"
            src={assets.contact_image}
            alt="Contact"
          />
          <div className="flex flex-col justify-center items-start gap-6 animate-slide-in-right">
            <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
            <p className="text-gray-500 hover:text-gray-700 transition duration-300">
              00000 Minia Station
              <br />
              Suite 000, Minia, EGY
            </p>
            <p className="text-gray-500 hover:text-gray-700 transition duration-300">
              Tel: (000) 000-0000
              <br />
              Email: 000@minia.com
            </p>
            <p className="font-semibold text-lg text-gray-600">
              CAREERS AT PRESCRIPTO
            </p>
            <p className="text-gray-500 hover:text-gray-700 transition duration-300">
              Learn more about our teams and job openings.
            </p>
            <button
              onClick={() => navigate("/patientHistoryPage")}
              className="relative overflow-hidden isolate flex items-center gap-4 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 transition-all duration-300 group hover:scale-105 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 hover:text-white hover:shadow-lg hover:border hover:border-gray-300"
            >
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-pulse bg-gradient-to-r from-gray-400 to-gray-600 pointer-events-none transition-all duration-300"></span>
              Explore More
            </button>
          </div>
        </div>
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

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
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

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 6s ease-in-out infinite 2s;
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-in-out forwards;
          }

          .animate-bounce {
            animation: bounce 1s ease-in-out;
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

export default Contact;