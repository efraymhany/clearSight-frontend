// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const MyProfile = () => {
//   const { backendUrl, token } = useContext(AppContext);
//   const navigate = useNavigate();
//    const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [localImage, setLocalImage] = useState(null); // State for locally selected image
//   const fileInputRef = useRef(null); // Ref for the hidden file input

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       if (!token) {
//         toast.error("Please log in to view your profile.");
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get(backendUrl + "/Patients/Profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });

//         if (response.status === 200 && response.data) {
//           setProfileData(response.data);
//           // Load any previously saved local image from localStorage
//           const savedImage = localStorage.getItem("profileImage");
//           if (savedImage) setLocalImage(savedImage);
//         } else {
//           throw new Error("Unexpected response from server.");
//         }
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.err_message ||
//           err.response?.data?.message ||
//           "Failed to fetch profile data.";
//         setError(errorMessage);
//         toast.error(errorMessage);
//         if (err.response?.status === 401 || err.response?.status === 400) {
//           navigate("/login"); // Redirect on unauthorized or not found
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [backendUrl, token, navigate]);

//   // Handle file selection and convert to base64
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setLocalImage(base64String); // Update local state
//         localStorage.setItem("profileImage", base64String); // Save to localStorage
//         toast.success("Profile image updated locally!");
//       };
//       reader.readAsDataURL(file);
//     } else {
//       toast.error("Please select a valid image file (JPEG or PNG).");
//     }
//   };

//   // Trigger file input when image is clicked
//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-600">{error}</div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-left">
//         <div className="flex items-center gap-4 mb-6">
//           <div
//             className="w-24 h-24 bg-indigo-100 rounded-lg flex items-center justify-center cursor-pointer"
//             onClick={handleImageClick}
//           >
//             <img
//               src={localImage || profileData?.profileImagePath || "https://via.placeholder.com/100"}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/100";
//               }}
//             />
//           </div>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept="image/jpeg,image/png"
//             className="hidden"
//           />
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {profileData?.fullName || "No Name"}
//             </h2>
//             <p className="text-gray-600">{profileData?.userName || "No Username"}</p>
//           </div>
//         </div>

//         <hr className="border-t border-gray-300 mb-6" />

//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700">CONTACT INFORMATION</h3>
//           <div className="mt-2 space-y-2 text-gray-600">
//             <p>
//               <span className="font-medium">Email id:</span>{" "}
//               {profileData?.email || "Not Provided"}
//             </p>
//             <p>
//               <span className="font-medium">Phone:</span>{" "}
//               {profileData?.phoneNumbers?.[0] || "Not Provided"}
//             </p>
//           </div>
//         </div>

//         <hr className="border-t border-gray-300 mb-6" />

//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700">BASIC INFORMATION</h3>
//           <div className="mt-2 space-y-2 text-gray-600">
//             <p>
//               <span className="font-medium">Patient ID:</span>{" "}
//               {profileData?.patientId || "Not Provided"}
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => navigate("/edit-profile")}
//           className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
// ==============================================
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const { backendUrl, token, profileImage, setProfileImage, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) {
        toast.error("Please log in to view your profile.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(backendUrl + "/Patients/Profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status === 200 && response.data) {
          setProfileData(response.data);
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
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [backendUrl, token, navigate]);

  // Handle file selection, update context, and send to backend
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        setProfileImage(base64String); // Update context
        localStorage.setItem("profileImage", base64String); // Save to localStorage
        toast.success("Profile image updated locally!");

        // Send the image to the backend
        try {
          const formData = new FormData();
          formData.append("ProfileImage", file);
          formData.append("FullName", profileData?.fullName || "");
          formData.append("PhoneNumbers", profileData?.phoneNumbers?.[0] || "");

          const response = await axios.post(`${backendUrl}/Patients/EditProfile`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            toast.success("Profile image updated on server!");
            // Refetch profile data to ensure consistency
            await loadUserProfileData();
          } else {
            throw new Error(response.data.message || "Failed to update profile image on server.");
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.err_message ||
            "Failed to upload image to server.";
          toast.error(errorMessage);
          // Revert to the previous image if the upload fails
          setProfileImage(profileData?.profileImagePath || null);
          localStorage.setItem("profileImage", profileData?.profileImagePath || "");
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file (JPEG or PNG).");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">{error}</div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-left">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-24 h-24 bg-indigo-100 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              src={profileImage || profileData?.profileImagePath || "https://via.placeholder.com/100"}
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
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {profileData?.fullName || "No Name"}
            </h2>
            <p className="text-gray-600">{profileData?.userName || "No Username"}</p>
          </div>
        </div>

        <hr className="border-t border-gray-300 mb-6" />

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">CONTACT INFORMATION</h3>
          <div className="mt-2 space-y-2 text-gray-600">
            <p>
              <span className="font-medium">Email :</span>{" "}
              {profileData?.email || "Not Provided"}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {profileData?.phoneNumbers?.[0] || "Not Provided"}
            </p>
          </div>
        </div>

        <hr className="border-t border-gray-300 mb-6" />

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">BASIC INFORMATION</h3>
          <div className="mt-2 space-y-2 text-gray-600">
            <p>
              <span className="font-medium">Patient ID:</span>{" "}
              {profileData?.patientId || "Not Provided"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/editProfile", { state: { profileData } })} // Pass profileData to EditProfile
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default MyProfile;