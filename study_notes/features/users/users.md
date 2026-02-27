# Control de roles y permisos en la UI

Para asegurar que solo los usuarios con rol adecuado puedan modificar la información:

- Se obtiene el rol actual desde el store global (`useAuthStore`).
- En el renderizado de la lista de usuarios, los botones de "Editar" y "Eliminar" solo se muestran si el rol es "admin":

```tsx
{
  role === "admin" && (
    <>
      <button onClick={() => handleEditClick(user)}>Editar</button>
      <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
    </>
  );
}
```

- Los usuarios con rol "user" solo pueden visualizar la lista, pero no modificarla.
- También se pueden mostrar secciones exclusivas para admin, como métricas o administración avanzada:

```tsx
{
  role === "admin" && <div>Sección de métricas y administración</div>;
}
```

### Ventajas

- Mejora la seguridad y experiencia de usuario.
- El código es claro y fácil de mantener.
- Permite escalar fácilmente a más roles o permisos en el futuro.

# Flujo completo CRUD de usuarios

## 1. Función para refrescar la lista

Se creó una función reutilizable `fetchUsers` que obtiene los usuarios desde la API y actualiza el estado:

```ts
const fetchUsers = async () => {
  const res = await fetch(
    "https://699e004683e60a406a47f96c.mockapi.io/api/v1/users",
  );
  const data = await res.json();
  setUsers(data);
};
```

Esta función se llama:

- Al montar el componente (en `useEffect`).
- Después de crear, editar o eliminar un usuario.

## 2. Crear usuario (POST)

En el submit del formulario, si no hay usuario en edición, se hace un POST a la API y luego se llama a `fetchUsers` para refrescar la lista:

```ts
await fetch("https://699e004683e60a406a47f96c.mockapi.io/api/v1/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newUser),
});
fetchUsers();
```

## 3. Editar usuario (PUT/PATCH)

Si hay usuario en edición (`editUser`), se hace un PUT a la API con el id correspondiente y luego se refresca la lista:

```ts
await fetch(
  `https://699e004683e60a406a47f96c.mockapi.io/api/v1/users/${editUser.id}`,
  {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  },
);
setEditUser(null);
fetchUsers();
```

## 4. Eliminar usuario (DELETE)

Al hacer clic en el botón "Eliminar", se pide confirmación y luego se hace un DELETE a la API. Después, se refresca la lista:

```ts
await fetch(`https://699e004683e60a406a47f96c.mockapi.io/api/v1/users/${id}`, {
  method: "DELETE",
});
fetchUsers();
```

## 5. Ventajas del flujo

- El estado de la lista siempre está sincronizado con la API.
- El código es más limpio y fácil de mantener.
- Se evita duplicar lógica de fetch y dependencias innecesarias en useEffect.

Este patrón es escalable y profesional para cualquier CRUD en React.

## Expresión ternaria para el texto del botón en UserForm

En el formulario de usuario (`UserForm.tsx`), el texto del botón cambia dinámicamente según el estado de carga (`loading`) y si se está editando un usuario (`editUser`).

La expresión utilizada es:

```tsx
{
  loading
    ? editUser
      ? "Guardando"
      : "Creando..."
    : editUser
      ? "Guardar Cambios"
      : "Crear Usuario";
}
```

### ¿Cómo se lee semánticamente?

- Si `loading` es `true` y `editUser` existe → muestra "Guardando"
- Si `loading` es `true` y `editUser` no existe → muestra "Creando..."
- Si `loading` es `false` y `editUser` existe → muestra "Guardar Cambios"
- Si `loading` es `false` y `editUser` no existe → muestra "Crear Usuario"

Esto permite que el botón sea contextual y muestre feedback claro al usuario según la acción que está realizando (crear o editar) y el estado de la petición.

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
