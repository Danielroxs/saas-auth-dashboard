# LoginPage

## Propósito

Página de inicio de sesión (login) con autenticación fake, usando Zustand para manejar el estado global y React Router para redirección.

## Ubicación

`src/pages/LoginPage.tsx`

## Flujo de login

1. El usuario selecciona un rol (user/admin).
2. Hace clic en “Iniciar sesión”.
3. Se guarda el token y el rol en el store y localStorage.
4. El usuario es redirigido al dashboard.

## Ejemplo de código

```tsx
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [role, setRole] = useState("user");
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuth("fake-token", role);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Iniciar sesión
      </button>
    </div>
  );
}
```

## Explicación

- El estado local `role` permite elegir el rol.
- `setAuth` guarda el token y el rol en el store y localStorage.
- `navigate` redirige al dashboard tras login.
- El selector de rol es útil para pruebas y simular permisos.

## Ventajas

- Estado global y persistente.
- Redirección automática.
- Simulación de roles para pruebas.
