
import { createContext, useEffect, useState } from "react";
// import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const role = userData?.role || "";

  // حفظ التوكن في اللوكال ستورج
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // حفظ بيانات المستخدم في اللوكال ستورج
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  //  ضبط الثيم
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"));
  };

  //  تحميل بيانات المستخدم من السيرفر
  // const loadUserProfileData = async () => {
  //   if (!token) return;

  //   try {
  //     setLoading(true);

  //     const response = await axios.get(`${backendUrl}/Auth/profile`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (response.status === 200 && response.data) {
  //       setUserData(response.data);
  //     } else {
  //       throw new Error("Invalid profile response");
  //     }
  //   } catch (error) {
  //     console.error("⚠️ Failed to load profile:", error);
  //     setUserData(null);
  //     setToken("");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //  تحميل البيانات مرة واحدة عند وجود التوكن
  // useEffect(() => {
  //   if (token && !userData) {
  //     loadUserProfileData();
  //   }
  // }, [token]);

  //  تسجيل الدخول
  const login = (receivedToken, userInfo) => {
    setToken(receivedToken);
    setUserData(userInfo);
  };


// ✅ تسجيل الخروج
// Function to add to your AppContext.jsx
const logout = async () => {
  try {
    const token = localStorage.getItem('authToken') || localStorage.getItem('refreshToken');
    
    if (!token) {
      console.warn('No token found');
      // Clear local storage anyway
      localStorage.clear();
      // Redirect to login or home page
      window.location.href = '/login';
      return;
    }

    const response = await fetch('https://clearsight.runasp.net/api/Auth/revokeToken', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Success - clear all data
      localStorage.clear();
      console.log('Logout successful');
      // Redirect to login page
      window.location.href = '/login';
    } else {
      // Failed but clear data anyway (token might be invalid)
      localStorage.clear();
      console.error('Logout failed:', data.message);
      window.location.href = '/login';
    }

  } catch (error) {
    console.error('Network error during logout:', error);
    // Clear data even on network error
    localStorage.clear();
    window.location.href = '/login';
  }
};







  // تحديث صورة البروفايل فقط في الستيت واللوكال ستورج
  // const updateProfileImage = (newImageUrl) => {
  //   setUserData((prev) => {
  //     const updated = { ...prev, profileImage: newImageUrl };
  //     localStorage.setItem("userData", JSON.stringify(updated));
  //     return updated;
  //   });
  // };

  const value = {
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    role,
    loading,
    setLoading,
    login,
    logout,
    // loadUserProfileData,
    // updateProfileImage, 
    theme,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
