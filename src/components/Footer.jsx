
import React from "react";
import logo from "../assets/logo1.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white mt-32 border-t border-gray-300 dark:border-gray-700 pt-10 px-6 md:px-20">
      <div className="grid md:grid-cols-4 gap-10 mb-10">
        {/* ======= Logo and Description ======= */}
        <div>
          <div className="flex items-center mb-4">
            <NavLink to="/" className="flex items-center gap-2 animate-bounce transition-all duration-500">
                  <img src={logo} alt="logo" className="w-10 hover:scale-110 transition-transform duration-300" />
                  <h2 className="text-2xl font-bold text-black dark:text-white tracking-wide">ClearSight</h2>
                </NavLink>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-6">
            ClearSight is an AI-powered healthcare platform that analyzes
            user-uploaded images to provide quick and reliable medical insights.
            Simplifying healthcare through smart technology.
          </p>
        </div>

        {/* ======= Quick Links ======= */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><NavLink to="/" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Home</NavLink></li>
            <li><NavLink to="/doctors" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Doctors</NavLink></li>
            <li><NavLink to="/contact" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Contact</NavLink></li>
            <li><NavLink to="/services" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Scan</NavLink></li>
          </ul>
        </div>

        {/* ======= Diseases ======= */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Diseases</h3>
          <ul className="space-y-2">
            <li><NavLink to="/cataract" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Cataract</NavLink></li>
            <li><NavLink to="/diabeticRetinopathy" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Diabetic Retinopathy</NavLink></li>
            <li><NavLink to="/glaucomaPage" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Glaucoma</NavLink></li>
            {/* <li><NavLink to="/diseases/macular-degeneration" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Macular Degeneration</NavLink></li> */}
          </ul>
        </div>

        {/* ======= Pages ======= */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Pages</h3>
          <ul className="space-y-2">
            <li><NavLink to="/login" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Login</NavLink></li>
            <li><NavLink to="/adminLogin" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Admin Login</NavLink></li>
            <li><NavLink to="/about" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">About</NavLink></li>

            {/* <li><NavLink to="/profile" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Profile</NavLink></li> */}
            {/* <li><NavLink to="/dashboard" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Dashboard</NavLink></li> */}
          </ul>
        </div>
      </div>

      {/* ======= Footer Bottom ======= */}
      <hr className="border-gray-300 dark:border-gray-700 mb-6" />
      <div className="text-center text-lg font-medium py-4">
        © 2025 Design & Developed by{" "}
        <span className="text-red-600 font-bold">ClearSight Team</span>
      </div>
    </div>
  );
};

export default Footer;
