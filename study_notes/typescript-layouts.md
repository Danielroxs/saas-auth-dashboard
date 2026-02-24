# Repaso de TypeScript: Tipado de props en layouts

En el layout base (`DashboardLayout.tsx`) usamos TypeScript para tipar las props del componente:

- `type DashboardLayoutProps = { children: ReactNode }`:
  - Defines un tipo para las props, donde `children` es de tipo `ReactNode` (cualquier cosa que React puede renderizar: texto, elementos, fragmentos, arrays, etc.).
- `import { ReactNode } from "react"`:
  - Importa el tipo `ReactNode` desde React para usarlo en la definición de props.
- `function DashboardLayout({ children }: DashboardLayoutProps)`:
  - El componente recibe un objeto props que debe cumplir con el tipo `DashboardLayoutProps`.
- Dentro del return:
  - Renderizas un `div` (con clases de Tailwind para fondo y altura mínima), y dentro de un `main`, renderizas `{children}`.
  - Así, cualquier contenido que envuelvas con `<DashboardLayout>` se mostrará dentro del layout.

**Resumen:**
El tipado explícito asegura que el componente reciba correctamente los hijos (`children`) y aprovecha el autocompletado y validación de TypeScript.
