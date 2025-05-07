import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("ScanImage", file);

    try {
      const res = await axios.post(
        `https://clearsight.runasp.net/api/Patients/Scan`, // Replace with your API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Accept": "application/json", // Ensure the accept header is correct
          },
        }
      );
      setResponse(res.data.data);
      setError(null);
    } catch (err) {
      // Display the backend error message if available, otherwise show a generic error
      setError(
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again later."
      );
      setResponse(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Upload and Scan Image
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Choose Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Upload and Scan
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-600 font-medium text-center bg-red-100 p-4 rounded-lg">
            <strong>Error: </strong>{error}
          </div>
        )}
        {response && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700">
              Prediction Result:
            </h3>
            <pre className="text-sm text-gray-600 mt-2 bg-gray-200 p-2 rounded-lg overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;