import React from "react";
import { assets } from "../../assets/assets";

const Cataract = () => {
  return (
    <div className="min-h-screen pt-24 relative overflow-hidden bg-white text-black dark:bg-gray-900">
      {/* صورة الخلفية */}
      <div className="relative w-full mx-auto h-[80vh] rounded-3xl overflow-hidden mb-10">
        <img
          src={assets.Eye}
          alt="Eye Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white p-10 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg max-w-4xl mx-auto ">
            <h1 className="text-4xl font-bold mb-4">Cataract</h1>
            <p className="text-lg mb-2">
              <span className="text-red-400">More than half of people over age 60 are affected by cataracts</span>
            </p>
            <p className="text-lg">
              <span className="text-yellow-400">and is the leading cause of blindness worldwide</span>
            </p>
          </div>
        </div>
      </div>

      {/* المقالة */}
      <div className="px-4 md:px-20 py-6 max-w-5xl mx-auto text-xl leading-relaxed text-black">
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
          <p className="mb-6">
            A cataract is a clouding of the eye’s natural lens, which lies behind the iris and the pupil. Cataracts are the most common cause of vision loss in people over age 40 and are the principal cause of blindness in the world. Cataracts can develop in one or both eyes, and they often progress slowly, making early detection crucial. Fortunately, they are treatable through surgery, which involves replacing the clouded lens with a clear artificial one.
          </p>
        </div>
      </div>

      {/* الفيديو */}
    <div className="w-full px-4 md:px-20 py-14">
  <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
    <div className="relative" style={{ paddingBottom: "75%", height: 0 }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl"
        src="https://www.youtube.com/embed/BXEfJNdXlYM"
        title="Cataract - Arabic"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</div>


      {/* فاصل */}
      <div className="border-t border-gray-300 my-12 mx-8 md:mx-20"></div>

      {/* مراحل تطور مرض المياه البيضاء */}
      <div className="min-h-screen bg-gray-800 text-white px-6 md:px-12 py-12 rounded-lg max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Stages of Cataract Development</h1>
        <p className="mb-8 text-lg">
          Cataracts develop gradually and are typically categorized based on their stage of progression and the part of the lens they affect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Early Stage */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Early Stage</h2>
            <p className="text-md">
              Mild cloudiness in the lens that may cause slight blurring or glare. Patients may notice increased sensitivity to light and difficulty seeing at night.
            </p>
          </div>

          {/* Immature Cataract */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">|||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Immature Cataract</h2>
            <p className="text-md">
              Clouding becomes more apparent, with more noticeable vision changes. Reading becomes harder, and colors may seem faded. Surgery may be considered.
            </p>
          </div>

          {/* Mature Cataract */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">||||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Mature Cataract</h2>
            <p className="text-md">
              The lens appears milky or opaque. Vision is significantly reduced. This is often when most people seek surgical treatment.
            </p>
          </div>

          {/* Hypermature Cataract */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">||||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Hypermature Cataract</h2>
            <p className="text-md">
              The lens becomes hardened and can leak proteins, potentially leading to inflammation and increased pressure in the eye (a risk for glaucoma).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cataract;
