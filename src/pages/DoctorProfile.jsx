import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/Doctors/Profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data?.success) {
        setProfile(response.data.data);
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

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
          Doctor Profile
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : (
          profile && (
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
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">@{profile.userName}</p>

              {/* التفاصيل */}
              <div className="space-y-2 text-left">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold text-blue-600">📍 Address:</span>{" "}
                  {profile.address}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold text-blue-600">🕐 Available:</span>{" "}
                  {profile.availableFrom} - {profile.availableTo}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold text-blue-600">📅 Days Off:</span>{" "}
                  {profile.daysOff?.join(", ") || "N/A"}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold text-blue-600">📞 Phone:</span>{" "}
                  {profile.phoneNumbers?.join(", ") || "N/A"}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold text-blue-600">📆 This Month:</span>{" "}
                  {profile.availableForCureentMonth ? "Yes" : "No"}
                </p>
              </div>

              {/* الأزرار */}
              <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate("/editDoctorProfile")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => navigate("/ActivateAccount")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
                >
                  Activate Account
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
