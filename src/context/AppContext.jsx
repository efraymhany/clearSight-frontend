// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("userData")) || null
//   );
//   const [loading, setLoading] = useState(false);

//   // استخراج الدور من بيانات المستخدم
//   const role = userData?.role || "";

//   // حفظ التوكن في localStorage
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   // حفظ بيانات المستخدم في localStorage
//   useEffect(() => {
//     if (userData) {
//       localStorage.setItem("userData", JSON.stringify(userData));
//     } else {
//       localStorage.removeItem("userData");
//     }
//   }, [userData]);

//   // تحميل بيانات البروفايل من السيرفر
//   const loadUserProfileData = async () => {
//     if (!token) return;

//     try {
//       setLoading(true);

//       const response = await axios.get(`${backendUrl}/Auth/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200 && response.data) {
//         setUserData(response.data); // تأكد أن response.data يحتوي على role
//       } else {
//         throw new Error("Invalid profile response");
//       }
//     } catch (error) {
//       console.error("⚠️ Failed to load profile:", error);
//       setUserData(null);
//       setToken("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // تحميل البروفايل تلقائيًا عند توفر التوكن
//   useEffect(() => {
//     if (token && !userData) {
//       loadUserProfileData();
//     }
//   }, [token]);

//   // تسجيل الدخول
//   const login = (receivedToken, userInfo) => {
//     setToken(receivedToken);
//     setUserData(userInfo); // يجب أن تحتوي userInfo على role وبيانات المستخدم
//   };

//   // تسجيل الخروج
//   const logout = () => {
//     setToken("");
//     setUserData(null);
//   };

//   const value = {
//     backendUrl,
//     token,
//     setToken,
//     userData,
//     setUserData,
//     role,
//     loading,
//     setLoading,
//     login,
//     logout,
//     loadUserProfileData,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppContextProvider;
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("userData")) || null
//   );
//   const [loading, setLoading] = useState(false);

//   // إضافة حالة الثيم (dark أو light)
//   const [theme, setTheme] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("theme") || "light";
//     }
//     return "light";
//   });

//   // استخراج الدور من بيانات المستخدم
//   const role = userData?.role || "";

//   // حفظ التوكن في localStorage
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   // حفظ بيانات المستخدم في localStorage
//   useEffect(() => {
//     if (userData) {
//       localStorage.setItem("userData", JSON.stringify(userData));
//     } else {
//       localStorage.removeItem("userData");
//     }
//   }, [userData]);

//   // حفظ حالة الثيم وتغيير كلاس الـ body
//   useEffect(() => {
//     localStorage.setItem("theme", theme);

//     if (theme === "dark") {
//       document.body.classList.add("dark");
//     } else {
//       document.body.classList.remove("dark");
//     }
//   }, [theme]);

//   // دالة لتبديل الوضع بين الداكن والفاتح
//   const toggleTheme = () => {
//     setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"));
//   };

//   // تحميل بيانات البروفايل من السيرفر
//   const loadUserProfileData = async () => {
//     if (!token) return;

//     try {
//       setLoading(true);

//       const response = await axios.get(`${backendUrl}/Auth/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200 && response.data) {
//         setUserData(response.data); // تأكد أن response.data يحتوي على role
//       } else {
//         throw new Error("Invalid profile response");
//       }
//     } catch (error) {
//       console.error("⚠️ Failed to load profile:", error);
//       setUserData(null);
//       setToken("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // تحميل البروفايل تلقائيًا عند توفر التوكن
//   useEffect(() => {
//     if (token && !userData) {
//       loadUserProfileData();
//     }
//   }, [token]);

//   // تسجيل الدخول
//   const login = (receivedToken, userInfo) => {
//     setToken(receivedToken);
//     setUserData(userInfo); // يجب أن تحتوي userInfo على role وبيانات المستخدم
//   };

//   // تسجيل الخروج
//   const logout = () => {
//     setToken("");
//     setUserData(null);
//   };

//   const value = {
//     backendUrl,
//     token,
//     setToken,
//     userData,
//     setUserData,
//     role,
//     loading,
//     setLoading,
//     login,
//     logout,
//     loadUserProfileData,
//     theme,
//     toggleTheme,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppContextProvider;
////////////////////
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

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

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

  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const response = await axios.get(`${backendUrl}/Auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data) {
        setUserData(response.data); // تأكد إن الصورة موجودة في response.data.profileImage
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

  useEffect(() => {
    if (token && !userData) {
      loadUserProfileData();
    }
  }, [token]);

  const login = (receivedToken, userInfo) => {
    setToken(receivedToken);
    setUserData(userInfo);
  };

  const logout = () => {
    setToken("");
    setUserData(null);
  };

  // ⬇️ دالة لتحديث صورة البروفايل فقط
  const updateProfileImage = (newImageUrl) => {
    setUserData((prev) => ({
      ...prev,
      profileImage: newImageUrl,
    }));
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
    updateProfileImage, // أضفناها علشان تستخدمها بعد رفع صورة جديدة
    theme,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
