
// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { backendUrl, login, setLoading: setGlobalLoading } = useContext(AppContext);

//   // ✅ إذا جاء المستخدم من صفحة التسجيل، اعرض رسالة نجاح
//   useEffect(() => {
//     if (location.state?.registered) {
//       setSuccess("Login successful! Redirecting to homepage...");
//     }
//   }, [location.state]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);
//     setGlobalLoading(true);

//     try {
//       const data = new FormData();
//       data.append("Email", email);
//       data.append("Password", password);

//       const response = await axios.post(`${backendUrl}/Auth/login`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const dataa = response.data;

//       if (dataa.success) {
//         const token = dataa.data.token;
//         const role = dataa.data.role;
//         toast.success("Login Admin  successful! Redirecting to Admin Panel..."); // ✅ Toast message

//         // ✅ التحقق من الدور
//         if (role !== "Admin") {
//           throw new Error("غير مسموح لك بالدخول هنا. هذا الدخول مخصص للمشرفين فقط.");
//         }

//         const userInfo = { email, role };

//         // ✅ حفظ بيانات الأدمن
//         login(token, userInfo);

//         // setSuccess("تم تسجيل الدخول كأدمن! يتم التوجيه...");

//         // ✅ التوجيه لصفحة الأدمن
//         setTimeout(() => {
//           navigate("/AdminDashboard");
//         }, 1500);
//       } else {
//         throw new Error(dataa.message || "فشل تسجيل الدخول");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "حدث خطأ أثناء تسجيل الدخول."
//       );
//     } finally {
//       setLoading(false);
//       setGlobalLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center bg-slate-300 items-center min-h-screen p-4 pt-24 mt-1 dark:bg-slate-900">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4 dark:text-white">Admin Login</h2>

//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
//////////////
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, login, setLoading: setGlobalLoading } = useContext(AppContext);

  // ✅ Show success message if redirected from registration
  useEffect(() => {
    if (location.state?.registered) {
      setSuccess("Login successful! Redirecting to homepage...");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);
    setGlobalLoading(true);

    try {
      const data = new FormData();
      data.append("Email", email);
      data.append("Password", password);

      const response = await axios.post(`${backendUrl}/Auth/login`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const dataa = response.data;

      if (dataa.success) {
        const token = dataa.data.token;
        const role = dataa.data.role;

        // ✅ Validate role
        if (role !== "Admin") {
          throw new Error("Access denied. This page is for admins only.");
        }

        toast.success("Login successful! Redirecting to Admin Panel...");

        const userInfo = { email, role };
        login(token, userInfo);

        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 1500);
      } else {
        throw new Error(dataa.message || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.message ||
        "An error occurred during login."
      );
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-slate-300 items-center min-h-screen p-4 pt-24 mt-1 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Admin Login</h2>

        {success && <p className="text-green-600">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
