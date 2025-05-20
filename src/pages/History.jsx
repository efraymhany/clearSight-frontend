import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
// import { AppContext } from "./AppContext"; // Import the AppContext for token

const PatientHistoryPage = () => {
  const { token } = useContext(AppContext); // Get the token from the AppContext
  const [patientHistory, setPatientHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPatientHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://clearsight.ruwasa.net/api/Patients/GetPatientHistory?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from context
            Accept: "application/json",
          },
        }
      );

      const { data } = response.data; // Extract the data object
      setPatientHistory(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientHistory();
  }, [pageNumber, pageSize]); // Re-fetch data when pageNumber or pageSize changes

  const handlePageChange = (direction) => {
    if (direction === "next" && pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    } else if (direction === "prev" && pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Patient History
        </h1>

        {loading && (
          <div className="text-center text-blue-600">
            Loading patient history...
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 font-medium text-center bg-red-100 p-4 rounded-lg">
            <strong>Error: </strong>{error}
          </div>
        )}

        {!loading && !error && patientHistory.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                    Doctor Name
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                    Result
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientHistory.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.doctorName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.patientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.fundusCameraResult}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && patientHistory.length === 0 && (
          <div className="text-center text-gray-700">
            No patient history available.
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={pageNumber === 1}
            className={`px-4 py-2 rounded-lg ${
              pageNumber === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {pageNumber} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={pageNumber === totalPages}
            className={`px-4 py-2 rounded-lg ${
              pageNumber === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHistoryPage;