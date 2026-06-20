import { useContext, useEffect, useState, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

// 1. Point to your Render backend or fall back to local dev port
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Note: If this frontend is built using Vite instead of Next.js/CRA, use this line instead:
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token, setToken } = useContext(AuthContext);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) return setIsValid(false);

    // 2. Wrap it in a template literal using BASE_URL
    fetch(`${BASE_URL}/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 200) setIsValid(true);
        else {
          setToken(null);
          localStorage.removeItem("token");
          setIsValid(false);
        }
      })
      .catch(() => setIsValid(false));
  }, [token]);

  if (isValid === null) return null;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}