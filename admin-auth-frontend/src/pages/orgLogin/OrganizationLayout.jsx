import { Outlet } from "react-router-dom";
import OrganizationSidebar from "./OrganizationSidebar";

export default function OrganizationLayout() {
  const handleLogout = () => {
    localStorage.removeItem("org_token");
    localStorage.removeItem("organization");
    window.location.href = "/organization/login";
  };

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <OrganizationSidebar onLogout={handleLogout} />
      <div className="flex-1 ml-64 p-10 overflow-y-auto">
        <Outlet /> {/* ye render karega Dashboard, Menu, ya koi bhi nested page */}
      </div>
    </div>
  );
}
