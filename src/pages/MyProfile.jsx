import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const PatientProfile = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPatientProfile = async () => {
    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${backendUrl}/Patients/Profile`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(
          res.status === 401
            ? "Unauthorized: Invalid or expired token. Please log in again."
            : `HTTP error! Status: ${res.status}`
        );
      }

<<<<<<< HEAD
      try {
        const response = await axios.get(backendUrl + "/Patients/Profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (response.status === 200 && response?.data?.success) {
          setProfileData(response.data.data);
        } else {
          throw new Error("Unexpected response from server.");
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.err_message ||
          err.response?.data?.message ||
          "Failed to fetch profile data.";
        setError(errorMessage);
        toast.error(errorMessage);
        if (err.response?.status === 401 || err.response?.status === 400) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
=======
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch patient profile.");
>>>>>>> 0e977e4 (Updated Navbar with animations and logo effects)
      }

      setProfile(data.data || null);
    } catch (err) {
      setError(err.message || "Failed to fetch patient profile.");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientProfile();
  }, [token, backendUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-teal-50 flex justify-center items-center py-10 px-4 relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-32 h-32 bg-[#f17732] rounded-full opacity-20 animate-float-slow"
          style={{ top: '10%', left: '5%' }}
        ></div>
        <div
          className="absolute w-44 h-44 bg-[#5f6FFF] rounded-full opacity-20 animate-float-slower"
          style={{ bottom: '20%', right: '15%' }}
        ></div>
        <div
          className="absolute w-20 h-20 bg-[#f17732] rounded-full opacity-10 animate-float-slower"
          style={{ top: '60%', left: '10%' }}
        ></div>
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
          <h2 className="text-2xl font-bold">
            {profile ? profile.fullName || "Patient Profile" : "Patient Profile"}
          </h2>
        </div>

        <div className="flex flex-col items-center -mt-12 px-4">
          <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="%239ca3af" viewBox="0 0 24 24"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
                }}
              />
            ) : (
              <svg
                className="w-10 h-10 text-[#f17732]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <div className="mt-3 text-lg font-semibold text-gray-800">
            {profile?.fullName || "Full Name"}
          </div>
        </div>

        <div className="p-6 space-y-4 text-base leading-relaxed">
          <AnimatePresence>
            {loading && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#5f6FFF]"
              >
                <svg
                  className="mx-auto animate-spin h-5 w-5 text-[#5f6FFF]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              </motion.p>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 bg-red-100 p-4 rounded-lg text-center mb-4"
              >
                {error}
              </motion.div>
            )}
            {!loading && !error && !profile && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 text-center"
              >
                No profile data available.
              </motion.p>
            )}
          </AnimatePresence>

          {!loading && !error && profile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#5f6FFF] font-medium">Username:</span>
                <span>{profile.userName || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#5f6FFF] font-medium">Phone:</span>
                <span>{profile.phoneNumbers?.join(", ") || "N/A"}</span>
              </div>
          
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#5f6FFF] font-medium">Email:</span>
                <span>{profile.email || "N/A"}</span>
              </div>
              <div className="text-center pt-4">
                <button
                  onClick={() => navigate("/editProfile")}
                  className="px-6 py-2 bg-gradient-to-r from-[#f17732] to-[#5f6FFF] text-white rounded-full hover:scale-105 transition-all duration-300 ease-in-out shadow hover:shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <style>
        {`
          @keyframes float-slow {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes float-slower {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }
          .animate-float-slower {
            animation: float-slower 12s ease-in-out infinite;
          }
        `}
      </style>
    </motion.div>
  );
};

export default PatientProfile;
