import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden my-20 md:mx-10 rounded-lg">
      {/* Background floating shapes */}
      <div className="absolute w-20 h-20 bg-[#5f6FFF] opacity-20 rounded-full top-10 left-10 animate-float-slow z-0"></div>
      <div className="absolute w-16 h-16 bg-[#f17732] opacity-20 rounded-full bottom-10 right-10 animate-float z-0"></div>
      <div className="absolute w-32 h-32 bg-gradient-to-r from-[#5f6FFF] to-[#f17732] blur-3xl opacity-30 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex bg-primary px-6 py-3 sm:px-10 md:px-14 lg:px-12 rounded-lg relative z-10"
      >
        {/* Left Side */}
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Get Access</p>
            <p className="mt-3">With Trusted Doctors</p>
          </div>
          <button
            onClick={() => {
              navigate("/doctorsList");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base px-8 p-3 text-gray-600 rounded-full mt-6 hover:scale-105 transition-all"
          >
            Explore more
          </button>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden md:block md:w-1/2 lg:w-[370px] relative"
        >
          <img
            className="w-full absolute right-0 max-w-md p-4 animate-float"
            src={assets.appointment_img}
            alt="Doctor Appointment"
          />
        </motion.div>
      </motion.div>

      {/* Floating Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
