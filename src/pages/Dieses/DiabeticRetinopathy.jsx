import React from "react";
import { assets } from "../../assets/assets";

const DiabeticRetinopathy = () => {
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
            <h1 className="text-4xl font-bold mb-4">Diabetic Retinopathy</h1>
            <p className="text-lg mb-2">
              <span className="text-red-400">Affects one in three people living with diabetes</span>
            </p>
            <p className="text-lg">
              <span className="text-yellow-400">and is the leading cause of vision loss in working-age adults</span>
            </p>
          </div>
        </div>
      </div>

      {/* المقالة */}
      <div className="px-4 md:px-20 py-6 max-w-5xl mx-auto text-xl leading-relaxed text-black">
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
          <p className="mb-6">
            Diabetic retinopathy (DR) is one of the most prevalent eye afflictions in existence today, with between <span className="text-red-600">12,000 and 24,000</span> new cases reported yearly in the United States alone. This condition is unique to those who suffer from <span className="text-blue-600">diabetes mellitus</span>, commonly referred to as diabetes, and is the leading cause of blindness in the diabetic population worldwide. With the global diabetic population estimated at <span className="text-purple-600">371 million</span>, the impact of diabetic retinopathy is profound, garnering substantial attention from the medical community at large. Fortunately, DR is both routinely detectable and highly treatable, particularly when addressed in its earlier stages. In addition, significant technological advancements have been made recently to further address the issue.
          </p>
        </div>
      </div>

      {/* الفيديو */}
      <div className="w-full px-4 md:px-20 py-14">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
          <div className="relative" style={{ paddingBottom: "75%", height: 0 }}>
      <iframe
  className="absolute top-0 left-0 w-full h-full rounded-xl"
  src="https://www.youtube.com/embed/X17Q_RPUlYo"
  title="What is Glaucoma? Symptoms, Causes, Treatment & Prevention"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

          </div>
        </div>
      </div>

      {/* فاصل */}
      <div className="border-t border-gray-300 my-12 mx-8 md:mx-20"></div>

      {/* فقرة ثالثة - Stages of Diabetic Retinopathy */}
      <div className="min-h-screen bg-gray-800 text-white px-6 md:px-12 py-12 rounded-lg max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Stages of Diabetic Retinopathy</h1>
        <p className="mb-8 text-lg">
          Diabetic Retinopathy is a progressive disease—meaning that the signs and symptoms develop and become more severe over time. This progression is categorized into four distinct stages which are identified by the nature and severity of symptoms found to be present.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Mild NPDR */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Mild NPDR</h2>
            <p className="text-md">
              The first stage of retinopathy (mild non-proliferative DR) is characterized by small, relatively sparse clusters of balloon-like swelling in retinal blood vessels. These microaneurysms, as they are called, have the potential to leak fluid into the retina. While the physical manifestations at this stage may be negligible, the implications for future degeneration can be quite severe, so catching and treating DR at this stage is the best for one's future health.
            </p>
          </div>

          {/* Moderate NPDR */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">|||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Moderate NPDR</h2>
            <p className="text-md">
              During the second stage of DR (moderate non-proliferative DR), blood vessels begin to swell and distort the retina (which can cause changes in vision). In some cases, blood vessels begin to lose their ability to transport blood. Not only does this cause noticeable characteristic changes to the appearance of the retina itself, it may also contribute to the development of Diabetic Macular Edema (DME)—a harmful buildup of fluid in the macular area of the retina.
            </p>
          </div>

          {/* Severe NPDR */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">||||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Severe NPDR</h2>
            <p className="text-md">
              This stage is characterized by a large number of blockages which deprive the retina of vital blood flow. The defining feature of this stage is the secretion of growth factors which signal the retina to grow new blood vessels to supplement those which have become invalid.
            </p>
          </div>

          {/* Proliferative DR */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-2">
              <span className="text-orange-500 text-2xl">||||</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">Proliferative DR</h2>
            <p className="text-md">
              The last, and most debilitating stage of DR, is characterized by advanced proliferation of new blood vessels along the inner surface of the retina and into the vitreous gel which fills the eye. Most troubling is the fragile nature of these new vessels, which often causes them to leak and bleed into the eye. As this occurs, scar-tissue develops which may contract, and cause the retina to actually detach from the underlying tissue, leading to severe and sometimes permanent vision loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiabeticRetinopathy;
