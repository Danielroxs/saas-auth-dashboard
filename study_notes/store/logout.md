# logout en authStore

## Propósito

Cerrar la sesión del usuario limpiando el token y el rol tanto del localStorage como del estado global de Zustand.

## ¿Dónde se define?

En el store global de Zustand, en el archivo `src/store/authStore.ts`:

```ts
logout: () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  set({ token: null, role: null });
};
```

## ¿Cómo funciona?

- `localStorage` es el objeto global del navegador para almacenamiento persistente.
- `removeItem` es un método de localStorage que elimina la clave indicada (por ejemplo, "token" o "role").
- Cuando llamas a `logout`:
  - Borra el token y el rol del almacenamiento del navegador.
  - Luego, actualiza el estado global del store a null para ambos valores.

## Uso en componentes

```tsx
const { logout } = useAuthStore();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};
```

## Resumen

logout borra token y role tanto del navegador como del estado global. Así, el usuario pierde acceso a rutas protegidas y debe volver a iniciar sesión.

- `logout` borra token y role tanto del navegador como del estado global.
- Así, el usuario pierde acceso a rutas protegidas y debe volver a iniciar sesión.
