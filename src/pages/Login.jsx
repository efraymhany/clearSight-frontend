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

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken, loadUserProfileData } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", password);

    try {
      const response = await fetch("https://clearsight.runasp.net/api/Auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const dataa = await response.json();

      if (!response.ok) {
        throw new Error(dataa.message || "Login failed");
      }

      if (dataa.data.token) {
        localStorage.setItem("token", dataa.data.token);
        setToken(dataa.data.token);
        await loadUserProfileData();
      }

      setSuccess("Login successful! Redirecting to homepage...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="w-full p-2 border border-gray-300 rounded hover:border-black focus:border-black-500 focus:ring-1 focus:ring-gray-400 outline-none transition-all duration-300"
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
          className="mt-4 text-gray-600 hover:text-primary cursor-pointer"
        >
          Forgot password?
        </p>
        <p className="mt-4 text-gray-600">Don't have an account?</p>
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
// =============================

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
//   const { backendUrl, setToken, loadUserProfileData } = useContext(AppContext);

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
