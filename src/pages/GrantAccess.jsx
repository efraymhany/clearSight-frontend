import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const GrantAccessPage = () => {
  const { token } = useContext(AppContext);
  const { doctorId } = useParams(); // doctorId from URL
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGrantAccess = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://clearsight.runasp.net/api/Patients/grant-access?doctorId=${doctorId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to request access.");
      }

      setMessage("✅ Access granted successfully!");
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-100 px-6 py-10 dark:bg-gray-900 dark:text-white">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Request Access to Doctor
        </h1>

        <p className="text-center mb-4">
          Do you want to grant access to Doctor ID:{" "}
          <span className="font-bold text-gray-700">{doctorId}</span>?
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleGrantAccess}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Grant Access"}
          </button>
        </div>

        {message && (
          <p className="mt-6 text-center font-medium text-lg">{message}</p>
        )}
      </div>
    </div>
  );
};

export default GrantAccessPage;
