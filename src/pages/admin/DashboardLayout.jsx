// src/layouts/AdminDashboardLayout.jsx
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo1.png";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md fixed left-0 top-0 h-full z-40">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-300 dark:border-gray-700">
            <img src={logo} alt="logo" className="w-10 animate-bounce" />
            <h2 className="text-2xl font-bold text-black dark:text-white">ClearSight</h2>
          </div>

          {/* Menu */}
          <nav className="flex flex-col mt-6">
            <NavLink
              to="/AdminDashboard"
              className={({ isActive }) =>
                `px-6 py-3 font-medium transition-all ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              Doctor List
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
