// // Register.jsx
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "Patient",
//   });

//   const { backendUrl, setLoading } = useContext(AppContext);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loadingLocal, setLoadingLocal] = useState(false);
//   const navigate = useNavigate();

//   const validatePassword = (password) => {
//     const regex =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return regex.test(password);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setLoadingLocal(true);
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       setLoadingLocal(false);
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//       );
//       setLoading(false);
//       setLoadingLocal(false);
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("FullName", formData.fullName);
//       data.append("Email", formData.email);
//       data.append("Password", formData.password);
//       data.append("ConfirmPassword", formData.confirmPassword);
//       data.append("Role", formData.role);

//       const response = await axios.post(`${backendUrl}/Auth/register`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const responseData = response.data;

//       if (response.status === 200 && responseData.data.success) {
//         toast.success("Sign up successful!");
//         toast.info("A verification code has been sent to your email.");
//         setSuccess(
//           "Registration successful! Check your email to confirm your account."
//         );

//         // بعد التسجيل، الانتقال إلى صفحة تسجيل الدخول بعد 2 ثانية
//         setTimeout(() => navigate("/login"), 2000);

//         setFormData({
//           fullName: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           role: "Patient",
//         });
//       } else {
//         throw new Error(responseData.message || "Registration failed");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.err_message ||
//         "Registration failed. Please try again.";

//       // صححت هنا اسم الدالة من toast.sucess إلى toast.success
//       toast.error(errorMessage);

//       // إذا أردت إبقاء المستخدم في نفس الصفحة عند الخطأ، احذف السطر التالي:
//       // navigate("/login");
//     } finally {
//       setLoading(false);
//       setLoadingLocal(false);
//     }
//   };

//   return (
//     <>
//       {loadingLocal ? (
//         <div className="flex justify-center items-center min-h-[80vh] pt-24 mt-1">
//           <div className="text-center">Loading...</div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4 pt-24 mt-1 dark:bg-gray-900">
//           <div className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Create Account</h2>
//             {error && <p className="text-red-500">{error}</p>}
//             {success && <p className="text-green-500">{success}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 required
//               />
//               <input
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 required
//               />
//               <input
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//               />
//               <input
//                 className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 required
//               />

//               <div className="flex justify-center gap-4">
//                 <label className="flex items-center gap-1 text-black dark:text-white">
//                   <input
//                     type="radio"
//                     name="role"
//                     value="Patient"
//                     checked={formData.role === "Patient"}
//                     onChange={handleChange}
//                   />
//                   Patient
//                 </label>
//                 <label className="flex items-center gap-1 text-black dark:text-white">
//                   <input
//                     type="radio"
//                     name="role"
//                     value="Doctor"
//                     checked={formData.role === "Doctor"}
//                     onChange={handleChange}
//                   />
//                   Doctor
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                 disabled={loadingLocal}
//               >
//                 Sign Up
//               </button>
//             </form>

//             <p className="mt-4 text-gray-600 dark:text-gray-300">
//               Already have an account?
//             </p>
//             <button
//               onClick={() => navigate("/login")}
//               className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Register;
//////////////
// Register.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient",
  });
const API = import.meta.env.VITE_BACKEND_URL;





  const { backendUrl, setLoading } = useContext(AppContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingLocal(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      setLoadingLocal(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
      );
      setLoading(false);
      setLoadingLocal(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("FullName", formData.fullName);
      data.append("Email", formData.email);
      data.append("Password", formData.password);
      data.append("ConfirmPassword", formData.confirmPassword);
      data.append("Role", formData.role);

      const response = await axios.post(`${backendUrl}/Auth/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //   const response = await axios.post(`${API}/Auth/register`, data, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      //   const response = await axios.post(`http://localhost:5275/api/Auth/register`, data, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });


      const responseData = response.data;

      // تحقق من نجاح التسجيل بناءً على هيكل الرد
      if (response.status === 200 && (responseData.success || responseData.data?.success)) {
        toast.success("Sign up successful!");
        toast.info("A verification code has been sent to your email.");
        setSuccess(
          "Registration successful! Check your email to confirm your account."
        );

        // بعد التسجيل، الانتقال إلى صفحة تسجيل الدخول بعد 2 ثانية
        setTimeout(() => navigate("/login"), 2000);

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "Patient",
        });
      } else {
        throw new Error(responseData.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.err_message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      // للتأكد من إبقاء المستخدم في الصفحة في حالة الخطأ، لا تضع navigate("/login") هنا
    } finally {
      setLoading(false);
      setLoadingLocal(false);
    }
  };

  return (
    <>
      {loadingLocal ? (
        <div className="flex justify-center items-center min-h-[80vh] pt-24 mt-1">
          <div className="text-center">Loading...</div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4 pt-24 mt-1 dark:bg-gray-900">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />

              <div className="flex justify-center gap-4">
                <label className="flex items-center gap-1 text-black dark:text-white">
                  <input
                    type="radio"
                    name="role"
                    value="Patient"
                    checked={formData.role === "Patient"}
                    onChange={handleChange}
                  />
                  Patient
                </label>
                <label className="flex items-center gap-1 text-black dark:text-white">
                  <input
                    type="radio"
                    name="role"
                    value="Doctor"
                    checked={formData.role === "Doctor"}
                    onChange={handleChange}
                  />
                  Doctor
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={loadingLocal}
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Already have an account?
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;

