# Estructura de carpetas moderna (2026)

```
src/
│
├── assets/           # Imágenes, logos, íconos, etc.
├── components/       # Componentes reutilizables (Botón, Modal, Card, etc.)
├── features/         # Módulos de negocio (users, auth, dashboard, etc.)
│   ├── auth/         # Lógica y vistas de autenticación
│   ├── users/        # CRUD de usuarios
│   ├── plans/        # CRUD de planes o productos
│   └── metrics/      # Métricas y estadísticas
├── hooks/            # Custom hooks (useAuth, useFetch, etc.)
├── layouts/          # Layouts generales (DashboardLayout, AuthLayout, etc.)
├── pages/            # Páginas principales (Home, Login, NotFound, etc.)
├── providers/        # Proveedores de contexto global (AuthProvider, ThemeProvider, etc.)
├── routes/           # Definición de rutas y protección de rutas
├── services/         # Lógica de acceso a APIs (api.ts, userService.ts, etc.)
├── store/            # Estado global (Context, Zustand, etc.)
├── styles/           # Archivos CSS/Tailwind extra o personalizados
├── utils/            # Utilidades y helpers generales
│
├── App.tsx           # Componente raíz
├── main.tsx          # Punto de entrada de React
└── index.css         # Import principal de Tailwind
```

---

**Propósito de cada carpeta:**

- **assets/**: Guarda imágenes, íconos y recursos gráficos.
- **components/**: Componentes reutilizables y pequeños, como botones, modales, cards.
- **features/**: Módulos de negocio, cada uno con su lógica y vistas (ejemplo: auth, users, plans, metrics).
- **hooks/**: Custom hooks para lógica reutilizable (ejemplo: useAuth, useFetch).
- **layouts/**: Estructuras generales de página, como DashboardLayout o AuthLayout.
- **pages/**: Páginas principales del sistema (Home, Login, NotFound, etc.).
- **providers/**: Proveedores de contexto global, como AuthProvider o ThemeProvider.
- **routes/**: Definición y protección de rutas, ideal para React Router.
- **services/**: Lógica de acceso a APIs, como userService o api.ts.
- **store/**: Estado global, usando Context, Zustand, Redux, etc.
- **styles/**: Archivos CSS/Tailwind personalizados o adicionales.
- **utils/**: Funciones y helpers generales para todo el proyecto.
- **App.tsx**: Componente raíz de la aplicación.
- **main.tsx**: Punto de entrada de React.
- **index.css**: Import principal de Tailwind.

Esta estructura te permite escalar, mantener y organizar tu dashboard SaaS de forma profesional y alineada a las mejores prácticas de frontend en 2026.
