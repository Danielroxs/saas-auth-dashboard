# Importación de tipos con `import type` y verbatimModuleSyntax

Cuando tienes activada la opción `verbatimModuleSyntax` en tu `tsconfig.json`, debes importar los tipos usando la sintaxis especial:

```tsx
import type { ReactNode } from "react";
```

**¿Por qué?**

- `import type` le indica a TypeScript que solo estás importando un tipo, no código real.
- Esto ayuda a optimizar el tree-shaking y el manejo de tipos en proyectos modernos.
- Si usas `import { ReactNode } from "react";` normal, TypeScript mostrará un error con verbatimModuleSyntax.

**Resumen:**
Siempre usa `import type` para tipos cuando tu proyecto tiene activada la opción `verbatimModuleSyntax`.
