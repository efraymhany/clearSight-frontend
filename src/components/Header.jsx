import React from 'react'
import headerimg from "../assets/header11.png";
const Header = () => {
  return (
    <div>
      <section className="bg-gray-100 py-12 px-6 md:px-6 flex flex-col md:flex-row items-center">
  {/* Left Side - Text Content */}
  <div className="md:w-1/2 text-center md:text-left">
    <h4 className="text-sm text-blue-600 font-semibold">
      We Provide Eye Health Care Solutions
    </h4>
    <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mt-2 leading-tight">
      Protect Your Health <br /> And Take Care Of <br /> Your Eyesight
    </h2>
    <button className="mt-6 bg-orange-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition">
       Signup 
    </button>
  </div>

  {/* Right Side - Image Content */}
  <div className=" md:flex md:w-1/2 justify-center sm:m-4  relative">
    <img
      src={headerimg}// Replace with actual image path
      alt="Elderly woman having an eye exam"
      className="w-96 h-auto rounded-lg shadow-lg"
    />
    {/* <div className="absolute top-5 left-5 w-10 h-10 bg-blue-600 opacity-90 rounded-lg"></div> */}
  </div>
</section>

    </div>
  )
}

export default Header
