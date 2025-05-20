import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './AppContext';
// import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, userData } = useContext(AppContext);

  if (!token || !userData) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
