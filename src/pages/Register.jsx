// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "Patient",
//   });

//   const [errors, setErrors] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors("");

//     if (formData.password !== formData.confirmPassword) {
//       setErrors("Passwords do not match!");
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setErrors("Password must contain at least 8 characters, an uppercase letter, a number, and a special character.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://clearsight.runasp.net/api/Auth/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Form submitted successfully:", response.data);
//       alert("Signup successful!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit the form.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Create Account</h2>
//         {errors && <p className="text-red-500 mb-2">{errors}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm Password"
//             required
//           />
//           <div className="flex justify-center gap-4">
//             <label className="flex items-center gap-1">
//               <input
//                 type="radio"
//                 name="role"
//                 value="Patient"
//                 checked={formData.role === "Patient"}
//                 onChange={handleChange}
//               />
//               Patient
//             </label>
//             <label className="flex items-center gap-1">
//               <input
//                 type="radio"
//                 name="role"
//                 value="Doctor"
//                 checked={formData.role === "Doctor"}
//                 onChange={handleChange}
//               />
//               Doctor
//             </label>
//           </div>
//           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600">Already have an account?</p>
//         <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;
// =========================================================

// =======================================================
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import Loading from '../components/loadingg/Loading.jsx'

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "Patient",
//   });
//   const {backendUrl, token, setToken} = useContext(AppContext);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);


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
//     setLoading(true)
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//       );
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("FullName", formData.fullName);
//       data.append("Email", formData.email);
//       data.append("Password", formData.password);
//       data.append("ConfirmPassword", formData.confirmPassword);
//       data.append("Role", formData.role);


//       const response = await axios.post(backendUrl + "/Auth/register", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setLoading(false)

//       const responseData = response.data; // Correctly extracting response data

//       if (responseData.success) {
//         localStorage.setItem("token", responseData.token);
//         setToken(responseData.token);
//         toast.success("Registration successful!");
//       } else {
//         toast.error(responseData.message);
//       }


//     //   const response = await axios.post(backendUrl +`/Auth/register`
//     // ,
//     //     data,
//     //     {
//     //       headers: {
//     //         "Content-Type": "multipart/form-data",
//     //       },
//     //     }
//     //   );

//       setSuccess(
//         "Registration successful! Check your email to confirm your account."
//       );
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: "Patient",
//       });
//       toast.success(data.response, "success");

//       navigate("/login");
//     } catch (error) {
//       setError("Failed to submit the form. Please try again.");
//     }
//   };

//   return (
//     <>
//     {loading &&  <Loading /> }
//     <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Create Account</h2>
//         {error && <p className="text-red-600">{error}</p>}
//         {success && <p className="text-green-600">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-gray-300 transition-all "
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//           /> */}
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />
//           <input
//             className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm Password"
//             required
//           />
//           <div className="flex justify-center gap-4">
//             <label className="flex items-center gap-1">
//               <input
//                 type="radio"
//                 name="role"
//                 value="Patient"
//                 checked={formData.role === "Patient"}
//                 onChange={handleChange}
//               />
//               Patient
//             </label>
//             <label className="flex items-center gap-1">
//               <input
//                 type="radio"
//                 name="role"
//                 value="Doctor"
//                 checked={formData.role === "Doctor"}
//                 onChange={handleChange}
//               />
//               Doctor
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600">Already have an account?</p>
//         <button
//           onClick={() => navigate("/login")}
//           className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Register;
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import Loading from '../components/loadingg/Loading.jsx'

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "Patient",
//   });
//   const { backendUrl, token, setToken } = useContext(AppContext);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

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
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//       );
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("FullName", formData.fullName);
//       data.append("Email", formData.email);
//       data.append("Password", formData.password);
//       data.append("ConfirmPassword", formData.confirmPassword);
//       data.append("Role", formData.role);

//       const response = await axios.post(backendUrl + "/Auth/register", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Sign up successful!");
//       toast.info("A verification code has been sent to your email.");
//       setLoading(false);


//       const responseData = response.data;

//       if (responseData.success) {
//         localStorage.setItem("token", responseData.token);
//         setToken(responseData.token);

//       } else {
//         toast.error(responseData.message);
//       }

//       setSuccess(
//         "Registration successful! Check your email to confirm your account."
//       );
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: "Patient",
//       });
//       toast.success(data.response, "success");

//       navigate("/login");
//     } catch (error) {

//       setError("Failed to submit the form. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <Loading />}
//       <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
//         <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-4">Create Account</h2>
//           {error && <p className="text-red-600">{error}</p>}
//           {success && <p className="text-green-600">{success}</p>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               required
//             />
//             <div className="flex justify-center gap-4">
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Patient"
//                   checked={formData.role === "Patient"}
//                   onChange={handleChange}
//                 />
//                 Patient
//               </label>
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Doctor"
//                   checked={formData.role === "Doctor"}
//                   onChange={handleChange}
//                 />
//                 Doctor
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="mt-4 text-gray-600">Already have an account?</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
// ============================================




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
//   const { backendUrl } = useContext(AppContext);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

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
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//       );
//       setLoading(false);
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

//       if (response.status === 200 && responseData.success) {
//         toast.success("Sign up successful!");
//         toast.info("A verification code has been sent to your email.");
//         setSuccess(
//           "Registration successful! Check your email to confirm your account."
//         );
//         setFormData({
//           fullName: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           role: "Patient",
//         });
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         throw new Error(responseData.message || "Registration failed");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.err_message ||
//         "Failed to submit the form. Please try again.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <div className="flex justify-center items-center min-h-[80vh]"><div className="text-center">Loading...</div></div>}
//       <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
//         <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-4">Create Account</h2>
//           {error && <p className="text-red-600">{error}</p>}
//           {success && <p className="text-green-600">{success}</p>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               required
//             />
//             <div className="flex justify-center gap-4">
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Patient"
//                   checked={formData.role === "Patient"}
//                   onChange={handleChange}
//                 />
//                 Patient
//               </label>
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Doctor"
//                   checked={formData.role === "Doctor"}
//                   onChange={handleChange}
//                 />
//                 Doctor
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               disabled={loading}
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="mt-4 text-gray-600">Already have an account?</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
// ======================

// اخر كود نسخته 
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
//   const { backendUrl, setToken, loadUserProfileData } = useContext(AppContext);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

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
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//       );
//       setLoading(false);
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
//         setSuccess("Registration successful! Check your email to confirm your account.");
//         setFormData({
//           fullName: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           role: "Patient",
//         });

//         // If the backend returns a token (unlikely with email verification), set it
//         if (responseData.data.token) {
//           localStorage.setItem("token", responseData.data.token);
//           setToken(responseData.data.token);
//           await loadUserProfileData();
//         }

//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         throw new Error(responseData.message || "Registration failed");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.err_message ||
//         "Failed to submit the form. Please try again.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <div className="flex justify-center items-center min-h-[80vh]"><div className="text-center">Loading...</div></div>}
//       <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
//         <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-4">Create Account</h2>
//           {error && <p className="text-red-600">{error}</p>}
//           {success && <p className="text-green-600">{success}</p>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//             <input
//               className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               required
//             />
//             <div className="flex justify-center gap-4">
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Patient"
//                   checked={formData.role === "Patient"}
//                   onChange={handleChange}
//                 />
//                 Patient
//               </label>
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Doctor"
//                   checked={formData.role === "Doctor"}
//                   onChange={handleChange}
//                 />
//                 Doctor
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               disabled={loading}
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="mt-4 text-gray-600">Already have an account?</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
// ====================================
// كود الرول
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

  const { backendUrl, login, setLoading, loadUserProfileData } = useContext(AppContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
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
      setError("Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
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

      const responseData = response.data;
<<<<<<< HEAD
      console.log(responseData);
      console.log(response);
      if (responseData.statusCode === 200 && responseData.success) {
=======
      setSuccess("Registration successful! Check your email to confirm your account.");
      navigate("/login");

      if (response.status === 200 && responseData.data.success) {
>>>>>>> 0e977e4 (Updated Navbar with animations and logo effects)
        toast.success("Sign up successful!");
        toast.info("A verification code has been sent to your email.");
        setSuccess("Registration successful! Check your email to confirm your account.");

        if (responseData.data.token) {
          const token = responseData.data.token;

          // احفظ التوكن
          login(token, null);

          // بعدها نجيب البيانات كاملة من السيرفر
          await loadUserProfileData();

          // نوجه المستخدم حسب الرول الحقيقي اللي جاي من السيرفر
          const role = responseData.data.user?.role || formData.role;

          if (role === "Doctor") {
            navigate("/doctor");
        
          } else {
            navigate("/patient");
          }
        } else {
          // fallback لو مفيش توكن
          setTimeout(() => navigate("/login"), 2000);
        }

        // Reset form
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
        "Failed to submit the form. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setLoadingLocal(false);
    }
  };

  return (
    <>
      {loadingLocal ? (
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">Loading...</div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full p-2 border" type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
              <input className="w-full p-2 border" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              <input className="w-full p-2 border" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
              <input className="w-full p-2 border" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />

              <div className="flex justify-center gap-4">
                <label className="flex items-center gap-1">
                  <input type="radio" name="role" value="Patient" checked={formData.role === "Patient"} onChange={handleChange} />
                  Patient
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="role" value="Doctor" checked={formData.role === "Doctor"} onChange={handleChange} />
                  Doctor
                </label>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loadingLocal}>
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-gray-600">Already have an account?</p>
            <button onClick={() => navigate("/login")} className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2">
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;



 //////////////////////////////////////

// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { motion, AnimatePresence } from "framer-motion";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "Patient",
//   });
//   const { backendUrl, setToken, loadUserProfileData } = useContext(AppContext);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

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
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
//       );
//       setLoading(false);
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
//         setSuccess("Registration successful! Check your email to confirm your account.");
//         setFormData({
//           fullName: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           role: "Patient",
//         });

//         if (responseData.data.token) {
//           localStorage.setItem("token", responseData.data.token);
//           setToken(responseData.data.token);
//           await loadUserProfileData();
//         }

//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         throw new Error(responseData.message || "Registration failed");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.err_message ||
//         "Failed to submit the form. Please try again.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-[80vh] bg-gradient-to-br from-gray-200 to-blue-100 flex justify-center items-center p-4 relative overflow-hidden"
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
//             className="flex justify-center items-center min-h-[80vh]"
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
//               Create Account
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
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Full Name"
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
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   required
//                 />
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               >
//                 <input
//                   className="w-full p-2 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   required
//                 />
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//               >
//                 <input
//                   className="w-full p-2 border border-gray-300 rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none transition-all duration-300"
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm Password"
//                   required
//                 />
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//                 className="flex justify-center gap-4"
//               >
//                 <label className="flex items-center gap-1 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="role"
//                     value="Patient"
//                     checked={formData.role === "Patient"}
//                     onChange={handleChange}
//                     className="hidden"
//                   />
//                   <span className={`w-5 h-5 rounded-full border-2 ${formData.role === "Patient" ? "border-blue-600 bg-blue-600" : "border-gray-300"} flex items-center justify-center`}>
//                     {formData.role === "Patient" && (
//                       <span className="w-3 h-3 bg-white rounded-full"></span>
//                     )}
//                   </span>
//                   Patient
//                 </label>
//                 <label className="flex items-center gap-1 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="role"
//                     value="Doctor"
//                     checked={formData.role === "Doctor"}
//                     onChange={handleChange}
//                     className="hidden"
//                   />
//                   <span className={`w-5 h-5 rounded-full border-2 ${formData.role === "Doctor" ? "border-blue-600 bg-blue-600" : "border-gray-300"} flex items-center justify-center`}>
//                     {formData.role === "Doctor" && (
//                       <span className="w-3 h-3 bg-white rounded-full"></span>
//                     )}
//                   </span>
//                   Doctor
//                 </label>
//               </motion.div>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
//                 disabled={loading}
//               >
//                 Sign Up
//               </motion.button>
//             </form>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//               className="mt-4 text-gray-600"
//             >
//               Already have an account?
//             </motion.p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate("/login")}
//               className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 mt-2"
//             >
//               Login
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

// export default Register;