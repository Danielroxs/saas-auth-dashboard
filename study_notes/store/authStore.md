# authStore con Zustand y TypeScript

## Propósito

Manejar el estado global de autenticación y roles en la aplicación, sincronizando con localStorage.

## Ubicación

`src/store/authStore.ts`

## Definición de tipos

```ts
// Define la forma del estado global
type AuthState = {
  token: string | null;
  role: string | null;
  setAuth: (token: string, role: string) => void;
  logout: () => void;
};
```

- `token`: representa el token de autenticación (o null).
- `role`: representa el rol del usuario (admin/user, o null).
- `setAuth`: función para guardar token y rol.
- `logout`: función para limpiar token y rol.

## Creación del store

```ts
export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  setAuth: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    set({ token, role });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ token: null, role: null });
  },
}));
```

- **¿Dónde está el store global?**
  - En Zustand, el store global no se define como una constante tradicional (`let`/`const token`), sino como propiedades del objeto de estado que se pasa a la función `create`.
  - Zustand administra internamente ese objeto y te da acceso a él mediante el hook `useAuthStore`.
  - El objeto que defines en `create` es el estado inicial del store global.
  - Las propiedades como `token` y `role` no son variables sueltas, sino parte del objeto de estado que Zustand gestiona.
  - Cuando usas `set({ token, role })`, Zustand actualiza ese estado global.
  - Puedes acceder a esos valores en cualquier componente con:
    ```ts
    const { token, role } = useAuthStore();
    ```
  - Zustand se encarga de mantener y actualizar ese estado de forma centralizada.

- `create<AuthState>`: crea un store tipado con AuthState.
- Estado inicial: lee token y role de localStorage.
- `setAuth`: guarda token y rol en localStorage y actualiza el estado global.
- `logout`: elimina token y rol de localStorage y limpia el estado global.

## Lectura semántica

- `export const useAuthStore`: exporta un custom hook para acceder al estado global.
- `create<AuthState>`: función de Zustand para crear el store.
- `(set) => ({ ... })`: define el estado inicial y los métodos.

## Uso en componentes

```ts
const { token, role, setAuth, logout } = useAuthStore();
```

- Permite acceder al estado y funciones desde cualquier componente.

## Ventajas

- Estado global, seguro y tipado.
- Sin providers anidados.
- Sincronización automática con localStorage.
- Ideal para manejar autenticación, roles y permisos en apps modernas.
