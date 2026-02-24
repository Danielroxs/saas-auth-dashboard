# Instalación de React Router en proyectos modernos (2026)

## Comandos recomendados:

```sh
npm install react-router-dom
npm install -D @types/react-router-dom
```

- El primer comando instala la librería principal de React Router para manejar rutas en React.
- El segundo comando instala los tipos para TypeScript (solo para desarrollo, por eso el `-D`).

## Sobre los warnings de npm audit

- Los avisos de vulnerabilidades moderadas son comunes y no suelen afectar el desarrollo local ni el aprendizaje.
- **No uses `--force`** a menos que el proyecto no funcione, ya que puede instalar versiones experimentales o incompatibles.
- Es seguro ignorar estos avisos mientras tu proyecto funcione correctamente.

**Resumen:**
Instala React Router y sus tipos, ignora los warnings de npm audit si todo funciona, y evita usar `--force` para mantener la estabilidad del proyecto.
