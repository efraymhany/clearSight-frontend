// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const DoctorProfile = () => {
//   const { backendUrl, token } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchDoctorProfile = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/Doctors/Profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       if (response.data?.success) {
//         setProfile(response.data.data);
//       } else {
//         setError("Failed to load doctor profile.");
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
//     fetchDoctorProfile();
//   }, []);

//   return (
//     <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
//           Doctor Profile
//         </h2>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500 font-semibold">{error}</p>
//         ) : (
//           profile && (
//             <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center">
//               {/* صورة البروفايل */}
//               <img
//                 src={profile.profileImagePath || "/default-profile.png"}
//                 alt="Profile"
//                 className="w-36 h-36 mx-auto mb-4 rounded-full object-cover border-4 border-blue-500 shadow-lg"
//               />
//               <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-300">
//                 {profile.fullName}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">@{profile.userName}</p>

//               {/* التفاصيل */}
//               <div className="space-y-2 text-left">
//                 <p className="text-gray-800 dark:text-gray-200">
//                   <span className="font-semibold text-blue-600">📍 Address:</span>{" "}
//                   {profile.address}
//                 </p>
//                 <p className="text-gray-800 dark:text-gray-200">
//                   <span className="font-semibold text-blue-600">🕐 Available:</span>{" "}
//                   {profile.availableFrom} - {profile.availableTo}
//                 </p>
//                 <p className="text-gray-800 dark:text-gray-200">
//                   <span className="font-semibold text-blue-600">📅 Days Off:</span>{" "}
//                   {profile.daysOff?.join(", ") || "N/A"}
//                 </p>
//                 <p className="text-gray-800 dark:text-gray-200">
//                   <span className="font-semibold text-blue-600">📞 Phone:</span>{" "}
//                   {profile.phoneNumbers?.join(", ") || "N/A"}
//                 </p>
//                 <p className="text-gray-800 dark:text-gray-200">
//                   <span className="font-semibold text-blue-600">📆 This Month:</span>{" "}
//                   {profile.availableForCureentMonth ? "Yes" : "No"}
//                 </p>
//               </div>

//               {/* الأزرار */}
//               <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
//                 <button
//                   onClick={() => navigate("/editDoctorProfile")}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
//                 >
//                   Edit Profile
//                 </button>

//                 <button
//                   onClick={() => navigate("/ActivateAccount")}
//                   className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
//                 >
//                   Activate Account
//                 </button>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;
/////////////////////////////
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // حالات التعديل
  const [fullName, setFullName] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [daysOff, setDaysOff] = useState([""]);
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [availableForCurrentMonth, setAvailableForCurrentMonth] =
    useState(true);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/Doctors/Profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data?.success) {
        const profileData = response.data.data;
        setProfile(profileData);

        // تعبئة حقول التعديل بالقيم الحالية
        setFullName(profileData.fullName || "");
        setAvailableFrom(profileData.availableFrom || "");
        setAvailableTo(profileData.availableTo || "");
        setDaysOff(
          profileData.daysOff && profileData.daysOff.length > 0
            ? profileData.daysOff
            : [""]
        );
        setPhoneNumbers(
          profileData.phoneNumbers && profileData.phoneNumbers.length > 0
            ? profileData.phoneNumbers
            : [""]
        );
        setAvailableForCurrentMonth(
          profileData.availableForCureentMonth || false
        );
        setAddress(profileData.address || "");
        setPreviewImage(profileData.profileImagePath || null);
      } else {
        setError("Failed to load doctor profile.");
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
    fetchDoctorProfile();
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
    if (file) {
      setProfileImage(file);

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
    formData.append("AvailableFrom", availableFrom);
    formData.append("AvailableTo", availableTo);
    daysOff.forEach((day) => {
      if (day.trim()) formData.append("DaysOff", day);
    });
    phoneNumbers.forEach((phone) => {
      if (phone.trim()) formData.append("PhoneNumbers", phone);
    });
    if (profileImage) {
      formData.append("ProfileImage", profileImage);
    }
    formData.append("AvailableForCureentMonth", availableForCurrentMonth);
    formData.append("Address", address);

    try {
      const response = await axios.post(
        `${backendUrl}/Doctors/EditProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/plain",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success || response.status === 200) {
        setMessage("Profile updated successfully!");
        // إعادة تحميل البيانات
        await fetchDoctorProfile();
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
      setAvailableFrom(profile.availableFrom || "");
      setAvailableTo(profile.availableTo || "");
      setDaysOff(
        profile.daysOff && profile.daysOff.length > 0 ? profile.daysOff : [""]
      );
      setPhoneNumbers(
        profile.phoneNumbers && profile.phoneNumbers.length > 0
          ? profile.phoneNumbers
          : [""]
      );
      setAvailableForCurrentMonth(profile.availableForCureentMonth || false);
      setAddress(profile.address || "");
      setPreviewImage(profile.profileImagePath || null);
      setProfileImage(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div className={`mx-auto ${isEditing ? "max-w-4xl" : "max-w-3xl"}`}>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
          {isEditing ? "Edit Doctor Profile" : "Doctor Profile"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : (
          profile && (
            <>
              {!isEditing ? (
                // وضع العرض
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center">
                  {/* صورة البروفايل */}
                  <img
                    src={profile.profileImagePath || "/default-profile.png"}
                    alt="Profile"
                    className="w-36 h-36 mx-auto mb-4 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {profile.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    @{profile.userName}
                  </p>

                  {/* التفاصيل */}
                  <div className="space-y-2 text-left">
                    {/* <p className="text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-600">📧 Email:</span>{" "}
                      {profile.email}
                    </p> */}
                    <p className="text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-600">
                        📍 Address:
                      </span>{" "}
                      {profile.address}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-600">
                        🕐 Available:
                      </span>{" "}
                      {profile.availableFrom} - {profile.availableTo}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-600">
                        📅 Days Off:
                      </span>{" "}
                      {profile.daysOff?.join(", ") || "N/A"}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-600">
                        📞 Phone:
                      </span>{" "}
                      {profile.phoneNumbers?.join(", ") || "N/A"}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-600">
                        📆 This Month:
                      </span>{" "}
                      {profile.availableForCureentMonth ? "Yes" : "No"}
                    </p>
                  </div>

                  {/* الأزرار */}
                  <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                    <button
                      onClick={handleEditClick}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={() => {
                        window.scrollTo(0, 0); // ✅ الرجوع لأعلى الصفحة
                        navigate("/ActivateAccount"); // ✅ الانتقال للرابط
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
                    >
                      Activate Account
                    </button>
                  </div>
                </div>
              ) : (
                // وضع التعديل
                <>
                  {/* معاينة الصورة */}
                  {previewImage && (
                    <div className="flex justify-center mb-6">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
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
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6"
                  >
                    {/* القسم الأول: المعلومات الأساسية */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        📋 Basic Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Address
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Profile Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                          />
                        </div>

                        <div className="flex items-center">
                          <div className="flex items-center gap-4 mt-6">
                            <input
                              id="availableForCurrentMonth"
                              type="checkbox"
                              checked={availableForCurrentMonth}
                              onChange={(e) =>
                                setAvailableForCurrentMonth(e.target.checked)
                              }
                              className="w-5 h-5 accent-blue-600 cursor-pointer"
                            />
                            <label
                              htmlFor="availableForCurrentMonth"
                              className="font-medium cursor-pointer text-gray-700 dark:text-gray-300"
                            >
                              Available for Current Month
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* القسم الثاني: مواعيد العمل */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        🕐 Working Hours
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Available From (Time)
                          </label>
                          <input
                            type="time"
                            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Available To (Time)
                          </label>
                          <input
                            type="time"
                            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={availableTo}
                            onChange={(e) => setAvailableTo(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                          Days Off
                        </label>
                        {daysOff.map((day, i) => (
                          <div key={i} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={day}
                              onChange={(e) =>
                                handleArrayChange(
                                  setDaysOff,
                                  daysOff,
                                  i,
                                  e.target.value
                                )
                              }
                              className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder={`Day off #${
                                i + 1
                              } (e.g., Friday, Saturday)`}
                            />
                            {daysOff.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeArrayItem(setDaysOff, daysOff, i)
                                }
                                className="px-3 py-2 text-red-600 hover:text-red-800 transition"
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
                          className="text-blue-600 hover:underline transition font-medium"
                        >
                          + Add day off
                        </button>
                      </div>
                    </div>

                    {/* القسم الثالث: معلومات الاتصال */}
                    <div className="pb-2">
                      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        📞 Contact Information
                      </h3>

                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                          Phone Numbers
                        </label>
                        {phoneNumbers.map((phone, i) => (
                          <div key={i} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) =>
                                handleArrayChange(
                                  setPhoneNumbers,
                                  phoneNumbers,
                                  i,
                                  e.target.value
                                )
                              }
                              className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                              placeholder={`Phone #${i + 1}`}
                            />
                            {phoneNumbers.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeArrayItem(
                                    setPhoneNumbers,
                                    phoneNumbers,
                                    i
                                  )
                                }
                                className="px-3 py-2 text-red-600 hover:text-red-800 transition"
                                aria-label="Remove phone number"
                              >
                                ✖
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem(setPhoneNumbers, phoneNumbers)
                          }
                          className="text-blue-600 hover:underline transition font-medium"
                        >
                          + Add phone number
                        </button>
                      </div>
                    </div>

                    {/* أزرار الحفظ والإلغاء */}
                    <div className="flex gap-4 justify-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105 disabled:opacity-50"
                      >
                        {submitLoading ? "Updating..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105"
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

export default DoctorProfile;
