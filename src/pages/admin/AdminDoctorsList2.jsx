import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ActivateDoctorsList = () => {
  const { token, backendUrl } = useContext(AppContext);
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Admins/ActivateDoctorsList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "text/plain",
            },
            params: {
              pageNumber: 1,
              pageSize: 100,
            },
          }
        );
        const data = response.data.data.items.find((doc) => doc.doctorId === id);
        if (data) {
          setDoctor(data);
        } else {
          toast.error("Doctor not found.");
        }
      } catch (error) {
        toast.error("Failed to load doctor data.");
      }
    };

    fetchDoctor();
  }, [id, token]);

  const goToActivate = () => navigate("/AdminActivateDoctor");
  const goToPending = () => navigate("/AdminPendingDoctors");

  if (!doctor) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">Loading doctor details...</div>
    );
  }

// داخل المكون

const handleAccept = () => {
  navigate(`/AdminActivateDoctor?doctorId=${doctor.doctorId}`);
};

const handleReject = () => {
  navigate(`/AdminPendingDoctors?doctorId=${doctor.doctorId}`);
};

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-blue-50 to-white shadow-xl p-8 rounded-3xl"
    >
      <div className="flex items-start gap-8">
        <img
          src={doctor.profileImagePath}
          alt={doctor.fullName}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
        />

        <div className="flex-1 space-y-4 text-gray-800">
          <h2 className="text-3xl font-bold text-blue-800">Doctor Details</h2>
          <p>
            <strong className="text-blue-600">Full Name:</strong> {doctor.fullName}
          </p>
          <p>
            <strong className="text-blue-600">Username:</strong> {doctor.userName}
          </p>
          <p>
            <strong className="text-blue-600">Address:</strong> {doctor.address}
          </p>
          <p>
            <strong className="text-blue-600">Phone:</strong> {doctor.phoneNumbers?.join(", ")}
          </p>
          <a
            href={doctor.uploadedDocumentPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 underline hover:text-blue-700 transition"
          >
            View Uploaded Document
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition"
        >
          ✅ Activate Doctor
        </button>
        <button
          onClick={handleReject}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition"
        >
          ❌ Reject Doctor
        </button>
      </div>
    </motion.div>
  );
};

export default ActivateDoctorsList;
