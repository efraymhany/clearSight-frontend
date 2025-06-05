import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // تأكد أنك مستخدم react-router-dom

const cards = [
  {
    id: 1,
    title: 'Registration',
    description: 'Create your account to start using the AI disease prediction system.',
    path: '/register',
  },
  {
    id: 2,
    title: 'Upload a Photo',
    description: 'Upload a fundus camera image so our clearsight AI model can analyze and predict the disease.',
    path: '/services',
  },
  {
    id: 3,
    title: 'Get Prediction',
    description: 'Receive a prediction and insights about your condition instantly.',
    path: '/services',
  },
  {
    id: 4,
    title: 'Access to Doctor',
    description: 'Get in touch with a certified doctor for consultation and next steps.',
    path: '/doctorsList',
  },
];

const bgVariants = {
  animate: {
    x: [0, 100, -100, 0],
    y: [0, -50, 50, 0],
    transition: {
      repeat: Infinity,
      duration: 20,
      ease: 'linear',
    },
  },
};

export default function WorkingProcessPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden dark:bg-gray-900 px-4">
      {/* Background Animation */}
      <motion.div
        variants={bgVariants}
        animate="animate"
        className="absolute w-[500px] h-[500px] bg-orange-100 rounded-full opacity-30 z-0"
      />

      <h2 className="text-xl text-orange-400 font-semibold mt-12 z-10">Working Process</h2>
      <h1 className="text-4xl font-bold text-center mt-2 z-10 text-primary">How we work?</h1>

      <div className="mt-12 flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 z-10">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            className="group w-72 p-6 rounded-xl shadow-md transition duration-300 bg-white text-black hover:bg-orange-500 hover:text-white cursor-pointer"
          >
            <div className="text-5xl font-bold mb-4 text-orange-500 group-hover:text-white">
              {card.id.toString().padStart(2, '0')}
            </div>
            <h3 className="text-lg text-orange-500 font-semibold mb-2 group-hover:text-white">{card.title}</h3>
            <p className="text-sm mb-4">{card.description}</p>
            <Link
              to={card.path}
                              onClick={() => scrollTo(0, 0)}

              className="inline-block px-4 py-2 rounded-md text-sm font-medium bg-purple-100 text-purple-700 group-hover:bg-white group-hover:text-orange-500"
            >
              View More
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
