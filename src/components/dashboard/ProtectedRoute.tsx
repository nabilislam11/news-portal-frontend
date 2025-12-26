import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
// 👇 Use your configured 'api' instead of raw 'axios'
import { api } from "../axios";

const ProtectedRoute: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 👇 CRITICAL FIX: Add cache-busting timestamp
        // This ensures the browser NEVER uses a cached "200 OK" response
        await api.get(`/admin/me?t=${Date.now()}`);

        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading Auth...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
