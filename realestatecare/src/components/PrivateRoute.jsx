import { Navigate } from "react-router-dom";

// Simple guard on routes. User needs to exists on localStorage
// otherwise send to login page.
export default function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
