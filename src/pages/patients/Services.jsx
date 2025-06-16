import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import DoctorsList from "./DoctorsList";

const Scan = () => {
  const { token, backendUrl } = useContext(AppContext);

  const [file, setFile] = useState(null); //  ملف (File)
  const [responseData, setResponseData] = useState(null); //  بيانات (Object / JSON)
  const [error, setError] = useState(null); // نص رسالة خطأ (String)
  const [loading, setLoading] = useState(false); //  حالة تحميل (Boolean)
  const [showForm, setShowForm] = useState(false); //  إظهار الفورم (Boolean)
  const [showResult, setShowResult] = useState(false); //  إظهار النتيجة (Boolean)


  
  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); //
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a scan image to upload.");
      return;
    }

    setError("");
    setLoading(true);
    setResponseData(null);
    setShowResult(false);

    try {
      const formData = new FormData();
      formData.append("ScanImage", file);

      const response = await fetch(`${backendUrl}/Patients/Scan`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (data.success || data.data) {
        setResponseData(data.data || data);
        setShowResult(true);
      } else {
        setError(data.message || "Scan failed");
      }
    } catch (err) {
      setError(err.message || "Error uploading the scan.");
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
            disabled={loading}
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
          <div className="flex flex-col md:flex-row bg-green-50 rounded-lg p-6 shadow-lg border border-green-200 transition-all duration-700 ease-out transform animate-fadeInUp">
            <div className="md:w-2/3 pr-6 space-y-3 text-left text-sm">
              <h3 className="text-2xl font-semibold mb-4 text-green-800 border-b border-green-300 pb-2">
                Scan Result
              </h3>

              {[
                { label: " 👨‍⚕️ Doctor", value: responseData.doctorName },
                // 🧑‍⚕️ String
                { label: " 🧑 Patient", value: responseData.patientName },
                {
                  label: " 📅 Date",
                  value: responseData.date
                    ? new Date(responseData.date).toLocaleString()
                    : "N/A",
                },
                {
                  label: " 💬 Disease Details",
                  value: responseData.diseaseMsg,
                },
                { label: " 📝 Arabic Name", value: responseData.arabicName },
                {
                  label: "  📊 Confidence",
                  value: responseData.confidence + "%",
                },
                // 📝 String
                {
                  label: " 🎯 Fundus Camera Result",
                  value: responseData.fundusCameraResult,
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
                  src={responseData.fundusCameraPath}
                  alt="Fundus Camera"
                  className="rounded-lg border max-w-full max-h-48 shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
          </div>
        )}
      </div>
      {/* {responseData && showResult && (
        <div className="max-w-4xl mx-auto mt-10">
          <DoctorsList />
        </div>
      )} */}

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
/////////////////////////
// import React, { useState, useEffect } from "react";

// const Scan = () => {
//   const [file, setFile] = useState(null);
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [showResult, setShowResult] = useState(false);

//   const mlApiUrl = "http://localhost:5000/predict";

//   useEffect(() => {
//     const timer = setTimeout(() => setShowForm(true), 200);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!file) {
//     setError("Please select a scan image to upload.");
//     return;
//   }

//   setError("");
//   setLoading(true);
//   setResponseData(null);
//   setShowResult(false);

//   try {
//     const formData = new FormData();
//     formData.append("image", file); // المفتاح لازم يكون "image" عشان Flask يتعرف عليه

//     const response = await fetch("http://localhost:5000/predict", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     console.log("🎯 Model Response:", data); // ✅ تأكيد في الـ console

//     // لو الرد فيه Prediction و Confidence نعرضه
//     if (data.Prediction && data.Confidence !== undefined) {
//       setResponseData(data);
//       setShowResult(true);
//     } else {
//       setError("Unexpected response from the server.");
//     }
//   } catch (err) {
//     setError(err.message || "Error uploading the scan.");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen bg-gradient-to-br bg-gray-200 py-10 px-4 mt-14 dark:bg-gray-900 transition-colors duration-700">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-blue-200">
//         <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center drop-shadow-md animate-fadeInDown">
//           Upload Fundus Scan Image
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className={`space-y-6 mb-10 transition-all duration-700 ease-out transform ${
//             showForm
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-8 pointer-events-none"
//           }`}
//         >
//           <div>
//             <label
//               htmlFor="scanImage"
//               className="block mb-2 font-semibold text-blue-700"
//             >
//               Scan Image:
//             </label>
//             <input
//               id="scanImage"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-400 hover:shadow-md transition-shadow duration-300 cursor-pointer"
//               required
//             />
//           </div>

//           {error && (
//             <div className="bg-red-100 text-red-700 p-3 rounded text-center font-semibold animate-fadeIn">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8z"
//                   ></path>
//                 </svg>
//                 Uploading...
//               </>
//             ) : (
//               "Upload and Scan"
//             )}
//           </button>
//         </form>

// {responseData && showResult && (
//   <div className="bg-green-50 rounded-lg p-6 shadow-lg border border-green-200 text-center animate-fadeInUp">
//     <h3 className="text-2xl font-semibold text-green-800 mb-3">
//       Prediction Result
//     </h3>
//     <p className="text-xl text-gray-700">
//       <span className="font-bold text-blue-700">Disease:</span>{" "}
//       {responseData.Prediction}
//     </p>
//     <p className="text-xl text-gray-700 mt-2">
//       <span className="font-bold text-blue-700">Confidence:</span>{" "}
//       {(responseData.Confidence * 100).toFixed(2)}%
//     </p>
//   </div>
// )}

//         )}
//       </div>

//       <style>{`
//         @keyframes fadeInDown {
//           0% {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeInUp {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeInDown {
//           animation: fadeInDown 0.6s ease forwards;
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.6s ease forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Scan;
