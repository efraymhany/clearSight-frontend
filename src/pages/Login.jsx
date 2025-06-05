// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return regex.test(password);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//       );
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://clearsight.runasp.net/api/Auth/login",
//         {
//           Email: formData.email,
//           Password: formData.password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSuccess("Login successful! Redirecting...");
//       setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
//     } catch (error) {
//       setError("Failed to log in. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             // autocomplete="off"
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//             // autocomplete="off"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>

//           {/* Corrected "Forgot Password" Navigation */}
//           <p
//             onClick={() => navigate("/forgot-password")}
//             className="mt-4 text-gray-600 hover:text-primary cursor-pointer"
//           >
//             Forgot password?
//           </p>
//         </form>

//         <p className="mt-4 text-gray-600">Don't have an account?</p>
//         <button
//           onClick={() => navigate("/register")}
//           className="w-full  bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
// =======================================
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   // State to manage form inputs
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear previous messages
//     setError('');
//     setSuccess('');

//     // Create FormData object to match multipart/form-data
//     const formData = new FormData();
//     formData.append('Email', email);
//     formData.append('Password', password);

//     try {
//       const response = await fetch(`https://clearsight.runasp.net/api/Auth/login
// `, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           // Note: When using FormData, the browser automatically sets the Content-Type to multipart/form-data
//           // and includes the boundary, so we don't need to set it manually.
//         },
//       });

//       // Check if the response is successful
//       if (!response.ok) {
//         throw new Error('Login failed. Please check your credentials.');
//       }

//       const data = await response.json();
//       setSuccess('Login successful!');
//       console.log('Login response:', data);

//       // Optionally, you can store the token or user data in localStorage or state
//       // e.g., localStorage.setItem('token', data.token);
//       navigate("/");

//     } catch (err) {
//       setError(err.message || 'An error occurred during login.');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.formGroup}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.formGroup}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>
//         <button type="submit" style={styles.button}>Login</button>
//       </form>

//       {/* Display success or error messages */}
//       {success && <p style={styles.success}>{success}</p>}
//       {error && <p style={styles.error}>{error}</p>}
//     </div>
//   );
// };

// // Basic inline styles for the component
// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '50px auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: '#f9f9f9',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '8px',
//     fontSize: '16px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '10px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '16px',
//   },
//   success: {
//     color: 'green',
//     marginTop: '10px',
//   },
//   error: {
//     color: 'red',
//     marginTop: '10px',
//   },
// };

// export default Login;
// ============================
// import axios from "axios";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingg, setLoadingg] = useState(false);

//   const navigate = useNavigate();
//   const {backendUrl, token, setToken} = useContext(AppContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingg(true);

//     setError("");
//     setSuccess("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("Email", email);
//     formData.append("Password", password);

//     try {

//       const response = await fetch("https://clearsight.runasp.net/api/Auth/login", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       const data = await response.json();
//     setLoading(false);

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Store token in localStorage and update context
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         setToken(data.token);
//       }

//       setSuccess("Login successful! Redirecting to homepage...");
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setError(err.message || "An error occurred during login.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
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

//         <p
//           onClick={() => navigate("/forgot-password")}
//           className="mt-4 text-gray-600 hover:text-primary cursor-pointer"
//         >
//           Forgot password?
//         </p>

//         <p className="mt-4 text-gray-600">Don't have an account?</p>
//         <button
//           onClick={() => navigate("/register")}
//           className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
// ==============================================
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { motion, AnimatePresence } from "framer-motion";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { backendUrl, token, setToken, loadUserProfileData } = useContext(AppContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("Email", email);
//     formData.append("Password", password);

//     try {
//       const response = await fetch("https://clearsight.runasp.net/api/Auth/login", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       const dataa = await response.json();

//       if (!response.ok) {
//         throw new Error(dataa.message || "Login failed");
//       }

//       if (dataa.data.token) {
//         localStorage.setItem("token", dataa.data.token);
//         setToken(dataa.data.token);
//         await loadUserProfileData();
//       }

//       setSuccess("Login successful! Redirecting to homepage...");
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setError(err.message || "An error occurred during login.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-gray-200 to-blue-100 flex justify-center items-center p-4 relative overflow-hidden"
//     >
//       {/* Background Moving Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Floating Medical Icons */}
//         <svg
//           className="absolute w-12 h-12 text-blue-300 opacity-20 animate-float-rotate"
//           style={{ top: '10%', left: '15%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm1-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
//         </svg>
//         <svg
//           className="absolute w-16 h-16 text-blue-400 opacity-20 animate-float-rotate-delayed"
//           style={{ top: '30%', right: '10%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
//         </svg>
//         <svg
//           className="absolute w-14 h-14 text-blue-200 opacity-20 animate-float"
//           style={{ bottom: '20%', left: '20%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
//         </svg>
//         <svg
//           className="absolute w-10 h-10 text-blue-300 opacity-20 animate-float-delayed"
//           style={{ bottom: '15%', right: '25%' }}
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M21 10h-3V3h-2v7h-3l4 4 4-4zm-9 8c-3.31 0-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8h-2c0 3.31-2.69 6-6 6z" />
//         </svg>
//       </div>

//       <AnimatePresence>
//         {loading ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex justify-center items-center min-h-screen"
//           >
//             <svg
//               className="animate-spin h-8 w-8 text-blue-600"
//               viewBox="0 0 24 24"
//               fill="none"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8z"
//               />
//             </svg>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center z-10 hover:shadow-lg transition-all duration-300"
//           >
//             <motion.h2
//               className="text-2xl font-bold mb-4 animate-bounce"
//               initial={{ y: -20 }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               Login
//             </motion.h2>
//             <AnimatePresence>
//               {error && (
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="text-red-600 bg-red-100 p-2 rounded-lg mb-4"
//                 >
//                   {error}
//                 </motion.p>
//               )}
//               {success && (
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="text-green-600 bg-green-100 p-2 rounded-lg mb-4"
//                 >
//                   {success}
//                 </motion.p>
//               )}
//             </AnimatePresence>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//               >
//                 <input
//                   className="w-full p-2 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Email"
//                   required
//                 />
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <input
//                   className="w-full p-2 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Password"
//                   required
//                 />
//               </motion.div>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </motion.button>
//             </form>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               onClick={() => navigate("/forgot-password")}
//               className="mt-4 text-gray-600 hover:text-blue-600 cursor-pointer"
//             >
//               Forgot password?
//             </motion.p>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="mt-4 text-gray-600"
//             >
//               Don't have an account?
//             </motion.p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate("/register")}
//               className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 mt-2"
//             >
//               Sign Up
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>
//         {`
//           @keyframes float {
//             0% {
//               transform: translateY(0px);
//             }
//             50% {
//               transform: translateY(-20px);
//             }
//             100% {
//               transform: translateY(0px);
//             }
//           }

//           @keyframes float-rotate {
//             0% {
//               transform: translateY(0px) rotate(0deg);
//             }
//             50% {
//               transform: translateY(-20px) rotate(180deg);
//             }
//             100% {
//               transform: translateY(0px) rotate(360deg);
//             }
//           }

//           @keyframes float-rotate-delayed {
//             0% {
//               transform: translateY(0px) rotate(0deg);
//             }
//             50% {
//               transform: translateY(-20px) rotate(180deg);
//             }
//             100% {
//               transform: translateY(0px) rotate(360deg);
//             }
//           }

//           @keyframes bounce {
//             0%, 20%, 50%, 80%, 100% {
//               transform: translateY(0);
//             }
//             40% {
//               transform: translateY(-20px);
//             }
//             60% {
//               transform: translateY(-10px);
//             }
//           }

//           .animate-float {
//             animation: float 6s ease-in-out infinite;
//           }

//           .animate-float-delayed {
//             animation: float 6s ease-in-out infinite 2s;
//           }

//           .animate-float-rotate {
//             animation: float-rotate 8s ease-in-out infinite;
//           }

//           .animate-float-rotate-delayed {
//             animation: float-rotate 8s ease-in-out infinite 3s;
//           }

//           .animate-bounce {
//             animation: bounce 1s ease-in-out;
//           }
//         `}
//       </style>
//     </motion.div>
//   );
// };

// export default Login;
// =============================
// الكود قبل النسخ 
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { backendUrl, setToken } = useContext(AppContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("Email", email);
//     formData.append("Password", password);

//     try {
//       const response = await fetch(`${backendUrl}/Auth/login`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       const dataa = await response.json();
//       console.log(dataa);

//       if (!response.ok) {
//         throw new Error(dataa.message || "Login failed");
//       }

//       if (dataa.success) {
//         localStorage.setItem("token", dataa.data.token);
//         setToken(dataa.data.token);
        
//       }

//       setSuccess("Login successful! Redirecting to homepage...");
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setError(err.message || "An error occurred during login.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
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
//         <p
//           onClick={() => navigate("/forgot-password")}
//           className="mt-4 text-gray-600 hover:text-primary cursor-pointer"
//         >
//           Forgot password?
//         </p>
//         <p className="mt-4 text-gray-600">Don't have an account?</p>
//         <button
//           onClick={() => navigate("/register")}
//           className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
/////////////////////////////////////
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, login, setLoading: setGlobalLoading } = useContext(AppContext);

  // ✅ إذا جاء المستخدم من صفحة التسجيل، اعرض رسالة نجاح
  useEffect(() => {
    if (location.state?.registered) {
      setSuccess("Login successful! Redirecting to homepage...");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
        const role = dataa.data.role || "Patient"; // تأكد من اسم المفتاح الصحيح للدور حسب رد السيرفر
        const userInfo = { email, role };

        // حفظ بيانات المستخدم
        login(token, userInfo);

        setSuccess("Login successful! Redirecting to homepage...");

        // توجيه المستخدم حسب دوره
        setTimeout(() => {
                navigate("/");

        }, 1500);
      } else {
        throw new Error(dataa.message || "فشل تسجيل الدخول");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "حدث خطأ أثناء تسجيل الدخول."
      );
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 pt-24 mt-1 dark:bg-slate-900 bg-slate-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center ">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
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

        <p
          onClick={() => navigate("/forgot-password")}
          className="mt-4 text-gray-600 hover:text-primary cursor-pointer dark:text-gray-300"
        >
          Forgot password?
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Don't have an account?</p>
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
        >
          Sign Up
        </button>
          <p className="mt-4 text-gray-600 dark:text-gray-300">If you are admin click here</p>
        <button
          onClick={() => navigate("/adminLogin")}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
        >
          Admin Iogin
        </button>
      </div>
    </div>
  );
};

export default Login;
