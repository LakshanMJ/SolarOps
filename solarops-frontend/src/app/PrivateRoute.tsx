import { useContext, useEffect, useState, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token, setToken } = useContext(AuthContext);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) return setIsValid(false);

    fetch("/api/auth/validate", {
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