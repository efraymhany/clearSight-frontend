// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { motion } from "framer-motion";

// const PatientsList = () => {
//   const { token, backendUrl } = useContext(AppContext);
//   const [patients, setPatients] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize] = useState(10);
//   const [hasNext, setHasNext] = useState(false);
//   const [hasPrevious, setHasPrevious] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchPatients = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(`${backendUrl}/Doctors/PatientsList`, {
//         params: { pageNumber, pageSize },
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = response.data?.data;

//       if (data?.items && Array.isArray(data.items)) {
//         setPatients(data.items);
//         setHasNext(data.hasNext);
//         setHasPrevious(data.hasPrevious);
//       } else {
//         setPatients([]);
//         setError("⚠️ Unexpected response or no patients found.");
//       }
//     } catch (err) {
//       console.error("🚨 Axios error:", err);
//       setError("❌ Failed to fetch patients. Unauthorized or server error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token && backendUrl) fetchPatients();
//   }, [pageNumber, token]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-blue-50 py-10 px-4 relative"
//     >
//       {/* Floating Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div
//           className="absolute w-32 h-32 bg-[#f17732] rounded-full opacity-20 animate-float-slow"
//           style={{ top: "10%", left: "5%" }}
//         ></div>
//         <div
//           className="absolute w-44 h-44 bg-[#5f6FFF] rounded-full opacity-20 animate-float-slower"
//           style={{ bottom: "20%", right: "15%" }}
//         ></div>
//         <div
//           className="absolute w-20 h-20 bg-[#f17732] rounded-full opacity-10 animate-float-slower"
//           style={{ top: "60%", left: "10%" }}
//         ></div>
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
//           🩺 Patients List
//         </h2>

//         {loading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center text-[#f17732]"
//           >
//             <svg
//               className="mx-auto animate-spin h-6 w-6 text-[#f17732]"
//               viewBox="0 0 24 24"
//               fill="none"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8z"
//               />
//             </svg>
//           </motion.div>
//         )}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center"
//           >
//             {error}
//           </motion.div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {!loading && patients.length === 0 && !error && (
//             <p className="text-center text-gray-500 col-span-full">
//               No patients found on this page.
//             </p>
//           )}
//           {patients.map((patient) => (
//             <motion.div
//               key={patient.patientId}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-xl transition duration-300 p-6"
//             >
//               <div className="flex items-center space-x-4 mb-4">
//                 <img
//                   src={patient.profileImagePath || "/default-profile.png"}
//                   alt="Profile"
//                   className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
//                 />
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     {patient.fullName}
//                   </h3>
//                   <p className="text-sm text-gray-500">@{patient.userName}</p>
//                 </div>
//               </div>
//               <div className="space-y-2 text-gray-700 text-sm">
//                 <div>
//                   <strong>Email:</strong> {patient.email}
//                 </div>
//                 <div>
//                   <strong>Phone:</strong>{" "}
//                   {patient.phoneNumbers?.length > 0
//                     ? patient.phoneNumbers.join(", ")
//                     : "N/A"}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="flex justify-center gap-4 mt-10">
//           <button
//             className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition disabled:opacity-50"
//             onClick={() => setPageNumber((prev) => prev - 1)}
//             disabled={!hasPrevious}
//           >
//             ← Previous
//           </button>
//           <button
//             className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//             onClick={() => setPageNumber((prev) => prev + 1)}
//             disabled={!hasNext}
//           >
//             Next →
//           </button>
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes float-slow {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//             100% { transform: translateY(0px); }
//           }
//           @keyframes float-slower {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-6px); }
//             100% { transform: translateY(0px); }
//           }
//           .animate-float-slow {
//             animation: float-slow 8s ease-in-out infinite;
//           }
//           .animate-float-slower {
//             animation: float-slower 12s ease-in-out infinite;
//           }
//         `}
//       </style>
//     </motion.div>
//   );
// };

// export default PatientsList;
///////////////////////
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";

// const PatientsList = () => {
//   const { token, backendUrl } = useContext(AppContext);
//   const [patients, setPatients] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize] = useState(10);
//   const [hasNext, setHasNext] = useState(false);
//   const [hasPrevious, setHasPrevious] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchPatients = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const endpoint = searchTerm.trim()
//         ? `${backendUrl}/Doctors/PatientsListSearch`
//         : `${backendUrl}/Doctors/PatientsList`;

//       const params = searchTerm.trim()
//         ? { patientName: searchTerm, pageNumber, pageSize }
//         : { pageNumber, pageSize };

//       const response = await axios.get(endpoint, {
//         params,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const data = response.data?.data;

//       if (data?.items && Array.isArray(data.items)) {
//         setPatients(data.items);
//         setHasNext(data.hasNext);
//         setHasPrevious(data.hasPrevious);
//       } else {
//         setPatients([]);
//         setError("No patients found.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("❌ Unauthorized or server error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token && backendUrl) fetchPatients();
//   }, [pageNumber, token]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPageNumber(1);
//     fetchPatients();
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 py-10 px-4 relative mt-14 dark:bg-gray-900">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
//           🩺 Patients List
//         </h2>

//         {/* 🔍 Search Form */}
//         <form onSubmit={handleSearch} className="mb-6 flex justify-center">
//           <input
//             type="text"
//             placeholder="Search by name or username..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
//           >
//             Search
//           </button>
//         </form>

//         {loading && (
//           <div className="text-center text-[#f17732] mb-4">
//             <span className="animate-spin inline-block w-6 h-6 border-4 border-orange-400 border-t-transparent rounded-full"></span>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {!loading && patients.length === 0 && !error && (
//             <p className="text-center text-gray-500 col-span-full">
//               No patients found on this page.
//             </p>
//           )}
//           {patients.map((patient) => (
//             <div
//               key={patient.patientId}
//               className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-xl transition duration-300 p-6"
//             >
//               <div className="flex items-center space-x-4 mb-4">
//                 <img
//                   src={patient.profileImagePath || "/default-profile.png"}
//                   alt="Profile"
//                   className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
//                 />
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     {patient.fullName}
//                   </h3>
//                   <p className="text-sm text-gray-500">@{patient.userName}</p>
//                 </div>
//               </div>
//               <div className="space-y-2 text-gray-700 text-sm">
//                 <div>
//                   <span className="font-semibold">Email:</span>{" "}
//                   <span>{patient.email || "N/A"}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold">Phone:</span>{" "}
//                   <span>{patient.phoneNumbers?.join(", ") || "N/A"}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination Buttons */}
//         <div className="flex justify-center gap-4 mt-10">
//           <button
//             className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition disabled:opacity-50"
//             onClick={() => setPageNumber((prev) => prev - 1)}
//             disabled={!hasPrevious}
//           >
//             ← Previous
//           </button>
//           <button
//             className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//             onClick={() => setPageNumber((prev) => prev + 1)}
//             disabled={!hasNext}
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientsList;
//////////////
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const PatientsList = () => {
//   const { token, backendUrl } = useContext(AppContext);
//   const [patients, setPatients] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize] = useState(10);
//   const [hasNext, setHasNext] = useState(false);
//   const [hasPrevious, setHasPrevious] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const fetchPatients = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const endpoint = searchTerm.trim()
//         ? `${backendUrl}/Doctors/PatientsListSearch`
//         : `${backendUrl}/Doctors/PatientsList`;

//       const params = searchTerm.trim()
//         ? { patientName: searchTerm, pageNumber, pageSize }
//         : { pageNumber, pageSize };

//       const response = await axios.get(endpoint, {
//         params,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const data = response.data?.data;

//       if (data?.items && Array.isArray(data.items)) {
//         setPatients(data.items);
//         setHasNext(data.hasNext);
//         setHasPrevious(data.hasPrevious);
//       } else {
//         setPatients([]);
//         setError("No patients found.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("❌ Unauthorized or server error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token && backendUrl) fetchPatients();
//   }, [pageNumber, token]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPageNumber(1);
//     fetchPatients();
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 py-10 px-4 mt-14 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
//           🩺 Patients List
//         </h2>

//         <form onSubmit={handleSearch} className="mb-6 flex justify-center">
//           <input
//             type="text"
//             placeholder="Search by name or username..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
//           >
//             Search
//           </button>
//         </form>

//         {loading && (
//           <div className="text-center text-[#f17732] mb-4">
//             <span className="animate-spin inline-block w-6 h-6 border-4 border-orange-400 border-t-transparent rounded-full"></span>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {!loading && patients.length === 0 && !error && (
//             <p className="text-center text-gray-500 col-span-full">
//               No patients found on this page.
//             </p>
//           )}
//           {patients.map((patient) => (
//             <div
//               key={patient.patientId}
//               className="border border-blue-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex flex-col items-center p-4">
//                 <img
//                   className="w-20 h-20 rounded-full object-cover border-2 border-blue-400 mb-3"
//                   src={patient.profileImagePath || "/default-profile.png"}
//                   alt="Patient"
//                 />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                   {patient.fullName}
//                 </h3>
//                 <p className="text-gray-500 text-sm mb-4">
//                   @{patient.userName}
//                 </p>
//                 <div className="flex flex-wrap justify-start items-center gap-4 text-sm text-gray-700 mb-4">
//                   <span>
//                     <span className="font-semibold text-primary">Email:</span>{" "}
//                     {patient.email || "N/A"}
//                   </span>
//                   <span>
//                     <span className="font-semibold text-primary">Phone:</span>{" "}
//                     {patient.phoneNumbers?.join(", ") || "N/A"}
//                   </span>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 w-full">
//                   <button
//                     onClick={() =>
//                       navigate(`/docPatientHistory/${patient.patientId}`)
//                     }
//                     className="w-full bg-blue-600 text-white py-1.5 px-4 rounded hover:bg-blue-700 transition"
//                   >
//                     View History
//                   </button>

//                   <button
//                     onClick={() => navigate(`/scan/${patient.patientId}`)}
//                     className="w-full bg-red-500 text-white py-1.5 px-4 rounded hover:bg-red-600 transition"
//                   >
//                     Scan Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center gap-4 mt-10">
//           <button
//             className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition disabled:opacity-50"
//             onClick={() => setPageNumber((prev) => prev - 1)}
//             disabled={!hasPrevious}
//           >
//             ← Previous
//           </button>
//           <button
//             className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//             onClick={() => setPageNumber((prev) => prev + 1)}
//             disabled={!hasNext}
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientsList;
////////////////
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PatientsList = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [patients, setPatients] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  

  const fetchPatients = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint = searchTerm.trim()
        ? `${backendUrl}/Doctors/PatientsListSearch`
        : `${backendUrl}/Doctors/PatientsList`;

      const params = searchTerm.trim()
        ? { patientName: searchTerm, pageNumber, pageSize }
        : { pageNumber, pageSize };

      const response = await axios.get(endpoint, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = response.data?.data;

      if (data?.items && Array.isArray(data.items)) {
        setPatients(data.items);
        setHasNext(data.hasNext);
        setHasPrevious(data.hasPrevious);
      } else {
        setPatients([]);
        setError("No patients found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("❌ Unauthorized or server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && backendUrl) fetchPatients();
  }, [pageNumber, token]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(1);
    fetchPatients();
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 mt-14 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          🩺 Patients List
        </h2>

        <form onSubmit={handleSearch} className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {loading && (
          <div className="text-center text-[#f17732] mb-4">
            <span className="animate-spin inline-block w-6 h-6 border-4 border-orange-400 border-t-transparent rounded-full"></span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loading && patients.length === 0 && !error && (
            <p className="text-center text-gray-500 col-span-full">
              No patients found on this page.
            </p>
          )}
          {patients.map((patient) => (
            <div
              key={patient.patientId}
              className="border border-blue-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 p-4"
            >
              <div className="flex items-center gap-6 mb-4">
                <img
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
                  src={patient.profileImagePath || "/default-profile.png"}
                  alt="Patient"
                />
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {patient.fullName}
                  </h3>
                  <p className="text-gray-500 text-sm">@{patient.userName}</p>
                </div>
              </div>

              <div className="mb-4 space-y-1 text-gray-700 text-sm">
                <p>
                  <span className="font-semibold text-primary">Email:</span>{" "}
                  {patient.email || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-primary">Phone:</span>{" "}
                  {patient.phoneNumbers?.join(", ") || "N/A"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() =>
                    navigate(`/patient-history/${patient.patientId}`)
                  }
                  className="w-full bg-blue-600 text-white py-1.5 px-4 rounded hover:bg-blue-700 transition"
                >
                  View History
                </button>

                <button
                  onClick={() => navigate(`/scan-upload/${patient.patientId}`)}
                  className="w-full bg-red-500 text-white py-1.5 px-4 rounded hover:bg-red-600 transition"
                >
                  Scan Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition disabled:opacity-50"
            onClick={() => setPageNumber((prev) => prev - 1)}
            disabled={!hasPrevious}
          >
            ← Previous
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={!hasNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
