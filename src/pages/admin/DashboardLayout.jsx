
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 shadow-md fixed left-0 top-0 h-full z-40 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-300 dark:border-gray-700">
            <img src={logo} alt="logo" className="w-10 animate-bounce" />
            <h2 className="text-2xl font-bold text-black dark:text-white">ClearSight</h2>
          </div>

          <nav className="flex flex-col mt-6">
            <NavLink
              to="/adminDashboard"
              className={({ isActive }) =>
                `px-6 py-3 font-medium transition-all rounded ${
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

        <div className="px-6 py-4 border-t border-gray-300 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Top bar for mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 flex items-center justify-between px-4 py-3">
        {/* اسم + لوجو على اليسار */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8 animate-bounce" />

          <h2 className="text-xl font-bold text-black dark:text-white">ClearSight</h2>
        </div>

        {/* زر القائمة على اليمين */}
        <button onClick={() => setMenuOpen(true)}>
          <Menu className="text-black dark:text-white w-6 h-6" />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-60 h-full bg-white dark:bg-gray-800 z-50 shadow-lg p-4 flex flex-col gap-4"
            >
              <button
                className="self-end text-xl font-bold mb-6 text-red-500"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>

              <NavLink
                to="/adminDashboard"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-all font-medium ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-white"
                      : "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Doctor List
              </NavLink>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-red-600 font-medium px-4 py-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-all"
              >
                Log Out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto mt-16 md:mt-0 md:ml-64">{children}</main>
    </div>
  );
};

export default DashboardLayout;
