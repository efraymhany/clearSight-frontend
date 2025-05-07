// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./Nav.css";
// import logo from "../assets/logo1.png";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const { token, setToken  } = useContext(AppContext);

//   // Logout function
//   const logout = () => {
//     setToken(""); // Set token to empty string
//     localStorage.removeItem("token"); // Remove token from localStorage
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
//       <NavLink to="/" className="logo w-44 cursor-pointer">
//         <img src={logo} alt="logo" />
//         <h2 className="logo-text">ClearSight</h2>
//       </NavLink>

//       <ul className="hidden md:flex items-start gap-5 font-medium">
//         <NavLink to="/">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Home</li>
//         </NavLink>
//         <NavLink to="/doctors">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Doctors</li>
//         </NavLink>
//         <NavLink to="/about">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">About</li>
//         </NavLink>
//         <NavLink to="/contact">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Contact</li>
//         </NavLink>
//         <NavLink to="/services">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Services</li>
//         </NavLink>
//       </ul>

//       <div className="flex items-center gap-4">
//         {token ? (
//           // If user is logged in, show profile dropdown
//           <div className="flex items-center gap-2 cursor-pointer group relative">
//             <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
//             <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
//             <div className="absolute top-0 right-0 pt-14 text-gray-600 z-20 hidden group-hover:block">
//               <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
//                 <p onClick={() => navigate("/my-profile")} className="hover:text-primary cursor-pointer">My Profile</p>
//                 <p onClick={() => navigate("/my-appointments")} className="hover:text-primary cursor-pointer">My Appointments</p>
//                 <p onClick={logout} className="hover:text-primary cursor-pointer">Logout</p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           // If user is NOT logged in, show Create Account button
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
//           >
//             Create Account
//           </button>
//         )}

//         {/* Mobile menu icon */}
//         <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="Menu" />

//         {/* Mobile Menu */}
//         {showMenu && (
//           <div className="fixed top-0 right-0 bottom-0 w-full bg-white z-20">
//             <div className="flex items-center justify-between px-5 py-6">
//               <NavLink to="/" className="logo w-44 cursor-pointer" onClick={() => setShowMenu(false)}>
//                 <img src={logo} alt="logo" />
//                 <h2 className="logo-text">ClearSight</h2>
//               </NavLink>
//               <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
//             </div>
//             <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
//               <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to="/doctors">Doctors</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact</NavLink>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// =======================================

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "../assets/logo1.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <NavLink to="/" className="logo w-44 cursor-pointer">
        <img src={logo} alt="logo" />
        <h2 className="logo-text">ClearSight</h2>
      </NavLink>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Home</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Doctors</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 hover:text-primary transition-all duration-100 text-lg">About</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Contact</li>
        </NavLink>
        <NavLink to="/services">
          <li className="py-1 hover:text-primary transition-all duration-100 text-lg">Services</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img
              className="w-5"
              src={assets.dropdown_icon} // Replace with assets.three_dots_icon if available
              alt="Menu"
            />
            <div className="absolute top-0 right-0 pt-14 text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-primary cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-primary cursor-pointer">
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-primary cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
            {userData?.fullName && (
              <span className="text-gray-800 font-medium hidden md:block">
                {userData.fullName}
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="Menu" />

        {showMenu && (
          <div className="fixed top-0 right-0 bottom-0 w-full bg-white z-20">
            <div className="flex items-center justify-between px-5 py-6">
              <NavLink to="/" className="logo w-44 cursor-pointer" onClick={() => setShowMenu(false)}>
                <img src={logo} alt="logo" />
                <h2 className="logo-text">ClearSight</h2>
              </NavLink>
              <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/doctors">Doctors</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact</NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;