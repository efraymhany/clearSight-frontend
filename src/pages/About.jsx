import React from "react";
import { assets } from "../assets/assets";
// import aboutimg from '"../assets/aboutimg.png';
const About = () => {
  return (
    <div>
      {/* --------------- address --------------- */}
      <div className="text-center text-4xl pt-10 pb-8 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      {/* ---------------------------left side ---------------- */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className=" w-full  md:max-w-[360px]"
          src={assets.aboutimg2}
          // src={assets.about_image}

          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600">
          <p className="text-[18px]">
            ClearSight is a cutting-edge AI-powered application designed to
            provide instant insights through advanced image recognition
            technology. Our platform allows users to capture a photo and receive
            accurate, real-time analysis based on AI-driven processing. Whether
            it's identifying objects, extracting text, recognizing patterns, or
            interpreting visual data, ClearSight simplifies the way users
            interact with the world through images
          </p>
          <b className="text-gray-800 font-bold text-xl"> Our Vision</b>

          <p className="text-[18px]">
            At ClearSight, we envision a future where AI-powered vision enhances
            everyday life by making information more accessible, accurate, and
            interactive. Our mission is to bridge the gap between human
            perception and artificial intelligence, enabling users to gain
            knowledge effortlessly with just a single snapshot. We are committed
            to continuous innovation, ensuring our technology evolves to support
            a wide range of applications, from education and research to
            healthcare and security. By combining deep learning algorithms,
            real-time processing, and user-friendly design, ClearSight aims to
            redefine the way people understand and utilize visual information,
            making AI-driven insights an integral part of daily life.
          </p>
        </div>
      </div>
      <div className="text-2xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20 " >
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[18px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer"  >
          <b>ACCURACY :</b>
          <p>
            Advanced AI-powered image recognition ensures precise and reliable
            results, delivering meaningful insights instantly.
          </p>
        </div >
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[18px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer ">
          <b>SPEED :</b>
          <p>
            Real-time processing provides instant feedback, allowing users to
            receive answers in just seconds with minimal effort.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[18px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>ACCESSIBILITY :</b>
          <p>
            User-friendly design enables anyone to capture and analyze images
            effortlessly, making AI-powered insights accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
