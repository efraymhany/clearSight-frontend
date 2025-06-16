
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

