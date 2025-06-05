import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const PatientHistory = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("card"); // "card" or "table"
  const navigate = useNavigate();

  const fetchHistory = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${backendUrl}/Patients/GetPatientHistory?pageNumber=${page}&pageSize=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setHistoryData(result.data.items);
        setTotalPages(result.data.totalPages);
        setCurrentPage(result.data.currentPage);
      } else {
        setError("Failed to load patient history.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unauthorized or unexpected error"
      );
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  return (
    <div className="min-h-screen pt-24 p-4 bg-gradient-to-br from-gray-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 w-full">
            Patient History
          </h2>
          <button
            onClick={toggleViewMode}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
          >
            {viewMode === "card" ? "Switch to Table View" : "Switch to Card View"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : historyData.length === 0 ? (
          <p className="text-center text-gray-500">No history found.</p>
        ) : viewMode === "card" ? (
          <div className="space-y-6">
            {historyData.map((entry, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition hover:shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><strong>Doctor:</strong> {entry.doctorName}</p>
                  <p><strong>Patient:</strong> {entry.patientName}</p>
                  <p><strong>Date:</strong> {new Date(entry.date).toLocaleString()}</p>
                  <p><strong>Disease:</strong> {entry.diseaseMsg}</p>
                  <p><strong>Confidence:</strong> {entry.confidence}%</p>
                  <p><strong>Arabic Name:</strong> {entry.arabicName}</p>
                </div>
                {entry.fundusCameraPath && (
                  <img
                    src={entry.fundusCameraPath}
                    alt="Fundus Camera"
                    className="mt-4 w-full max-h-72 object-contain rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-blue-600 text-white dark:bg-blue-800">
                  <th className="py-3 px-4 border-r border-white text-left">Doctor</th>
                  <th className="py-3 px-4 border-r border-white text-left">Patient</th>
                  <th className="py-3 px-4 border-r border-white text-left">Date</th>
                  <th className="py-3 px-4 border-r border-white text-left">Disease</th>
                  <th className="py-3 px-4 border-r border-white text-left">Confidence</th>
                  <th className="py-3 px-4 border-r border-white text-left">Arabic Name</th>
                  <th className="py-3 px-4 text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((entry, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-4 border-r border-gray-200 dark:border-gray-700">{entry.doctorName}</td>
                    <td className="py-3 px-4 border-r border-gray-200 dark:border-gray-700">{entry.patientName}</td>
                    <td className="py-3 px-4 border-r border-gray-200 dark:border-gray-700">{new Date(entry.date).toLocaleString()}</td>
                    <td className="py-3 px-4 border-r border-gray-200 dark:border-gray-700">{entry.diseaseMsg}</td>
                    <td className="py-3 px-4 border-r border-gray-200 dark:border-gray-700">{entry.confidence}%</td>
                    <td className="py-3 px-4 border-r border-gray-200 dark:border-gray-700">{entry.arabicName}</td>
                    <td className="py-3 px-4">
                      {entry.fundusCameraPath ? (
                        <img
                          src={entry.fundusCameraPath}
                          alt="Fundus Camera"
                          className="w-24 h-24 object-contain rounded-lg"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition disabled:opacity-50"
          >
            ⬅ Previous
          </button>
          <span className="self-center text-lg font-medium">
            Page <span className="text-blue-600">{currentPage}</span> of{" "}
            <span className="text-blue-600">{totalPages}</span>
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
