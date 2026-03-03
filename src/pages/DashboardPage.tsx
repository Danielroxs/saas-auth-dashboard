import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import SearchInput from "../components/SearchInput";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import MetricCard from "../components/MetricCard";
import PlanCard from "../components/PlanCard";
import PlanForm from "../components/PlanForm";
import type { Plan } from "../features/plans/types";
import SideBar from "../components/Sidebar";
import Topbar from "../components/Topbar";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export default function DashboardPage() {
  const { role } = useAuthStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({ name: "", avatar: "" });
  const [loading] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Básico",
      price: 9,
      description: "Para empezar",
      features: ["5 tickets/mes", "Email support"],
    },
    {
      id: "2",
      name: "Pro",
      price: 29,
      description: "Para crecer",
      features: ["50 tickets/mes", "Chat support", "Reports"],
    },
    {
      id: "3",
      name: "Enterprise",
      price: 99,
      description: "Solución completa",
      features: ["Tickets ilimitados", "Phone support", "SLA 99.9%"],
    },
  ]);

  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [isSavingPlan, setIsSavingPlan] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSavePlan = (payload: Omit<Plan, "id">) => {
    setIsSavingPlan(true);
    try {
      if (editPlan) {
        setPlans((prev) =>
          prev.map((plan) =>
            plan.id === editPlan.id ? { ...plan, ...payload } : plan,
          ),
        );
        toast.success("Plan actualizado");
      } else {
        const newPlan: Plan = { id: crypto.randomUUID(), ...payload };
        setPlans((prev) => [newPlan, ...prev]);
        toast.success("Plan creado");
      }
      setEditPlan(null);
    } finally {
      setIsSavingPlan(false);
    }
  };

  const handleDeletePlan = (id: string) => {
    if (!window.confirm("¿Eliminar este plan?")) return;
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
    if (editPlan?.id === id) setEditPlan(null);
    toast.success("Plan eliminado");
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEditing = !!editUser;
    try {
      if (isEditing) {
        // editar usuario (PUT)
        const res = await fetch(
          `https://699e004683e60a406a47f96c.mockapi.io/api/v1/users/${editUser.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          },
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: no se pudo guardar`);
        }
      } else {
        const res = await fetch(
          "https://699e004683e60a406a47f96c.mockapi.io/api/v1/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          },
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: no se pudo guardar`);
        }
      }
      toast.success(isEditing ? "Usuario actualizado" : "Usuario creado");
      setNewUser({ name: "", avatar: "" });
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Error al guardar usuario");
      console.error(error);
    }
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setNewUser({ name: user.name, avatar: user.avatar });
  };

  const handleDeleteUser = async (id: string) => {
    try {
      if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
      const res = await fetch(
        `https://699e004683e60a406a47f96c.mockapi.io/api/v1/users/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        throw new Error(`Error ${res.status}: no se pudo eliminar`);
      }

      fetchUsers();
      toast.success("Usuario eliminado");
    } catch (error) {
      toast.error("Error al eliminar usuario");
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://699e004683e60a406a47f96c.mockapi.io/api/v1/users",
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: no se pudieron obtener usuarios`);
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error inesperado";
      toast.error(message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleLogout = () => {
    logout(); // Limpia token y rol del store y localStorage
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="w-64 shrink-0 sticky top-0 h-screen">
        <SideBar />
      </aside>

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="p-8 flex flex-col mx-auto max-w-6xl justify-center">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8">Rol actual: {role}</p>

            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  label="Total Usuarios"
                  value={users.length}
                  icon="👥"
                  bgColor="bg-blue-50"
                />
                <MetricCard
                  label="Admins"
                  value="1"
                  icon="👑"
                  bgColor="bg-purple-50"
                />
                <MetricCard
                  label="Usuarios Regular"
                  value={users.length - 2}
                  icon="👤"
                  bgColor="bg-green-50"
                />
                <MetricCard
                  label="Activos Hoy"
                  value="15"
                  icon="🔥"
                  bgColor="bg-orange-50"
                />
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mt-8 mb-4">Planes</h2>

              {role === "admin" && (
                <PlanForm
                  key={editPlan?.id ?? "new-plan"}
                  plan={
                    editPlan
                      ? {
                          name: editPlan.name,
                          price: editPlan.price,
                          description: editPlan.description,
                          features: editPlan.features,
                        }
                      : null
                  }
                  onSubmit={handleSavePlan}
                  loading={isSavingPlan}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onEdit={setEditPlan}
                    onDelete={handleDeletePlan}
                    isAdmin={role === "admin"}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Usuarios</h2>

              <SearchInput search={search} setSearch={handleSearchChange} />

              {filteredUsers.length === 0 ? (
                <p className="text-gray-500 mt-4">
                  {search
                    ? "No se encontraron usuarios con ese nombre."
                    : "No hay usuarios disponibles."}
                </p>
              ) : (
                <>
                  <ul className="mt-4">
                    {currentUsers.map((user) => (
                      <li
                        key={user.id}
                        className="mb-2 flex items-center gap-2"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 rounded-full"
                        />
                        <span>{user.name}</span>
                        {role === "admin" && (
                          <>
                            <button
                              className="bg-yellow-500 text-white px-2 py-1 rounded"
                              onClick={() => handleEditClick(user)}
                            >
                              Editar
                            </button>
                            <button
                              className="bg-red-600 text-white px-2 py-1 rounded ml-2"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPreviousClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      onNextClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    />
                  )}
                </>
              )}

              <UserForm
                user={newUser}
                setUser={setNewUser}
                loading={loading}
                onSubmit={handleCreateUser}
                editUser={editUser}
              />
            </section>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
