// import React, { useEffect, useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const DoctorsList = () => {
//   const { token } = useContext(AppContext);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const pageSize = 5;
//   const navigate = useNavigate();

//   const fetchDoctors = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `https://clearsight.runasp.net/api/Patients/DoctorsList?pageNumber=${pageNumber}&pageSize=${pageSize}`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Please login to see Doctors.");
//       }

//       const result = await response.json();
//       if (!result.success) {
//         throw new Error(result.message || "API returned error.");
//       }

//       setDoctors(result.data.items || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, [pageNumber]);

//   const handleSearchClick = () => {
//     navigate("/doctorSearch");
//   };

//   return (
//     <div className="min-h-screen bg-teal-50 py-10 px-6 pt-24 mt-1 dark:text-white dark:bg-gray-900">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
//         <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">
//           Doctors List
//         </h1>

//         {/* Search Bar */}
//         <div className="flex justify-center mb-6">
//           <input
//             type="text"
//             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
//             placeholder="Search for a doctor..."
//             onClick={handleSearchClick}
//           />
//         </div>

//         {loading && <p className="text-center">Loading...</p>}
//         {error && (
//           <p className="text-center text-red-500 font-medium">{error}</p>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {doctors.map((doctor) => (
//             <div
//               key={doctor.doctorId}
//               className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-all"
//             >
//               <div className="flex gap-4">
//                 <img
//                   src={doctor.profileImagePath || "/default-avatar.png"}
//                   alt={doctor.fullName}
//                   className="w-24 h-24 rounded-full object-cover border border-gray-300"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold text-[#f17732]">
//                     {doctor.fullName}
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     Username: {doctor.userName}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Address: {doctor.address}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Available: {doctor.availableFrom} to {doctor.availableTo}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Days Off: {doctor.daysOff.join(", ")}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Phones: {doctor.phoneNumbers.join(", ")}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Available This Month:{" "}
//                     {doctor.availableForCureentMonth ? "Yes" : "No"}
//                   </p>

//                   {/* زر التواصل */}
//                   <div className="mt-4">
//                     <button
//                       onClick={() => navigate(`/grant-access/${doctor.doctorId}`)}
//                       className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
//                     >
// Contact with Doctor                    </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 flex justify-center gap-4">
//           <button
//             onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
//             disabled={pageNumber === 1}
//             className="px-4 py-2 bg-[#f17732] text-white rounded hover:opacity-90 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setPageNumber((prev) => prev + 1)}
//             className="px-4 py-2 bg-[#5f6FFF] text-white rounded hover:opacity-90"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;
// /////////////////////
// import React, { useEffect, useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const DoctorsList = () => {
//   const { token } = useContext(AppContext);
//   const [doctors, setDoctors] = useState([]);
//   const [accessDoctors, setAccessDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const pageSize = 5;

//   const [selectedDoctorToRevoke, setSelectedDoctorToRevoke] = useState(null);
//   const [revokeLoading, setRevokeLoading] = useState(false);
//   const [revokeMessage, setRevokeMessage] = useState(null);
//   const [revokeError, setRevokeError] = useState(null);

//   const sanitizeDoctor = (doc) => ({
//     ...doc,
//     daysOff: Array.isArray(doc.daysOff) ? doc.daysOff : [],
//     phoneNumbers: Array.isArray(doc.phoneNumbers) ? doc.phoneNumbers : [],
//     availableFrom: doc.availableFrom || null,
//     availableTo: doc.availableTo || null,
//     availableForCureentMonth: typeof doc.availableForCureentMonth === "boolean" ? doc.availableForCureentMonth : false,
//     profileImagePath: doc.profileImagePath || "/default-avatar.png",
//     fullName: doc.fullName || "No Name",
//     userName: doc.userName || "N/A",
//     address: doc.address || "N/A",
//   });

//   const fetchDoctors = async () => {
//     const response = await fetch(
//       `https://clearsight.runasp.net/api/Patients/DoctorsList?pageNumber=${pageNumber}&pageSize=${pageSize}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (!response.ok) throw new Error("Please login to see Doctors.");
//     const result = await response.json();
//     if (!result.success) throw new Error(result.message || "API returned error.");
//     return (result.data.items || []).map(sanitizeDoctor);
//   };

//   const fetchAccessDoctors = async () => {
//     const response = await fetch(
//       `https://clearsight.runasp.net/api/Patients/access-list?pageNumber=1&pageSize=1000`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (!response.ok) throw new Error("Please login to see Access List.");
//     const result = await response.json();
//     if (!result.success) throw new Error(result.message || "API returned error.");
//     return result.data.items || [];
//   };

//   const loadData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [docs, accessDocs] = await Promise.all([fetchDoctors(), fetchAccessDoctors()]);
//       setDoctors(docs);
//       setAccessDoctors(accessDocs);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [pageNumber]);

//   const hasAccess = (doctorId) => {
//     return accessDoctors.some((doc) => doc.doctorId === doctorId);
//   };

//   const handleRevokeAccess = async (doctorId) => {
//     setRevokeLoading(true);
//     setRevokeMessage(null);
//     setRevokeError(null);

//     try {
//       const response = await fetch(
//         `https://clearsight.runasp.net/api/Patients/revoke-access?doctorId=${doctorId}`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || "Failed to revoke access");
//       }

//       const result = await response.json();
//       if (result.success) {
//         setRevokeMessage("Access revoked successfully.");
//         setAccessDoctors((prev) => prev.filter((d) => d.doctorId !== doctorId));
//         setSelectedDoctorToRevoke(null);
//       } else {
//         throw new Error(result.message || "Failed to revoke access");
//       }
//     } catch (err) {
//       setRevokeError(err.message);
//     } finally {
//       setRevokeLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-teal-50 py-10 px-6 pt-24 mt-1 dark:text-white dark:bg-gray-900">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
//         <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">Doctors List</h1>

//         {loading && <p className="text-center">Loading...</p>}
//         {error && <p className="text-center text-red-500 font-medium">{error}</p>}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {doctors.map((doctor) => {
//             const access = hasAccess(doctor.doctorId);

//             return (
//               <div
//                 key={doctor.doctorId}
//                 className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-all"
//               >
//                 <div className="flex gap-4">
//                   <img
//                     src={doctor.profileImagePath}
//                     alt={doctor.fullName}
//                     className="w-24 h-24 rounded-full object-cover border border-gray-300"
//                   />
//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold text-[#f17732] flex items-center gap-2">
//                       {doctor.fullName}
//                       {access && (
//                         <span
//                           title="You have granted access to this doctor"
//                           className="bg-green-500 text-white text-xs px-2 py-0.5 rounded"
//                         >
//                           Access Granted
//                         </span>
//                       )}
//                     </h2>
//                     <p className="text-sm text-gray-600">Username: {doctor.userName}</p>
//                     <p className="text-sm text-gray-600">Address: {doctor.address}</p>
//                     <p className="text-sm text-gray-600">
//                       Availability: from {doctor.availableFrom || "Unknown"} to {doctor.availableTo || "Unknown"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Days Off: {doctor.daysOff.length ? doctor.daysOff.join(", ") : "Not specified"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Phone Numbers: {doctor.phoneNumbers.length ? doctor.phoneNumbers.join(", ") : "Not available"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Available This Month: {doctor.availableForCureentMonth ? "Yes" : "No"}
//                     </p>

//                     <div className="mt-4 flex gap-4">
//                       <button
//                         onClick={() => alert("Go to communication or chat page")}
//                         className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
//                       >
//                         Contact Doctor
//                       </button>

//                       {access && (
//                         <button
//                           onClick={() => setSelectedDoctorToRevoke(doctor)}
//                           className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
//                         >
//                           Revoke Access
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Pagination buttons */}
//         <div className="mt-6 flex justify-center gap-4">
//           <button
//             disabled={pageNumber <= 1 || loading}
//             onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             disabled={loading}
//             onClick={() => setPageNumber((prev) => prev + 1)}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Revoke Access Modal */}
//       {selectedDoctorToRevoke && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={() => !revokeLoading && setSelectedDoctorToRevoke(null)} // close on background click
//         >
//           <div
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
//             onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
//           >
//             <h3 className="text-xl font-semibold text-red-600 mb-4">
//               Revoke Access to {selectedDoctorToRevoke.fullName}
//             </h3>
//             <p className="mb-4">
//               By clicking "Confirm Revoke Access", this doctor will no longer be able to contact you.
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setSelectedDoctorToRevoke(null)}
//                 disabled={revokeLoading}
//                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleRevokeAccess(selectedDoctorToRevoke.doctorId)}
//                 disabled={revokeLoading}
//                 className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50"
//               >
//                 {revokeLoading ? "Revoking..." : "Confirm Revoke Access"}
//               </button>
//             </div>
//             {revokeMessage && <p className="mt-3 text-green-600">{revokeMessage}</p>}
//             {revokeError && <p className="mt-3 text-red-600">{revokeError}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorsList;

// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
// import React, { useEffect, useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const DoctorsList = () => {
//   const { token } = useContext(AppContext);
//   const [doctors, setDoctors] = useState([]);
//   const [accessDoctors, setAccessDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const pageSize = 5;

//   const [selectedDoctorToRevoke, setSelectedDoctorToRevoke] = useState(null);
//   const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null);
//   const [contactDoctor, setContactDoctor] = useState(null); // For contact modal
//   const [cancelContactDoctor, setCancelContactDoctor] = useState(null); // For cancel contact modal

//   const [revokeLoading, setRevokeLoading] = useState(false);
//   const [revokeMessage, setRevokeMessage] = useState(null);
//   const [revokeError, setRevokeError] = useState(null);

//   // Local state to track doctors contacted by patient (simulate)
//   const [contactedDoctors, setContactedDoctors] = useState([]);

//   const sanitizeDoctor = (doc) => ({
//     ...doc,
//     daysOff: Array.isArray(doc.daysOff) ? doc.daysOff : [],
//     phoneNumbers: Array.isArray(doc.phoneNumbers) ? doc.phoneNumbers : [],
//     availableFrom: doc.availableFrom || null,
//     availableTo: doc.availableTo || null,
//     availableForCureentMonth:
//       typeof doc.availableForCureentMonth === "boolean"
//         ? doc.availableForCureentMonth
//         : false,
//     profileImagePath: doc.profileImagePath || "/default-avatar.png",
//     fullName: doc.fullName || "No Name",
//     userName: doc.userName || "N/A",
//     address: doc.address || "N/A",
//   });

//   const fetchDoctors = async () => {
//     const response = await fetch(
//       `https://clearsight.runasp.net/api/Patients/DoctorsList?pageNumber=${pageNumber}&pageSize=${pageSize}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (!response.ok) throw new Error("Please login to see Doctors.");
//     const result = await response.json();
//     if (!result.success) throw new Error(result.message || "API returned error.");
//     return (result.data.items || []).map(sanitizeDoctor);
//   };

//   const fetchAccessDoctors = async () => {
//     const response = await fetch(
//       `https://clearsight.runasp.net/api/Patients/access-list?pageNumber=1&pageSize=1000`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (!response.ok) throw new Error("Please login to see Access List.");
//     const result = await response.json();
//     if (!result.success) throw new Error(result.message || "API returned error.");
//     return result.data.items || [];
//   };

//   const loadData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [docs, accessDocs] = await Promise.all([
//         fetchDoctors(),
//         fetchAccessDoctors(),
//       ]);
//       setDoctors(docs);
//       setAccessDoctors(accessDocs);
//       // Reset contactedDoctors on load if you want to keep track from backend you can modify here
//       // For demo, keep as is
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [pageNumber]);

//   const hasAccess = (doctorId) => {
//     return accessDoctors.some((doc) => doc.doctorId === doctorId);
//   };

//   // Handle Confirm Contact
//   const handleConfirmContact = (doctorId) => {
//     setContactDoctor(null);
//     setContactedDoctors((prev) => [...prev, doctorId]);
//   };

//   // Handle Cancel Contact (simulate removal from contactedDoctors)
//   const handleCancelContact = (doctorId) => {
//     setCancelContactDoctor(null);
//     setContactedDoctors((prev) => prev.filter((id) => id !== doctorId));
//   };

//   const handleRevokeAccess = async (doctorId) => {
//     setRevokeLoading(true);
//     setRevokeMessage(null);
//     setRevokeError(null);

//     try {
//       const response = await fetch(
//         `https://clearsight.runasp.net/api/Patients/revoke-access?doctorId=${doctorId}`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || "Failed to revoke access");
//       }

//       const result = await response.json();
//       if (result.success) {
//         setRevokeMessage("Access revoked successfully.");
//         setAccessDoctors((prev) => prev.filter((d) => d.doctorId !== doctorId));
//         setSelectedDoctorToRevoke(null);
//       } else {
//         throw new Error(result.message || "Failed to revoke access");
//       }
//     } catch (err) {
//       setRevokeError(err.message);
//     } finally {
//       setRevokeLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-teal-50 py-10 px-6 pt-24 mt-1 dark:text-white dark:bg-gray-900">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
//         <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">
//           Doctors List
//         </h1>

//         {loading && <p className="text-center">Loading...</p>}
//         {error && (
//           <p className="text-center text-red-500 font-medium">{error}</p>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {doctors.map((doctor) => {
//             const access = hasAccess(doctor.doctorId);
//             const contacted = contactedDoctors.includes(doctor.doctorId);

//             return (
//               <div
//                 key={doctor.doctorId}
//                 className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-all"
//               >
//                 <div className="flex gap-4">
//                   <img
//                     src={doctor.profileImagePath}
//                     alt={doctor.fullName}
//                     className="w-24 h-24 rounded-full object-cover border border-gray-300"
//                   />
//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold text-[#f17732] flex items-center gap-2">
//                       {doctor.fullName}
//                       {access && (
//                         <span
//                           title="You have granted access to this doctor"
//                           className="bg-green-500 text-white text-xs px-2 py-0.5 rounded"
//                         >
//                           Access Granted
//                         </span>
//                       )}
//                       {contacted && (
//                         <span
//                           title="You have contacted this doctor"
//                           className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded"
//                         >
//                           Contacted
//                         </span>
//                       )}
//                     </h2>
//                     <p className="text-sm text-gray-600">Username: {doctor.userName}</p>
//                     <p className="text-sm text-gray-600">Address: {doctor.address}</p>
//                     <p className="text-sm text-gray-600">
//                       Availability: from {doctor.availableFrom || "Unknown"} to {doctor.availableTo || "Unknown"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Days Off: {doctor.daysOff.length ? doctor.daysOff.join(", ") : "Not specified"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Phone Numbers: {doctor.phoneNumbers.length ? doctor.phoneNumbers.join(", ") : "Not available"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Available This Month: {doctor.availableForCureentMonth ? "Yes" : "No"}
//                     </p>

//                     <div className="mt-4 flex gap-4">
//                       {!contacted ? (
//                         <button
//                           onClick={() => setContactDoctor(doctor)}
//                           className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
//                         >
//                           Contact Doctor
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => setCancelContactDoctor(doctor)}
//                           className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
//                         >
//                           Cancel Contact
//                         </button>
//                       )}

//                       {access && (
//                         <button
//                           onClick={() => setSelectedDoctorToRevoke(doctor)}
//                           className="px-4 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
//                         >
//                           Revoke Access
//                         </button>
//                       )}

//                       <button
//                         onClick={() => setSelectedDoctorDetails(doctor)}
//                         className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
//                       >
//                         Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center gap-4 mt-6">
//           <button
//             onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
//             disabled={pageNumber === 1}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="px-3 py-1 bg-gray-100 rounded">Page {pageNumber}</span>
//           <button
//             onClick={() => setPageNumber((p) => p + 1)}
//             className="px-3 py-1 bg-gray-300 rounded"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modals */}

//       {/* Confirm Contact Modal */}
//       {contactDoctor && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//           onClick={() => setContactDoctor(null)}
//         >
//           <div
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setContactDoctor(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
//               Do you want to confirm contact with Dr. {contactDoctor.fullName}?
//             </h3>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setContactDoctor(null)}
//                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => handleConfirmContact(contactDoctor.doctorId)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Confirm Contact
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cancel Contact Modal */}
//       {cancelContactDoctor && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//           onClick={() => setCancelContactDoctor(null)}
//         >
//           <div
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setCancelContactDoctor(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
//               Are you sure you want to cancel contact with Dr. {cancelContactDoctor.fullName}?
//             </h3>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setCancelContactDoctor(null)}
//                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 No
//               </button>

//               <button
//                 onClick={() => handleCancelContact(cancelContactDoctor.doctorId)}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Yes, Cancel Contact
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Revoke Access Modal */}
//       {selectedDoctorToRevoke && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//           onClick={() => setSelectedDoctorToRevoke(null)}
//         >
//           <div
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedDoctorToRevoke(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
//               Are you sure you want to revoke access for Dr.{" "}
//               {selectedDoctorToRevoke.fullName}?
//             </h3>

//             {revokeError && (
//               <p className="text-red-600 font-semibold mb-2">{revokeError}</p>
//             )}
//             {revokeMessage && (
//               <p className="text-green-600 font-semibold mb-2">{revokeMessage}</p>
//             )}

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setSelectedDoctorToRevoke(null)}
//                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 disabled={revokeLoading}
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => handleRevokeAccess(selectedDoctorToRevoke.doctorId)}
//                 className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                 disabled={revokeLoading}
//               >
//                 {revokeLoading ? "Processing..." : "Revoke Access"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Doctor Details Modal */}
//       {selectedDoctorDetails && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//           onClick={() => setSelectedDoctorDetails(null)}
//         >
//           <div
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedDoctorDetails(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
//               Dr. {selectedDoctorDetails.fullName} Details
//             </h3>

//             <p><strong>Username:</strong> {selectedDoctorDetails.userName}</p>
//             <p><strong>Address:</strong> {selectedDoctorDetails.address}</p>
//             <p><strong>Availability:</strong> from {selectedDoctorDetails.availableFrom || "Unknown"} to {selectedDoctorDetails.availableTo || "Unknown"}</p>
//             <p><strong>Days Off:</strong> {selectedDoctorDetails.daysOff.length ? selectedDoctorDetails.daysOff.join(", ") : "Not specified"}</p>
//             <p><strong>Phone Numbers:</strong> {selectedDoctorDetails.phoneNumbers.length ? selectedDoctorDetails.phoneNumbers.join(", ") : "Not available"}</p>
//             <p><strong>Available This Month:</strong> {selectedDoctorDetails.availableForCureentMonth ? "Yes" : "No"}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorsList;

/////////////////////////////
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const DoctorsList = () => {
  const { token } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [accessDoctors, setAccessDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const pageSize = 5;

  const [selectedDoctorToRevoke, setSelectedDoctorToRevoke] = useState(null);
  const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null);
  const [contactDoctor, setContactDoctor] = useState(null);
  const [cancelContactDoctor, setCancelContactDoctor] = useState(null);
  const [revokeLoading, setRevokeLoading] = useState(false);
  const [revokeMessage, setRevokeMessage] = useState(null);
  const [revokeError, setRevokeError] = useState(null);
  const [contactedDoctors, setContactedDoctors] = useState([]);

  // Grant Access States
  const [selectedDoctorToGrant, setSelectedDoctorToGrant] = useState(null);
  const [grantLoading, setGrantLoading] = useState(false);
  const [grantMessage, setGrantMessage] = useState(null);
  const [grantError, setGrantError] = useState(null);

  const sanitizeDoctor = (doc) => ({
    ...doc,
    daysOff: Array.isArray(doc.daysOff) ? doc.daysOff : [],
    phoneNumbers: Array.isArray(doc.phoneNumbers) ? doc.phoneNumbers : [],
    availableFrom: doc.availableFrom || null,
    availableTo: doc.availableTo || null,
    availableForCureentMonth:
      typeof doc.availableForCureentMonth === "boolean"
        ? doc.availableForCureentMonth
        : false,
    profileImagePath: doc.profileImagePath || "/default-avatar.png",
    fullName: doc.fullName || "No Name",
    userName: doc.userName || "N/A",
    address: doc.address || "N/A",
  });

  const fetchDoctors = async () => {
    const response = await fetch(
      `https://clearsight.runasp.net/api/Patients/DoctorsList?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Please login to see Doctors.");
    const result = await response.json();
    if (!result.success)
      throw new Error(result.message || "API returned error.");
    return (result.data.items || []).map(sanitizeDoctor);
  };

  const fetchAccessDoctors = async () => {
    const response = await fetch(
      `https://clearsight.runasp.net/api/Patients/access-list?pageNumber=1&pageSize=1000`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Please login to see Access List.");
    const result = await response.json();
    if (!result.success)
      throw new Error(result.message || "API returned error.");
    return result.data.items || [];
  };

  // Grant Access Function (من GrantAccessPage)
  const handleGrantAccess = async (doctorId) => {
    setGrantLoading(true);
    setGrantMessage(null);
    setGrantError(null);

    try {
      const response = await fetch(
        `https://clearsight.runasp.net/api/Patients/grant-access?doctorId=${doctorId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to grant access.");
      }

      const result = await response.json();
      if (result.success || response.ok) {
        setGrantMessage("✅ Access granted successfully!");
        // Update access doctors list
        const updatedAccessDoctors = await fetchAccessDoctors();
        setAccessDoctors(updatedAccessDoctors);
        // Close modal after 1.5 seconds
        setTimeout(() => {
          setSelectedDoctorToGrant(null);
          setGrantMessage(null);
        }, 1500);
      } else {
        throw new Error(result.message || "Failed to grant access");
      }
    } catch (err) {
      setGrantError(`❌ Error: ${err.message}`);
    } finally {
      setGrantLoading(false);
    }
  };

  const searchDoctors = async () => {
    if (!query) {
      setFilteredDoctors(doctors);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    try {
      const response = await fetch(
        `https://clearsight.runasp.net/api/Patients/SearchUsingDoctorName?pageNumber=1&pageSize=5&doctorName=${query}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search for doctors.");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "API returned error.");
      }

      setFilteredDoctors((result.data.items || []).map(sanitizeDoctor));
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [docs, accessDocs] = await Promise.all([
        fetchDoctors(),
        fetchAccessDoctors(),
      ]);
      setDoctors(docs);
      setFilteredDoctors(docs);
      setAccessDoctors(accessDocs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pageNumber]);

  useEffect(() => {
    searchDoctors();
  }, [query, doctors]);

  const hasAccess = (doctorId) => {
    return accessDoctors.some((doc) => doc.doctorId === doctorId);
  };

  const handleConfirmContact = (doctorId) => {
    setContactDoctor(null);
    setContactedDoctors((prev) => [...prev, doctorId]);
  };

  const handleCancelContact = (doctorId) => {
    setCancelContactDoctor(null);
    setContactedDoctors((prev) => prev.filter((id) => id !== doctorId));
  };

  const handleRevokeAccess = async (doctorId) => {
    setRevokeLoading(true);
    setRevokeMessage(null);
    setRevokeError(null);

    try {
      const response = await fetch(
        `https://clearsight.runasp.net/api/Patients/revoke-access?doctorId=${doctorId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to revoke access");
      }

      const result = await response.json();
      if (result.success) {
        setRevokeMessage("Access revoked successfully.");
        setAccessDoctors((prev) => prev.filter((d) => d.doctorId !== doctorId));
        setSelectedDoctorToRevoke(null);
      } else {
        throw new Error(result.message || "Failed to revoke access");
      }
    } catch (err) {
      setRevokeError(err.message);
    } finally {
      setRevokeLoading(false);
    }
  };

  //   return (
  //     <div className="min-h-screen bg-teal-50 py-10 px-6 pt-24 mt-1 dark:text-white dark:bg-gray-900">
  //       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6 dark:bg-slate-900">
  //         <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">
  //           Doctors List
  //         </h1>

  //         <div className="flex justify-center mb-6 dark:bg-slate-900">
  //           <input
  //             type="text"
  //             value={query}
  //             onChange={(e) => setQuery(e.target.value)}
  //             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg hover:border-spacing-7 dark:text-white"
  //             placeholder="Enter doctor's name"
  //           />
  //         </div>

  //         {loading && <p className="text-center">Loading...</p>}
  //         {error && (
  //           <p className="text-center text-red-500 font-medium">{error}</p>
  //         )}
  //         {searchLoading && <p className="text-center">Searching...</p>}
  //         {searchError && (
  //           <p className="text-center text-red-500 font-medium">{searchError}</p>
  //         )}

  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-slate-900">
  //           {filteredDoctors.map((doctor) => {
  //             const access = hasAccess(doctor.doctorId);
  //             const contacted = contactedDoctors.includes(doctor.doctorId);

  //             return (
  //               <div
  //                 key={doctor.doctorId}
  //                 className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-all"
  //               >
  //                 <div className="flex gap-4">
  //                   <img
  //                     src={doctor.profileImagePath}
  //                     alt={doctor.fullName}
  //                     className="w-24 h-24 rounded-full object-cover border border-gray-300"
  //                   />
  //                   <div className="flex-1">
  //                     <h2 className="text-lg font-semibold text-[#f17732] flex items-center gap-2">
  //                       {doctor.fullName}
  //                       {access && (
  //                         <span
  //                           title="You have granted access to this doctor"
  //                           className="bg-green-500 text-white text-xs px-2 py-0.5 rounded"
  //                         >
  //                           Access Granted
  //                         </span>
  //                       )}
  //                       {contacted && (
  //                         <span
  //                           title="You have contacted this doctor"
  //                           className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded"
  //                         >
  //                           Contacted
  //                         </span>
  //                       )}
  //                     </h2>
  //                     <p className="text-sm text-gray-600">Username: {doctor.userName}</p>
  //                     <p className="text-sm text-gray-600">Address: {doctor.address}</p>
  //                     <p className="text-sm text-gray-600">
  //                       Availability: from {doctor.availableFrom || "Unknown"} to {doctor.availableTo || "Unknown"}
  //                     </p>
  //                     <p className="text-sm text-gray-600">
  //                       Days Off: {doctor.daysOff.length ? doctor.daysOff.join(", ") : "Not specified"}
  //                     </p>
  //                     <p className="text-sm text-gray-600">
  //                       Phone Numbers: {doctor.phoneNumbers.length ? doctor.phoneNumbers.join(", ") : "Not available"}
  //                     </p>
  //                     <p className="text-sm text-gray-600">
  //                       Available This Month: {doctor.availableForCureentMonth ? "Yes" : "No"}
  //                     </p>

  //                     <div className="mt-4 flex gap-2 flex-wrap">
  //                       {/* {!contacted ? (
  //                         <button
  //                           onClick={() => setContactDoctor(doctor)}
  //                           className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
  //                         >
  //                           Contact Doctor
  //                         </button>
  //                       ) : (
  //                         <button
  //                           onClick={() => setCancelContactDoctor(doctor)}
  //                           className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
  //                         >
  //                           Cancel Contact
  //                         </button>
  //                       )} */}

  //                       {/* Grant Access Button - يظهر بس لو مش عنده access */}
  //                       {!access && (
  //                         <button
  //                           onClick={() => setSelectedDoctorToGrant(doctor)}
  //                           className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
  //                         >
  //                           Grant Access
  //                         </button>
  //                       )}

  //                       {/* Revoke Access Button - يظهر بس لو عنده access */}
  //                       {access && (
  //                         <button
  //                           onClick={() => setSelectedDoctorToRevoke(doctor)}
  //                           className="px-3 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
  //                         >
  //                           Revoke Access
  //                         </button>
  //                       )}

  //                       <button
  //                         onClick={() => setSelectedDoctorDetails(doctor)}
  //                         className="px-3 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
  //                       >
  //                         Details
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             );
  //           })}
  //         </div>

  //         <div className="flex justify-center gap-4 mt-6">
  //           <button
  //             onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
  //             disabled={pageNumber === 1}
  //             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  //           >
  //             Previous
  //           </button>
  //           <span className="px-3 py-1 bg-gray-100 rounded">Page {pageNumber}</span>
  //           <button
  //             onClick={() => setPageNumber((p) => p + 1)}
  //             className="px-3 py-1 bg-gray-300 rounded"
  //           >
  //             Next
  //           </button>
  //         </div>
  //       </div>

  //       {/* Grant Access Modal */}
  //       {selectedDoctorToGrant && (
  //         <div
  //           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
  //           onClick={() => setSelectedDoctorToGrant(null)}
  //         >
  //           <div
  //             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
  //             onClick={(e) => e.stopPropagation()}
  //           >
  //             <button
  //               onClick={() => setSelectedDoctorToGrant(null)}
  //               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
  //             >
  //               ×
  //             </button>

  //             <h3 className="text-xl font-semibold text-[#5f6FFF] mb-4">
  //               Grant Access to Dr. {selectedDoctorToGrant.fullName}
  //             </h3>

  //             <p className="text-center mb-4">
  //               Do you want to grant access to Doctor ID:{" "}
  //               <span className="font-bold text-gray-700">{selectedDoctorToGrant.doctorId}</span>?
  //             </p>

  //             {grantError && (
  //               <p className="text-red-600 font-semibold mb-2 text-center">{grantError}</p>
  //             )}
  //             {grantMessage && (
  //               <p className="text-green-600 font-semibold mb-2 text-center">{grantMessage}</p>
  //             )}

  //             <div className="flex justify-center gap-4">
  //               <button
  //                 onClick={() => setSelectedDoctorToGrant(null)}
  //                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
  //                 disabled={grantLoading}
  //               >
  //                 Cancel
  //               </button>

  //               <button
  //                 onClick={() => handleGrantAccess(selectedDoctorToGrant.doctorId)}
  //                 className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
  //                 disabled={grantLoading}
  //               >
  //                 {grantLoading ? "Processing..." : "Grant Access"}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Contact Doctor Modal */}
  //       {contactDoctor && (
  //         <div
  //           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
  //           onClick={() => setContactDoctor(null)}
  //         >
  //           <div
  //             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
  //             onClick={(e) => e.stopPropagation()}
  //           >
  //             <button
  //               onClick={() => setContactDoctor(null)}
  //               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
  //             >
  //               ×
  //             </button>

  //             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
  //               Do you want to confirm contact with Dr. {contactDoctor.fullName}?
  //             </h3>

  //             <div className="flex justify-end gap-4">
  //               <button
  //                 onClick={() => setContactDoctor(null)}
  //                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
  //               >
  //                 Cancel
  //               </button>

  //               <button
  //                 onClick={() => handleConfirmContact(contactDoctor.doctorId)}
  //                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  //               >
  //                 Confirm Contact
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Cancel Contact Modal */}
  //       {cancelContactDoctor && (
  //         <div
  //           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
  //           onClick={() => setCancelContactDoctor(null)}
  //         >
  //           <div
  //             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
  //             onClick={(e) => e.stopPropagation()}
  //           >
  //             <button
  //               onClick={() => setCancelContactDoctor(null)}
  //               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
  //             >
  //               ×
  //             </button>

  //             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
  //               Are you sure you want to cancel contact with Dr. {cancelContactDoctor.fullName}?
  //             </h3>

  //             <div className="flex justify-end gap-4">
  //               <button
  //                 onClick={() => setCancelContactDoctor(null)}
  //                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
  //               >
  //                 No
  //               </button>

  //               <button
  //                 onClick={() => handleCancelContact(cancelContactDoctor.doctorId)}
  //                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
  //               >
  //                 Yes, Cancel Contact
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Revoke Access Modal */}
  //       {selectedDoctorToRevoke && (
  //         <div
  //           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
  //           onClick={() => setSelectedDoctorToRevoke(null)}
  //         >
  //           <div
  //             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
  //             onClick={(e) => e.stopPropagation()}
  //           >
  //             <button
  //               onClick={() => setSelectedDoctorToRevoke(null)}
  //               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
  //             >
  //               ×
  //             </button>

  //             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
  //               Are you sure you want to revoke access for Dr.{" "}
  //               {selectedDoctorToRevoke.fullName}?
  //             </h3>

  //             {revokeError && (
  //               <p className="text-red-600 font-semibold mb-2">{revokeError}</p>
  //             )}
  //             {revokeMessage && (
  //               <p className="text-green-600 font-semibold mb-2">{revokeMessage}</p>
  //             )}

  //             <div className="flex justify-end gap-4">
  //               <button
  //                 onClick={() => setSelectedDoctorToRevoke(null)}
  //                 className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
  //                 disabled={revokeLoading}
  //               >
  //                 Cancel
  //               </button>

  //               <button
  //                 onClick={() => handleRevokeAccess(selectedDoctorToRevoke.doctorId)}
  //                 className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
  //                 disabled={revokeLoading}
  //               >
  //                 {revokeLoading ? "Processing..." : "Revoke Access"}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Doctor Details Modal */}
  //       {selectedDoctorDetails && (
  //         <div
  //           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
  //           onClick={() => setSelectedDoctorDetails(null)}
  //         >
  //           <div
  //             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
  //             onClick={(e) => e.stopPropagation()}
  //           >
  //             <button
  //               onClick={() => setSelectedDoctorDetails(null)}
  //               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
  //             >
  //               ×
  //             </button>

  //             <h3 className="text-xl font-semibold text-[#f17732] mb-4">
  //               Dr. {selectedDoctorDetails.fullName} Details
  //             </h3>

  //             <p><strong>Username:</strong> {selectedDoctorDetails.userName}</p>
  //             <p><strong>Address:</strong> {selectedDoctorDetails.address}</p>
  //             <p><strong>Availability:</strong> from {selectedDoctorDetails.availableFrom || "Unknown"} to {selectedDoctorDetails.availableTo || "Unknown"}</p>
  //             <p><strong>Days Off:</strong> {selectedDoctorDetails.daysOff.length ? selectedDoctorDetails.daysOff.join(", ") : "Not specified"}</p>
  //             <p><strong>Phone Numbers:</strong> {selectedDoctorDetails.phoneNumbers.length ? selectedDoctorDetails.phoneNumbers.join(", ") : "Not available"}</p>
  //             <p><strong>Available This Month:</strong> {selectedDoctorDetails.availableForCureentMonth ? "Yes" : "No"}</p>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  ////////////////
    return (
    <div className="min-h-screen bg-slate-300 py-10 px-6 pt-24 mt-1 dark:text-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">
          Doctors List
        </h1>

        <div className="flex justify-center mb-6 dark:bg-slate-900">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg hover:border-spacing-7 dark:text-white"
            placeholder="Enter doctor's name"
          />
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}
        {searchLoading && <p className="text-center">Searching...</p>}
        {searchError && (
          <p className="text-center text-red-500 font-medium">{searchError}</p>
        )}

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filteredDoctors.map((doctor) => {
            const access = hasAccess(doctor.doctorId);
            const contacted = contactedDoctors.includes(doctor.doctorId);

            return (
              <div
                key={doctor.doctorId}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  className="bg-blue-50 w-full h-48 object-cover"
                  src={doctor.profileImagePath}
                  alt={doctor.fullName}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500 mb-2">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>
                      {doctor.availableForCureentMonth
                        ? "Available"
                        : "Not Available"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-orange-500 text-lg font-bold dark:text-white">
                      {doctor.fullName}
                    </p>
                    {access && (
                      <span
                        title="You have granted access to this doctor"
                        className="bg-green-500 text-white text-xs px-2 py-0.5 rounded"
                      >
                        Access Granted
                      </span>
                    )}
                    {contacted && (
                      <span
                        title="You have contacted this doctor"
                        className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded"
                      >
                        Contacted
                      </span>
                    )}
                  </div>

                  <p className="mb-1 font-semibold text-gray-600 dark:text-white">
                    <span className="text-primary dark:text-indigo-400">
                      Username:{" "}
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      {doctor.userName}
                    </span>
                  </p>
                  <p className="mb-1  font-semibold text-gray-600 dark:text-white">
                    <span className="text-primary dark:text-indigo-400">
                      Address:{" "}
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      {doctor.address}
                    </span>
                  </p>
                  <p className="mb-1 font-semibold text-gray-600 dark:text-white">
                    <span className="text-primary dark:text-indigo-400">
                      Availability:{" "}
                    </span>
                    <span className="text-gray-800  font-semibold dark:text-white">
                      from {doctor.availableFrom || "Unknown"} - to{" "}
                      {doctor.availableTo || "Unknown"}
                    </span>
                  </p>

                  <p className="mb-1 font-semibold text-gray-600 dark:text-white">
                    <span className="text-primary dark:text-indigo-400">
                      Days Off:{" "}
                    </span>
                    <span className="text-gray-800  font-semibold dark:text-white">
                      {doctor.daysOff.length
                        ? doctor.daysOff.join(", ")
                        : "Not specified"}
                    </span>
                  </p>

                  <p className="mb-1  font-semibold text-gray-600 dark:text-white">
                    <span className="text-primary dark:text-indigo-400">
                      Phone:{" "}
                    </span>
                    <span className="text-gray-800  font-semibold dark:text-white">
                      {doctor.phoneNumbers.length
                        ? doctor.phoneNumbers.join(", ")
                        : "Not available"}
                    </span>
                  </p>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {/* Grant Access Button - يظهر بس لو مش عنده access */}
                    {!access && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoctorToGrant(doctor);
                        }}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Grant Access
                      </button>
                    )}

                    {/* Revoke Access Button - يظهر بس لو عنده access */}
                    {access && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoctorToRevoke(doctor);
                        }}
                        className="px-3 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                      >
                        Revoke Access
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDoctorDetails(doctor);
                      }}
                      className="px-3 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber === 1}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Previous
          </button>
          <span className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Page {pageNumber}
          </span>
          <button
            onClick={() => setPageNumber((p) => p + 1)}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>

      {/* Grant Access Modal */}
      {selectedDoctorToGrant && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedDoctorToGrant(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoctorToGrant(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-[#5f6FFF] mb-4">
              Grant Access to Dr. {selectedDoctorToGrant.fullName}
            </h3>

            <p className="text-center mb-4">
              Do you want to grant access to Doctor ID:{" "}
              <span className="font-bold text-gray-700">
                {selectedDoctorToGrant.doctorId}
              </span>
              ?
            </p>

            {grantError && (
              <p className="text-red-600 font-semibold mb-2 text-center">
                {grantError}
              </p>
            )}
            {grantMessage && (
              <p className="text-green-600 font-semibold mb-2 text-center">
                {grantMessage}
              </p>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSelectedDoctorToGrant(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={grantLoading}
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleGrantAccess(selectedDoctorToGrant.doctorId)
                }
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                disabled={grantLoading}
              >
                {grantLoading ? "Processing..." : "Grant Access"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Doctor Modal */}
      {contactDoctor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setContactDoctor(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setContactDoctor(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-[#f17732] mb-4">
              Do you want to confirm contact with Dr. {contactDoctor.fullName}?
            </h3>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setContactDoctor(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={() => handleConfirmContact(contactDoctor.doctorId)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Contact Modal */}
      {cancelContactDoctor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setCancelContactDoctor(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCancelContactDoctor(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-[#f17732] mb-4">
              Are you sure you want to cancel contact with Dr.{" "}
              {cancelContactDoctor.fullName}?
            </h3>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setCancelContactDoctor(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                No
              </button>

              <button
                onClick={() =>
                  handleCancelContact(cancelContactDoctor.doctorId)
                }
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Cancel Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Access Modal */}
      {selectedDoctorToRevoke && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedDoctorToRevoke(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoctorToRevoke(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-[#f17732] mb-4">
              Are you sure you want to revoke access for Dr.{" "}
              {selectedDoctorToRevoke.fullName}?
            </h3>

            {revokeError && (
              <p className="text-red-600 font-semibold mb-2">{revokeError}</p>
            )}
            {revokeMessage && (
              <p className="text-green-600 font-semibold mb-2">
                {revokeMessage}
              </p>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedDoctorToRevoke(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={revokeLoading}
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleRevokeAccess(selectedDoctorToRevoke.doctorId)
                }
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                disabled={revokeLoading}
              >
                {revokeLoading ? "Processing..." : "Revoke Access"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Details Modal */}
      {selectedDoctorDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDoctorDetails(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoctorDetails(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-[#f17732] mb-4">
              Dr. {selectedDoctorDetails.fullName} Details
            </h3>

            <div className="flex flex-col items-center mb-4">
              <img
                src={selectedDoctorDetails.profileImagePath}
                alt={selectedDoctorDetails.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 mb-4"
              />
            </div>

            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {selectedDoctorDetails.userName}
              </p>
              <p>
                <strong>Address:</strong> {selectedDoctorDetails.address}
              </p>
              <p>
                <strong>Availability:</strong> from{" "}
                {selectedDoctorDetails.availableFrom || "Unknown"} to{" "}
                {selectedDoctorDetails.availableTo || "Unknown"}
              </p>
              <p>
                <strong>Days Off:</strong>{" "}
                {selectedDoctorDetails.daysOff.length
                  ? selectedDoctorDetails.daysOff.join(", ")
                  : "Not specified"}
              </p>
              <p>
                <strong>Phone Numbers:</strong>{" "}
                {selectedDoctorDetails.phoneNumbers.length
                  ? selectedDoctorDetails.phoneNumbers.join(", ")
                  : "Not available"}
              </p>
              <p>
                <strong>Available This Month:</strong>{" "}
                {selectedDoctorDetails.availableForCureentMonth ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
