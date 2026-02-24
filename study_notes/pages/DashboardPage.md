# DashboardPage

## Propósito

Página principal del panel de administración. Se renderiza en la ruta `/dashboard` y está protegida por el layout `DashboardLayout`.

## Ubicación

`src/pages/DashboardPage.tsx`

## Código base

```tsx
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-8 flex flex-col mx-auto max-w-75 justify-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-2xl mt-2 text-gray-600">Rol actual: {role}</p>
      <p>Bienvenido al panel de administración.</p>
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
```

## Control de permisos en la UI

## Tipado en TypeScript: ¿type o interface?

- **Siempre declara tus tipos (type o interface) antes de usarlos en el código.**
- Los tipos en TypeScript **no** tienen hoisting, así que si usas un tipo antes de declararlo, tendrás un error de compilación.
- Ejemplo incorrecto:
  ```tsx
  const [users, setUsers] = useState<User[]>([]); // ❌ Error: 'User' no está declarado aún
  type User = { id: string; name: string; avatar: string };
  ```
- Ejemplo correcto:
  ```tsx
  type User = { id: string; name: string; avatar: string };
  const [users, setUsers] = useState<User[]>([]); // ✅
  ```

### ¿Cuándo usar type y cuándo interface?

- Para la mayoría de los casos en React, puedes usar **type** o **interface** para definir la forma de un objeto.
- **type** es más flexible para uniones y tipos complejos.
- **interface** es ideal para estructuras que pueden extenderse (herencia, OOP).
- En componentes y props simples, ambos funcionan igual. En este proyecto, usamos **type** por simplicidad.

- Se utiliza el valor de `role` del store global para mostrar u ocultar botones y secciones.
- Ejemplo: el botón "Administrar Usuarios" y la sección de métricas solo aparecen si el rol es "admin".
- La sección exclusiva para usuarios solo aparece si el rol es "user".
- Esto demuestra control de permisos y arquitectura profesional en frontend.

## Integración en AppRouter

En el archivo `src/routes/AppRouter.tsx`, se importa y se usa así:

```tsx
import DashboardPage from "../pages/DashboardPage";
// ...existing code...
<Route element={<DashboardLayout />}>
  <Route path="/dashboard" element={<DashboardPage />} />
</Route>;
```

Esto permite que la página se muestre dentro del layout de dashboard y sea accesible solo en la ruta `/dashboard`.
