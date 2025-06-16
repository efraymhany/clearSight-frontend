
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
// const API = import.meta.env.VITE_BACKEND_URL;





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
//       //   const response = await axios.post(`${API}/Auth/register`, data, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });
//       //   const response = await axios.post(`http://localhost:5275/api/Auth/register`, data, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });


//       const responseData = response.data;

//       // تحقق من نجاح التسجيل بناءً على هيكل الرد
//       if (response.status === 200 && (responseData.success || responseData.data?.success)) {
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
//       toast.error(errorMessage);
//       // للتأكد من إبقاء المستخدم في الصفحة في حالة الخطأ، لا تضع navigate("/login") هنا
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
////////////////////////////////
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AppContext } from "../../context/AppContext";
// import { motion, AnimatePresence } from "framer-motion";

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
//     const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return regex.test(password);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setLoadingLocal(true);
//   setError("");
//   setSuccess("");

//   if (formData.password !== formData.confirmPassword) {
//     setError("Passwords do not match!");
//     setLoading(false);
//     setLoadingLocal(false);
//     return;
//   }

//   if (!validatePassword(formData.password)) {
//     setError(
//       "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//     );
//     setLoading(false);
//     setLoadingLocal(false);
//     return;
//   }

//   try {
//     const data = new FormData();
//     data.append("FullName", formData.fullName);
//     data.append("Email", formData.email);
//     data.append("Password", formData.password);
//     data.append("ConfirmPassword", formData.confirmPassword);
//     data.append("Role", formData.role);

//     const response = await axios.post(`${backendUrl}/Auth/register`, data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const responseData = response.data;

//     if (responseData.success || responseData.data?.success) {
//       toast.success("Sign up successful!");
//       toast.info("A verification code has been sent to your email.");
//       setSuccess("Registration successful! Check your email to confirm your account.");

//       // Reset form + go to login
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: "Patient",
//       });

//       // ✅ Important: delay navigate after form reset
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } else {
//       const msg = responseData.message || responseData.data?.message || "Registration failed.";
//       throw new Error(msg);
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       error.response?.data?.err_message ||
//       error.message ||
//       "Registration failed. Please try again.";
//     toast.error(errorMessage);
//     setError(errorMessage);
//   } finally {
//     setLoading(false);
//     // ✅ Delay turning off loadingLocal to ensure UI doesn't flicker before redirect
//     setTimeout(() => setLoadingLocal(false), 2100);
//   }
// };


//   return (
//     <>
//       {loadingLocal ? (
//         <div className="flex justify-center items-center min-h-[80vh] pt-24 bg-slate-300">
//           <div className="text-center text-lg text-blue-600 font-semibold">Loading...</div>
//         </div>
//       ) : (
//         <div className="relative overflow-hidden flex justify-center items-center min-h-[100vh] bg-gradient-to-tr bg-slate-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 pt-24">
//           {/* Floating dots */}
//           <div className="absolute inset-0 -z-10 overflow-hidden">
//             {[...Array(20)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="w-2 h-2 rounded-full bg-slate-300 dark:bg-blue-700 absolute"
//                 initial={{ x: Math.random() * 100 + "%", y: "100vh", opacity: 0 }}
//                 animate={{ y: "-10vh", opacity: 1 }}
//                 transition={{
//                   duration: Math.random() * 5 + 5,
//                   repeat: Infinity,
//                   repeatType: "loop",
//                   ease: "easeInOut",
//                   delay: Math.random() * 5,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Card */}
//           <motion.div
//             initial={{ x: "-100vw", opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-2xl shadow-2xl backdrop-blur-xl z-10"
//           >
//             <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

//             <AnimatePresence>
//               {error && (
//                 <motion.p
//                   key="error"
//                   initial={{ x: -50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: 50, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-red-500 text-sm text-center"
//                 >
//                   {error}
//                 </motion.p>
//               )}
//               {success && (
//                 <motion.p
//                   key="success"
//                   initial={{ x: 50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: -50, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-green-500 text-sm text-center"
//                 >
//                   {success}
//                 </motion.p>
//               )}
//             </AnimatePresence>

//             <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//               {["fullName", "email", "password", "confirmPassword"].map((field, i) => (
//                 <motion.input
//                   key={field}
//                   type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   placeholder={field
//                     .replace(/([A-Z])/g, " $1")
//                     .replace(/^./, (s) => s.toUpperCase())}
//                   className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
//                   initial={{ x: i % 2 === 0 ? "-100vw" : "100vw", opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.6, delay: i * 0.1 }}
//                 />
//               ))}

//               <motion.div
//                 initial={{ x: "-100vw", opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//                 className="flex justify-center gap-6 mt-2"
//               >
//                 {["Patient", "Doctor"].map((role) => (
//                   <label key={role} className="flex items-center gap-2 cursor-pointer text-sm">
//                     <input
//                       type="radio"
//                       name="role"
//                       value={role}
//                       checked={formData.role === role}
//                       onChange={handleChange}
//                       className="accent-blue-600"
//                     />
//                     {role}
//                   </label>
//                 ))}
//               </motion.div>

//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 initial={{ x: "-100vw", opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//                 className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//               >
//                 Sign Up
//               </motion.button>
//             </form>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7 }}
//               className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center"
//             >
//               Already have an account?
//             </motion.p>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => navigate("/login")}
//               initial={{ x: "100vw", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.8 }}
//               className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//             >
//               Login
//             </motion.button>
//           </motion.div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Register;
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient",
  });

  const { backendUrl, setLoading } = useContext(AppContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 لإظهار/إخفاء كلمة المرور
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
        
        withCredentials:true

      });

      const responseData = response.data;

      if (responseData.success || responseData.data?.success) {
        toast.success("Sign up successful!");
        toast.info("A verification code has been sent to your email.");
        setSuccess("Registration successful! Check your email to confirm your account.");

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "Patient",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const msg = responseData.message || responseData.data?.message || "Registration failed.";
        throw new Error(msg);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.err_message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      setTimeout(() => setLoadingLocal(false), 2100);
    }
  };

  return (
    <>
      {loadingLocal ? (
        <div className="flex justify-center items-center min-h-[80vh] pt-24 bg-slate-300">
          <div className="text-center text-lg text-blue-600 font-semibold">Loading...</div>
        </div>
      ) : (
        <div className="relative overflow-hidden flex justify-center items-center min-h-[100vh] bg-gradient-to-tr bg-slate-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 pt-24">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-slate-300 dark:bg-blue-700 absolute"
                initial={{ x: Math.random() * 100 + "%", y: "100vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: 1 }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-2xl shadow-2xl backdrop-blur-xl z-10"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

            <AnimatePresence>
              {error && (
                <motion.p
                  key="error"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  key="success"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-green-500 text-sm text-center"
                >
                  {success}
                </motion.p>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <motion.input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />

              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                initial={{ x: "100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              {["password", "confirmPassword"].map((field, i) => (
                <div key={field} className="relative">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())}
                    className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                    initial={{ x: i % 2 === 0 ? "-100vw" : "100vw", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              ))}

              <motion.div
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center gap-6 mt-2"
              >
                {["Patient", "Doctor"].map((role) => (
                  <label key={role} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    {role}
                  </label>
                ))}
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center"
            >
              Already have an account?
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")}
              initial={{ x: "100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Register;
