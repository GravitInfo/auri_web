import { Navigate } from "react-router-dom";

export default function OrgProtectedRoute({ children }) {
  const orgToken = localStorage.getItem("org_token");
  if (!orgToken) {
    return <Navigate to="/organization/login" />;
  }
  return children;
}
