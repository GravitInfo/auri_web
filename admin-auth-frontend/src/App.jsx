import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Organization Pages
import OrganizationLogin from "./pages/orgLogin/OrganizationLogin";
import OrganizationDashboard from "./pages/orgLogin/OrganizationDashboard";
import OrganizationMenu from "./pages/orgLogin/OrganizationMenu";
import OrganizationLayout from "./pages/orgLogin/OrganizationLayout";
import OrgProtectedRoute from "./components/OrgProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* ---------------- Admin Routes ---------------- */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ---------------- Organization Routes ---------------- */}
        <Route path="/organization/login" element={<OrganizationLogin />} />

        <Route
          path="/organization/*"
          element={
            <OrgProtectedRoute>
              <OrganizationLayout />
            </OrgProtectedRoute>
          }
        >
          {/* Nested routes inside OrganizationLayout */}
          <Route path="dashboard" element={<OrganizationDashboard />} />
          <Route path="menu" element={<OrganizationMenu />} />
          {/* Add more organization pages here */}
        </Route>

        {/* ---------------- Catch-all ---------------- */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
