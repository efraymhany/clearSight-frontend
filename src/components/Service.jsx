// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const Service = () => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="flex bg-primary rounded-lg px-6 py-3 sm:px-10 md:px-14 lg:px-12
//      my-20  md:mx-10"
//     >
//       {/* =============================left side ============================= */}
//       <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
//         <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
//           <p>Book Appointment</p>
//           <p className="mt-3">With Trusted Doctors</p>
//         </div>
//         <button
//           onClick={() => {
//             navigate("/register");
//             scrollTo(0, 0);
//           }}
//           className="bg-white text-sm sm:text-base px-8 p-3 text-gray-600 rounded-full mt-6 hover:scale-105 transition-all "
//         >
//           Create Account
//         </button>
//       </div>
//       {/* ============================= right side ============================= */}
//       <div className="hidden  md:block md:w-1/2 lg:w-[370px] relative">
//         <img
//           className="w-full h-auto absolute rounded-[30px] right-0 max-w-3xl p-4 lg:p-6 xl:p-8 shadow-2xl object-cover"

//           src={assets.serviceimg}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// export default Service;

import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-amber-600	 rounded-lg px-3 py-3 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* ============================= left side ============================= */}
      <div className="flex-1 py-2 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Welcome to ClearSight!</p>
          <p className="top-2">Click below to get started</p>
          <p className="mt-1 text-lg"> and Get instant AI-powered insights</p>

        </div>
        <button
          onClick={() => {
            navigate("/services");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base px-8 p-3 text-gray-600 rounded-full mt-6 hover:scale-105 transition-all"
        >
  Explore More
  </button>
      </div>
      {/* ============================= right side ============================= */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-[1000px] absolute rounded-full top-16 right-[-20px] p-4 object-cover shadow-lg border-4 border-white"
          src={assets.serviceimg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Service;