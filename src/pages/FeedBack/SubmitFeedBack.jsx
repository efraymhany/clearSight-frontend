// import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "../../context/AppContext";

// const SubmitFeedback = () => {
//   const { token } = useContext(AppContext);
//   const [feedback, setFeedback] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     if (feedback.length > 0) {
//       setIsTyping(true);
//       const timer = setTimeout(() => setIsTyping(false), 500);
//       return () => clearTimeout(timer);
//     }
//   }, [feedback]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!feedback.trim()) {
//       setErrorMessage("Please share your thoughts with us!");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);
//     setErrorMessage("");

//     try {
//       const response = await fetch(
//         `https://clearsight.runasp.net/api/Feedback/SubmitFeedback
// `,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             accept: "text/plain",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             content: feedback.trim(),
//           }),
//         }
//       );

//       if (response.ok) {
//         setSubmitStatus("success");
//         setFeedback("");
//         setTimeout(() => setSubmitStatus(null), 6000);
//       } else {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       setSubmitStatus("error");
//       setErrorMessage(
//         error.message || "Oops! Something went wrong. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center px-4 py-20 relative">
//       <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
//         Share Your Story
//       </h1>

//       {submitStatus === "success" && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-3xl text-center shadow-2xl">
//             <div className="text-5xl mb-2">🎉</div>
//             <h3 className="text-2xl font-bold text-white">Amazing!</h3>
//             <p className="text-white">Thank you for sharing your feedback!</p>
//           </div>
//         </div>
//       )}

//       <div className="w-full max-w-xl">
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
//           {errorMessage && (
//             <div className="mb-4 p-3 bg-red-400/20 text-red-300 border border-red-400/40 rounded-xl">
//               ⚠️ {errorMessage}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <label className="block text-lg font-semibold text-gray-200 text-center">
//               What's on your mind?
//             </label>

//             <div className="relative">
//               <textarea
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//                 rows="5"
//                 className={`w-full px-4 py-3 bg-white/90 border-2 rounded-xl resize-none focus:outline-none text-black placeholder-gray-500 transition duration-300 ${
//                   isTyping
//                     ? "border-cyan-400 shadow-md shadow-cyan-400/30 scale-105"
//                     : "border-white/30 hover:border-white/50"
//                 }`}
//                 placeholder="Share your experience, thoughts, or suggestions..."
//                 maxLength="500"
//               />
//               <div className="absolute bottom-2 right-4 text-xs text-gray-600">
//                 {feedback.length}/500
//               </div>

//               {isTyping && (
//                 <div className="absolute -bottom-6 left-2 text-cyan-300 text-sm animate-pulse">
//                   Typing...
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting || !feedback.trim()}
//               className={`w-full py-3 rounded-xl font-bold text-lg transition transform ${
//                 isSubmitting || !feedback.trim()
//                   ? "bg-gray-500 cursor-not-allowed opacity-50"
//                   : "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:scale-105"
//               } text-white`}
//             >
//               {isSubmitting ? "Sending..." : "Send Feedback 🚀"}
//             </button>
//           </form>
//         </div>

//         <p className="mt-4 text-center text-gray-300 text-sm">
//           Your feedback helps us improve 💫
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SubmitFeedback;
//////////////
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SubmitFeedback = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (feedback.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setMessage("⚠️ Please enter your feedback.");
      return;
    }

    if (!token) {
      console.error("⚠️ No authentication token found");
      setMessage("⚠️ Authentication error - please log in again.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      console.log("🔄 Sending feedback request...");

      const response = await fetch(`${backendUrl}/Feedback/SubmitFeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: feedback.trim() }),
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;

        try {
          const errorData = await response.text();
          if (errorData) {
            console.error("⚠️ Server error details:", errorData);
            errorMessage += ` - Details: ${errorData}`;
          }
        } catch (parseError) {
          console.error("⚠️ Could not parse error response:", parseError);
        }

        console.error("⚠️", errorMessage);

        switch (response.status) {
          case 401:
            setMessage("⚠️ Authentication error - please log in again.");
            break;
          case 403:
            setMessage("⚠️ You do not have permission to perform this action.");
            break;
          case 404:
            setMessage("⚠️ The service is currently unavailable.");
            break;
          case 500:
            setMessage("⚠️ Server error - please try again later.");
            break;
          default:
            setMessage("⚠️ An unexpected error occurred - please try again later.");
        }
        return;
      }

      console.log("✅ Feedback submitted successfully");
      setMessage("✅ Feedback submitted successfully!");
      setFeedback("");
    } catch (error) {
      console.error("⚠️ Network/Connection error:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setMessage("⚠️ Connection error - please check your internet connection.");
      } else if (error.name === "AbortError") {
        setMessage("⚠️ Request was cancelled.");
      } else {
        setMessage("⚠️ Error connecting to the server.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
    className=" bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center px-12 py-6 relative rounded-3xl"
          // className="relative overflow-hidden my-20 md:mx-10 rounded-lg"
>
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
        Share Your Story
      </h1>

      {message && (
        <div className="mb-4 p-4 bg-white/10 text-white border border-white/30 rounded-xl text-center shadow-lg">
          {message}
        </div>
      )}

      <div className="w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-center text-gray-300 italic mb-2">
              ✨ Your feedback helps us grow, improve, and serve you better.
            </p>

            <label className="block text-lg font-semibold text-gray-200 text-center">
              What's on your mind?
            </label>

            <div className="relative">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
                className={`w-full px-4 py-3 bg-white/90 border-2 rounded-xl resize-none focus:outline-none text-black placeholder-gray-500 transition duration-300 ${
                  isTyping
                    ? "border-cyan-400 shadow-md shadow-cyan-400/30 scale-105"
                    : "border-white/30 hover:border-white/50"
                }`}
                placeholder="Share your experience, thoughts, or suggestions..."
                maxLength="500"
              />
              <div className="absolute bottom-2 right-4 text-xs text-gray-600">
                {feedback.length}/500
              </div>

              {isTyping && (
                <div className="absolute -bottom-6 left-2 text-cyan-300 text-sm animate-pulse">
                  Typing...
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className={`w-full py-3 rounded-xl font-bold text-lg transition transform ${
                isSubmitting || !feedback.trim()
                  ? "bg-gray-500 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:scale-105"
              } text-white`}
            >
              {isSubmitting ? "Sending..." : "Send Feedback 🚀"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-gray-300 text-sm">
          Your voice matters 💫
        </p>
      </div>
    </div>
  );
};

export default SubmitFeedback;
