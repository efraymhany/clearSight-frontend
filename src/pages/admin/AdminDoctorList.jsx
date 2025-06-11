// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AppContext } from "../../context/AppContext";
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const AdminDoctorsList = () => {
//   const { token } = useContext(AppContext);
//   const [doctors, setDoctors] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize] = useState(5);
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchActivateDoctors = async () => {
//     try {
//       const response = await axios.get(`https://clearsight.runasp.net/api/Admins/ActivateDoctorsList`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           accept: 'text/plain',
//         },
//         params: {
//           pageNumber,
//           pageSize,
//         },
//       });

//       const data = response.data.data;
//       setDoctors(data.items);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       toast.error("Unauthorized or failed to fetch.");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchActivateDoctors();
//   }, [pageNumber]);

//   const handlePrev = () => {
//     if (pageNumber > 1) setPageNumber((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (pageNumber < totalPages) setPageNumber((prev) => prev + 1);
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Doctors Awaiting Activation</h2>

//       {doctors.length === 0 ? (
//         <p className="text-center text-gray-500">No doctors found on this page.</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {doctors.map((doctor) => (
//             <motion.div
//               key={doctor.doctorId}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
//             >
//               <img
//                 src={doctor.profileImagePath}
//                 alt={doctor.fullName}
//                 className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
//               />
//               <h3 className="text-xl font-semibold text-center text-blue-800">
//                 <Link to={`/admin/activate-doctor/${doctor.doctorId}`} className="hover:underline">
//                   {doctor.fullName}
//                 </Link>
//               </h3>
//               <p className="text-center text-gray-700">
//                 Username:{' '}
//                 <Link to={`/admin/activate-doctor/${doctor.doctorId}`} className="text-blue-600 hover:underline">
//                   {doctor.userName}
//                 </Link>
//               </p>
//               <p className="text-center text-gray-600">Address: {doctor.address}</p>
//               <p className="text-center text-gray-600">Phone: {doctor.phoneNumbers?.join(', ')}</p>
//               <div className="text-center mt-3">
//                 <a
//                   href={doctor.uploadedDocumentPath}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-blue-500 underline"
//                 >
//                   View Uploaded Document
//                 </a>
//               </div>
//               <div className="mt-4 text-center">
//                 <Link
//                   // to={`/admin/activate-doctor/${doctor.doctorId}`}
//                   to={`/adminDashboard/activate-doctor/${doctor.doctorId}`}

//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-4 mt-8">
//         <button
//           onClick={handlePrev}
//           disabled={pageNumber === 1}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-gray-700">
//           Page {pageNumber} of {totalPages}
//         </span>
//         <button
//           onClick={handleNext}
//           disabled={pageNumber === totalPages}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDoctorsList;
//////
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from "../../context/AppContext";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDoctorsList = () => {
  const { token } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const fetchActivateDoctors = async () => {
    try {
      const response = await axios.get(`https://clearsight.runasp.net/api/Admins/ActivateDoctorsList`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'text/plain',
        },
        params: {
          pageNumber,
          pageSize,
        },
      });

      const data = response.data.data;
      setDoctors(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Unauthorized or failed to fetch.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivateDoctors();
  }, [pageNumber]);

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages) setPageNumber((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Doctors Awaiting Activation</h2>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors found on this page.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.doctorId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-2xl p-8 border border-blue-100 hover:shadow-2xl transition-all flex flex-col items-center"
            >
              <img
                src={doctor.profileImagePath}
                alt={doctor.fullName}
                className="w-28 h-28 rounded-full object-cover shadow border-2 border-blue-300 mb-4"
              />

              <h3 className="text-xl font-bold text-blue-800 text-center mb-2">
                <Link to={`/adminDashboard/activate-doctor/${doctor.doctorId}`} className="hover:underline">
                  {doctor.fullName}
                </Link>
              </h3>

              <div className="text-center space-y-1">
                <p className="text-gray-700">
                  <span className="font-medium text-gray-600">Username:</span>{' '}
                  <span className="text-blue-700 font-semibold">{doctor.userName}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-600">Address:</span>{' '}
                  <span className="text-blue-700">{doctor.address || 'N/A'}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-600">Phone:</span>{' '}
                  <span className="text-blue-700">{doctor.phoneNumbers?.join(", ") || 'N/A'}</span>
                </p>
              </div>

              <div className="mt-2">
                <a
                  href={doctor.uploadedDocumentPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 underline"
                >
                  View Uploaded Document
                </a>
              </div>

              <div className="mt-4">
                <Link
                  to={`/adminDashboard/activate-doctor/${doctor.doctorId}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            disabled={pageNumber === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Previous
          </button>
          <span className="text-gray-700 text-sm">
            Page {pageNumber} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={pageNumber === totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default AdminDoctorsList;
