import { useAuthStore } from "../store/authStore";

export default function SideBar() {
  const { role } = useAuthStore();

  const menuItems = [
    { label: "Dashboard", icon: "📊", href: "/dashboard" },
    { label: "Usuarios", icon: "👥", href: "/users" },
    { label: "Planes", icon: "💳", href: "/plans" },
  ];

  const adminItems = [
    { label: "Configuración", icon: "⚙️", href: "/settings" },
    { label: "Reportes", icon: "📈", href: "/reports" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8">SaaS Dashboard</h1>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700 transition"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}

          {role === "admin" && (
            <>
              <li className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs uppercase text-slate-400 px-4 font-semibold">
                  Admin
                </p>
              </li>
              {adminItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700 transition"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>

      <div className="border-t border-slate-700 pt-4">
        <p className="text-sm text-slate-300">
          Rol: <span className="font-bold capitalize">{role}</span>
        </p>
      </div>
    </aside>
  );
}
