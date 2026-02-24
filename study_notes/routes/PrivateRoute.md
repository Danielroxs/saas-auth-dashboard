# PrivateRoute

## Propósito

Componente para proteger rutas en React Router DOM. Permite el acceso solo si el usuario está autenticado (token en localStorage).

## Funcionamiento

- Usa el método `localStorage.getItem("token")` para verificar si hay un token guardado.
- Si hay token, renderiza `<Outlet />` (las rutas hijas protegidas).
- Si no hay token, renderiza `<Navigate to="/login" />` para redirigir al usuario al login.

## ¿Qué es Navigate?

- Es un componente de React Router DOM.
- Se importa así: `import { Navigate } from "react-router-dom";`
- Redirige al usuario a la ruta indicada cuando se renderiza.

## ¿Qué es localStorage?

- API nativa del navegador para guardar datos clave-valor de forma persistente.
- Los datos permanecen aunque el usuario cierre el navegador.

## ¿Qué es getItem?

- Es un método de localStorage.
- Sintaxis: `localStorage.getItem("clave")`
- Devuelve el valor asociado a la clave (string) o null si no existe.

## Ejemplo de código

```tsx
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
}
```

## Resumen del flujo

- Si hay token en localStorage, el usuario accede a la ruta protegida.
- Si no hay token, se redirige automáticamente al login.
