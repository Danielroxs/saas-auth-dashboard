# React-Toastify

## Qué es

`react-toastify` es una **librería de terceros** (también llamada dependencia o paquete) para mostrar notificaciones tipo toast en React.

Se considera:

- **Librería**: porque aporta funciones/componentes reutilizables.
- **Dependencia**: porque queda registrada en `package.json`.
- **Paquete npm**: porque se instala desde npm.

## Integración en el proyecto

- Se instala con npm: `npm i react-toastify`
- Se importa `toast` en la página/componente donde disparas notificaciones.
- Se usa `ToastContainer` en la app/layout para renderizar los toasts.

### Integración real en este proyecto

1. Estilos globales de Toastify en `main.tsx`:

```tsx
import "react-toastify/dist/ReactToastify.css";
```

2. Contenedor en `App.tsx`:

```tsx
<ToastContainer position="top-right" autoClose={3000} />
```

3. Uso de `toast` en `DashboardPage.tsx`:

```tsx
import { toast } from "react-toastify";
```

## Try/Catch con fetch

En funciones asíncronas (crear, editar, eliminar, obtener usuarios):

- `try`: lógica principal (`fetch`, actualización de estado, éxito)
- `catch`: manejo de error (`toast.error` + logging)

Esto evita errores silenciosos y da feedback claro al usuario.

## Flujo de notificaciones implementado

### 1) Crear / Editar usuario (`handleCreateUser`)

- Se calcula primero si está en modo edición:

```ts
const isEditing = !!editUser;
```

- Si todo sale bien:

```ts
toast.success(isEditing ? "Usuario actualizado" : "Usuario creado");
```

- Si falla:

```ts
toast.error("Error al guardar usuario");
```

### 2) Eliminar usuario (`handleDeleteUser`)

- Éxito:

```ts
toast.success("Usuario eliminado");
```

- Error:

```ts
toast.error("Error al eliminar usuario");
```

### 3) Obtener usuarios (`fetchUsers`)

- Error de carga:

```ts
toast.error("Error al obtener usuarios");
```

## ¿Por qué `isEditing` y no `editUser` directo?

Se usa:

```ts
const isEditing = !!editUser;
```

porque durante el flujo puedes ejecutar `setEditUser(null)`.

Si luego decides el mensaje con `editUser`, podrías mostrar un mensaje incorrecto.
Con `isEditing` guardas una “foto” estable del modo actual al inicio de la función.

## Patrón recomendado en el submit

1. Definir `isEditing`
2. Ejecutar `PUT` o `POST`
3. Mostrar `toast.success` una sola vez fuera del `if/else`
4. Limpiar estado (`setNewUser`, `setEditUser`)
5. Refrescar lista (`fetchUsers`)

Este patrón reduce duplicación y evita inconsistencias en mensajes.

## Prevención de errores y buenas prácticas

- Mantener `toast.success` **una sola vez** al finalizar el flujo exitoso (fuera del `if/else`).
- Usar mensajes distintos por operación (guardar, eliminar, obtener).
- Usar `console.error(error)` en `catch` para depuración técnica.
- Colocar `ToastContainer` en un nivel global (`App`) para que cualquier vista pueda disparar toasts.

## Nota técnica importante sobre `fetch`

`fetch` no lanza error automáticamente en respuestas HTTP 4xx/5xx; solo lanza por errores de red.

Para un manejo más robusto, se recomienda validar `response.ok` y lanzar error manualmente cuando sea `false`.

Ejemplo:

```ts
const res = await fetch(url, options);
if (!res.ok) throw new Error("Request failed");
```

## TypeScript: manejo de errores en catch

### El tipo `unknown` en catch

En **TypeScript**, cuando capturas un error con `catch`, la variable `error` tiene tipo **`unknown`** (no `Error` automáticamente).

¿Por qué? Porque en JavaScript puedes lanzar **cualquier cosa**:

```javascript
throw "mensaje string"; // ✅ válido
throw 404; // ✅ válido
throw new Error("..."); // ✅ válido
throw { custom: true }; // ✅ válido
```

TypeScript no asume que sea un objeto `Error`, así que usa `unknown` como tipo más seguro.

### Problema: no puedes acceder a `.message` directamente

```typescript
catch (error) {
  // error tiene tipo: unknown
  console.log(error.message);
  //          ^^^^^^^ ❌ ERROR: Property 'message' does not exist on type 'unknown'
}
```

### Solución: `instanceof` + Type Narrowing

**`instanceof`** es un operador de **JavaScript nativo** (existe desde ES3). TypeScript lo entiende y lo usa para hacer **type narrowing** (reducción de tipo):

```typescript
catch (error) {
  // error: unknown

  if (error instanceof Error) {
    // ✅ Dentro del if, TypeScript sabe que error es tipo 'Error'
    console.log(error.message);  // ✅ OK, existe .message
  } else {
    // Aquí error NO es Error
    console.log("Error desconocido");
  }
}
```

### Patrón con ternario (usado en `fetchUsers`)

```typescript
catch (error) {
  const message = error instanceof Error
    ? error.message           // TS infiere: error es Error aquí
    : "Error inesperado";     // TS infiere: error NO es Error aquí

  toast.error(message);
  console.error(error);
}
```

### JavaScript vs TypeScript

| Aspecto                  | JavaScript                 | TypeScript                     |
| ------------------------ | -------------------------- | ------------------------------ |
| `instanceof`             | ✅ Operador nativo         | ✅ Operador nativo             |
| Tipo de `error` en catch | Sin tipos                  | `unknown` (desde TS 4.4)       |
| Validación de `.message` | ⚠️ Puede fallar en runtime | ❌ Error de compilación        |
| Type narrowing           | No aplica                  | ✅ Reduce tipo automáticamente |

### Beneficio de TypeScript

En JavaScript, acceder a `error.message` puede fallar silenciosamente si el error no es un `Error`:

```javascript
catch (error) {
  console.log(error.message); // ⚠️ undefined si error es un string o número
}
```

En TypeScript, el compilador **te obliga a validar** antes de acceder a `.message`, evitando crashes.

### Implementación en este proyecto

Solo `fetchUsers` usa el patrón completo actualmente:

```typescript
catch (error) {
  const message = error instanceof Error ? error.message : "Error inesperado";
  toast.error(message);
  console.error(error);
}
```

Los otros catch blocks (`handleCreateUser`, `handleDeleteUser`) usan mensajes fijos y podrían mejorarse con este patrón para mostrar mensajes de error más específicos.
