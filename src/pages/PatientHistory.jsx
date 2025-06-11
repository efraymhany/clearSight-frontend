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
    <div className="min-h-screen pt-24 p-6 bg-gradient-to-br   dark:bg-gray-900 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-800 dark:text-blue-400 drop-shadow-md">
          🩺 Patient History for :{" "}
          {historyData.length > 0 ? historyData[0].patientName : "N/A"}
        </h2>

        <div className="flex justify-end mb-8">
          <button
            onClick={toggleViewMode}
            className="px-6 py-3 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 hover:scale-105 transition-transform duration-300"
            aria-label="Toggle view mode"
          >
            Switch to {viewMode === "table" ? "Card View" : "Table View"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-700"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-5 rounded mb-8 text-center font-semibold shadow-md">
            {error}
          </div>
        ) : historyData.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-lg font-medium">
            No history records found.
          </p>
        ) : viewMode === "table" ? (
          // Table View with confidence column added
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border-collapse border border-gray-300 dark:border-gray-700 overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="py-4 px-6 text-left border-r border-blue-500 rounded-tl-xl">
                  Doctor
                </th>
                <th className="py-4 px-6 text-left border-r border-blue-500">
                  Patient Name
                </th>
                <th className="py-4 px-6 text-left border-r border-blue-500">Date</th>
                <th className="py-4 px-6 text-left border-r border-blue-500">
                  Disease Message
                </th>
                <th className="py-4 px-6 text-left border-r border-blue-500">
                  Arabic Name
                </th>
                <th className="py-4 px-6 text-left border-r border-blue-500">
                  Fundus Camera Result
                </th>
                <th className="py-4 px-6 text-left border-r border-blue-500">
                  Confidence
                </th>
                <th className="py-4 px-6 text-left rounded-tr-xl">Image</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="border-b border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300">
                    <td className="py-4 px-6 border-r border-gray-300 dark:border-gray-700 font-medium">
                      {item.doctorName || "N/A"}
                    </td>
                    <td className="py-4 px-6 border-r border-gray-300 dark:border-gray-700">
                      {item.patientName || "N/A"}
                    </td>
                    <td className="py-4 px-6 border-r border-gray-300 dark:border-gray-700">
                      {item.date ? new Date(item.date).toLocaleString() : "N/A"}
                    </td>
                    <td className="py-4 px-6 border-r border-gray-300 dark:border-gray-700">
                      {item.diseaseMsg || "N/A"}
                    </td>
                    <td className="py-4 px-6 border-r border-gray-300 dark:border-gray-700">
                      {item.arabicName || "N/A"}
                    </td>
                    <td className="py-4 px-6 border-r border-gray-300 dark:border-gray-700">
                      {item.fundusCameraResult || "N/A"}
                    </td>
                  <td className="py-4 px-6 border-r border-gray-300 dark:border-gray-700">
  {item.confidence != null ? `${item.confidence}%` : "N/A"}
</td>

                    <td className="py-4 px-6">
                      {item.fundusCameraPath ? (
                        <img
                          src={item.fundusCameraPath}
                          alt="Fundus Camera"
                          className="w-36 h-28 object-cover rounded-lg border border-gray-300 dark:border-gray-600 shadow-md hover:scale-110 hover:shadow-xl transition-transform duration-300"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                  {idx !== historyData.length - 1 && (
                    <tr>
                      <td colSpan={8}>
                        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-5 my-2"></div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          // Card View with confidence field added
          <div className="space-y-10">
            {historyData.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row bg-green-50 rounded-xl p-8 shadow-xl border border-green-300 transition-transform duration-700 ease-out transform hover:scale-[1.03] hover:shadow-2xl animate-fadeInUp"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="md:w-2/3 pr-8 space-y-4 text-left text-base">
                  <h3 className="text-3xl font-extrabold mb-6 text-green-800 border-b-4 border-green-400 pb-3 drop-shadow-md">
                    Scan Result
                  </h3>

                  {[
                    { label: " 👨‍⚕️ Doctor", value: item.doctorName },
                    { label: " 🧑 Patient", value: item.patientName },
                    {
                      label: " 📅 Date",
                      value: item.date ? new Date(item.date).toLocaleString() : "N/A",
                    },
                    { label: " 💬 Disease Details", value: item.diseaseMsg },
                    { label: " 📝 Arabic Name", value: item.arabicName },
                    { label: " 📊 Fundus Camera Result", value: item.fundusCameraResult },
                    { label: " 📊 Confidence", value: item.confidence != null ? item.confidence : "N/A" },
                  ].map(({ label, value }) => (
                    <p key={label} className="text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-700 ">
                        {label}:
                      </span>{" "}
                      <span className="text-gray-900 ">{value || "N/A"}</span>
                    </p>
                  ))}
                </div>

                {item.fundusCameraPath && (
                  <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center items-start">
                    <img
                      src={item.fundusCameraPath}
                      alt="Fundus Camera"
                      className="rounded-xl border max-w-full max-h-60 shadow-2xl hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-6 mt-14">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-6 py-3 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 hover:scale-110 transition-transform duration-300 disabled:opacity-50"
          >
            ⬅ Previous
          </button>
          <span className="self-center text-xl font-semibold text-blue-800 dark:text-blue-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-6 py-3 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 hover:scale-110 transition-transform duration-300 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(25px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation-name: fadeInUp;
          animation-duration: 700ms;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default PatientHistory;
