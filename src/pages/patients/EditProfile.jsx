// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const EditPatientProfile = () => {
//   const { backendUrl, token } = useContext(AppContext);
//   const navigate = useNavigate();

//   const [fullName, setFullName] = useState("");
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);
//   const [profileImage, setProfileImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/Patients/Profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const { fullName, phoneNumbers, profileImageUrl } = response.data;

//         if (fullName) setFullName(fullName);
//         if (phoneNumbers?.length) setPhoneNumbers(phoneNumbers);
//         if (profileImageUrl) {
//           setPreviewImage(profileImageUrl);
//           localStorage.setItem("profileImage", profileImageUrl);
//         }
//       } catch (error) {
//         setMessage("Error loading profile data.");
//       }
//     };

//     fetchProfile();
//   }, [backendUrl, token]);

//   const handleArrayChange = (setter, arr, index, value) => {
//     const updated = [...arr];
//     updated[index] = value;
//     setter(updated);
//   };

//   const addArrayItem = (setter, arr) => {
//     setter([...arr, ""]);
//   };

//   const removeArrayItem = (setter, arr, index) => {
//     const updated = [...arr];
//     updated.splice(index, 1);
//     setter(updated);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProfileImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result;
//         setPreviewImage(base64Image);
//         localStorage.setItem("profileImage", base64Image);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const base64ToFile = async (base64Data, filename = "profile.jpg") => {
//     const res = await fetch(base64Data);
//     const blob = await res.blob();
//     return new File([blob], filename, { type: blob.type });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const formData = new FormData();
//     formData.append("FullName", fullName);

//     phoneNumbers.forEach((phone) => {
//       if (phone.trim()) formData.append("PhoneNumbers", phone);
//     });

//     if (profileImage) {
//       formData.append("ProfileImage", profileImage);
//     } else {
//       const storedImageUrl = localStorage.getItem("profileImage");
//       if (storedImageUrl && storedImageUrl.startsWith("data:image")) {
//         const oldImageFile = await base64ToFile(storedImageUrl);
//         formData.append("ProfileImage", oldImageFile);
//       }
//     }

//     try {
//       const response = await axios.post(`${backendUrl}/Patients/EditProfile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data?.success || response.status === 200) {
//         setMessage("Profile updated successfully! Redirecting...");
//         if (previewImage) {
//           localStorage.setItem("profileImage", previewImage);
//         }
//         setTimeout(() => {
//           navigate("/PatientProfile");
//         }, 2000);
//       } else {
//         setMessage("Failed to update profile.");
//       }
//     } catch (error) {
//       setMessage("Error submitting form.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
//       <div className="max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
//           Edit Patient Profile
//         </h2>

//         {previewImage && (
//           <div className="flex justify-center mb-6">
//             <img
//               src={previewImage}
//               alt="Preview"
//               className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
//             />
//           </div>
//         )}

//         {message && (
//           <p
//             className={`text-center mb-6 text-lg font-semibold ${
//               message.includes("successfully")
//                 ? "text-green-600 dark:text-green-400"
//                 : "text-red-600 dark:text-red-400"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6"
//         >
//           <div>
//             <label className="block mb-2 font-medium">Profile Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full"
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Full Name</label>
//             <input
//               type="text"
//               className="w-2/3 p-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Phone Numbers</label>
//             {phoneNumbers.map((phone, i) => (
//               <div key={i} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) =>
//                     handleArrayChange(setPhoneNumbers, phoneNumbers, i, e.target.value)
//                   }
//                   className="w-2/3 p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder={`Phone #${i + 1}`}
//                 />
//                 {i > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => removeArrayItem(setPhoneNumbers, phoneNumbers, i)}
//                     className="px-3 text-red-600 hover:text-red-800 transition"
//                   >
//                     ✖
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addArrayItem(setPhoneNumbers, phoneNumbers)}
//               className="text-blue-600 hover:underline transition text-sm"
//             >
//               {/* + Add phone number */}
//             </button>
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105"
//             >
//               {loading ? "Updating..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPatientProfile;

////////////////

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const EditPatientProfile = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/Patients/Profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { fullName, phoneNumbers, profileImageUrl } = response.data;

        if (fullName) setFullName(fullName);
        if (phoneNumbers?.length) setPhoneNumbers(phoneNumbers);
        if (profileImageUrl) {
          setPreviewImage(profileImageUrl);

          // 🧠 خزّن الصورة القادمة من السيرفر في Local Storage
          localStorage.setItem("profileImage", profileImageUrl);
        }
      } catch (error) {
        setMessage("Error loading profile data.");
      }
    };

    fetchProfile();
  }, [backendUrl, token]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setPreviewImage(base64Image);

        // ✅ تخزين الصورة في Local Storage
        localStorage.setItem("profileImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("FullName", fullName);
    phoneNumbers.forEach((phone) => {
      if (phone.trim()) formData.append("PhoneNumbers", phone);
    });
    if (profileImage) {
      formData.append("ProfileImage", profileImage);
    }

    try {
      const response = await axios.post(`${backendUrl}/Patients/EditProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success || response.status === 200) {
        setMessage("Profile updated successfully! Redirecting...");

        // ✅ حفظ الصورة النهائية (بعد التأكد من رفعها)
        if (previewImage) {
          localStorage.setItem("profileImage", previewImage);
        }

        setTimeout(() => {
          navigate("/PatientProfile");
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
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
          Edit Patient Profile
        </h2>

        {previewImage && (
          <div className="flex justify-center mb-6">
            <img
              src={previewImage}
              alt="Preview"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          </div>
        )}

        {message && (
          <p
            className={`text-center mb-6 text-lg font-semibold ${
              message.includes("successfully")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              className="w-2/3 p-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone Numbers</label>
            {phoneNumbers.map((phone, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    handleArrayChange(setPhoneNumbers, phoneNumbers, i, e.target.value)
                  }
                  className="w-2/3 p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Phone #${i + 1}`}
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(setPhoneNumbers, phoneNumbers, i)}
                    className="px-3 text-red-600 hover:text-red-800 transition"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem(setPhoneNumbers, phoneNumbers)}
              className="text-blue-600 hover:underline transition text-sm"
            >
              + Add phone number
            </button>
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

export default EditPatientProfile;
