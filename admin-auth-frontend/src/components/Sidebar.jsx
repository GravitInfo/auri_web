// import {
//   Home,
//   Users,
//   Settings,
//   LogOut,
//   Image as BannerIcon,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Sidebar({ onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [active, setActive] = useState("Dashboard");

//   useEffect(() => {
//     if (location.pathname.startsWith("/dashboard/organization")) {
//       setActive("Organizations");
//     } else if (location.pathname.startsWith("/dashboard/serviceCat")) {
//       setActive("Service Categories");
//     } else if (location.pathname.startsWith("/dashboard/banners")) {
//       setActive("Banner");
//     } else if (location.pathname.startsWith("/dashboard/settings")) {
//       setActive("Settings");
//     } else if (location.pathname === "/dashboard") {
//       setActive("Dashboard");
//     }
//   }, [location.pathname]);

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
//     { name: "Organizations", path: "/dashboard/organization", icon: <Users className="w-5 h-5" /> },
//     { name: "Service Categories", path: "/dashboard/serviceCat", icon: <Users className="w-5 h-5" /> },
//     { name: "Banner", path: "/dashboard/banners", icon: <BannerIcon className="w-5 h-5" /> },
//     { name: "Settings", path: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
//   ];

//   const handleMenuClick = (item) => {
//     setActive(item.name);
//     navigate(item.path);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-[#e8f0fe] via-[#f4f8ff] to-[#ffffff] border-r border-[#d9e3f0] shadow-lg flex flex-col z-50">
      
//       {/* Logo Section */}
//       <div className="p-6 border-b border-[#d9e3f0] bg-gradient-to-r from-[#cfe2ff] to-[#deeaff] text-center shadow-sm">
//         <h1 className="text-2xl font-extrabold text-[#003366] tracking-wide">
//           MEDI ADMIN
//         </h1>
//         <p className="text-sm text-[#4b73b5] font-medium mt-1">
//           Smart Healthcare Panel 🏥
//         </p>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 px-4 py-6 overflow-y-auto">
//         <ul className="space-y-2">
//           {menuItems.map((item) => (
//             <li
//               key={item.name}
//               onClick={() => handleMenuClick(item)}
//               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
//                 active === item.name
//                   ? "bg-gradient-to-r from-[#bfd3ff] to-[#c6d9ff] text-[#102a61] font-semibold shadow-md scale-[1.02]"
//                   : "hover:bg-[#e2ebff] text-[#294a88]"
//               }`}
//             >
//               <div
//                 className={`p-2 rounded-md transition-colors duration-300 ${
//                   active === item.name
//                     ? "bg-[#93b4ff] text-white"
//                     : "bg-[#f0f5ff] text-[#3b5fa0] hover:bg-[#d5e2ff]"
//                 }`}
//               >
//                 {item.icon}
//               </div>
//               <span className="tracking-wide">{item.name}</span>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Divider */}
//       <div className="mx-6 border-t border-[#d9e3f0]"></div>

//       {/* Logout Button */}
//       <div className="p-6">
//         <button
//           onClick={onLogout}
//           className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4a77d4] to-[#3b63b0] hover:from-[#355aa0] hover:to-[#2b4c8a] text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
//         >
//           <LogOut className="w-5 h-5" />
//           Logout
//         </button>
//       </div>

//       {/* Subtle Footer Glow */}
//       <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#dbe6ff] via-transparent to-transparent blur-2xl opacity-70 pointer-events-none"></div>
//     </div>
//   );
// }


import {
  Home,
  Users,
  Settings,
  LogOut,
  Image as BannerIcon,
  Layers,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Dashboard");

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
    { name: "Service Categories", path: "/dashboard/serviceCat", icon: <Layers className="w-5 h-5" /> },
    { name: "Banner", path: "/dashboard/banners", icon: <BannerIcon className="w-5 h-5" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const handleMenuClick = (item) => {
    setActive(item.name);
    navigate(item.path);
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-[#f5f8ff] via-[#f0f5ff] to-[#eaf1ff] border-r border-[#d7e0f5] shadow-md flex flex-col z-50 transition-all duration-300">
      
      {/* Logo Section */}
      <div className="p-5 border-b border-[#d7e0f5] bg-gradient-to-r from-[#c9d8ff] to-[#e3ecff] text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#1b3a7a] tracking-wide">
          MEDICAP ADMIN
        </h1>
        <p className="text-sm text-[#5572b5] font-medium mt-1">
          Smart Healthcare Panel 🏥
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#cbd5f3] scrollbar-track-transparent">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                active === item.name
                  ? "bg-[#dbe6ff] text-[#0e2c7d] font-semibold shadow-sm scale-[1.03]"
                  : "text-[#334e91] hover:bg-[#e6eeff] hover:text-[#18367a]"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  active === item.name
                    ? "bg-[#91b4ff] text-white shadow-inner"
                    : "bg-[#f3f6ff] text-[#4b6eb5] hover:bg-[#d8e4ff]"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[15px] tracking-wide">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <div className="mx-5 border-t border-[#d9e3f0]"></div>

      {/* Logout Button */}
      <div className="p-5">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4f7be2] to-[#3d64c1] hover:from-[#3b5db5] hover:to-[#2d4d9a] text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#dbe6ff] via-transparent to-transparent blur-2xl opacity-70 pointer-events-none"></div>
    </div>
  );
}
