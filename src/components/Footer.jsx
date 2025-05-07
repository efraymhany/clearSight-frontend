import React from "react";
import logo from "../assets/logo1.png";
import { NavLink} from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div
        className="flex flex-col sm:grid grid-cols-[3fr_2fr] gap-14
       my-10 mt-40 text-sm

        "
      >
        {/* =============================left side ============================= */}
        <div>
          <div className="logo w-44 cursor-pointer">
            <img src={logo} alt="logo" className="mb-5 w-40" />{" "}
            <h2 className="logo-text mb-5">ClearSight</h2>
          </div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6 text-lg font-medium ">
            ClearSight is an AI-powered healthcare platform that analyzes
            user-uploaded images to provide quick and reliable medical insights.
            Simplifying healthcare through smart technology.
          </p>
        </div>
        {/* =============================center side ============================= */}
        <div>
          <p className="text-xl font-medium mb-5"> Quick Links</p>
          {/* <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>contact us</li>
            <li>Privacy olicy</li>
          </ul> */}
          <ul className="flex flex-col  text-gray-600 ">
            <NavLink to="/">
              <li onClick={()=> scrollTo(0,0)} className="py-1 hover:text-primary transition-all duration-100 text-lg font-medium">
                Home
              </li>
            </NavLink>
            <NavLink to="/doctors">
              <li onClick={()=> scrollTo(0,0)} className="py-1 hover:text-primary transition-all duration-100 text-lg font-medium">
                Doctors
              </li>
            </NavLink>
            <NavLink to="/about">
              <li onClick={()=> scrollTo(0,0)} className="py-1 hover:text-primary transition-all duration-100 text-lg font-medium">
                About
              </li>
            </NavLink>
            <NavLink to="/contact">
              <li onClick={()=> scrollTo(0,0)} className="py-1 hover:text-primary transition-all duration-100 text-lg font-medium">
                Contact
              </li>
            </NavLink>
          </ul>
        </div>
        {/* =============================rihgt side ============================= */}
        <div>
          <p></p>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      {/* =============================bottom section ============================= */}
      <hr className="border-black" />
      <div className="flex flex-row items-center justify-center space-x-2">
  <p className="py-5 text-center font-medium text-lg">
    Copyright © 2025 Design & Developed by
  </p>
  <p className="py-5 pt-6 text-center font-bold text-lg text-red-700">
    ClearSight team
  </p>
</div>
    </div>
  );
};
export default Footer;
