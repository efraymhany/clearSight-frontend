
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
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

  // التعديل في دالة التعامل مع رفع الصورة:
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // نحفظ الملف الأصلي عشان نرسله للسيرفر
      setProfileImage(file);

      // نحول الصورة ل Base64 عشان نخزنها في localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("doctorProfilePic", reader.result);
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
              onChange={handleImageChange} // هنا استخدمنا الدالة الجديدة
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
