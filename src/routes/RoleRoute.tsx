import { Navigate, Outlet } from "react-router-dom";

type RoleRouteProps = {
  allowedRoles: string[];
};

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Verifica si hay un token en localStorage (login fake)
  if (!token) return <Navigate to="/login" />;
  if (!role || !allowedRoles.includes(role))
    return <Navigate to="/dashboard" />;

  return <Outlet />;
}
