import React, { useRef } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const Service = () => {
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
      {/* خلفية بصورة مع تعتيم */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7 }}
        className="flex px-6 py-3 sm:px-10 md:px-14 lg:px-12 rounded-lg relative z-10"
        style={{
          backgroundImage: `url(${assets.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* ================= left side ================= */}
        <motion.div
          className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5"
          initial={{ x: -60, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Welcome to ClearSight!</p>
            <p className="mt-2">Click below to get started</p>
          </div>
          <motion.p
            className="mt-3 text-lg text-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            and Get instant AI-powered insights
          </motion.p>
          <motion.button
            onClick={() => {
              navigate("/services");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base px-8 py-3 text-gray-700 font-medium rounded-full mt-6 shadow-lg hover:shadow-xl hover:text-amber-600 transition-all duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
          >
            🚀 Get Started
          </motion.button>
        </motion.div>

        {/* ================= right side image (optional) ================= */}
        <motion.div
          className="hidden md:block md:w-1/2 lg:w-[370px] relative"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* {isInView && (
            <motion.img
              className="w-[1000px] absolute rounded-full top-16 right-[-20px] p-4 object-cover shadow-lg border-4 border-white"
              src={assets.serviceimg}
              alt=""
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          )} */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Service;
