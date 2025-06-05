
// import React, { useState, useContext } from "react";
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

//       setSuccess("Profile updated successfully!");
//       setTimeout(() => {
//         navigate("/DoctorProfile");
//       }, 2000);
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
//         <div
//           className="absolute w-20 h-20 bg-[#f17732] rotate-45 opacity-20 animate-spin-slow"
//           style={{ top: "15%", left: "10%" }}
//         />
//         <div
//           className="absolute w-24 h-24 bg-[#5f6FFF] clip-hexagon opacity-20 animate-float"
//           style={{ bottom: "15%", right: "12%" }}
//         />
//         <div
//           className="absolute w-16 h-16 bg-[#5f6FFF] rotate-12 opacity-10 animate-spin-slower"
//           style={{ top: "60%", left: "8%" }}
//         />
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
//           {error && (
//             <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
//           )}
//           {success && (
//             <div className="bg-green-100 text-green-700 p-2 rounded">
//               {success}
//             </div>
//           )}

//           <div className="flex justify-center">
//             <div className="w-36 h-36 border-4 border-white rounded-full shadow-lg overflow-hidden">
//               {formData.profileImage ? (
//                 <img
//                   src={URL.createObjectURL(formData.profileImage)}
//                   alt="Doctor"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <svg
//                   className="w-full h-full text-[#f17732]"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                 </svg>
//               )}
//             </div>
//           </div>

//           <input
//             type="file"
//             name="profileImage"
//             onChange={handleFileChange}
//             className="block w-full"
//           />

//           <Input
//             name="fullName"
//             label="Full Name"
//             placeholder="Enter full name"
//             value={formData.fullName}
//             onChange={handleInputChange}
//           />
//           <Input
//             name="availableFrom"
//             label="Available From"
//             placeholder="e.g. 08:00 AM"
//             value={formData.availableFrom}
//             onChange={handleInputChange}
//           />
//           <Input
//             name="availableTo"
//             label="Available To"
//             placeholder="e.g. 05:00 PM"
//             value={formData.availableTo}
//             onChange={handleInputChange}
//           />
//           <Input
//             name="daysOff"
//             label="Days Off (comma separated)"
//             placeholder="e.g. Friday, Saturday"
//             value={formData.daysOff.join(", ")}
//             onChange={handleInputChange}
//           />
//           <Input
//             name="phoneNumbers"
//             label="Phone Numbers (comma separated)"
//             placeholder="e.g. 0123456789, 0987654321"
//             value={formData.phoneNumbers.join(", ")}
//             onChange={handleInputChange}
//           />
//           <Input
//             name="address"
//             label="Address"
//             placeholder="Enter your clinic or hospital address"
//             value={formData.address}
//             onChange={handleInputChange}
//           />

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

//           <button
//             type="submit"
//             className="w-full py-2 bg-gradient-to-r from-[#5f6FFF] to-[#f17732] text-white rounded-full hover:scale-105 transition-all"
//           >
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

// const Input = ({ name, label, value, onChange, placeholder }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <input
//       type="text"
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//     />
//   </div>
// );

// export default EditDoctorProfile;
/////////////////////
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const EditDoctorProfile = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [daysOff, setDaysOff] = useState([""]);
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [profileImage, setProfileImage] = useState(null);
  const [availableForCurrentMonth, setAvailableForCurrentMonth] = useState(true);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleArrayChange = (setter, arr, index, value) => {
    const updated = [...arr];
    updated[index] = value;
    setter(updated);
  };

  const addArrayItem = (setter, arr) => {
    setter([...arr, ""]);
  };

  const removeArrayItem = (setter, arr, index) => {
    const updated = [...arr];
    updated.splice(index, 1);
    setter(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("FullName", fullName);
    formData.append("AvailableFrom", availableFrom);
    formData.append("AvailableTo", availableTo);
    daysOff.forEach(day => {
      if (day.trim()) formData.append("DaysOff", day);
    });
    phoneNumbers.forEach(phone => {
      if (phone.trim()) formData.append("PhoneNumbers", phone);
    });
    if (profileImage) {
      formData.append("ProfileImage", profileImage);
    }
    formData.append("AvailableForCureentMonth", availableForCurrentMonth);
    formData.append("Address", address);

    try {
      const response = await axios.post(`${backendUrl}/Doctors/EditProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success || response.status === 200) {
        setMessage("Profile updated successfully! Redirecting...");
        setTimeout(() => {
          navigate("/DoctorProfile");
        }, 2000);
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      setMessage("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
          Edit Doctor Profile
        </h2>

        {message && (
          <p className={`text-center mb-6 text-lg font-semibold ${message.includes("successfully") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Available From (Time)</label>
              <input
                type="time"
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Available To (Time)</label>
              <input
                type="time"
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={availableTo}
                onChange={(e) => setAvailableTo(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Days Off</label>
            {daysOff.map((day, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={day}
                  onChange={(e) => handleArrayChange(setDaysOff, daysOff, i, e.target.value)}
                  className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Day off #${i + 1}`}
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(setDaysOff, daysOff, i)}
                    className="px-3 text-red-600 hover:text-red-800 transition"
                    aria-label="Remove day off"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem(setDaysOff, daysOff)}
              className="text-blue-600 hover:underline transition"
            >
              + Add day off
            </button>
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone Numbers</label>
            {phoneNumbers.map((phone, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => handleArrayChange(setPhoneNumbers, phoneNumbers, i, e.target.value)}
                  className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Phone #${i + 1}`}
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(setPhoneNumbers, phoneNumbers, i)}
                    className="px-3 text-red-600 hover:text-red-800 transition"
                    aria-label="Remove phone number"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem(setPhoneNumbers, phoneNumbers)}
              className="text-blue-600 hover:underline transition"
            >
              + Add phone number
            </button>
          </div>

          <div>
            <label className="block mb-2 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <input
              id="availableForCurrentMonth"
              type="checkbox"
              checked={availableForCurrentMonth}
              onChange={(e) => setAvailableForCurrentMonth(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="availableForCurrentMonth" className="font-medium cursor-pointer">
              Available for Current Month
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">Address</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctorProfile;
