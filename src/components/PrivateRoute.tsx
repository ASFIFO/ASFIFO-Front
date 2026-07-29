// src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthToken } from "../lib/auth";

export default function PrivateRoute() {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
