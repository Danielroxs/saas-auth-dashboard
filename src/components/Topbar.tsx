import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Cerrar Sesion
      </button>
    </header>
  );
}
