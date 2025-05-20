// import React, { useEffect, useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const DoctorsList = () => {
//   const { token } = useContext(AppContext);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const pageSize = 5;

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
//         throw new Error("Failed to fetch doctors.");
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

//   return (
//     <div className="min-h-screen bg-teal-50 py-10 px-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
//         <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">
//           Doctors List
//         </h1>

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
// =========================
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorsList = () => {
  const { token } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate(); // Use navigate hook to navigate between pages

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
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

      if (!response.ok) {
        throw new Error("Failed to fetch doctors.");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "API returned error.");
      }

      setDoctors(result.data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [pageNumber]);

  // Function to handle search navigation
  const handleSearchClick = () => {
    navigate("/doctorSearch");
  };

  return (
    <div className="min-h-screen bg-teal-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">
          Doctors List
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Search for a doctor..."
            onClick={handleSearchClick} // Navigate to search page when clicked
          />
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.doctorId}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div className="flex gap-4">
                <img
                  src={doctor.profileImagePath || "/default-avatar.png"}
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 className="text-lg font-semibold text-[#f17732]">
                    {doctor.fullName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Username: {doctor.userName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: {doctor.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    Available: {doctor.availableFrom} to {doctor.availableTo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Days Off: {doctor.daysOff.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phones: {doctor.phoneNumbers.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Available This Month:{" "}
                    {doctor.availableForCureentMonth ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
            className="px-4 py-2 bg-[#f17732] text-white rounded hover:opacity-90 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            className="px-4 py-2 bg-[#5f6FFF] text-white rounded hover:opacity-90"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
