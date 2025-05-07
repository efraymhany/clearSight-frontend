import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header1 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-20">
      {/* ========================left side =================== */}
      {/* <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center gap-10 py-4 md:py-[10vh] m-auto md:m-0">
        <p className="text-sm text-white font-semibold">
          We Provide Eye Health Care Solutions
        </p>
        <h2 className="text-xl md:text-3xl font-bold text-white">
          Protect Your Health And Take Care Of Your Eyesight
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-white text-sm font-medium">
          <img
            src={assets.group_profiles}
            alt="Eye Health"
            className="w-16 h-auto"
          />
          <p>Protect Your Health And Take Care Of Your Eyesight</p>
        </div>
        <a href="#speciality" className="mt-4 bg-orange-500 text-white text-sm px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 md:ml-0">
          Book Appointment
        </a>
      </div> */}

      <div className="md:w-1/2 flex flex-col items-start justify-center  gap-9 py-4 m-auto md:py-[10vh] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          {" "}
          We Provide Eye Health Care Solutions
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p className="md:flex md:items-center  sm:justify-center">
            Protect Your Health And Take Care Of Your Eyesight
          </p>
        </div>
        {/* <a href="#speciality" className=" flex items-center gap-4 bg-white px-8 py-3
         rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
          Sign Up <img className="w-3" src={assets.arrow_icon} alt="" />
        </a> */}
  
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-4 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 transition-all duration-300 group hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 hover:border hover:border-blue-300 hover:animate-pulse"
        >
          Create Account
          <img
            className="w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45"
            src={assets.arrow_icon}
            alt=""
          />
        </button>
      </div>
      {/* ========================right side =================== */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header1;
