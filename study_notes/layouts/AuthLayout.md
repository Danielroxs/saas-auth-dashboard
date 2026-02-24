# AuthLayout: Layout para autenticación

Este layout se utiliza para las páginas de login, registro y recuperación de contraseña.

## Ejemplo de implementación

```tsx
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="w-full max-w-md p-8 bg-white rounded shadow">
        {children}
      </main>
    </div>
  );
}
```

---

## ¿Qué es `<Outlet />` y cómo se usa en AuthLayout?

En React Router v6+, los layouts como AuthLayout no reciben `children` directamente desde las rutas. En su lugar, se utiliza el componente `<Outlet />` para renderizar el contenido de la ruta hija.

**Ejemplo actualizado:**

```tsx
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="w-full max-w-md p-8 bg-white rounded shadow">
        <Outlet />
      </main>
    </div>
  );
}
```

**Ventajas:**

- Permite reutilizar el layout para múltiples páginas de autenticación.
- Mantiene la estructura fija y solo cambia el contenido según la ruta activa.
- Es el patrón recomendado en React Router v6+ para rutas anidadas.

**Analogia:**
Imagina el layout como una caja fija y `<Outlet />` como el espacio donde se muestra la página de login, registro, etc.

## ¿Por qué usar un AuthLayout?

- Permite centrar y estilizar de forma consistente todas las páginas de autenticación.
- Mejora la experiencia de usuario y da una apariencia profesional.
- Facilita el mantenimiento y la reutilización del diseño en todas las vistas de auth.
