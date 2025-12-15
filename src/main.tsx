import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-express-auth-kit";

const authConfig = {
  loginRoute: "http://localhost:3000/api/v1/auth/login",
  logoutRoute: "http://localhost:3000/api/v1/auth/logout",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider config={authConfig}>
    <App />
    </AuthProvider>
  </StrictMode>
);
