import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ScanPatientPage = () => {
  const { patientId } = useParams();
  const { token, backendUrl } = useContext(AppContext);

  const [scanImage, setScanImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setScanImage(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!scanImage) {
      setError("Please select an image file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("ScanImage", scanImage);

    try {
      const response = await axios.post(
        `${backendUrl}/Doctors/Scan/${encodeURIComponent(patientId)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          responseType: "text", // حسب الـ API (يرجع plain text)
        }
      );

      setSuccess("Scan uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload scan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-14 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Scan</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />

          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Scan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScanPatientPage;
