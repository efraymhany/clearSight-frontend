import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const EditProfile = () => {
  const { backendUrl, token, profileImage, setProfileImage, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Initialize state with profile data passed from MyProfile (if available)
  const [profileData, setProfileData] = useState(location.state?.profileData || null);
  const [fullName, setFullName] = useState(profileData?.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(profileData?.phoneNumbers?.[0] || "");
  const [newProfileImage, setNewProfileImage] = useState(profileImage || profileData?.profileImagePath || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch profile data if not passed via navigation state
  useEffect(() => {
    if (!token) {
      toast.error("Please log in to edit your profile.");
      navigate("/login");
      return;
    }

    if (!profileData) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`${backendUrl}/Patients/Profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          if (response.status === 200 && response.data) {
            setProfileData(response.data.user);
            setFullName(response.data.user?.fullName || "");
            setPhoneNumber(response.data.user?.phoneNumbers?.[0] || "");
            setNewProfileImage(profileImage || response.data.user?.profileImagePath || null);
          } else {
            throw new Error("Unexpected response from server.");
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.err_message ||
            err.response?.data?.message ||
            "Failed to fetch profile data.";
          setError(errorMessage);
          toast.error(errorMessage);
          if (err.response?.status === 401 || err.response?.status === 400) {
            navigate("/login");
          }
        }
      };

      fetchProfileData();
    }
  }, [backendUrl, token, navigate, profileData, profileImage]);

  // Handle file selection for profile image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setNewProfileImage(base64String); // Update local state for preview
        toast.success("Profile image selected!");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file (JPEG or PNG).");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("FullName", fullName);
      formData.append("PhoneNumbers", JSON.stringify([phoneNumber]));

      // If a new image is selected, append it to the form data
      if (fileInputRef.current?.files[0]) {
        formData.append("ProfileImage", fileInputRef.current.files[0]);
      }

      const response = await axios.post(`${backendUrl}/Patients/EditProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // FormData automatically sets the correct Content-Type
        },
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        
        // Update the profile image in the context if a new image was uploaded
        if (newProfileImage && newProfileImage !== profileImage) {
          setProfileImage(newProfileImage);
          localStorage.setItem("profileImage", newProfileImage);
        }
        
        // Refetch profile data to ensure consistency
        await loadUserProfileData();
        navigate("/my-profile");
      } else {
        throw new Error(response.data.message || "Failed to update profile.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.err_message ||
        err.message ||
        "Failed to update profile.";
      setError(errorMessage);
      toast.error(errorMessage);
      
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">{error}</div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-24 h-24 bg-indigo-100 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={newProfileImage || profileData?.profileImagePath || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100";
                }}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
              className="hidden"
            />
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/my-profile")}
              className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;