
import { createContext, useEffect, useState } from "react";
import axios from "axios";

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

  // ✅ حفظ التوكن في اللوكال ستورج
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ✅ حفظ بيانات المستخدم في اللوكال ستورج
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  // ✅ ضبط الثيم
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

  // ✅ تحميل بيانات المستخدم من السيرفر
  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const response = await axios.get(`${backendUrl}/Auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data) {
        setUserData(response.data);
      } else {
        throw new Error("Invalid profile response");
      }
    } catch (error) {
      console.error("⚠️ Failed to load profile:", error);
      setUserData(null);
      setToken("");
    } finally {
      setLoading(false);
    }
  };

  // ✅ تحميل البيانات مرة واحدة عند وجود التوكن
  useEffect(() => {
    if (token && !userData) {
      loadUserProfileData();
    }
  }, [token]);

  // ✅ تسجيل الدخول
  const login = (receivedToken, userInfo) => {
    setToken(receivedToken);
    setUserData(userInfo);
  };


// ✅ تسجيل الخروج
const logout = async () => {
  if (!token) {
    setToken("");
    setUserData(null);
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/Auth/revokeToken`, {
      method: "DELETE",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setToken("");
      setUserData(null);
      // يمكنك إعادة التوجيه هنا إذا أردت
      // navigate("/login");
    } else {
      alert("Logout failed: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("An error occurred during logout");
  }
};



  // ✅ تحديث صورة البروفايل فقط في الستيت واللوكال ستورج
  const updateProfileImage = (newImageUrl) => {
    setUserData((prev) => {
      const updated = { ...prev, profileImage: newImageUrl };
      localStorage.setItem("userData", JSON.stringify(updated));
      return updated;
    });
  };

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
    loadUserProfileData,
    updateProfileImage, // ✅ متاحة للاستخدام
    theme,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
