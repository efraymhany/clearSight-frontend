import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../../assets/assets';

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function Fundus() {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-4 py-12 overflow-hidden dark:text-white dark:bg-gray-900">
      {/* أنيميشن خلفية - عناصر صغيرة تتحرك على الجوانب */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute left-4 top-10 w-4 h-4 bg-orange-300 rounded-full opacity-70 z-0"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute right-10 top-20 w-3 h-3 bg-orange-400 rounded-full opacity-50 z-0"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute left-16 bottom-16 w-2 h-2 bg-orange-200 rounded-full opacity-60 z-0"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute right-24 bottom-10 w-3 h-3 bg-orange-300 rounded-full opacity-60 z-0"
      />

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center gap-12 dark:text-white">
        {/* النص */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Fundus Photography</h2>
          <p className="text-gray-700 text-lg leading-relaxed dark:text-white">
            Uses an apparatus called a <strong>fundus camera</strong> to capture images of the back of the eye, or fundus.
            This offers an advantage over manual exams in that it affords physicians the ability to examine photo
            documentation of the eye outside of the exam room.
          </p>
        </div>

        {/* مكان الصورة */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-[350px] h-[350px] rounded-xl flex items-center justify-center overflow-hidden">
            <img
              className="object-contain max-w-full max-h-full"
              src={assets.FundusImage}
              alt="Fundus Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
