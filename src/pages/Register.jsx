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
  const { backendUrl, setToken, loadUserProfileData } = useContext(AppContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
      );
      setLoading(false);
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
      console.log(responseData);
      console.log(response);
      if (responseData.statusCode === 200 && responseData.success) {
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

        // If the backend returns a token (unlikely with email verification), set it
        if (responseData.data.token) {
          localStorage.setItem("token", responseData.data.token);
          setToken(responseData.data.token);
          await loadUserProfileData();
        }

        setTimeout(() => navigate("/login"), 2000);
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
    }
  };

  return (
    <>
      {loading && <div className="flex justify-center items-center min-h-[80vh]"><div className="text-center">Loading...</div></div>}
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-200 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            <div className="flex justify-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  value="Patient"
                  checked={formData.role === "Patient"}
                  onChange={handleChange}
                />
                Patient
              </label>
              <label className="flex items-center gap-1">
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
              disabled={loading}
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-600">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;