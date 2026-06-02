---
name: add-slide
description: Añade una slide nueva a un deck AURORA existente, en la posición que el usuario indique. Mantiene la coherencia de estilo invocando slide-designer para el HTML y slide-reviewer para verificar.
---

# /add-slide

Inserta una slide en un deck ya creado.

## Cuándo se invoca

- `/add-slide` (sin argumentos) → preguntar qué deck y qué contenido.
- `/add-slide en futuro-data-cic-2026, antes del closing, una stat sobre latencia`

## Inputs requeridos

1. **Deck destino**: nombre de la carpeta en `decks/`.
2. **Posición**: número de slide (1-indexed), o palabra clave (`start`, `end`, `before:<n>`, `after:<n>`, `before-closing`).
3. **Layout**: uno del catálogo. Si el usuario no lo da, elígelo en función del contenido.
4. **Contenido**: lo que diga la slide (texto, datos).

Pregunta lo justo. Si la mitad está implícita en el prompt, deduce el resto.

## Flujo

1. Lee `decks/<slug>/index.html`. Identifica las `<section class="slide">`.
2. Construye el bloque JSON de la slide nueva con la misma estructura que `slide-architect` produce (`{ layout, intent, content }`).
3. Llama a `slide-designer` pidiéndole **solo** el HTML de esa slide (no del deck entero).
4. Inserta el HTML en `index.html` en la posición indicada (usa `Edit` con anclas claras).
5. Llama a `slide-reviewer` apuntando al deck completo. Aplica fixes critical/major.
6. Reporta: ruta del HTML, nueva posición y total de slides.

## Reglas duras

- **No reescribir las otras slides.** Solo se inserta una.
- **Respetar el orden narrativo**: si se inserta en medio, advertir al usuario si rompe la transición (p. ej. una `code` justo después de un `closing`).
- **Numeración** la regenera el JS automáticamente; no hace falta tocarla.
