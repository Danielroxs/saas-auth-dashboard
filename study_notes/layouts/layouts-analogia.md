# ¿Qué es un Layout en React Router? (Analogía y explicación)

Un layout es como una “plantilla” o “molde” que define la estructura general de una sección de tu app.

## Ejemplo:

- **DashboardLayout**: Plantilla para todas las páginas internas del dashboard (con menú lateral, header, etc.).
- **AuthLayout**: Plantilla para las páginas de autenticación (centradas, sin menú, solo el formulario).

---

## ¿Cómo funciona en React Router?

Cuando defines una ruta así:

```tsx
<Route element={<DashboardLayout />}>
  <Route path="/" element={<HomePage />} />
</Route>
```

**¿Qué pasa cuando visitas “/”?**

- React Router primero renderiza el DashboardLayout.
- Dentro de ese layout, en el lugar donde pusiste `{children}`, se renderiza el componente HomePage.
- ¡No se muestran dos cosas separadas! HomePage aparece “dentro” del DashboardLayout, como si DashboardLayout fuera el marco y HomePage el contenido.

---

## Analogia visual

Imagina DashboardLayout como un marco de foto:

- El marco (layout) siempre está ahí (menú, header, fondo).
- La foto (contenido) cambia según la ruta (HomePage, UsersPage, etc.).

Si visitas /login:

- Se usa AuthLayout como marco (centrado, sin menú).
- Dentro de AuthLayout se muestra LoginPage.

---

## ¿Por qué es útil?

- Mantienes el diseño consistente en toda la app.
- Solo cambias el contenido principal según la ruta.
- Puedes tener diferentes “marcos” para diferentes secciones (auth, dashboard, etc.).
