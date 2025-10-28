import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Users, Activity, BarChart, Clock, Zap } from "lucide-react";

// ---------------------- Organization ----------------------
import OrganizationList from "./Organization/OrganizationList";
import AddEditOrganization from "./Organization/AddEditOrganization";
import ViewOrganization from "./Organization/ViewOrganization";

// ---------------------- OrganizationPics ----------------------
import OrganizationPicsList from "./OrganizationPics/OrganizationPicsList";
import AddEditOrganizationPics from "./OrganizationPics/AddEditOrganizationPic";
import ViewOrganizationPics from "./OrganizationPics/ViewOrganizationPics";

// ---------------------- Service Categories ----------------------
import ServiceCatList from "./ServiceCat/ServiceCatList";
import AddEditServiceCat from "./ServiceCat/AddEditServiceCat";
import ViewServiceCat from "./ServiceCat/ViewServiceCat";

// ---------------------- Org Services ----------------------
import OrgServicesList from "./OrgServices/OrgServicesList";
import AddEditOrgService from "./OrgServices/AddEditOrgService";
import ViewOrgService from "./OrgServices/ViewOrgService";

// ---------------------- Service Providers ----------------------
import ServiceProvidersList from "./ServiceProviders/ServiceProvidersList";
import AddEditServiceProvider from "./ServiceProviders/AddEditServiceProvider";
import ViewServiceProvider from "./ServiceProviders/ViewServiceProvider";

// ---------------------- Banners ----------------------
import BannerList from "./Banner/BannerList";
import AddEditBanner from "./Banner/AddEditBanner";
import ViewBanner from "./Banner/ViewBanner";

// ---------------------- Dashboard Overview ----------------------
const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Organizations",
      value: "120",
      icon: <Users className="w-8 h-8 text-[#3b5fa0]" />,
      color: "border-[#3b5fa0]",
      trend: "+12% last month",
    },
    {
      title: "Active Users",
      value: "45",
      icon: <Activity className="w-8 h-8 text-[#2e7d32]" />,
      color: "border-[#2e7d32]",
      trend: "Online now",
    },
    {
      title: "New Registrations",
      value: "8",
      icon: <Zap className="w-8 h-8 text-[#f9a825]" />,
      color: "border-[#f9a825]",
      trend: "Today",
    },
    {
      title: "Pending Approvals",
      value: "3",
      icon: <Clock className="w-8 h-8 text-[#d32f2f]" />,
      color: "border-[#d32f2f]",
      trend: "Needs action",
    },
  ];

  const recentActivities = [
    { id: 1, action: "🏢 Organization 'TechCorp' created", time: "5 min ago" },
    { id: 2, action: "👤 User 'Aman K.' logged in", time: "1 hour ago" },
    { id: 3, action: "⚙️ Settings updated by Admin", time: "4 hours ago" },
    { id: 4, action: "❌ Organization 'GlobeNet' deleted", time: "1 day ago" },
    { id: 5, action: "🆕 New user registered", time: "2 days ago" },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold text-[#102a61] border-b pb-3 border-[#cfe2ff]">
          👋 Welcome to Medi Admin Dashboard
        </h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-[#f5f9ff] to-[#ffffff] p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 ${stat.color} transform hover:scale-[1.02]`}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-[#3b4a6b] uppercase tracking-wider">
                {stat.title}
              </h2>
              {stat.icon}
            </div>
            <p className="text-4xl font-bold mt-2 text-[#001a49]">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Performance + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Performance */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-[#e2ebff]">
          <h2 className="text-2xl font-bold text-[#102a61] mb-4 flex items-center">
            <BarChart className="w-6 h-6 mr-2 text-[#3b5fa0]" /> System
            Performance
          </h2>
          <div className="h-64 bg-[#f4f7ff] flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
            [📊 Chart Area — Integrate Recharts or Chart.js here]
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-[#e2ebff]">
          <h2 className="text-2xl font-bold text-[#102a61] mb-4 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-[#d32f2f]" /> Recent Activity
          </h2>
          <ul className="space-y-3">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0 hover:bg-[#f9fbff] rounded-lg px-2 transition"
              >
                <span className="text-[#3b4a6b]">{activity.action}</span>
                <span className="text-xs text-gray-500 bg-[#eef3ff] px-2 py-1 rounded-full">
                  {activity.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ---------------------- Dashboard Component ----------------------
export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#eef3ff] via-[#f8faff] to-[#ffffff]">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 ml-64 overflow-y-auto p-10">
        <Routes>
          {/* Dashboard Overview */}
          <Route index element={<DashboardOverview />} />

          {/* Organization */}
          <Route path="organization" element={<OrganizationList />} />
          <Route path="organization/add" element={<AddEditOrganization />} />
          <Route path="organization/edit/:id" element={<AddEditOrganization />} />
          <Route path="organization/:id" element={<ViewOrganization />} />

          {/* Organization Pics */}
          <Route path="organizationPics" element={<OrganizationPicsList />} />
          <Route path="organizationPics/add" element={<AddEditOrganizationPics />} />
          <Route path="organizationPics/edit/:id" element={<AddEditOrganizationPics />} />
          <Route path="organizationPics/view/:id" element={<ViewOrganizationPics />} />

          {/* Service Categories */}
          <Route path="serviceCat" element={<ServiceCatList />} />
          <Route path="serviceCat/add" element={<AddEditServiceCat />} />
          <Route path="serviceCat/edit/:id" element={<AddEditServiceCat />} />
          <Route path="serviceCat/view/:id" element={<ViewServiceCat />} />

          {/* Org Services */}
          <Route path="orgServices" element={<OrgServicesList />} />
          <Route path="orgServices/add" element={<AddEditOrgService />} />
          <Route path="orgServices/edit/:id" element={<AddEditOrgService />} />
          <Route path="orgServices/view/:id" element={<ViewOrgService />} />

          {/* Service Providers */}
          <Route path="serviceProviders/org/:orgId" element={<ServiceProvidersList />} />
          <Route path="serviceProviders/org/:orgId/add" element={<AddEditServiceProvider />} />
          <Route path="serviceProviders/org/:orgId/edit/:id" element={<AddEditServiceProvider />} />
          <Route path="serviceProviders/org/:orgId/view/:id" element={<ViewServiceProvider />} />

          {/* Banners */}
          <Route path="banners" element={<BannerList />} />
          <Route path="banners/add" element={<AddEditBanner />} />
          <Route path="banners/edit/:id" element={<AddEditBanner />} />
          <Route path="banners/view/:id" element={<ViewBanner />} />

          {/* Settings */}
          <Route
            path="settings"
            element={
              <div className="p-8 bg-white rounded-2xl shadow-md border border-[#e2ebff]">
                <h1 className="text-3xl font-bold text-[#102a61]">⚙️ Settings</h1>
                <p className="mt-4 text-gray-600">
                  Configure application preferences, account, and system behavior here.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
