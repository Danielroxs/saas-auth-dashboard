# RoleRoute

## Propósito

Componente para proteger rutas según roles (admin/user) en React Router DOM.

## Ubicación

`src/routes/PrivateRoute.tsx` (puedes renombrar a `RoleRoute.tsx` para mayor claridad)

## Funcionamiento

### Explicación de la validación de roles

```tsx
if (!role || !allowedRoles.includes(role))
```

- **!role**: Si el usuario no tiene rol (null, undefined o vacío), la condición es verdadera.
- **!allowedRoles.includes(role)**: Si el rol del usuario no está incluido en el array de roles permitidos para esa ruta, la condición es verdadera.
- Si cualquiera de las dos condiciones se cumple, el usuario será redirigido y no podrá acceder a la ruta protegida.

**Ejemplo:**

- allowedRoles = ["admin"]
- role = "user"
- !allowedRoles.includes(role) → true, porque "user" no está en ["admin"].
- El usuario será redirigido.

**Tip de lectura rápida:**
“En allowedRoles no está incluido el rol.”

## Ejemplo de código

```tsx
import { Navigate, Outlet } from "react-router-dom";

type RoleRouteProps = {
  allowedRoles: string[];
};

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (!role || !allowedRoles.includes(role))
    return <Navigate to="/dashboard" />;

  return <Outlet />;
}
```

## Integración en AppRouter

```tsx
<Route element={<RoleRoute allowedRoles={["admin", "user"]} />}>
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
</Route>

<Route element={<RoleRoute allowedRoles={["admin"]} />}>
  <Route path="/dashboard/admin" element={<AdminPage />} />
</Route>
```

## Conexión con el flujo de autenticación

- El login fake (LoginPage) guarda el token y el rol en localStorage y en el store.
- RoleRoute lee el token y el rol desde localStorage para decidir si el usuario puede acceder.
- Si cumple, muestra la ruta protegida; si no, redirige.

## Ventajas

- Control granular de permisos.
- Fácil de extender para más roles.
- Demuestra arquitectura real y control de acceso en frontend.

```tsx
<Route element={<RoleRoute allowedRoles={["admin", "user"]} />}>
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
</Route>

<Route element={<RoleRoute allowedRoles={["admin"]} />}>
  <Route path="/dashboard/admin" element={<AdminPage />} />
</Route>
```

## Ventajas

- Control granular de permisos.
- Fácil de extender para más roles.
- Demuestra arquitectura real y control de acceso en frontend.
