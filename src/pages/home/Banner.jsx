// import React, { useRef } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { motion, useInView } from "framer-motion";

// const Banner = () => {
//   const navigate = useNavigate();
//   const wrapperRef = useRef(null);
//   const isInView = useInView(wrapperRef, {
//     once: true,
//     margin: "-100px 0px -100px 0px",
//   });

//   return (
//     <div
//       ref={wrapperRef}
//       className="relative overflow-hidden my-20 md:mx-10 rounded-lg"
//     >
//       {/* Background floating shapes */}
//       <div className="absolute w-20 h-20 bg-[#5f6FFF] opacity-20 rounded-full top-10 left-10 animate-float-slow z-0"></div>
//       <div className="absolute w-16 h-16 bg-[#f17732] opacity-20 rounded-full bottom-10 right-10 animate-float z-0"></div>
//       <div className="absolute w-32 h-32 bg-gradient-to-r from-[#5f6FFF] to-[#f17732] blur-3xl opacity-30 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
//         transition={{ duration: 0.7 }}
//         className="flex bg-primary px-6 py-3 sm:px-10 md:px-14 lg:px-12 rounded-lg relative z-10"
//       >
//         {/* Left Side */}
//         <motion.div
//           className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5"
//           initial={{ x: -60, opacity: 0 }}
//           animate={isInView ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
//             <p>Get Access</p>
//             <p className="mt-3">With Trusted Doctors</p>
//           </div>
//           <motion.button
//             onClick={() => {
//               navigate("/doctorsList");
//               scrollTo(0, 0);
//             }}
//             className="bg-white text-sm sm:text-base px-8 p-3 text-gray-600 rounded-full mt-6 hover:scale-105 transition-all"
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//             transition={{ delay: 0.5 }}
//           >
//             Explore more
//           </motion.button>
//         </motion.div>

//         {/* Right Side Image */}
//         <motion.div
//           className="hidden md:block md:w-1/2 lg:w-[370px] relative"
//           initial={{ opacity: 0, x: 60 }}
//           animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         >
//           {isInView && (
//             <motion.img
//             className="w-[1000px] absolute rounded-s-3xl top-16 right-[-20px] p-4 object-cover shadow-lg border-4 border-blue-300"
//               src={assets.banner}
//               alt="Doctor Appointment"
//               animate={{ y: [0, -12, 0] }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 ease: "easeInOut",
//               }}
//             />
//           )}
//         </motion.div>
//       </motion.div>

//       {/* Floating Animation Keyframes */}
//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-12px); }
//         }

//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-6px); }
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         .animate-float-slow {
//           animation: float-slow 10s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Banner;
///////////////////
import React, { useRef } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion,   useInView } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const isInView = useInView(wrapperRef, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden my-20 md:mx-10 rounded-lg"
    >
      {/* Main Content with background image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7 }}
        className="flex px-6 py-3 sm:px-10 md:px-14 lg:px-12 rounded-lg relative z-10"
        style={{
          backgroundImage: `url(${assets.serviceimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // لتعتيم الخلفية قليلاً
          backgroundBlendMode: "overlay", // يمزج اللون مع الصورة
        }}
      >
        {/* Left Side */}
        <motion.div
          className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5"
          initial={{ x: -60, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Get Access</p>
            <p className="mt-3">With Trusted Doctors</p>
          </div>
          <motion.button
            onClick={() => {
              navigate("/doctorsList");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base px-8 p-3 text-gray-600 rounded-full mt-6 hover:scale-105 transition-all"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            Explore more
          </motion.button>
        </motion.div>

        {/* Right Side Image (optional doctor image or visual) */}
        <motion.div
          className="hidden md:block md:w-1/2 lg:w-[370px] relative"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* يمكنك حذف الصورة أو الاحتفاظ بها حسب الحاجة */}
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
