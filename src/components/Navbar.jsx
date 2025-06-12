import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
// import "./Nav.css";
import logo from "../assets/logo1.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDiseasesDropdown, setShowDiseasesDropdown] = useState(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState(false);
  const { token, userData, role, logout, theme, toggleTheme } =
    useContext(AppContext);

  const navLinks = [
    { to: "/", label: "Home" },
    {
      to: role === "Doctor" ? "/patientsList" : "/doctorsList",
      label: role === "Doctor" ? "Patients" : "Doctors",
    },
    { to: "/contact", label: "Contact" },
    {
      to: role === "Doctor" ? "/uploadScanImage" : "/services",
      label: "Scan",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between text-sm py-4 border-b border-b-gray-400 px-4 md:px-10 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-500">
      <NavLink
        to="/"
        className="flex items-center gap-2 animate-bounce transition-all duration-500"
      >
        <img
          src={logo}
          alt="logo"
          className="w-10 hover:scale-110 transition-transform duration-300"
        />
        <h2 className="text-2xl font-bold text-black dark:text-white tracking-wide">
          ClearSight
        </h2>
      </NavLink>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        {navLinks.map((link, index) => (
          <NavLink key={index} to={link.to} className="relative group">
            <li
              onClick={() => scrollTo(0, 0)}
              className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200 transition duration-300 ease-in-out group-hover:text-primary dark:group-hover:text-primary group-hover:scale-105 font-semibold"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </li>
          </NavLink>
        ))}

        {/* Diseases dropdown */}
        <div className="relative group">
          <li className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200 transition duration-300 ease-in-out group-hover:text-primary dark:group-hover:text-primary group-hover:scale-105 font-semibold">
            Diseases
          </li>
          <div className="absolute top-full left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg z-20 w-56">
            <ul className="flex flex-col text-gray-800 dark:text-gray-200">
              <NavLink
                to="/diabeticRetinopathy"
                onClick={() => scrollTo(0, 0)}
                className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
              >
                Diabetic Retinopathy
              </NavLink>
              <NavLink
                to="/cataract"
                onClick={() => scrollTo(0, 0)}
                className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
              >
                Cataract
              </NavLink>
              <NavLink
                to="/glaucomaPage"
                onClick={() => scrollTo(0, 0)}
                className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
              >
                Glaucoma
              </NavLink>
            </ul>
          </div>
        </div>

        {/* Pages dropdown */}
        <div className="relative group">
          <li className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200 transition duration-300 ease-in-out group-hover:text-primary dark:group-hover:text-primary group-hover:scale-105 font-semibold">
            Pages
          </li>
          <div className="absolute top-full left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg z-20 w-56">
            <ul className="flex flex-col text-gray-800 dark:text-gray-200">
              <NavLink
                to="/about"
                onClick={() => scrollTo(0, 0)}
                className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
              >
                About
              </NavLink>{" "}
              <NavLink
                to="/login"
                onClick={() => scrollTo(0, 0)}
                className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
              >
                Login / Register
              </NavLink>
              <NavLink
                to="/adminLogin"
                onClick={() => scrollTo(0, 0)}
                className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
              >
                Admin loign
              </NavLink>
            </ul>
          </div>
        </div>
      </ul>

      {/* Right icons + theme + user + mobile icon */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border bg-white dark:bg-gray-800 text-yellow-500 dark:text-yellow-300"
        >
          {theme === "light" ? "🌞" : "🌙"}
        </button>

        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={
                // localStorage.getItem("profileImage") ||
                userData?.profilePic || assets.avatar
              }
              alt="Profile"
            />

            <img className="w-5" src={assets.dropdown_icon} alt="Menu" />
            <div className="absolute top-0 right-0 pt-14 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 dark:bg-gray-800 rounded-lg p-4">
                {role === "Doctor" ? (
                  <>
                    <p
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate("/doctorProfile");
                      }}
                      className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/docPatientHistory")}
                      className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                    >
                      {/* History */}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate("/patientProfile");
                      }}
                      className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/patientHistory")}
                      className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                    >
                      History
                    </p>
                  </>
                )}
                <p
                  onClick={() => {
                    logout();
                    navigate("/"); //  بعد تسجيل الخروج، يروح لصفحة الهوم
                  }}
                  className="cursor-pointer text-red-500 mt-2"
                >
                  Logout
                </p>
              </div>
            </div>
            {userData?.fullName && (
              <span className="text-gray-800 dark:text-gray-200 font-medium hidden md:block">
                {userData.fullName}
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full hidden md:block"
          >
            Create Account
          </button>
        )}

        <svg
          onClick={() => setShowMenu(true)}
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 md:hidden cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke={theme === "dark" ? "white" : "black"}
          strokeWidth={2}
        >
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 right-0 bottom-0 w-full bg-white dark:bg-gray-900 z-50 px-5 py-6">
          <div className="flex justify-between">
            <NavLink
              to="/"
              onClick={() => setShowMenu(false)}
              className="flex items-center gap-2"
            >
              <img src={logo} alt="logo" className="w-10" />
              <h2 className="text-2xl font-bold text-black dark:text-white">
                ClearSight
              </h2>
            </NavLink>
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          <ul className="flex flex-col gap-4 mt-8 text-lg font-medium">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.to}
                onClick={() => setShowMenu(false)}
                className="text-gray-800 dark:text-gray-200 hover:text-primary"
              >
                {link.label}
              </NavLink>
            ))}

            {/*  Mobile Diseases dropdown */}
            <div>
              <p
                className="font-semibold cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() => setShowDiseasesDropdown(!showDiseasesDropdown)}
              >
                Diseases {showDiseasesDropdown ? "▲" : "▼"}
              </p>
              {showDiseasesDropdown && (
                <div className="flex flex-col gap-1 pl-4">
                  <NavLink
                    to="/diabeticRetinopathy"
                    onClick={() => setShowMenu(false)}
                    className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                  >
                    Diabetic Retinopathy
                  </NavLink>
                  <NavLink
                    to="/cataract"
                    onClick={() => setShowMenu(false)}
                    className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                  >
                    Cataract
                  </NavLink>
                  <NavLink
                    to="/glaucomaPage"
                    onClick={() => setShowMenu(false)}
                    className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                  >
                    Glaucoma
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Pages dropdown */}
            <div>
              <p
                className="font-semibold cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() => setShowPagesDropdown(!showPagesDropdown)}
              >
                Pages {showPagesDropdown ? "▲" : "▼"}
              </p>
              {showPagesDropdown && (
                <div className="flex flex-col gap-1 pl-4">
                  <NavLink
                    to="/about"
                    onClick={() => setShowMenu(false)}
                    className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/adminLogin"
                    onClick={() => setShowMenu(false)}
                    className="px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
                  >
                    Admin Panel
                  </NavLink>
                </div>
              )}
            </div>

            {/* Profile & Logout */}
            {token && (
              <>
                {role === "Doctor" ? (
                  <>
                    <NavLink
                      to="/doctorProfile"
                      onClick={() => setShowMenu(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/docPatientHistory"
                      onClick={() => setShowMenu(false)}
                    >
                      History
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/patientProfile"
                      onClick={() => setShowMenu(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/patientHistory"
                      onClick={() => setShowMenu(false)}
                    >
                      History
                    </NavLink>
                  </>
                )}
                <p
                  onClick={() => {
                    logout();
                    setShowMenu(false); // يقفل المينيو
                    navigate("/"); // يرجع للهوم
                  }}
                  className="text-red-500 cursor-pointer"
                >
                  Logout
                </p>
              </>
            )}
            {!token && (
              <NavLink
                to="/login"
                onClick={() => setShowMenu(false)}
                className="hover:text-primary"
              >
                Login / Signup
              </NavLink>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
