# Gestión de usuarios

## Visualización de usuarios desde MockAPI.io (GET)

**Objetivo:** Mostrar una lista de usuarios (nombre y avatar) en el dashboard, obtenidos desde una API pública (MockAPI.io), para simular un entorno real de producción.

### 1. Integración con MockAPI.io

- Se creó un recurso `users` en MockAPI.io para simular una base de datos de usuarios.
- Se poblaron manualmente algunos usuarios de prueba desde el panel web de MockAPI.io, agregando nombre y URL de avatar.

### 2. Fetch y tipado en el frontend

- En `DashboardPage.tsx` se implementó un fetch a la URL del recurso para obtener los usuarios:

```ts
type User = {
  id: string;
  name: string;
  avatar: string;
};

const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  fetch("https://699e004683e60a406a47f96c.mockapi.io/api/v1/users")
    .then((res) => res.json())
    .then((data) => setUsers(data));
}, []);
```

### 3. Renderizado de la lista de usuarios

- Se recorre el array `users` y se muestra cada usuario con su avatar y nombre:

```tsx
<ul>
  {users.map((user) => (
    <li key={user.id} className="mb-2 flex items-center gap-2">
      <img src={user.avatar} alt={user.name} className="w-8 rounded-full" />
      <span>{user.name}</span>
    </li>
  ))}
</ul>
```

### 4. Resultado esperado

- Al cargar el dashboard, se visualizan los usuarios con su avatar y nombre, confirmando la conexión exitosa con la API y el correcto manejo del tipado y renderizado.
- Si el recurso está vacío, no se muestran usuarios (por eso es importante poblar MockAPI.io manualmente).

### 5. Buenas prácticas

- El tipado explícito (`User`) asegura que solo se renderizan los campos esperados.
- El fetch está en un `useEffect` para ejecutarse solo al montar el componente.
- Se documenta cada paso en este archivo para mantener trazabilidad y claridad en el flujo de trabajo.
