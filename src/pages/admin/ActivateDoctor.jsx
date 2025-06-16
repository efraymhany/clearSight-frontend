import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminActivateDoctor = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!doctorId) {
      toast.error("Doctor ID is missing.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${backendUrl}/Admins/ActivateDoctor`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "text/plain",
          },
          params: {
            doctorId,
          },
        }
      );
      toast.success("Doctor approved successfully.");
      navigate("/AdminPendingDoctors");
    } catch (error) {
      toast.error("Failed to approve the doctor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl text-center"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Do you approve this doctor?
      </h2>
      <p className="mb-10 text-gray-600">
        Doctor ID: <span className="font-mono text-sm text-gray-800">{doctorId}</span>
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow transition"
        >
          {loading ? "Approving..." : "✅ Approve"}
        </button>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg shadow transition"
        >
          ❌ Cancel
        </button>
      </div>
    </motion.div>
  );
};

export default AdminActivateDoctor;
