

import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const slideIn = (delay = 0) => ({
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, delay },
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, login, setLoading: setGlobalLoading } = useContext(AppContext);

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
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials:true
      });

      const dataa = response.data;
      if (dataa.success) {
        const token = dataa.data.token;
        const role = dataa.data.role || "Patient";
        const userInfo = { email, role };

        toast.success("Login successful! Redirecting to homepage...");
        login(token, userInfo);
        setTimeout(() => navigate("/"), 1500);
      } else {
        throw new Error(dataa.message || "Fail to login");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Fail to login");
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 pt-24 dark:bg-slate-900 bg-slate-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl backdrop-blur-lg text-center"
      >
        <motion.h2 className="text-3xl font-extrabold mb-4 dark:text-white" {...slideIn(0)}>
          Welcome Back 👋
        </motion.h2>

        <AnimatePresence>
          {error && (
            <motion.p className="text-red-600 mb-2" {...slideIn(0.1)}>
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p className="text-green-600 mb-2" {...slideIn(0.1)}>
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            {...slideIn(0.2)}
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <motion.input
            {...slideIn(0.3)}
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <motion.button
            {...slideIn(0.4)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <motion.p
          {...slideIn(0.5)}
          onClick={() => navigate("/getCode")}
          className="mt-4 text-gray-600 hover:text-blue-500 cursor-pointer dark:text-gray-300"
        >
          Forgot password?
        </motion.p>

        <motion.p {...slideIn(0.6)} className="mt-4 text-gray-600 dark:text-gray-300">
          Don't have an account?
        </motion.p>
        <motion.button
          {...slideIn(0.7)}
          onClick={() => navigate("/register")}
          whileHover={{ scale: 1.03 }}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
        >
          Sign Up
        </motion.button>

        <motion.p {...slideIn(0.8)} className="mt-4 text-gray-600 dark:text-gray-300">
          If you are admin click here
        </motion.p>
        <motion.button
          {...slideIn(0.9)}
          onClick={() => navigate("/adminLogin")}
          whileHover={{ scale: 1.03 }}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 mt-2"
        >
          Admin Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
