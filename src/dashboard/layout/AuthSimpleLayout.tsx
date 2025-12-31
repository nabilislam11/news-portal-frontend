import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import axios from "axios";

const AuthSimpleLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Using the same endpoint as ProtectedRoute
        await axios.get(
          `${import.meta.env.VITE_BASE_URL}admin/me?t=${Date.now()}`,
          {
            withCredentials: true,
          }
        );

        // If success, user IS logged in
        setIsAuthenticated(true);
      } catch (err) {
        // If error, user is NOT logged in
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // Optional: Return null to avoid flickering

  // 👇 LOGIC REVERSED vs ProtectedRoute
  // If Authenticated: Redirect to Dashboard (Don't let them see login)
  // If Not Authenticated: Allow them to see the Child Route (Outlet)
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthSimpleLayout;
