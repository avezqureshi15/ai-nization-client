import { Navigate, Outlet } from "react-router-dom";

// replace this with your auth store later
const isAuthenticated = true;

export default function ProtectedRoute() {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}