import React from "react";
import { assets } from "../../assets/assets";

const GlaucomaPage = () => {
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
        <div className="absolute inset-0 flex items-center justify-center z-10  ">
          <div className="text-center text-white p-10 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg max-w-4xl mx-auto ">
            <h1 className="text-4xl font-bold mb-4">Glaucoma</h1>
            <p className="text-lg mb-2">
              <span className="text-red-400">ONE OF THE LEADING CAUSES OF LATE-ONSET BLINDNESS</span>
            </p>
            <p className="text-lg">
              <span className="text-yellow-400">IMPACTING NEARLY 60 MILLION PEOPLE WORLDWIDE</span>
            </p>
          </div>
        </div>
      </div>

      {/* المقالة */}
      <div className="px-4 md:px-20 py-6 max-w-5xl mx-auto text-xl leading-relaxed text-black">
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
          <p className="mb-6">
            As one of the leading causes for late-onset blindness, Glaucoma impacts more than{" "}
            <span className="text-red-600">3 Million Americans</span> as well as{" "}
            <span className="text-yellow-600">60 Million other people worldwide</span>. The Glaucoma
            Research Foundation states that approximately{" "}
            <span className="text-green-600">10%</span> of the 3 Million Americans who suffer from
            Glaucoma have been left completely blind by the degenerative disease.
          </p>
          <p className="mb-6">
            According to the World Health Organization (WHO), it is the{" "}
            <span className="text-blue-600">second leading cause of blindness worldwide</span> behind
            uncorrected refractive errors and cataracts, and is the primary cause of blindness for
            people over the age of <span className="text-purple-600">60</span>. Studies have also
            revealed that if you are African or of Hispanic heritage, you may be{" "}
            <span className="text-orange-600">6 to 8 times more likely</span> to develop blindness
            from Glaucoma than your white counterparts.
          </p>
          <p>
            Although there is no known cure for Glaucoma, blindness or vision loss can be prevented
            if the disease is caught in the early stages of development. Below, we will discuss how
            the disease progresses, the symptoms of Glaucoma, the detection measures, and the
            treatment methods.
          </p>
        </div>
      </div>

      {/* الفيديو */}
      <div className="w-full px-4 md:px-20 py-14">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
          <div className="relative" style={{ paddingBottom: "75%", height: 0 }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/_VtFBnexqm0"
              title="Glaucoma Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* فاصل */}
      <div className="border-t border-gray-300 my-12 mx-8 md:mx-20"></div>

      {/* قسم What is Glaucoma */}
      <div className="min-h-screen px-6 md:px-12 pb-20 bg-gray-900 text-white rounded-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold  mb-[-4]">What is Glaucoma?</h1>
          <div className="flex items-center mb-4">
            <span className="w-4 h-0.5 bg-yellow-500 mr-2"></span>
            <span className="text-yellow-500">—</span>
          </div>
          <p className="mb-4 text-lg">
            Glaucoma is a disease that can take one of a few forms, all of which, if left unchecked,
            can result in severe damage to the eye's optic nerve. This optic nerve—which contains more
            than 1,000,000 delicate nerve fibers—bridges the light-sensitive tissue of the retina to
            the brain. If the nerves are damaged, your eye's ability to capture and process visual
            information deteriorates until it reaches a point of no return.
          </p>
          <p className="mb-4 text-lg">
            Glaucoma can occur in either just one eye or in both. It primarily affects your field of
            vision by disrupting peripheral vision, thus constricting your field of view. There are
            two major forms of Glaucoma as highlighted below.
          </p>

          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
              <div className="flex items-center mb-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm mr-2">
                  ○
                </span>
                <h2 className="text-xl font-semibold">Primary Open Angle Glaucoma</h2>
              </div>
              <p className="text-md">
                This is the most common type of Glaucoma caused by a gradual buildup of fluid in your
                eye as a result of improper drainage. Over time pressure builds, creating a strain on
                your optic nerve, which can result in permanent damage. It is painless and does not
                impact vision in the early stages. Symptoms, if they do appear, can include:
              </p>
              <ul className="list-disc list-inside mt-2 text-md">
                <li>Gradual loss of peripheral vision</li>
                <li>Increased eye pressure</li>
                <li>Increased tunnel vision</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center mb-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm mr-2">
                  ○
                </span>
                <h2 className="text-xl font-semibold">Closed-Angle Glaucoma</h2>
              </div>
              <p className="text-md">
                If your iris is too close to the drainage angle in the eye, it can wind up suddenly
                impeding drainage. When this happens, pressure increases rapidly, resulting in an
                attack. In such cases, it is critical that you take it like an emergency and
                immediately see an ophthalmologist. If preventative measures are not taken, blindness
                is a likely result. Symptoms include:
              </p>
              <ul className="list-disc list-inside mt-2 text-md">
                <li>Acute eye pain</li>
                <li>Redness</li>
                <li>Headache and Nausea</li>
                <li>Rainbow halos around lights</li>
                <li>Sudden blurry vision</li>
                <li>Vomiting</li>
              </ul>
            </div>
          </div>

          <p className="text-md mt-4">
            Naturally, everyone experiences different levels of eye pressure; there are certain
            pressures that may be normal for some eyes that could result in damage to other eyes. Add
            this to the fact that Glaucoma may take a while to manifest symptoms—if they appear at
            all—and it is easy to see why it is so essential that you periodically submit yourself to
            a comprehensive dilated eye exam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlaucomaPage;
