# Métodos de Arrays (JS/TS)

## `filter()`

`filter()` recorre un array y devuelve **un nuevo array** con los elementos que cumplen una condición.

Sintaxis base:

```ts
const nuevoArray = arrayOriginal.filter((elemento, indice) => condicion);
```

## Ejemplo aplicado al formulario de planes

Código:

```tsx
setFeatures(features.filter((_, i) => i !== idx));
```

### Lectura semántica

"Actualiza el estado `features` conservando solo los elementos cuyo índice `i` sea distinto del índice `idx` (el que se quiere eliminar)."

### Qué significa cada parte

- `features`: array actual (por ejemplo: `["Chat support", "Reports", "SLA"]`)
- `filter(...)`: crea un nuevo array filtrado
- `_`: representa el elemento actual, pero aquí no se usa (convención para ignorarlo)
- `i`: índice del elemento actual (0, 1, 2...)
- `idx`: índice del elemento clickeado en "Eliminar"
- `i !== idx`: condición para conservar todos menos el seleccionado

### Flujo paso a paso

1. El usuario hace click en "Eliminar" de una feature.
2. Se obtiene `idx` de ese elemento.
3. `filter` recorre todo el array.
4. Devuelve un nuevo array sin el índice `idx`.
5. `setFeatures(...)` guarda ese nuevo array.
6. React re-renderiza y la feature desaparece de la UI.

### Ejemplo rápido

Si:

```ts
features = ["A", "B", "C"];
idx = 1;
```

Entonces:

```ts
features.filter((_, i) => i !== 1); // => ["A", "C"]
```

## Nota importante

`filter()` **no modifica** el array original; devuelve uno nuevo. Esto es ideal en React porque mantiene el estado inmutable.
