// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const PatientProfile = () => {
//   const { backendUrl, token } = useContext(AppContext);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/Patients/Profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const result = response.data;

//       if (result.success) {
//         setProfile(result.data);
//       } else {
//         setError("Failed to load patient profile.");
//       }
//     } catch (err) {
//       if (err.response?.status === 401) {
//         setError("Unauthorized. Please log in again.");
//       } else {
//         setError("Error loading profile.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div className="min-h-screen pt-20 px-4 bg-gradient-to-br bg-slate-300 dark:bg-gray-900">
//       <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8">

//         <h2 className="text-4xl font-extrabold mb-2 text-center text-indigo-700 dark:text-indigo-300">
//           Your Profile
//         </h2>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-600"></div>
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-600 font-semibold text-lg">{error}</p>
//         ) : (
//           profile && (
//             <>
//               {/* الصورة في منتصف الصفحة */}
//               <div className="flex justify-center mb-8">
//                 <img
//                   src={profile.profileImagePath || "/default-profile.png"}
//                   alt="Profile"
//                   className="w-40 h-40 rounded-full object-cover border-8 border-indigo-500 shadow-xl"
//                 />
//               </div>

//               {/* التفاصيل تحت الصورة */}
//               <div className=" px-4 mt-8">
//                 <h3 className="text-3xl font-bold mt-8 text-indigo-600 dark:text-indigo-400 text-center mb-4">
//                   {profile.fullName}
//                 </h3>
//                 {/* <p className="text-xl text-purple-700 dark:text-purple-300 text-center italic">
//                   @{profile.userName}
//                 </p> */}

//                 <div className="text-lg text-gray-700 dark:text-gray-300 space-y-2">
//                     <p>
//                     <span className="font-semibold text-indigo-700 dark:text-indigo-400">UserName:</span>{" "}
//                     <span className="font-medium">  @{profile.userName}</span>
//                   </p>
//                   <p>
//                     <span className="font-semibold text-indigo-700 dark:text-indigo-400">Email:</span>{" "}
//                     <span className="font-medium">{profile.email}</span>
//                   </p>
//                   <p>
//                     <span className="font-semibold text-indigo-700 dark:text-indigo-400">Phone:</span>{" "}
//                     <span className="font-medium">
//                       {profile.phoneNumbers?.join(", ") || "N/A"}
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               {/* زر تعديل الملف */}
//               <div className="text-center mt-10">
//                 <button
//                   onClick={() => navigate("/editPatientProfile")}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition transform hover:scale-105"
//                 >
//                   Edit Profile
//                 </button>
//               </div>
//             </>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientProfile;
///////////////
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  // حالات التعديل
  const [fullName, setFullName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/Patients/Profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = response.data;

      if (result.success) {
        setProfile(result.data);
        // تعبئة حقول التعديل بالقيم الحالية
        setFullName(result.data.fullName || "");
        setPhoneNumbers(result.data.phoneNumbers && result.data.phoneNumbers.length > 0 
          ? result.data.phoneNumbers 
          : [""]);
        setPreviewImage(result.data.profileImagePath || null);
      } else {
        setError("Failed to load patient profile.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else {
        setError("Error loading profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // دوال التعديل
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
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
        setMessage("Profile updated successfully!");
        // إعادة تحميل البيانات
        await fetchProfile();
        // العودة لوضع العرض
        setTimeout(() => {
          setIsEditing(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      setMessage("Error submitting form.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setMessage("");
    // إعادة تعيين القيم للقيم الأصلية
    if (profile) {
      setFullName(profile.fullName || "");
      setPhoneNumbers(profile.phoneNumbers && profile.phoneNumbers.length > 0 
        ? profile.phoneNumbers 
        : [""]);
      setPreviewImage(profile.profileImagePath || null);
      setProfileImage(null);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br bg-slate-300 dark:bg-gray-900">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8">

        <h2 className="text-4xl font-extrabold mb-2 text-center text-indigo-700 dark:text-indigo-300">
          {isEditing ? "Edit Your Profile" : "Your Profile"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold text-lg">{error}</p>
        ) : (
          profile && (
            <>
              {!isEditing ? (
                // وضع العرض
                <>
                  {/* الصورة في منتصف الصفحة */}
                  <div className="flex justify-center mb-8">
                    <img
                      src={profile.profileImagePath || "/default-profile.png"}
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover border-8 border-indigo-500 shadow-xl"
                    />
                  </div>

                  {/* التفاصيل تحت الصورة */}
                  <div className="px-4 mt-8">
                    <h3 className="text-3xl font-bold mt-8 text-indigo-600 dark:text-indigo-400 text-center mb-4">
                      {profile.fullName}
                    </h3>

                    <div className="text-lg text-gray-700 dark:text-gray-300 space-y-2">
                      <p>
                        <span className="font-semibold text-indigo-700 dark:text-indigo-400">UserName:</span>{" "}
                        <span className="font-medium">@{profile.userName}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-indigo-700 dark:text-indigo-400">Email:</span>{" "}
                        <span className="font-medium">{profile.email}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-indigo-700 dark:text-indigo-400">Phone:</span>{" "}
                        <span className="font-medium">
                          {profile.phoneNumbers?.join(", ") || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* زر تعديل الملف */}
                  <div className="text-center mt-10">
                    <button
                      onClick={handleEditClick}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition transform hover:scale-105"
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                // وضع التعديل
                <>
                  {/* معاينة الصورة */}
                  {previewImage && (
                    <div className="flex justify-center mb-6">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-40 h-40 rounded-full object-cover border-8 border-indigo-500 shadow-xl"
                      />
                    </div>
                  )}

                  {/* رسالة النجاح/الخطأ */}
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

                  {/* نموذج التعديل */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* رفع الصورة */}
                    <div>
                      <label className="block mb-2 font-semibold text-indigo-700 dark:text-indigo-400">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    {/* الاسم الكامل */}
                    <div>
                      <label className="block mb-2 font-semibold text-indigo-700 dark:text-indigo-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    {/* أرقام الهاتف */}
                    <div>
                      <label className="block mb-2 font-semibold text-indigo-700 dark:text-indigo-400">
                        Phone Numbers
                      </label>
                      {phoneNumbers.map((phone, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) =>
                              handleArrayChange(setPhoneNumbers, phoneNumbers, i, e.target.value)
                            }
                            className="flex-1 p-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder={`Phone #${i + 1}`}
                          />
                          {phoneNumbers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem(setPhoneNumbers, phoneNumbers, i)}
                              className="px-3 py-2 text-red-600 hover:text-red-800 transition"
                            >
                              ✖
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem(setPhoneNumbers, phoneNumbers)}
                        className="text-indigo-600 hover:underline transition text-sm font-medium"
                      >
                        + Add phone number
                      </button>
                    </div>

                    {/* أزرار الحفظ والإلغاء */}
                    <div className="flex gap-4 justify-center mt-8">
                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition transform hover:scale-105 disabled:opacity-50"
                      >
                        {submitLoading ? "Updating..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default PatientProfile;