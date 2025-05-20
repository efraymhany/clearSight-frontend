// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "../context/AppContext";

// const EditDoctorProfile = () => {
//   const { token } = useContext(AppContext); // Get token from context
//   const [formData, setFormData] = useState({
//     fullName: "",
//     availableFrom: "",
//     availableTo: "",
//     daysOff: [],
//     phoneNumbers: [],
//     profileImage: null,
//     availableForCurrentMonth: false,
//     address: "",
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else if (name === "daysOff" || name === "phoneNumbers") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value.split(",").map((item) => item.trim()),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     const data = new FormData();
//     data.append("FULLNAME", formData.fullName);
//     data.append("AVAILABLE($)From", formData.availableFrom);
//     data.append("AVAILABLE($)To", formData.availableTo);
//     formData.daysOff.forEach((day, index) =>
//       data.append(`DAYSOFF[${index}]`, day)
//     );
//     formData.phoneNumbers.forEach((number, index) =>
//       data.append(`PHONENUMBERS[${index}]`, number)
//     );
//     if (formData.profileImage) {
//       data.append("PROFILEIMAGE", formData.profileImage);
//     }
//     data.append("AvailableForCurrentMonth", formData.availableForCurrentMonth);
//     data.append("ADDRESS", formData.address);

//     try {
//       const response = await fetch(
//         "https://clearsight.runasp.net/api/Doctors/EditProfile",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: data,
//         }
//       );

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to update profile.");
//       }

//       setSuccess(result.message || "Profile updated successfully!");
//     } catch (err) {
//       setError(err.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setFormData({
//       fullName: "",
//       availableFrom: "",
//       availableTo: "",
//       daysOff: [],
//       phoneNumbers: [],
//       profileImage: null,
//       availableForCurrentMonth: false,
//       address: "",
//     });
//     setError(null);
//     setSuccess(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
//         <h1 className="text-2xl font-bold text-gray-800 text-center">
//           Edit Doctor Profile
//         </h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="Enter full name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Available From
//             </label>
//             <input
//               type="text"
//               name="availableFrom"
//               value={formData.availableFrom}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="e.g., 09:00 AM"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Available To
//             </label>
//             <input
//               type="text"
//               name="availableTo"
//               value={formData.availableTo}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="e.g., 05:00 PM"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Days Off (comma-separated)
//             </label>
//             <input
//               type="text"
//               name="daysOff"
//               value={formData.daysOff.join(", ")}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="e.g., Saturday, Sunday"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Phone Numbers (comma-separated)
//             </label>
//             <input
//               type="text"
//               name="phoneNumbers"
//               value={formData.phoneNumbers.join(", ")}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="e.g., +1234567890, +0987654321"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Profile Image
//             </label>
//             <input
//               type="file"
//               name="profileImage"
//               onChange={handleFileChange}
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           </div>

//           <div>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="availableForCurrentMonth"
//                 checked={formData.availableForCurrentMonth}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <span className="ml-2 text-sm text-gray-700">
//                 Available for Current Month
//               </span>
//             </label>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="Enter address"
//             />
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={handleClear}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
//             >
//               Clear
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditDoctorProfile;
// ==============================================


// import React, { useState, useContext, useEffect } from "react";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const EditDoctorProfile = () => {
//   const { token } = useContext(AppContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     availableFrom: "",
//     availableTo: "",
//     daysOff: [],
//     phoneNumbers: [],
//     profileImage: null,
//     availableForCurrentMonth: false,
//     address: "",
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else if (name === "daysOff" || name === "phoneNumbers") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value.split(",").map((item) => item.trim()),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     const data = new FormData();
//     data.append("FULLNAME", formData.fullName);
//     data.append("AVAILABLE($)From", formData.availableFrom);
//     data.append("AVAILABLE($)To", formData.availableTo);
//     formData.daysOff.forEach((day, index) =>
//       data.append(`DAYSOFF[${index}]`, day)
//     );
//     formData.phoneNumbers.forEach((number, index) =>
//       data.append(`PHONENUMBERS[${index}]`, number)
//     );
//     if (formData.profileImage) {
//       data.append("PROFILEIMAGE", formData.profileImage);
//     }
//     data.append("AvailableForCurrentMonth", formData.availableForCurrentMonth);
//     data.append("ADDRESS", formData.address);

//     try {
//       const response = await fetch(
//         "https://clearsight.runasp.net/api/Doctors/EditProfile",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: data,
//         }
//       );

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to update profile.");
//       }

//       setSuccess(result.message || "Profile updated successfully");
//     } catch (err) {
//       setError(err.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-teal-50 flex justify-center items-center py-10 px-4 relative overflow-hidden"
//     >
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute w-20 h-20 bg-[#f17732] rotate-45 opacity-20 animate-spin-slow" style={{ top: "15%", left: "10%" }} />
//         <div className="absolute w-24 h-24 bg-[#5f6FFF] clip-hexagon opacity-20 animate-float" style={{ bottom: "15%", right: "12%" }} />
//         <div className="absolute w-16 h-16 bg-[#5f6FFF] rotate-12 opacity-10 animate-spin-slower" style={{ top: "60%", left: "8%" }} />
//       </div>

//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-[#f17732] to-[#5f6FFF] text-white text-center py-6 relative">
//           <button
//             onClick={() => navigate(-1)}
//             className="absolute left-4 top-4 text-white hover:scale-110 transition"
//           >
//             ←
//           </button>
//           <h2 className="text-2xl font-bold">Edit Doctor Profile</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
//           {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}

//           <div className="flex justify-center">
//             <div className="w-36 h-36 border-4 border-white rounded-full shadow-lg overflow-hidden">
//               {formData.profileImage ? (
//                 <img
//                   src={URL.createObjectURL(formData.profileImage)}
//                   alt="Doctor"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <svg className="w-full h-full text-[#f17732]" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                 </svg>
//               )}
//             </div>
//           </div>

//           <input type="file" name="profileImage" onChange={handleFileChange} className="block w-full" />

//           <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} />
//           <Input name="availableFrom" label="Available From" value={formData.availableFrom} onChange={handleInputChange} />
//           <Input name="availableTo" label="Available To" value={formData.availableTo} onChange={handleInputChange} />
//           <Input name="daysOff" label="Days Off (comma separated)" value={formData.daysOff.join(", ")} onChange={handleInputChange} />
//           <Input name="phoneNumbers" label="Phone Numbers (comma separated)" value={formData.phoneNumbers.join(", ")} onChange={handleInputChange} />
//           <Input name="address" label="Address" value={formData.address} onChange={handleInputChange} />

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="availableForCurrentMonth"
//               checked={formData.availableForCurrentMonth}
//               onChange={handleInputChange}
//               className="mr-2"
//             />
//             <label>Available For Current Month</label>
//           </div>

//           <button type="submit" className="w-full py-2 bg-gradient-to-r from-[#5f6FFF] to-[#f17732] text-white rounded-full hover:scale-105 transition-all">
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </motion.div>

//       <style>{`
//         @keyframes spin-slow {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         @keyframes spin-slower {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(720deg); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }

//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }

//         .animate-spin-slower {
//           animation: spin-slower 40s linear infinite;
//         }

//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }

//         .clip-hexagon {
//           clip-path: polygon(
//             25% 6.7%, 75% 6.7%,
//             100% 50%,
//             75% 93.3%, 25% 93.3%,
//             0% 50%
//           );
//         }
//       `}</style>
//     </motion.div>
//   );
// };

// const Input = ({ name, label, value, onChange }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <input
//       type="text"
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//     />
//   </div>
// );

// export default EditDoctorProfile;
// ===============================
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EditDoctorProfile = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    availableFrom: "",
    availableTo: "",
    daysOff: [],
    phoneNumbers: [],
    profileImage: null,
    availableForCurrentMonth: false,
    address: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "daysOff" || name === "phoneNumbers") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("FULLNAME", formData.fullName);
    data.append("AVAILABLE($)From", formData.availableFrom);
    data.append("AVAILABLE($)To", formData.availableTo);
    formData.daysOff.forEach((day, index) =>
      data.append(`DAYSOFF[${index}]`, day)
    );
    formData.phoneNumbers.forEach((number, index) =>
      data.append(`PHONENUMBERS[${index}]`, number)
    );
    if (formData.profileImage) {
      data.append("PROFILEIMAGE", formData.profileImage);
    }
    data.append("AvailableForCurrentMonth", formData.availableForCurrentMonth);
    data.append("ADDRESS", formData.address);

    try {
      const response = await fetch(
        "https://clearsight.runasp.net/api/Doctors/EditProfile",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update profile.");
      }

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        navigate("/DoctorProfile");
      }, 2000);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-teal-50 flex justify-center items-center py-10 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-20 h-20 bg-[#f17732] rotate-45 opacity-20 animate-spin-slow"
          style={{ top: "15%", left: "10%" }}
        />
        <div
          className="absolute w-24 h-24 bg-[#5f6FFF] clip-hexagon opacity-20 animate-float"
          style={{ bottom: "15%", right: "12%" }}
        />
        <div
          className="absolute w-16 h-16 bg-[#5f6FFF] rotate-12 opacity-10 animate-spin-slower"
          style={{ top: "60%", left: "8%" }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="bg-gradient-to-r from-[#f17732] to-[#5f6FFF] text-white text-center py-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-4 text-white hover:scale-110 transition"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold">Edit Doctor Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 rounded">
              {success}
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-36 h-36 border-4 border-white rounded-full shadow-lg overflow-hidden">
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-full h-full text-[#f17732]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>

          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            className="block w-full"
          />

          <Input
            name="fullName"
            label="Full Name"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <Input
            name="availableFrom"
            label="Available From"
            placeholder="e.g. 08:00 AM"
            value={formData.availableFrom}
            onChange={handleInputChange}
          />
          <Input
            name="availableTo"
            label="Available To"
            placeholder="e.g. 05:00 PM"
            value={formData.availableTo}
            onChange={handleInputChange}
          />
          <Input
            name="daysOff"
            label="Days Off (comma separated)"
            placeholder="e.g. Friday, Saturday"
            value={formData.daysOff.join(", ")}
            onChange={handleInputChange}
          />
          <Input
            name="phoneNumbers"
            label="Phone Numbers (comma separated)"
            placeholder="e.g. 0123456789, 0987654321"
            value={formData.phoneNumbers.join(", ")}
            onChange={handleInputChange}
          />
          <Input
            name="address"
            label="Address"
            placeholder="Enter your clinic or hospital address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="availableForCurrentMonth"
              checked={formData.availableForCurrentMonth}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label>Available For Current Month</label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#5f6FFF] to-[#f17732] text-white rounded-full hover:scale-105 transition-all"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </motion.div>

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-slower {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-slower {
          animation: spin-slower 40s linear infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .clip-hexagon {
          clip-path: polygon(
            25% 6.7%, 75% 6.7%,
            100% 50%,
            75% 93.3%, 25% 93.3%,
            0% 50%
          );
        }
      `}</style>
    </motion.div>
  );
};

const Input = ({ name, label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
);

export default EditDoctorProfile;
