// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext'; // ✅ Adjust path if needed

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
//       setError("Please select a file to upload");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("ScanImage", file);

//     try {
//       const res = await axios.post(
//         `${backendUrl}/Patients/Scan`,
//         formData,
//         {
//           headers: {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         }
//       );

//       setResponseData(res.data.data);
//       setError(null);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "An unexpected error occurred. Please try again later."
//       );
//       setResponseData(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
//         <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
//           Upload and Scan Image
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-600 font-medium mb-2">
//               Choose Image
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Upload and Scan
//           </button>
//         </form>

//         {error && (
//           <div className="mt-4 text-red-600 font-medium text-center bg-red-100 p-4 rounded-lg">
//             <strong>Error: </strong>{error}
//           </div>
//         )}

//         {responseData && (
//           <div className="mt-6 bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-lg font-bold text-gray-700 mb-4">
//               Prediction Result
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
//               <div><strong>Doctor Name:</strong> {responseData.doctorName}</div>
//               <div><strong>Patient Name:</strong> {responseData.patientName}</div>
//               <div><strong>Confidence:</strong> {responseData.confidence}</div>
//               <div><strong>Date:</strong> {responseData.date}</div>
//               <div><strong>Disease:</strong> {responseData.diseasesMsg}</div>
//               <div><strong>Arabic Name:</strong> {responseData.arabicName}</div>
//               <div className="col-span-2"><strong>Fundus Camera Result:</strong> {responseData.fundusCameraResult}</div>
//               <div className="col-span-2"><strong>Camera Path:</strong> {responseData.fundusCameraPath}</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Scan;




// // ===================================
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Scan = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("📎 Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("ScanImage", file);

    try {
      const res = await axios.post(`${backendUrl}/Patients/Scan`, formData, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setResponseData(res.data.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "🚨 An unexpected error occurred. Please try again later."
      );
      setResponseData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 flex items-center justify-center py-10 px-4 relative overflow-hidden pt-24 mt-1   dark:bg-gray-900 ">
      {/* Background Floating Icons */}
      <div className="absolute inset-0 pointer-events-none  dark:bg-gray-900 ">
        <svg
          className="absolute w-12 h-12 text-blue-300 opacity-20 animate-float"
          style={{ top: '10%', left: '15%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm1-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
        <svg
          className="absolute w-16 h-16 text-blue-400 opacity-20 animate-float-delayed"
          style={{ top: '30%', right: '10%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
        <svg
          className="absolute w-14 h-14 text-blue-200 opacity-20 animate-float"
          style={{ bottom: '20%', left: '20%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
        <svg
          className="absolute w-10 h-10 text-blue-300 opacity-20 animate-float-delayed"
          style={{ bottom: '15%', right: '25%' }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 10h-3V3h-2v7h-3l4 4 4-4zm-9 8c-3.31 0-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8h-2c0 3.31-2.69 6-6 6z" />
        </svg>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-blue-200 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700 tracking-tight animate-bounce">
          📤 Upload 🔍 Scan Image
        </h1>
        <form onSubmit={handleSubmit} className="animate-bounce-delayed">
          <div className="mb-4">
            <label className="block text-blue-700 font-medium mb-2">
              Choose Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-full hover:scale-105 hover:opacity-90 transition duration-300 shadow-md font-semibold text-lg"
          >
            🚀 Upload and Scan
          </button>
        </form>
        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg shadow-inner text-center animate-fade-in">
            <strong>Error: </strong>{error}
          </div>
        )}
        {responseData && (
          <div className="mt-8 bg-blue-50 border-t-4 border-blue-400 p-6 rounded-lg shadow-inner animate-fade-in">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              🧬 Prediction Result
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-800 text-sm">
              <div><strong>👨‍⚕️ Doctor Name:</strong> {responseData.doctorName}</div>
              <div><strong>🧑 Patient Name:</strong> {responseData.patientName}</div>
              <div><strong>📊 Confidence:</strong> {responseData.confidence}</div>
              <div><strong>🕒 Date:</strong> {responseData.date}</div>
              <div><strong>🦠 Info About Disease :</strong> {responseData.diseaseMsg}</div>
              <div><strong>📝 Arabic Name:</strong> {responseData.arabicName}</div>
              <div className="col-span-2"><strong>📸 Fundus Camera Result:</strong> {responseData.fundusCameraResult}</div>
              <div className="col-span-2 break-words">
                <strong>🔗 Camera Path:</strong>{" "}
                <a
                  href={responseData.fundusCameraPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {responseData.fundusCameraPath}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 6s ease-in-out infinite 2s;
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-in-out forwards;
          }

          .animate-bounce {
            animation: bounce 1s ease-in-out;
          }

          .animate-bounce-delayed {
            animation: bounce 1s ease-in-out 0.3s;
          }
        `}
      </style>
    </div>
  );
};

export default Scan;

// ===========================================

// import React, { useState, useEffect, useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// const PatientHistory = () => {
//   const { token, backendUrl } = useContext(AppContext);
//   const [history, setHistory] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showHistory, setShowHistory] = useState(false); // new state

//   const fetchPatientHistory = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(
//         `${backendUrl}/Patients/GetPatientHistory?pageNumber=${pageNumber}&pageSize=${pageSize}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       setHistory(data.data || []);
//       setTotalCount(data.totalCount || 0);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch patient history.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (showHistory) {
//       fetchPatientHistory();
//     }
//   }, [showHistory, pageNumber, pageSize]);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)) {
//       setPageNumber(newPage);
//     }
//   };

//   const handlePageSizeChange = (e) => {
//     setPageSize(Number(e.target.value));
//     setPageNumber(1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
//       <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Patient History</h2>

//         {/* See History Button */}
//         {!showHistory && (
//           <div className="text-center mb-6">
//             <button
//               onClick={() => setShowHistory(true)}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm"
//             >
//               See History
//             </button>
//           </div>
//         )}

//         {showHistory && (
//           <>
//             {loading && <p className="text-blue-600 text-center">Loading...</p>}
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             {!loading && !error && history.length === 0 && (
//               <p className="text-gray-500 text-center">No history available.</p>
//             )}

//             {!loading && !error && history.length > 0 && (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full bg-white border border-gray-200 rounded">
//                     <thead>
//                       <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//                         <th className="py-3 px-4 border-b">Doctor</th>
//                         <th className="py-3 px-4 border-b">Patient</th>
//                         <th className="py-3 px-4 border-b">Confidence</th>
//                         <th className="py-3 px-4 border-b">Date</th>
//                         <th className="py-3 px-4 border-b">Disease</th>
//                       </tr>
//                     </thead>
//                     <tbody className="text-gray-700 text-sm">
//                       {history.map((item, index) => (
//                         <tr key={index} className="hover:bg-gray-50 border-b">
//                           <td className="py-3 px-4">{item.doctorName}</td>
//                           <td className="py-3 px-4">{item.patientName}</td>
//                           <td className="py-3 px-4">{item.confidencePath}</td>
//                           <td className="py-3 px-4">{item.date}</td>
//                           <td className="py-3 px-4">{item.diseaseName}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
//                   <div>
//                     <label className="mr-2 text-sm text-gray-700">Page Size:</label>
//                     <select
//                       value={pageSize}
//                       onChange={handlePageSizeChange}
//                       className="border border-gray-300 p-1 rounded-md"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={20}>20</option>
//                     </select>
//                   </div>

//                   <div className="flex mt-4 sm:mt-0">
//                     <button
//                       onClick={() => handlePageChange(pageNumber - 1)}
//                       disabled={pageNumber === 1}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2 disabled:bg-gray-400"
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() => handlePageChange(pageNumber + 1)}
//                       disabled={pageNumber >= Math.ceil(totalCount / pageSize)}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
//                     >
//                       Next
//                     </button>
//                   </div>

//                   <p className="text-sm text-gray-600 mt-2 sm:mt-0">
//                     Page {pageNumber} of {Math.ceil(totalCount / pageSize)}
//                   </p>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientHistory;
