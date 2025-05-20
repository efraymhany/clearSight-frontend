import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EditProfile = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumbers: '',
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const fetchPatientProfile = async () => {
    if (!token) return setError('Authentication token is missing. Please log in again.');

    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/Patients/Profile`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Error loading profile.');

      setProfile(data.data);
      setFormData({
        fullName: data.data.fullName || '',
        phoneNumbers: data.data.phoneNumbers?.join(', ') || '',
        profileImage: null,
      });
      setPreviewImage(data.data.profileImage || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientProfile();
  }, [token, backendUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError('Missing token');

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('phoneNumber', formData.phoneNumbers);
    if (formData.profileImage) formDataToSend.append('profileImage', formData.profileImage);

    try {
      const res = await fetch(`${backendUrl}/Patients/EditProfile`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/patientProfile'), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-teal-50 flex justify-center items-center py-10 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-32 h-32 bg-[#f17732] rounded-full opacity-20 animate-float-slow" style={{ top: '10%', left: '5%' }}></div>
        <div className="absolute w-44 h-44 bg-[#5f6FFF] rounded-full opacity-20 animate-float-slower" style={{ bottom: '20%', right: '15%' }}></div>
        <div className="absolute w-20 h-20 bg-[#f17732] rounded-full opacity-10 animate-float-slower" style={{ top: '60%', left: '10%' }}></div>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="bg-gradient-to-r from-[#f17732] to-[#5f6FFF] text-white text-center py-6 relative">
          <button onClick={() => navigate('/patientProfile')} className="absolute left-4 top-4 text-white hover:scale-110 transition">←</button>
          <h2 className="text-2xl font-bold">{profile?.fullName || 'Edit Profile'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 border-4 border-white rounded-full shadow-md overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-10 h-10 mx-auto text-[#f17732]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF]" required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone Numbers (comma-separated)</label>
            <input name="phoneNumbers" type="text" value={formData.phoneNumbers} onChange={handleInputChange} className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF]" required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
          </div>

          <AnimatePresence>
            {loading && <p className="text-center text-[#5f6FFF]">Loading...</p>}
            {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 bg-red-100 p-3 rounded">{error}</motion.div>}
            {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 bg-green-100 p-3 rounded">{success}</motion.div>}
          </AnimatePresence>

          <div className="text-center">
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-[#f17732] to-[#5f6FFF] text-white rounded-full hover:scale-105 transition-all duration-300 ease-in-out shadow hover:shadow-md">
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>

      <style>
        {`
          @keyframes float-slow {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes float-slower {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
          .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
        `}
      </style>
    </motion.div>
  );
};

export default EditProfile;