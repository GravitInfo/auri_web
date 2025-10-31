import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationSidebar from "./OrganizationSidebar";
import { Building2, Mail, MapPin, Phone, FileText } from "lucide-react";

export default function OrganizationDashboard() {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const orgData = localStorage.getItem("organization");
    const token = localStorage.getItem("org_token");

    if (!orgData || !token) {
      navigate("/organization/login");
    } else {
      setOrganization(JSON.parse(orgData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("org_token");
    localStorage.removeItem("organization");
    navigate("/organization/login");
  };

  if (!organization) return null;

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <OrganizationSidebar onLogout={handleLogout} />

      <div className="flex-1  p-10 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#c9d8ff] to-[#e3ecff] p-6 rounded-2xl shadow-md mb-8 border border-[#d7e0f5]">
          <h1 className="text-3xl font-bold text-[#1b3a7a]">
            Welcome, {organization.name}
          </h1>
          <p className="text-[#4b6eb5] font-medium">
            Status:{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                organization.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {organization.status}
            </span>
          </p>
        </div>

        {/* Organization Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e1e8f8] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <Building2 className="w-8 h-8 text-[#4f7be2]" />
              <div>
                <h3 className="text-lg font-semibold text-[#1b3a7a]">Name</h3>
                <p className="text-gray-600">{organization.name}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e1e8f8] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 text-[#4f7be2]" />
              <div>
                <h3 className="text-lg font-semibold text-[#1b3a7a]">Email</h3>
                <p className="text-gray-600">{organization.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e1e8f8] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 text-[#4f7be2]" />
              <div>
                <h3 className="text-lg font-semibold text-[#1b3a7a]">Phone</h3>
                <p className="text-gray-600">{organization.phone_no}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e1e8f8] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-[#4f7be2]" />
              <div>
                <h3 className="text-lg font-semibold text-[#1b3a7a]">Address</h3>
                <p className="text-gray-600">
                  {organization.address}, {organization.city}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#e1e8f8] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-[#4f7be2]" />
              <div>
                <h3 className="text-lg font-semibold text-[#1b3a7a]">Type</h3>
                <p className="text-gray-600 capitalize">{organization.type}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-gradient-to-r from-[#dbe6ff] to-[#bcd0ff] p-6 rounded-2xl shadow-md text-center border border-[#cbdaf7] hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-bold text-[#0e2c7d]">Active Services</h3>
            <p className="text-3xl font-bold text-[#1b3a7a] mt-2">12</p>
          </div>

          <div className="bg-gradient-to-r from-[#e8eaff] to-[#c9d8ff] p-6 rounded-2xl shadow-md text-center border border-[#cbdaf7] hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-bold text-[#0e2c7d]">Pending Requests</h3>
            <p className="text-3xl font-bold text-[#1b3a7a] mt-2">5</p>
          </div>

          <div className="bg-gradient-to-r from-[#e2f0ff] to-[#b8d7ff] p-6 rounded-2xl shadow-md text-center border border-[#cbdaf7] hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-bold text-[#0e2c7d]">Total Members</h3>
            <p className="text-3xl font-bold text-[#1b3a7a] mt-2">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
