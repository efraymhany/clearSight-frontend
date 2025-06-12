import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br bg-slate-300 dark:bg-gray-900">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8">

        <h2 className="text-4xl font-extrabold mb-2 text-center text-indigo-700 dark:text-indigo-300">
          Your Profile
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
              {/* الصورة في منتصف الصفحة */}
              <div className="flex justify-center mb-8">
                <img
                  src={profile.profileImagePath || "/default-profile.png"}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-8 border-indigo-500 shadow-xl"
                />
              </div>

              {/* التفاصيل تحت الصورة */}
              <div className=" px-4 mt-8">
                <h3 className="text-3xl font-bold mt-8 text-indigo-600 dark:text-indigo-400 text-center mb-4">
                  {profile.fullName}
                </h3>
                {/* <p className="text-xl text-purple-700 dark:text-purple-300 text-center italic">
                  @{profile.userName}
                </p> */}

                <div className="text-lg text-gray-700 dark:text-gray-300 space-y-2">
                    <p>
                    <span className="font-semibold text-indigo-700 dark:text-indigo-400">UserName:</span>{" "}
                    <span className="font-medium">  @{profile.userName}</span>
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
                  onClick={() => navigate("/editPatientProfile")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition transform hover:scale-105"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
