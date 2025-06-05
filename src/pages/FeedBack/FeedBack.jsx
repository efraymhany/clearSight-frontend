
// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { assets } from "../../assets/assets";

// const MAX_COUNT = 10;
// const SLIDE_DURATION = 300;

// const RecentFeedbacks = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const timeoutRef = useRef(null);

//   // Fetch all feedbacks at once
//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetch(`https://clearsight.runasp.net/api/Feedback/GetRecentFeedBacks?count=${MAX_COUNT}`, {
//       headers: { accept: "text/plain" },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch feedbacks");
//         return res.json();
//       })
//       .then((data) => {
//         if (data.success && data.data.length > 0) {
//           setFeedbacks(data.data);
//           setCurrentIndex(0);
//         } else {
//           setError("No feedbacks found");
//           setFeedbacks([]);
//           setCurrentIndex(0);
//         }
//       })
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   const handlePrev = useCallback(() => {
//     if (isAnimating || feedbacks.length === 0) return;
    
//     setIsAnimating(true);
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
//       setIsAnimating(false);
//     }, SLIDE_DURATION);
//   }, [isAnimating, feedbacks.length]);

//   const handleNext = useCallback(() => {
//     if (isAnimating || feedbacks.length === 0) return;
    
//     setIsAnimating(true);
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
//       setIsAnimating(false);
//     }, SLIDE_DURATION);
//   }, [isAnimating, feedbacks.length]);

//   // Auto-advance functionality (optional)
//   useEffect(() => {
//     if (feedbacks.length <= 1) return;

//     const autoAdvance = setInterval(() => {
//       if (!isAnimating) {
//         handleNext();
//       }
//     }, 8000); // Auto advance every 8 seconds (increased from 5)

//     return () => clearInterval(autoAdvance);
//   }, [handleNext, isAnimating, feedbacks.length]);

//   if (loading) return <div className="text-center my-10 text-white">Loading...</div>;
//   if (error) return <div className="text-center my-10 text-red-500">{error}</div>;
//   if (feedbacks.length === 0) return <div className="text-center my-10 text-white">No feedbacks available.</div>;

//   const fb = feedbacks[currentIndex];

//   return (
//     <div className="relative overflow-hidden my-20 md:mx-10 rounded-lg text-black">
//       {/* Background Circles */}
//       <div className="absolute w-20 h-20 bg-[#5f6FFF] opacity-20 rounded-full top-10 left-10 animate-float-slow z-0" />
//       <div className="absolute w-16 h-16 bg-[#f17732] opacity-20 rounded-full bottom-10 right-10 animate-float z-0" />
//       <div className="absolute w-32 h-32 bg-gradient-to-r from-[#5f6FFF] to-[#f17732] blur-3xl opacity-30 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
      
//       <h2 className="text-center text-orange-500 text-2xl sm:text-3xl font-bold mb-6 z-10 relative">
//         See What Are The Patients and Doctors <br /> Saying About us
//       </h2>

//       {/* Feedback Container */}
//       <div className="flex justify-center items-center relative z-10 px-4 sm:px-10 text-black">
//         <div className="relative bg-slate-300 border-2 borde  -orange-500 border-dashed rounded-xl shadow-lg p-6 max-w-xl w-full">
          
//           {/* Feedback Content with Smooth Transition */}
//           <div 
//             className={`transition-all duration-300 ease-in-out ${
//               isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
//             }`}
//           >
//             {/* User Info */}
//             <div className="flex items-center gap-4 mb-4">
//               <img
//                 src={fb.userImage || "https://via.placeholder.com/64"}
//                 alt={fb.userName}
//                 className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover"
//               />
//               <div>
//                 <p className="text-black font-semibold">{fb.userName}</p>
//                 <p className="text-gray-600 text-sm">{fb.userRole}</p>
//                 <p className="text-gray-500 text-xs">
//                   {new Date(fb.submittedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             {/* Feedback Content */}
//             <p className="text-black mb-4 leading-relaxed">{fb.content}</p>
//           </div>

//           {/* Navigation Section */}
//           <div className="flex justify-between items-center pt-4 border-t border-gray-300">
//             <button
//               onClick={handlePrev}
//               disabled={isAnimating}
//               className="flex items-center gap-2  bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <span>⬅</span>
//               <span className="hidden sm:inline">Previous</span>
//             </button>
            
//             {/* Feedback Counter */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">
//                 {currentIndex + 1} of {feedbacks.length}
//               </span>
//               {/* Dot Indicators */}
//               <div className="flex gap-1 ml-2">
//                 {feedbacks.slice(0, Math.min(5, feedbacks.length)).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       if (!isAnimating) {
//                         setIsAnimating(true);
//                         setTimeout(() => {
//                           setCurrentIndex(index);
//                           setIsAnimating(false);
//                         }, SLIDE_DURATION);
//                       }
//                     }}
//                     className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                       index === currentIndex ? ' bg-orange-500' : 'bg-gray-400'
//                     }`}
//                   />
//                 ))}
//                 {feedbacks.length > 5 && <span className="text-gray-400">...</span>}
//               </div>
//             </div>

//             <button
//               onClick={handleNext}
//               disabled={isAnimating}
//               className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <span className="hidden sm:inline">Next</span>
//               <span>➡</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Optional: Feedback Background Image */}
//       <div className="absolute hidden md:block md:w-1/2 lg:w-[370px] top-0 right-0 z-0">
//         <img
//           src={assets.feedback}
//           alt="Feedback Background"
//           className="w-full h-full object-contain  animate-float"
//         />
//       </div>

//       {/* Animations */}
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

// export default RecentFeedbacks;
// //////////////
import React, { useEffect, useState, useCallback, useRef } from "react";
// import { assets } from "../../assets/assets";

const MAX_COUNT = 10;
const SLIDE_DURATION = 300;

const RecentFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeoutRef = useRef(null);

  // Fetch all feedbacks at once
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://clearsight.runasp.net/api/Feedback/GetRecentFeedBacks?count=${MAX_COUNT}`, {
      headers: { accept: "text/plain" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch feedbacks");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setFeedbacks(data.data);
          setCurrentIndex(0);
        } else {
          setError("No feedbacks found");
          setFeedbacks([]);
          setCurrentIndex(0);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handlePrev = useCallback(() => {
    if (isAnimating || feedbacks.length === 0) return;
    
    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
      setIsAnimating(false);
    }, SLIDE_DURATION);
  }, [isAnimating, feedbacks.length]);

  const handleNext = useCallback(() => {
    if (isAnimating || feedbacks.length === 0) return;
    
    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, SLIDE_DURATION);
  }, [isAnimating, feedbacks.length]);

  // Auto-advance functionality
  useEffect(() => {
    if (feedbacks.length <= 1) return;

    const autoAdvance = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 8000);

    return () => clearInterval(autoAdvance);
  }, [handleNext, isAnimating, feedbacks.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-20 px-4 dark:bg-gray-900 dark:text-white">
        <div className="relative  dark:bg-gray-900 dark:text-white">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin dark:bg-gray-900 dark:text-white "></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animate-reverse  dark:bg-gray-900 dark:text-white"></div>
        </div>
        <span className="ml-4 text-white text-lg font-medium  dark:bg-gray-900 dark:text-white">Loading testimonials...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center my-20 px-4 dark:bg-gray-900 dark:text-white">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center  dark:bg-gray-900 dark:text-white">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4  dark:bg-gray-900 dark:text-white">
            <span className="text-red-500 text-xl">⚠️</span>
          </div>
          <h3 className="text-red-800 font-semibold mb-2  dark:bg-gray-900 dark:text-white">Unable to Load Testimonials</h3>
          <p className="text-red-600 text-sm  dark:bg-gray-900 dark:text-white">{error}</p>
        </div>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20 px-4 dark:bg-gray-900 dark:text-white">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md w-full text-center dark:bg-gray-900 dark:text-white">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-900 dark:text-white">
            <span className="text-gray-400 text-2xl dark:bg-gray-900 dark:text-white">💬</span>
          </div>
          <h3 className="text-gray-800 font-semibold mb-2">No Testimonials Yet</h3>
          <p className="text-gray-600 text-sm">Be the first to share your experience!</p>
        </div>
      </div>
    );
  }

  const fb = feedbacks[currentIndex];

  return (
    <section className="relative overflow-hidden my-20 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-60 z-0 dark:bg-gray-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 opacity-10 rounded-full top-10 left-10 animate-float-slow blur-xl z-0 dark:bg-gray-900 dark:text-white" />
      <div className="absolute w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-500 opacity-15 rounded-full bottom-20 right-20 animate-float blur-lg z-0 dark:bg-gray-900 dark:text-white" />
      <div className="absolute w-40 h-40 bg-gradient-to-r from-indigo-300 to-blue-400 opacity-5 rounded-full top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse z-0 dark:bg-gray-900 dark:text-white" />
      
      {/* Floating Particles */}
      <div className="absolute w-2 h-2 bg-blue-300 opacity-40 rounded-full top-1/4 left-1/4 animate-bounce-slow z-0  dark:bg-gray-900 dark:text-white" />
      <div className="absolute w-3 h-3 bg-orange-300 opacity-30 rounded-full top-3/4 right-1/3 animate-bounce-delayed z-0  dark:bg-gray-900 dark:text-white" />
      <div className="absolute w-1 h-1 bg-purple-400 opacity-50 rounded-full bottom-1/3 left-2/3 animate-twinkle z-0  dark:bg-gray-900 dark:text-white" />

      <div className="relative z-10 max-w-7xl mx-auto dark:bg-gray-900 dark:text-white">
        {/* Enhanced Header */}
        <div className="text-center mb-16 dark:bg-gray-900 dark:text-white">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-blue-100 px-4 py-2 rounded-full mb-6 dark:bg-gray-900 dark:text-white">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse dark:bg-gray-900 dark:text-white"></span>
            <span className="text-orange-600 text-sm font-medium tracking-wide uppercase ">Testimonials</span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse  dark:bg-gray-900 dark:text-white"></span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight  dark:bg-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent dark:bg-gray-900 dark:text-white">
              What Our Community
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent  dark:bg-gray-900">
              Says About Us
            </span>
          </h2>
          
          <p className="text-gray-900text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Real stories from patients and doctors who trust our platform
          </p>
        </div>

        {/* Main Feedback Container */}
        <div className="flex justif -center items-center relative  dark:bg-gray-900 dark:text-white">
          {/* Enhanced Feedback Card */}
          <div className="relative w-full max-w-4xl mx-auto  dark:bg-gray-900 dark:text-white">
            <div className="bg-white/100 backdrop-blur-sm border border-white/45 rounded-3xl shadow-2xl  p-8 sm:p-12 relative overflow-hidden bg-slate-300">
              
              {/* Card Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30 rounded-3xl z-0 " />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/50 to-transparent rounded-3xl z-0 " />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-3xl z-0 " />
              
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-6xl text-orange-200 font-serif z-0 ">"</div>
              <div className="absolute bottom-6 right-6 text-6xl text-blue-200 font-serif transform rotate-180 z-0 ">"</div>

              {/* Content with Enhanced Animation */}
              <div 
                className={`relative z-10 transition-all duration-500 ease-out ${
                  isAnimating 
                    ? 'opacity-0 transform translate-y-8 scale-95' 
                    : 'opacity-100 transform translate-y-0 scale-100'
                }`}
              >
                {/* User Info Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 ">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 "></div>
                    <img
                      src={fb.userImage || "https://via.placeholder.com/80"}
                      alt={fb.userName}
                      className="relative w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg transform hover:scale-105 transition-transform duration-300 "
                    />
                    
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-400 border-3 border-white rounded-full flex items-center justify-center ">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-left flex-1 ">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 ">
                      {fb.userName}
                    </h3>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        {fb.userRole}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20 ">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{new Date(fb.submittedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 ">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className="w-5 h-5 text-yellow-400 drop-shadow-sm " 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Feedback Content */}
                <div className="relative ">
                  <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-medium italic relative z-10 text-center sm:text-left ">
                    {fb.content}
                  </p>
                </div>
              </div>

              {/* Enhanced Navigation */}
              <div className="relative z-10 flex justify-between items-center pt-8 mt-8 border-t border-gray-200/50 ">
                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="group flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700  hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <svg className="w-5 h-5  dark:bg-gray-900 dark:text-whitetransform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Previous</span>
                </button>
                
                {/* Enhanced Counter & Indicators */}
                <div className="flex flex-col items-center gap-3 ">
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full ">
                    {currentIndex + 1} of {feedbacks.length}
                  </span>
                  
                  {/* Progress Bar */}
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden ">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full transition-all duration-500 ease-out "
                      style={{ width: `${((currentIndex + 1) / feedbacks.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Dot Indicators */}
                  <div className="flex gap-2 ">
                    {feedbacks.slice(0, Math.min(5, feedbacks.length)).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isAnimating && index !== currentIndex) {
                            setIsAnimating(true);
                            timeoutRef.current = setTimeout(() => {
                              setCurrentIndex(index);
                              setIsAnimating(false);
                            }, SLIDE_DURATION);
                          }
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300  transform hover:scale-125 ${
                          index === currentIndex 
                            ? 'bg-gradient-to-r from-orange-400 to-pink-400 shadow-lg' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                    {feedbacks.length > 5 && (
                      <span className="text-gray-400 text-sm flex items-center ">...</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="group flex items-center gap-3 bg-gradient-to-r  from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <span className="font-medium">Next</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Background Image */}
        {/* <div className="absolute hidden lg:block lg:w-1/3 xl:w-[400px] top-0 right-0 z-0 opacity-60">
          <img
            src={assets.feedback}
            alt="Feedback Background"
            className="w-full h-full object-contain animate-float filter drop-shadow-2xl"
          />
        </div> */}
      </div>

      {/* Enhanced Animations & Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-bounce-delayed {
          animation: bounce-delayed 5s ease-in-out infinite 1s;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-reverse {
          animation: reverse 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default RecentFeedbacks;