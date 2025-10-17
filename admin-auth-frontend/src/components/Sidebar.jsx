import { Home, Users, Settings, LogOut, Image as BannerIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Dashboard");

  // Detect active menu on page reload or route change
  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/organization")) {
      setActive("Organizations");
    } else if (location.pathname.startsWith("/dashboard/serviceCat")) {
      setActive("Service Categories");
    } else if (location.pathname.startsWith("/dashboard/banners")) {
      setActive("Banner");
    } else if (location.pathname.startsWith("/dashboard/settings")) {
      setActive("Settings");
    } else if (location.pathname === "/dashboard") {
      setActive("Dashboard");
    }
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Organizations", path: "/dashboard/organization", icon: <Users className="w-5 h-5" /> },
    { name: "Service Categories", path: "/dashboard/serviceCat", icon: <Users className="w-5 h-5" /> },
    { name: "Banner", path: "/dashboard/banners", icon: <BannerIcon className="w-5 h-5" /> },
    //{ name: "org-services", path: "/dashboard/orgServices", icon: <BannerIcon className="w-5 h-5" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  // 🔹 Handle menu click (navigate + active instantly)
  const handleMenuClick = (item) => {
    setActive(item.name);
    navigate(item.path);
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 flex flex-col shadow-2xl z-40">
      {/* Logo */}
      <div className="text-3xl font-extrabold tracking-wider p-6 text-indigo-400 border-b border-gray-700/50">
        ADMIN
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-8 overflow-y-auto">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-300 transform
                ${
                  active === item.name
                    ? "bg-indigo-600 text-white shadow-xl translate-x-1"
                    : "text-gray-300 hover:bg-gray-800/70 hover:text-indigo-300"
                }`}
            >
              <span
                className={`mr-4 ${
                  active === item.name ? "text-white" : "text-indigo-400"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-semibold">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <div className="mx-6 border-t border-gray-700/50"></div>

      {/* Logout */}
      <div className="p-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <LogOut className="mr-2 w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  );
}
