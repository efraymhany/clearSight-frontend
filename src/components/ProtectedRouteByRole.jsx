// components/ProtectedRouteByRole.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRouteByRole = ({ children, allowedRoles }) => {
  const { token, role, loading } = useContext(AppContext);

  // لو لسه البيانات بتتحمل
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // لو مفيش توكن أو مفيش بيانات مستخدم
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // لو الرول مش مسموح بيها
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteByRole;
