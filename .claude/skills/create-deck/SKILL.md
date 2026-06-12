---
name: create-deck
description: Crea una presentación HTML AURORA completa a partir de un prompt o tema. Orquesta los agentes slide-architect → slide-designer → slide-reviewer y deja el resultado en deck/<curso>/<modulo-slug>/index.html listo para servir por Apache. Usar cuando el usuario pida una presentación, una deck, unas slides o similar.
---

# /create-deck

Genera una presentación AURORA completa desde un prompt del usuario.

## Cuándo se invoca

Cuando el usuario pide explícitamente una deck/presentación/slides, p. ej.:
- `/create-deck Introducción al event sourcing para senior managers`
- `/create-deck onboarding del equipo de data, perfil técnico, 15 slides`

Si el usuario sólo dice "haz una presentación sobre X" sin el slash, **igualmente sigue este flujo**.

## Pre-condiciones

Confirma una vez (en un solo turno) los parámetros si no están claros en el prompt:
1. **Audiencia**: técnica / ejecutiva / mixta. Por defecto: mixta.
2. **Idioma**: del prompt; por defecto el del prompt o español.
3. **Longitud aproximada**: 8–18 slides por defecto.
4. **Tono**: sobrio / divulgativo / vendedor. Por defecto sobrio-divulgativo.

Si el prompt es lo bastante específico, no preguntes — toma decisiones razonables y deja constancia en el `intent` de cada slide.

## Flujo

### Paso 1 — Arquitectura

Llama al agente `slide-architect` con el prompt y los parámetros confirmados. Espera un JSON con `title`, `description`, `lang`, `slug`, y `slides[]`.

Guarda ese JSON temporalmente (puedes incluirlo en `deck/<curso>/<modulo-slug>/_outline.json` para trazabilidad).

### Paso 2 — Diseño

Llama al agente `slide-designer` pasándole el JSON. El designer:
- Crea la carpeta `deck/<curso>/<modulo-slug>/`.
- Escribe `index.html` siguiendo `templates/deck.html`.
- Por cada slide del esquema, usa el snippet correspondiente de `templates/layouts.html` / `LAYOUTS.md`.

### Paso 3 — Revisión

Llama al agente `slide-reviewer` apuntando a `deck/<curso>/<modulo-slug>/index.html`. Recibe un informe con issues.

- Si veredicto = ✅ → terminado.
- Si veredicto = ⚠ → vuelve a llamar al reviewer pidiéndole que **aplique los fixes critical y major**, después re-audita.
- Si veredicto = ❌ → vuelve al paso 1 con feedback (no es esperable salvo prompt muy ambiguo).

### Paso 4 — Cierre al usuario

Reporta en máximo 3 líneas:
1. Ruta absoluta del HTML generado.
2. Total de slides y layouts usados.
3. URL sugerida si se sirve por Apache (`http://<host>/deck/<curso>/<modulo-slug>/`).

Si el usuario tiene un comando para abrir el navegador, sugiere abrir el archivo directamente.

## Si el usuario quiere variantes

- "más corto" → re-llamar al architect pidiendo N slides menos.
- "más visual / menos texto" → re-llamar al designer pidiendo cambiar layouts densos por `stat`, `quote` o `gallery`.
- "tono más técnico" → re-llamar al designer reescribiendo los textos.

Cada variante se guarda como `deck/<curso>/<modulo-slug>-v2/`, sin sobreescribir la original.

## Reglas duras

- **NUNCA generes HTML sin haber leído antes el STYLE_GUIDE.**
- **NUNCA improvises un estilo nuevo.** Si AURORA no cubre algo, extiende `aurora.css` con una clase modificadora y documenta.
- **NUNCA dejes rutas absolutas locales** (`C:\...`) en el HTML.
- **SIEMPRE deja la deck lista para Apache**: rutas relativas resolubles, sin dependencias node/build.
