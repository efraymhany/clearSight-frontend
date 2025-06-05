// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { motion, AnimatePresence } from "framer-motion";

// const DocPatientHistory = ({ patientId }) => {
//   const { token, backendUrl } = useContext(AppContext);

//   const [history, setHistory] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize] = useState(5);
//   const [hasNext, setHasNext] = useState(false);      
//   const [hasPrevious, setHasPrevious] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchHistory = async () => {
//     if (!patientId) {
//       setError("Patient ID is required.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `${backendUrl}/Doctors/GetPatientHistory/${encodeURIComponent(patientId)}`,
//         {
//           params: { pageNumber, pageSize },
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Patient History API response:", response);

//       let data = response.data;

//       // تحقق من نوع البيانات لو جت كنص تحتاج Parse
//       if (typeof data === "string") {
//         try {
//           data = JSON.parse(data);
//         } catch {
//           setError("Received non-JSON response from API");
//           setHistory([]);
//           return;
//         }
//       }

//       if (Array.isArray(data)) {
//         setHistory(data);
//         setHasNext(data.length === pageSize);
//         setHasPrevious(pageNumber > 1);
//       } else if (data?.items && Array.isArray(data.items)) {
//         setHistory(data.items);
//         setHasNext(data.hasNext || false);
//         setHasPrevious(data.hasPrevious || false);
//       } else {
//         setHistory([]);
//         setError("⚠️ Unexpected API response structure.");
//       }
//     } catch (err) {
//       console.error("Error fetching patient history:", err);
//       setError("❌ Failed to fetch patient history. Unauthorized or server error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token && backendUrl && patientId) {
//       fetchHistory();
//     }
//   }, [pageNumber, token, backendUrl, patientId]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gray-50 py-10 px-4 relative mt-10"
//     >
//       <div className="max-w-4xl mx-auto relative z-10">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//           🩺 Patient Medical History
//         </h2>

//         <AnimatePresence>
//           {loading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center text-blue-600"
//             >
//               <svg
//                 className="mx-auto animate-spin h-6 w-6 text-blue-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8z"
//                 />
//               </svg>
//               <p className="mt-2">Loading patient history...</p>
//             </motion.div>
//           )}
//           {error && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center"
//             >
//               {error}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {!loading && !error && history.length === 0 && (
//           <p className="text-center text-gray-500">
//             No medical history records found.
//           </p>
//         )}

//         <ul className="space-y-4">
//           {history.map((item, idx) => (
//             <motion.li
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-white rounded-xl border border-gray-200 shadow p-6"
//             >
//               <p>
//                 <span className="font-semibold">📅 Date:</span>{" "}
//                 {item.date || "N/A"}
//               </p>
//               <p>
//                 <span className="font-semibold">📝 Details:</span>{" "}
//                 {item.details || "No details available"}
//               </p>
//               <p>
//                 <span className="font-semibold">👨‍⚕️ Doctor:</span>{" "}
//                 {item.doctorName || "Unknown"}
//               </p>
//             </motion.li>
//           ))}
//         </ul>

//         {/* Pagination Controls */}
//         <div className="flex justify-center gap-4 mt-10">
//           <button
//             onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
//             disabled={!hasPrevious}
//             className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition disabled:opacity-50"
//           >
//             ← Previous
//           </button>
//           <span className="px-6 py-2 font-bold text-gray-700">
//             Page {pageNumber}
//           </span>
//           <button
//             onClick={() => setPageNumber((prev) => prev + 1)}
//             disabled={!hasNext}
//             className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DocPatientHistory;
//////////////
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom"; // ⬅️ استخدمنا useParams

const DocPatientHistory = () => {
  const { patientId } = useParams(); // ⬅️ أخذنا patientId من الرابط
  const { token, backendUrl } = useContext(AppContext);

  const [history, setHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    if (!patientId) {
      setError("Patient ID is required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${backendUrl}/Doctors/GetPatientHistory/${encodeURIComponent(patientId)}`,
        {
          params: { pageNumber, pageSize },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = response.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          setError("Received non-JSON response from API");
          setHistory([]);
          return;
        }
      }

      if (Array.isArray(data)) {
        setHistory(data);
        setHasNext(data.length === pageSize);
        setHasPrevious(pageNumber > 1);
      } else if (data?.items && Array.isArray(data.items)) {
        setHistory(data.items);
        setHasNext(data.hasNext || false);
        setHasPrevious(data.hasPrevious || false);
      } else {
        setHistory([]);
        setError("⚠️ Unexpected API response structure.");
      }
    } catch (err) {
      console.error("Error fetching patient history:", err);
      setError("❌ Failed to fetch patient history. Unauthorized or server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && backendUrl && patientId) {
      fetchHistory();
    }
  }, [pageNumber, token, backendUrl, patientId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-10 px-4 relative mt-10"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          🩺 Patient Medical History
        </h2>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-blue-600"
            >
              <svg
                className="mx-auto animate-spin h-6 w-6 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <p className="mt-2">Loading patient history...</p>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !error && history.length === 0 && (
          <p className="text-center text-gray-500">
            No medical history records found.
          </p>
        )}

        <ul className="space-y-4">
          {history.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl border border-gray-200 shadow p-6"
            >
              <p>
                <span className="font-semibold">📅 Date:</span>{" "}
                {item.date || "N/A"}
              </p>
              <p>
                <span className="font-semibold">📝 Details:</span>{" "}
                {item.details || "No details available"}
              </p>
              <p>
                <span className="font-semibold">👨‍⚕️ Doctor:</span>{" "}
                {item.doctorName || "Unknown"}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={!hasPrevious}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition disabled:opacity-50"
          >
            ← Previous
          </button>
          <span className="px-6 py-2 font-bold text-gray-700">
            Page {pageNumber}
          </span>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={!hasNext}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DocPatientHistory;
