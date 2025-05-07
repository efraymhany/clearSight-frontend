import React, { useState, useEffect } from 'react';

const PatientHistory = () => {
  const [history, setHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatientHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://clearsight.runasp.net/api/Patients/GetPatientHistory?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setHistory(data.data || []);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      setError(err.message || "Failed to fetch patient history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientHistory();
  }, [pageNumber, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)) {
      setPageNumber(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageNumber(1); // Reset to first page when page size changes
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient History</h2>
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!loading && !error && history.length === 0 && <p className="text-gray-500">No history available.</p>}
      {!loading && !error && history.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 border-b">Doctor</th>
                  <th className="py-3 px-4 border-b">Patient</th>
                  <th className="py-3 px-4 border-b">Confidence Path</th>
                  <th className="py-3 px-4 border-b">Date</th>
                  <th className="py-3 px-4 border-b">Disease</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {history.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="py-3 px-4">{item.doctorName}</td>
                    <td className="py-3 px-4">{item.patientName}</td>
                    <td className="py-3 px-4">{item.confidencePath}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.diseaseName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div>
              <label className="mr-2">Page Size:</label>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="border border-gray-300 p-1 rounded-md"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex mt-2 sm:mt-0">
              <button
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
                className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2 disabled:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === Math.ceil(totalCount / pageSize)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
            <p className="text-gray-600">
              Page {pageNumber} of {Math.ceil(totalCount / pageSize)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientHistory;