import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DoctorDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AppContext);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contacted, setContacted] = useState(false);

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`https://clearsight.runasp.net/api/Doctors/Details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      setDoctor(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = () => setContacted(true);
  const handleCancelContact = () => setContacted(false);

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!doctor) return <p className="text-center">Doctor not found.</p>;

  return (
    <div className="min-h-screen bg-teal-50 py-10 px-6 pt-24 mt-1 dark:text-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-[#5f6FFF] mb-6">
          Doctor Profile
        </h1>
        <div className="flex gap-6 items-start">
          <img
            src={doctor.profileImagePath || "/default-avatar.png"}
            alt={doctor.fullName}
            className="w-32 h-32 rounded-full object-cover border"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#f17732]">
              {doctor.fullName}
            </h2>
            <p>Username: {doctor.userName}</p>
            <p>Address: {doctor.address}</p>
            <p>Availability: {doctor.availableFrom} to {doctor.availableTo}</p>
            <p>Days Off: {doctor.daysOff?.join(", ") || "None"}</p>
            <p>Phone Numbers: {doctor.phoneNumbers?.join(", ") || "None"}</p>
            <p>Available This Month: {doctor.availableForCureentMonth ? "Yes" : "No"}</p>

            <div className="mt-4">
              {!contacted ? (
                <button
                  onClick={handleContact}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Contact Doctor
                </button>
              ) : (
                <button
                  onClick={handleCancelContact}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancel Contact
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
