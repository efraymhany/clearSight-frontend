// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';

// const Scan = () => {
//   const { token, backendUrl } = useContext(AppContext);
//   const [file, setFile] = useState(null);
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file) {
//       setError("📎 Please select a file to upload");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("ScanImage", file);

//     try {
//       const res = await axios.post(`${backendUrl}/Patients/Scan`, formData, {
//         headers: {
//           "Accept": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });
//       setResponseData(res.data.data);
//       setError(null);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "🚨 An unexpected error occurred. Please try again later."
//       );
//       setResponseData(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 flex items-center justify-center py-10 px-4 relative overflow-hidden pt-24 mt-1 dark:bg-gray-900">
//       {/* Background Floating Icons */}
//       <div className="absolute inset-0 pointer-events-none dark:bg-gray-900">
//         <svg
//           className="absolute w-12 h-12 text-blue-300 opacity-20 animate-float"
//           style={{ top: '10%', left: '15%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm1-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
//         </svg>
//         <svg
//           className="absolute w-16 h-16 text-blue-400 opacity-20 animate-float-delayed"
//           style={{ top: '30%', right: '10%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
//         </svg>
//         <svg
//           className="absolute w-14 h-14 text-blue-200 opacity-20 animate-float"
//           style={{ bottom: '20%', left: '20%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
//         </svg>
//         <svg
//           className="absolute w-10 h-10 text-blue-300 opacity-20 animate-float-delayed"
//           style={{ bottom: '15%', right: '25%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M21 10h-3V3h-2v7h-3l4 4 4-4zm-9 8c-3.31 0-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8h-2c0 3.31-2.69 6-6 6z" />
//         </svg>
//       </div>

//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-blue-200 animate-fade-in">
//         <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700 tracking-tight animate-bounce">
//           📤 Upload 🔍 Scan Image
//         </h1>
//         <form onSubmit={handleSubmit} className="animate-bounce-delayed">
//           <div className="mb-4">
//             <label className="block text-blue-700 font-medium mb-2">
//               Choose Image
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition duration-300"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-full hover:scale-105 hover:opacity-90 transition duration-300 shadow-md font-semibold text-lg"
//           >
//             🚀 Upload and Scan
//           </button>
//         </form>
//         {error && (
//           <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg shadow-inner text-center animate-fade-in">
//             <strong>Error: </strong>{error}
//           </div>
//         )}
//         {responseData && (
//           <div className="mt-8 bg-blue-50 border-t-4 border-blue-400 p-6 rounded-lg shadow-inner animate-fade-in flex flex-col sm:flex-row gap-6">
//             <div className="flex-1 text-left space-y-4">
//               <div>
//                 <strong className="text-blue-700 text-lg">👨‍⚕️ Doctor Name: </strong>
//                 <span className="text-gray-700 text-lg font-semibold">{responseData.doctorName}</span>
//               </div>
//               <div>
//                 <strong className="text-blue-700 text-lg">🧑 Patient Name: </strong>
//                 <span className="text-gray-700 text-lg font-semibold">{responseData.patientName}</span>
//               </div>
//               <div>
//                 <strong className="text-blue-700 text-lg">📊 Confidence: </strong>
//                 <span className="text-gray-700 text-lg font-semibold">{responseData.confidence}</span>
//               </div>
//               <div>
//                 <strong className="text-blue-700 text-base">🕒 Date: </strong>
//                 <span className="text-gray-700 text-base">{responseData.date}</span>
//               </div>
//               <div>
//                 <strong className="text-blue-700 text-lg">🦠 Info About Disease: </strong>
//                 <span className="text-gray-700 text-lg font-semibold">{responseData.diseaseMsg}</span>
//               </div>
//               <div>
//                 <strong className="text-blue-700 text-lg">📝 Arabic Name: </strong>
//                 <span className="text-gray-700 text-lg font-semibold">{responseData.arabicName}</span>
//               </div>
//               <div className="col-span-2">
//                 <strong className="text-blue-700 text-lg">📸 Fundus Camera Result: </strong>
//                 <span className="text-gray-700 text-lg font-semibold">{responseData.fundusCameraResult}</span>
//               </div>
//             </div>

//             <div className="flex-shrink-0 max-w-xl">
//               <img
//                 src={responseData.fundusCameraPath}
//                 alt="Fundus Camera Result"
//                 className="rounded-lg shadow-md object-contain w-full h-auto"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <style>
//         {`
//           @keyframes float {
//             0% {
//               transform: translateY(0px);
//             }
//             50% {
//               transform: translateY(-20px);
//             }
//             100% {
//               transform: translateY(0px);
//             }
//           }

//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes bounce {
//             0%, 20%, 50%, 80%, 100% {
//               transform: translateY(0);
//             }
//             40% {
//               transform: translateY(-20px);
//             }
//             60% {
//               transform: translateY(-10px);
//             }
//           }

//           .animate-float {
//             animation: float 6s ease-in-out infinite;
//           }

//           .animate-float-delayed {
//             animation: float 6s ease-in-out infinite 2s;
//           }

//           .animate-fade-in {
//             animation: fadeIn 1s ease-in-out forwards;
//           }

//           .animate-bounce {
//             animation: bounce 1s ease-in-out;
//           }

//           .animate-bounce-delayed {
//             animation: bounce 1s ease-in-out 0.3s;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Scan;
//////////////////
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Scan = () => {
  const { token, backendUrl } = useContext(AppContext);

  const [file, setFile] = useState(null);          // 📁 ملف (File)
  const [responseData, setResponseData] = useState(null); // 📄 بيانات (Object / JSON)
  const [error, setError] = useState(null);        // ⚠️ نص رسالة خطأ (String)
  const [loading, setLoading] = useState(false);   // ⏳ حالة تحميل (Boolean)
  const [showForm, setShowForm] = useState(false); // 👁️ إظهار الفورم (Boolean)
  const [showResult, setShowResult] = useState(false); // 👁️ إظهار النتيجة (Boolean)

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // 📁
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a scan image to upload."); // ⚠️
      return;
    }

    setError("");        // ⚠️
    setLoading(true);    // ⏳
    setResponseData(null); // 📄
    setShowResult(false); // 👁️

    try {
      const formData = new FormData();
      formData.append("ScanImage", file); // 📁

      const response = await fetch(`${backendUrl}/Patients/Scan`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 🔑 نص (String)
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`); // ⚠️
      }

      const data = await response.json(); // 📄

      if (data.success || data.data) {
        setResponseData(data.data || data); // 📄
        setShowResult(true);                 // 👁️
      } else {
        setError(data.message || "Scan failed"); // ⚠️
      }
    } catch (err) {
      setError(err.message || "Error uploading the scan."); // ⚠️
    } finally {
      setLoading(false); // ⏳
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-200 py-10 px-4 mt-14 dark:bg-gray-900 transition-colors duration-700">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center drop-shadow-md animate-fadeInDown">
          Upload Fundus Scan Image
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 mb-10 transition-all duration-700 ease-out transform ${
            showForm
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div>
            <label
              htmlFor="scanImage"
              className="block mb-2 font-semibold text-blue-700"
            >
              Scan Image:
            </label>
            <input
              id="scanImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange} // 📁
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-400 hover:shadow-md transition-shadow duration-300 cursor-pointer"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-center font-semibold animate-fadeIn">
              {error} {/* ⚠️ */}
            </div>
          )}

          <button
            type="submit"
            disabled={loading} // ⏳
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              "Upload and Scan"
            )}
          </button>
        </form>

        {responseData && showResult && (
          <div
            className="flex flex-col md:flex-row bg-green-50 rounded-lg p-6 shadow-lg border border-green-200 transition-all duration-700 ease-out transform animate-fadeInUp"
          >
            <div className="md:w-2/3 pr-6 space-y-3 text-left text-sm">
              <h3 className="text-2xl font-semibold mb-4 text-green-800 border-b border-green-300 pb-2">
                Scan Result
              </h3>

              {[
                { label: " 👨‍⚕️ Doctor", value: responseData.doctorName },  
                             // 🧑‍⚕️ String
                { label: " 🧑 Patient", value: responseData.patientName },             // 🧑 String
                {
                  label: " 📅 Date",
                  value: responseData.date
                    ? new Date(responseData.date).toLocaleString()
                    : "N/A",                                                    // 📅 String (formatted date)
                },
                { label: " 💬 Disease Details", value: responseData.diseaseMsg },      // 💬 String
                { label: " 📝 Arabic Name", value: responseData.arabicName },   
                { label: "  📊 Confidence", value: responseData.confidence + '%' },  
                       // 📝 String
                {
                  label: " 📊 Fundus Camera Result",
                  value: responseData.fundusCameraResult,                         // 📊 String أو Object (حسب البيانات)
                },
              ].map(({ label, value }) => (
                <p key={label} className="text-gray-700">
                  <span className="font-semibold text-blue-700">{label}:</span>{" "}
                  <span className="text-gray-900">{value || "N/A"}</span>
                </p>
              ))}
            </div>

            {responseData.fundusCameraPath && (
              <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center items-start">
                <img
                  src={responseData.fundusCameraPath} // 🖼️ رابط صورة (String URL)
                  alt="Fundus Camera"
                  className="rounded-lg border max-w-full max-h-48 shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        .animate-fadeIn {
          animation: fadeInDown 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Scan;
