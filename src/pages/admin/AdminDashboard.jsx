// import AdminDoctorsList from "./AdminDoctorList";
// import DashboardLayout from "./DashboardLayout";

// const AdminDashboard = () => {
//   return (
//     <DashboardLayout>
//       <AdminDoctorsList />
//     </DashboardLayout>
//   );
// };

// export default AdminDashboard;

// src/pages/AdminDashboard.jsx
// src/pages/admin/AdminDashboard.jsx
import DashboardLayout from "./DashboardLayout";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;

