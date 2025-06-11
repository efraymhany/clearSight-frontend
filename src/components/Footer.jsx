// import React from "react";
// import logo from "../assets/logo1.png";
// import { NavLink } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div className="md:mx-10 text-black dark:text-white ">
//       <div className="flex flex-col sm:grid grid-cols-[3fr_2fr] gap-14 my-10 mt-40 text-sm">
//         {/* =============================left side ============================= */}
//         <div>
//           <div className="logo w-44 cursor-pointer">
//             <img src={logo} alt="logo" className="mb-5 w-40" />
//             <h2 className="logo-text mb-5 text-2xl font-bold">ClearSight</h2>
//           </div>
//           <p className="w-full md:w-2/3 text-gray-600 dark:text-gray-300 leading-6 text-lg font-medium">
//             ClearSight is an AI-powered healthcare platform that analyzes
//             user-uploaded images to provide quick and reliable medical insights.
//             Simplifying healthcare through smart technology.
//           </p>
//         </div>

//         {/* =============================center side ============================= */}
//         <div>
//           <p className="text-xl font-medium mb-5">Quick Links</p>
//           <ul className="flex flex-col text-gray-600 dark:text-gray-300">
//             <NavLink to="/">
//               <li
//                 onClick={() => scrollTo(0, 0)}
//   className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200
//                          transition duration-300 ease-in-out
//                         hover:text-primary dark:group-hover:text-primary
//                          hover:scale-105
//                          hover:shadow-transparent
//                          font-semibold"              >
//                 Home
//               </li>
//             </NavLink>
//             <NavLink to="/doctors">
//               <li
//                 onClick={() => scrollTo(0, 0)}
//   className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200
//                          transition duration-300 ease-in-out
//                         hover:text-primary dark:group-hover:text-primary
//                          hover:scale-105
//                          hover:shadow-transparent
//                          font-semibold"              >
//                 Doctors
//               </li>
//             </NavLink>
//             <NavLink to="/about">
//               <li
//                 onClick={() => scrollTo(0, 0)}
//   className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200
//                          transition duration-300 ease-in-out
//                         hover:text-primary dark:group-hover:text-primary
//                          hover:scale-105
//                          hover:shadow-transparent
//                          font-semibold"              >
//                 About
//               </li>
//             </NavLink>
//             <NavLink to="/contact">
//               <li
//                 onClick={() => scrollTo(0, 0)}
//   className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200
//                          transition duration-300 ease-in-out
//                         hover:text-primary dark:group-hover:text-primary
//                          hover:scale-105
//                          hover:shadow-transparent
//                          font-semibold"              >
//                 Contact
//               </li>
//             </NavLink>
//               <NavLink to="/services">
//               <li
//                 onClick={() => scrollTo(0, 0)}
//   className="py-1 text-lg cursor-pointer text-gray-800 dark:text-gray-200
//                          transition duration-300 ease-in-out
//                         hover:text-primary dark:group-hover:text-primary
//                          hover:scale-105
//                          hover:shadow-transparent
//                          font-semibold"              >
//                 secrvices
//               </li>
//             </NavLink>
//           </ul>
//         </div>

//         {/* =============================right side ============================= */}
//         <div>
//           {/* يمكنك هنا إضافة روابط أو معلومات إضافية لاحقًا */}
//         </div>
//       </div>

//       {/* =============================bottom section ============================= */}
//       <hr className="border-gray-400 dark:border-gray-600" />
//       <div className="flex flex-row items-center justify-center space-x-2">
//         <p className="py-5 text-center font-medium text-lg">
//           Copyright © 2025 Design & Developed by
//         </p>
//         <p className="py-5 pt-6 text-center font-bold text-lg text-red-700">
//           ClearSight team
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
////////////////////
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
            <li><NavLink to="/about" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">About</NavLink></li>
            <li><NavLink to="/contact" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Contact</NavLink></li>
            <li><NavLink to="/services" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Services</NavLink></li>
          </ul>
        </div>

        {/* ======= Diseases ======= */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Diseases</h3>
          <ul className="space-y-2">
            <li><NavLink to="/diseases/cataract" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Cataract</NavLink></li>
            <li><NavLink to="/diseases/diabetic-retinopathy" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Diabetic Retinopathy</NavLink></li>
            <li><NavLink to="/diseases/glaucoma" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Glaucoma</NavLink></li>
            {/* <li><NavLink to="/diseases/macular-degeneration" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Macular Degeneration</NavLink></li> */}
          </ul>
        </div>

        {/* ======= Pages ======= */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Pages</h3>
          <ul className="space-y-2">
            <li><NavLink to="/login" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Login</NavLink></li>
            <li><NavLink to="/register" onClick={() => scrollTo(0, 0)} className="hover:text-primary text-lg font-medium">Register</NavLink></li>
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
