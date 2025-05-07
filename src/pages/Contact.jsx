import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <div className="text-center text-4xl pt-10 pb-8 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm ">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600 ">OUR OFFICE</p>
          <p className="text-gray-500 ">
            00000 Minia Station
            <br />
            Suite 000, Minia, EGY
          </p>
          <p className="text-gray-500 ">
            Tel: (000) 000-0000
            <br />
            Email: 000@minia.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT PRESCRIPTO
          </p>
          <p className="text-gray-500 ">
            Learn more about our teams and job openings.
          </p>
          <button
  onClick={() => Navigate("/editProfile")}
  className="relative overflow-hidden isolate flex items-center gap-4 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 transition-all duration-300 group hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-md hover:border hover:border-blue-300"
>
  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 group-hover:animate-pulse bg-white pointer-events-none transition-all duration-300"></span>
  Explore More
</button>

        </div>
      </div>
    </div>
  );
};

export default Contact;
