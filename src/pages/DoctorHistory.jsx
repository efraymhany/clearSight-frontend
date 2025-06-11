import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PatientHistory2 = () => {
  const { patientId } = useParams();
  const { token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  const fetchPatientHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const url = `${backendUrl}/Doctors/GetPatientHistory/${patientId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success && data.data) {
          setHistory(data.data.items || []);
          setHasNext(data.data.hasNext);
          setHasPrevious(data.data.hasPrevious);
        } else {
          setHistory([]);
          setError("No history data found.");
        }
      } else {
        const textData = await response.text();
        setError("Unexpected response format: " + textData);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch patient history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && backendUrl && patientId) {
      fetchPatientHistory();
    }
  }, [token, backendUrl, patientId, pageNumber]);

  return (
    <div className="min-h-screen pt-24 p-4 bg-gradient-to-br from-gray-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
          🩺 Patient History for : {history.length > 0 ? history[0].patientName : "N/A"}
        </h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
            className="px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Switch to {viewMode === "table" ? "Card View" : "Table View"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center font-semibold">
            {error}
          </div>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-500 mb-6">No history records found.</p>
        ) : viewMode === "table" ? (
          // Table View
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-5 text-left border-r border-blue-400 rounded-tl-lg">Doctor</th>
                <th className="py-3 px-5 text-left border-r border-blue-400">Patient Name</th>
                <th className="py-3 px-5 text-left border-r border-blue-400">Date</th>
                <th className="py-3 px-5 text-left border-r border-blue-400">Disease Message</th>
                <th className="py-3 px-5 text-left border-r border-blue-400">Arabic Name</th>
                <th className="py-3 px-5 text-left border-r border-blue-400">Fundus Camera Result</th>
                <th className="py-3 px-5 text-left border-r border-blue-400">Confidence</th> {/* Added confidence */}
                <th className="py-3 px-5 text-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="border-b border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                    <td className="py-3 px-5 border-r border-gray-300 dark:border-gray-700">{item.doctorName || "N/A"}</td>
                    <td className="py-3 px-5 border-r border-gray-300 dark:border-gray-700">{item.patientName || "N/A"}</td>
                    <td className="py-3 px-5 border-r border-gray-300 dark:border-gray-700">{item.date ? new Date(item.date).toLocaleString() : "N/A"}</td>
                    <td className="py-3 px-5 border-r border-gray-300 dark:border-gray-700">{item.diseaseMsg || "N/A"}</td>
                    <td className="py-3 px-5 border-r border-gray-300 dark:border-gray-700">{item.arabicName || "N/A"}</td>
                    <td className="py-3 px-5 border-r border-gray-300 dark:border-gray-700">{item.fundusCameraResult || "N/A"}</td>
<td className="py-3 px-5 border-r border-gray-300 dark:border-gray-700">
  {item.confidence !== undefined && item.confidence !== null ? `${item.confidence}%` : "N/A"}
</td> {/* Display confidence */}
                    <td className="py-3 px-5">
                      {item.fundusCameraPath ? (
                        <img
                          src={item.fundusCameraPath}
                          alt="Fundus Camera"
                          className="w-24 h-auto rounded-md border border-gray-300 dark:border-gray-600"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                  {idx !== history.length - 1 && (
                    <tr>
                      <td colSpan={8}>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-5 my-1"></div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          // Card View
          <div className="space-y-6">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row bg-green-50 rounded-lg p-6 shadow-lg border border-green-200 transition-all duration-700 ease-out transform animate-fadeInUp"
              >
                <div className="md:w-2/3 pr-6 space-y-3 text-left text-sm">
                  <h3 className="text-2xl font-semibold mb-4 text-green-800 border-b border-green-300 pb-2">
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
{ label: " 🎯 Confidence", value: item.confidence !== undefined && item.confidence !== null ? `${item.confidence}%` : "N/A" },
                  ].map(({ label, value }) => (
                    <p key={label} className="text-gray-700">
                      <span className="font-semibold text-blue-700">{label}:</span>{" "}
                      <span className="text-gray-900">{value || "N/A"}</span>
                    </p>
                  ))}
                </div>

                {item.fundusCameraPath && (
                  <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center items-start">
                    <img
                      src={item.fundusCameraPath}
                      alt="Fundus Camera"
                      className="rounded-lg border max-w-full max-h-48 shadow-xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            disabled={!hasPrevious}
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            className={`px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition disabled:opacity-50`}
          >
            ⬅ Previous
          </button>
          <span className="self-center text-lg font-medium">
            Page <span className="text-blue-600">{pageNumber}</span>
          </span>
          <button
            disabled={!hasNext}
            onClick={() => setPageNumber((prev) => prev + 1)}
            className={`px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition disabled:opacity-50`}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory2;
