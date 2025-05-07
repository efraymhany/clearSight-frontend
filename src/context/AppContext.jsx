// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const currencySymbol = "$";
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [doctors, setDoctors] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"):false);
//   const [userData, setUserData] = useState(false);

//   // Update localStorage whenever token changes
//   useEffect(() => {
//     localStorage.setItem("token", token);
//   }, [token]);

//   const getDoctorData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/Patients/DoctorsList", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       if (data.success) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("API Error:", error.response ? error.response.data : error);
//       toast.error(error.response?.data?.message || "Authentication error.");
//     }
//   };
// const loadUserProfileData = async ()=>{
//   try {
//     const response = await axios.get(`${backendUrl}/Patients/Profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     });
//     if (response.data.success) {
//       setUserData(response.data.user);
//     } else {
//       toast.error(response.data.message);
//     }
    
//   } catch (error) {
//     console.error("API Error:", error.response ? error.response.data : error);
//     toast.error(error.response?.data?.message || "Authentication error.");
//   }

// }
// useEffect(() => {
//   if (token) {
//     loadUserProfileData();

//   } else{setUserData(false)}
// }, [token]);


//   useEffect(() => {
//     if (token) {
//       getDoctorData();
//     }
//   }, [token]);

//   return (
//     <AppContext.Provider value={{ doctors, currencySymbol, backendUrl, token, setToken ,loadUserProfileData}}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
    


// ==============================
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [userData, setUserData] = useState(null);
//   const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || null);
//   const [loading, setLoading] = useState({ user: false });
//   const [error, setError] = useState(null);

//   // Update localStorage when token changes
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//       setUserData(null);
//       setProfileImage(null);
//       localStorage.removeItem("profileImage");
//       setError(null);
//     }
//   }, [token]);

//   // Fetch user profile data
//   const loadUserProfileData = async () => {
//     if (!token) {
//       setError("No token available. Please log in.");
//       toast.error("No token available. Please log in.");
//       setUserData(null);
//       setProfileImage(null);
//       return;
//     }

//     setLoading((prev) => ({ ...prev, user: true }));
//     setError(null);

//     try {
//       const response = await axios.get(`${backendUrl}/Patients/Profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       const data = response.data;
//       console.log("User Profile Response:", data);

//       if (response.status === 200) {
//         if (data.success) {
//           setUserData({
//             fullName: data.user?.fullName || "Unknown",
//             email: data.user?.email || "Not Provided",
//             phoneNumbers: data.user?.phoneNumbers || [],
//             profileImagePath: data.user?.profileImagePath || null,
//             patientId: data.user?.patientId || "Not Provided",
//             userName: data.user?.userName || "Not Provided",
//           });
          
//           // Set the profile image from the backend if no local image is set
//           if (!localStorage.getItem("profileImage") && data.user?.profileImagePath) {
//             setProfileImage(data.user?.profileImagePath);
//             localStorage.setItem("profileImage", data.user?.profileImagePath);
//           }
//         } else {
//           const errorMessage = data.message || "Failed to load user profile.";
//           setError(errorMessage);
//           // toast.error(errorMessage);
//           setUserData(null);
//           setProfileImage(null);
//         }
//       } else if (response.status === 401) {
//         throw new Error("Unauthorized access. Please log in again.");
//       } else {
//         throw new Error(`Unexpected response from server: ${response.status}`);
//       }
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message ||
//         err.response?.data?.err_message ||
//         "Network error or authentication failed.";
//       console.error("Error fetching user profile:", errorMessage, err);
//       setError(errorMessage);
//       // toast.error(errorMessage);

//       if (errorMessage.includes("Unauthorized")) {
//         setToken("");
//         setUserData(null);
//         setProfileImage(null);
//         localStorage.removeItem("profileImage");
//       }
//     } finally {
//       setLoading((prev) => ({ ...prev, user: false }));
//     }
//   };

//   // Fetch user profile data when token changes
//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(null);
//       setProfileImage(null);
//       setError(null);
//     }
//   }, [token]);

//   // Provide all necessary values to the context
//   const value = {
//     backendUrl,
//     token,
//     setToken,
//     userData,
//     setUserData,
//     profileImage,
//     setProfileImage,
//     loadUserProfileData,
//     loading,
//     setLoading,
//     error,
//     setError
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppContextProvider;

// ===========================


// import { createContext, useEffect, useState } from "react";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   const value = {
//     backendUrl,
//     token,
//     setToken,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppContextProvider;
// ===========================


import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      loadUserProfileData();
    } else {
      localStorage.removeItem("token");
      setUserData(null);
    }
  }, [token]);

  const loadUserProfileData = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/Patients/Profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setUserData(response.data.user || {});
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    backendUrl,
    token,
    setToken,
    userData,
    loading,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;