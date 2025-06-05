import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const DoctorSearch = () => {
  const [query, setQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AppContext);

  const searchDoctors = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://clearsight.runasp.net/api/Patients/SearchUsingDoctorName?pageNumber=1&pageSize=5&doctorName=${query}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,

          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search for doctors.");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "API returned error.");
      }

      setDoctors(result.data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchDoctors();
  }, [query]);

  return (
    <div className="min-h-screen bg-teal-50 py-10 px-6  pt-24 mt-1   dark:bg-slate-900 ">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">
          Search Doctors
        </h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg hover:border-spacing-7"
            placeholder="Enter doctor's name"
          />
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.doctorId}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div className="flex gap-4">
                <img
                  src={doctor.profileImagePath || "/default-avatar.png"}
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 className="text-lg font-semibold text-[#f17732]">
                    {doctor.fullName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Username: {doctor.userName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: {doctor.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    Available: {doctor.availableFrom} to {doctor.availableTo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
