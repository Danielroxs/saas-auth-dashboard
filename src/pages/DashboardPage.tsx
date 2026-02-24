import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";

export default function DashboardPage() {
  const { role } = useAuthStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({ name: "", avatar: "" });
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  type User = {
    id: string;
    name: string;
    avatar: string;
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUser) {
      // editar usuario (PUT)
      await fetch(
        `https://699e004683e60a406a47f96c.mockapi.io/api/v1/users/${editUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        },
      );
      setEditUser(null);
    } else {
      await fetch("https://699e004683e60a406a47f96c.mockapi.io/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    }
    setNewUser({ name: "", avatar: "" });
    // Aqui deberia volver a cargar la lista de usuarios
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setNewUser({ name: user.name, avatar: user.avatar });
  };

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://699e004683e60a406a47f96c.mockapi.io/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Usuarios", data);
        setUsers(data);
      });
  }, [newUser]);

  const handleLogout = () => {
    logout(); // Limpia token y rol del store y localStorage
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="p-8 flex flex-col mx-auto max-w-75 justify-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-2xl mt-2 text-gray-600">Rol actual: {role}</p>
      <p>Bienvenido al panel de administración.</p>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Usuarios</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2 flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 rounded-full"
              />
              <span>{user.name}</span>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditClick(user)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <UserForm
        user={newUser}
        setUser={setNewUser}
        loading={loading}
        onSubmit={handleCreateUser}
        editUser={editUser}
      />

      {role === "admin" && (
        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">
          Administrar Usuarios
        </button>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Cerrar
      </button>
      {role === "admin" && <div>Seccion de metricas</div>}
      {role === "user" && <div>Seccion exclusiva para usuarios</div>}
    </div>
  );
}
