import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OrgProtectedRoute from "./components/OrgProtectedRoute";
import OrganizationLogin from "./pages/orgLogin/OrganizationLogin";
import OrganizationDashboard from "./pages/orgLogin/OrganizationDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Organization Routes */}
        <Route path="/organization/login" element={<OrganizationLogin />} />
        <Route
          path="/organization/dashboard"
          element={
            <OrgProtectedRoute>
              <OrganizationDashboard />
            </OrgProtectedRoute>
          }
        />
        {/* admin login */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard with nested routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
