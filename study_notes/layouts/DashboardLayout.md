# DashboardLayout y rutas anidadas con React Router (2026)

En React Router v6+ con rutas anidadas, los layouts ya no reciben `children` como prop. En su lugar, debes usar el componente `<Outlet />` para indicar dónde se renderizará el contenido de la ruta hija.

## Ejemplo actualizado:

```tsx
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

---

## ¿Qué es `<Outlet />` y por qué es importante?

`<Outlet />` es el punto de inserción para las rutas hijas dentro de un layout. Piensa en el layout como un "marco" fijo (sidebar, header, fondo, etc.) y `<Outlet />` como el espacio donde se muestra el contenido dinámico según la ruta activa.

**Ventajas de usar `<Outlet />`:**

- Permite reutilizar layouts para múltiples rutas.
- Mantiene la estructura fija y solo cambia el contenido principal.
- Facilita la escalabilidad y el mantenimiento del código.
- Es el patrón recomendado en React Router v6+ para rutas anidadas.

**Analogia:**
Imagina un marco de fotos: el marco siempre está presente, pero la foto (contenido) cambia según la ruta. `<Outlet />` es el lugar donde se "coloca la foto".
