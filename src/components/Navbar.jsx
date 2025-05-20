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

// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./Nav.css";
// import logo from "../assets/logo1.png";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const { token, setToken, userData } = useContext(AppContext);

//   const logout = () => {
//     setToken("");
//     localStorage.removeItem("token");
//     navigate("/login");
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
//         <NavLink to="/doctorsList">
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
//           <div className="flex items-center gap-2 cursor-pointer group relative">
//             <img
//               className="w-8 rounded-full"
//               src={assets.profile_pic}
//               alt="Profile"
//             />
//             <img
//               className="w-5"
//               src={assets.dropdown_icon} // Replace with assets.three_dots_icon if available
//               alt="Menu"
//             />
//             <div className="absolute top-0 right-0 pt-14 text-gray-600 z-20 hidden group-hover:block">
//               <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
//                 <p onClick={() => navigate("/doctorProfile")} className="hover:text-primary cursor-pointer">
//                   My Profile
//                 </p>
//                 <p onClick={() => navigate("/my-appointments")} className="hover:text-primary cursor-pointer">
//                   My Appointments
//                 </p>
//                 <p onClick={logout} className="hover:text-primary cursor-pointer">
//                   Logout
//                 </p>
//               </div>
//             </div>
//             {userData?.fullName && (
//               <span className="text-gray-800 font-medium hidden md:block">
//                 {userData.fullName}
//               </span>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
//           >
//             Create Account
//           </button>
//         )}

//         <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="Menu" />

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
/////////////////////////////////
// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./Nav.css";
// import logo from "../assets/logo1.png";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const { token, userData, role, logout } = useContext(AppContext);

//   return (
//     <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
//       <NavLink to="/" className="logo w-44 cursor-pointer">
//         <img src={logo} alt="logo" />
//         <h2 className="logo-text">ClearSight</h2>
//       </NavLink>

//       <ul className="hidden md:flex items-start gap-5 font-medium">
//         <NavLink to="/">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">
//             Home
//           </li>
//         </NavLink>
//         <NavLink to={role === "Doctor" ? "/patientsList" : "/doctorsList"}>
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">
//             {role === "Doctor" ? "Patients" : "Doctors"}
//           </li>
//         </NavLink>

//         <NavLink to="/about">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">
//             About
//           </li>
//         </NavLink>
//         <NavLink to="/contact">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">
//             Contact
//           </li>
//         </NavLink>
//         <NavLink to="/services">
//           <li className="py-1 hover:text-primary transition-all duration-100 text-lg">
//             Services
//           </li>
//         </NavLink>
//       </ul>

//       <div className="flex items-center gap-4">
//         {token ? (
//           <div className="flex items-center gap-2 cursor-pointer group relative">
//             <img
//               className="w-8 rounded-full"
//               src={assets.profile_pic}
//               alt="Profile"
//             />
//             <img className="w-5" src={assets.dropdown_icon} alt="Menu" />
//             <div className="absolute top-0 right-0 pt-14 text-gray-600 z-20 hidden group-hover:block">
//               <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
//                 {role === "Doctor" ? (
//                   <>
//                     <p
//                       onClick={() => navigate("/doctorProfile")}
//                       className="hover:text-primary cursor-pointer"
//                     >
//                       My Profile
//                     </p>
//                     <p
//                       onClick={() => navigate("/my-appointments")}
//                       className="hover:text-primary cursor-pointer"
//                     >
//                       Appointments
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <p
//                       onClick={() => navigate("/patientProfile")}
//                       className="hover:text-primary cursor-pointer"
//                     >
//                       My Profile
//                     </p>
//                     <p
//                       onClick={() => navigate("/my-appointments")}
//                       className="hover:text-primary cursor-pointer"
//                     >
//                       My Appointments
//                     </p>
//                   </>
//                 )}
//                 <p
//                   onClick={logout}
//                   className="hover:text-primary cursor-pointer"
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//             {userData?.fullName && (
//               <span className="text-gray-800 font-medium hidden md:block">
//                 {userData.fullName}
//               </span>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
//           >
//             Create Account
//           </button>
//         )}

//         <img
//           onClick={() => setShowMenu(true)}
//           className="w-6 md:hidden"
//           src={assets.menu_icon}
//           alt="Menu"
//         />

//         {showMenu && (
//           <div className="fixed top-0 right-0 bottom-0 w-full bg-white z-20">
//             <div className="flex items-center justify-between px-5 py-6">
//               <NavLink
//                 to="/"
//                 className="logo w-44 cursor-pointer"
//                 onClick={() => setShowMenu(false)}
//               >
//                 <img src={logo} alt="logo" />
//                 <h2 className="logo-text">ClearSight</h2>
//               </NavLink>
//               <img
//                 className="w-7"
//                 onClick={() => setShowMenu(false)}
//                 src={assets.cross_icon}
//                 alt="Close"
//               />
//             </div>
//             <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
//               <NavLink onClick={() => setShowMenu(false)} to="/">
//                 Home
//               </NavLink>
//               <NavLink
//   onClick={() => setShowMenu(false)}
//   to={role === "Doctor" ? "/patientsList" : "/doctorsList"}
// >
//   {role === "Doctor" ? "Patients" : "Doctors"}
// </NavLink>

//               <NavLink onClick={() => setShowMenu(false)} to="/about">
//                 About
//               </NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to="/contact">
//                 Contact
//               </NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to="/services">
//                 Services
//               </NavLink>

//               {token && (
//                 <>
//                   {role === "Doctor" ? (
//                     <>
//                       <NavLink
//                         onClick={() => setShowMenu(false)}
//                         to="/doctorProfile"
//                       >
//                         My Profile
//                       </NavLink>
//                       <NavLink
//                         onClick={() => setShowMenu(false)}
//                         to="/my-appointments"
//                       >
//                         Appointments
//                       </NavLink>
//                     </>
//                   ) : (
//                     <>
//                       <NavLink
//                         onClick={() => setShowMenu(false)}
//                         to="/patientProfile"
//                       >
//                         My Profile
//                       </NavLink>
//                       <NavLink
//                         onClick={() => setShowMenu(false)}
//                         to="/my-appointments"
//                       >
//                         My Appointments
//                       </NavLink>
//                     </>
//                   )}
//                   <p
//                     onClick={() => {
//                       logout();
//                       setShowMenu(false);
//                     }}
//                     className="text-red-500 cursor-pointer"
//                   >
//                     Logout
//                   </p>
//                 </>
//               )}

//               {!token && (
//                 <NavLink onClick={() => setShowMenu(false)} to="/login">
//                   Login / Signup
//                 </NavLink>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
////////////////////////////////////////

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "../assets/logo1.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, userData, role, logout } = useContext(AppContext);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: role === "Doctor" ? "/patientsList" : "/doctorsList", label: role === "Doctor" ? "Patients" : "Doctors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/services", label: "Services" },
  ];

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4 md:px-10 bg-white shadow-sm">
      <NavLink to="/" className="flex items-center gap-2 animate-bounce transition-all duration-500">
        <img src={logo} alt="logo" className="w-10 hover:scale-110 transition-transform duration-300" />
        <h2 className="text-2xl font-bold text-primary tracking-wide">ClearSight</h2>
      </NavLink>

      <ul className="hidden md:flex items-center gap-6 font-medium">
        {navLinks.map((link, index) => (
          <NavLink key={index} to={link.to}>
            <li className="relative py-1 text-lg hover:text-primary transition-all duration-300 group cursor-pointer">
              <span className="group-hover:underline group-hover:decoration-primary group-hover:decoration-2">
                {link.label}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full duration-300"></span>
            </li>
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full hover:scale-110 transition-transform duration-300" src={assets.profile_pic} alt="Profile" />
            <img className="w-5" src={assets.dropdown_icon} alt="Menu" />
            <div className="absolute top-0 right-0 pt-14 text-gray-600 z-20 hidden group-hover:block animate-fade-in">
              <div className="min-w-48 bg-stone-100 rounded-lg shadow-md flex flex-col gap-4 p-4 transition-all duration-300">
                {role === "Doctor" ? (
                  <>
                    <p onClick={() => navigate("/doctorProfile")} className="hover:text-primary cursor-pointer">My Profile</p>
                    <p onClick={() => navigate("/my-appointments")} className="hover:text-primary cursor-pointer">Appointments</p>
                  </>
                ) : (
                  <>
                    <p onClick={() => navigate("/patientProfile")} className="hover:text-primary cursor-pointer">My Profile</p>
                    <p onClick={() => navigate("/my-appointments")} className="hover:text-primary cursor-pointer">My Appointments</p>
                  </>
                )}
                <p onClick={logout} className="hover:text-red-500 cursor-pointer">Logout</p>
              </div>
            </div>
            {userData?.fullName && (
              <span className="text-gray-800 font-medium hidden md:block">{userData.fullName}</span>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block hover:scale-105 transition-all duration-300 shadow-md"
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer hover:scale-110 transition-transform duration-300"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {showMenu && (
        <div className="fixed top-0 right-0 bottom-0 w-full bg-white z-50 animate-slide-in px-5 py-6">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2" onClick={() => setShowMenu(false)}>
              <img src={logo} alt="logo" className="w-10" />
              <h2 className="text-2xl font-bold text-primary">ClearSight</h2>
            </NavLink>
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          <ul className="flex flex-col items-start gap-4 mt-8 text-lg font-medium">
            {navLinks.map((link, i) => (
              <NavLink key={i} to={link.to} onClick={() => setShowMenu(false)}>
                {link.label}
              </NavLink>
            ))}

            {token && (
              <>
                {role === "Doctor" ? (
                  <>
                    <NavLink to="/doctorProfile" onClick={() => setShowMenu(false)}>My Profile</NavLink>
                    <NavLink to="/my-appointments" onClick={() => setShowMenu(false)}>Appointments</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/patientProfile" onClick={() => setShowMenu(false)}>My Profile</NavLink>
                    <NavLink to="/my-appointments" onClick={() => setShowMenu(false)}>My Appointments</NavLink>
                  </>
                )}
                <p onClick={() => { logout(); setShowMenu(false); }} className="text-red-500 cursor-pointer">Logout</p>
              </>
            )}

            {!token && (
              <NavLink to="/login" onClick={() => setShowMenu(false)}>Login / Signup</NavLink>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
