import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import axios from "axios";

const ProtectedRoute: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 👇 FIX: Added "?t=${Date.now()}" to force a new request every time
        await axios.get(
          `${import.meta.env.VITE_BASE_URL}admin/me?t=${Date.now()}`,
          {
            withCredentials: true, // Required for cookies
          }
        );

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
