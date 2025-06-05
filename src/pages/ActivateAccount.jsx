import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ActivateAccount = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select a file first.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setError("❌ Invalid file type. Please upload JPG, JPEG, PNG, or PDF only.");
      return;
    }

    const formData = new FormData();
    formData.append("doc", file);

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${backendUrl}/Doctors/ActivateAccount`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            Accept: "text/plain",
          },
        }
      );

      if (response.data?.success) {
        setMessage("✅ File uploaded successfully: " + response.data.message);
      } else {
        setError("⚠️ Upload failed: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Failed to upload. Check your token or file format.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 mt-14">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          📄 Activate Your Account to Get Access to Patients
        </h2>

        {/* Requirements Note */}
        <p className="mb-4 text-sm text-gray-700 bg-yellow-100 p-3 rounded border border-yellow-300">
          <strong>Note:</strong> To activate your account, please upload a valid document:
          <ul className="list-disc list-inside mt-2">
            <li>Acceptable formats: <strong>JPG, JPEG, PNG</strong></li>
            <li>Upload a clear image of your professional ID (e.g., Syndicate ID)</li>
            {/* <li>PDF documents are also accepted</li> */}
            <li>Maximum file size: <strong>5MB</strong> (if applicable)</li>
          </ul>
        </p>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          className="block w-full mb-4 text-sm text-gray-700"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>

        {message && (
          <div className="mt-4 text-green-700 bg-green-100 p-3 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-700 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
