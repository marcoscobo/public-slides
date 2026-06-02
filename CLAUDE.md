# Claude Slides — Proyecto AURORA

Este proyecto genera **presentaciones HTML modernas y animadas** a partir de prompts. Cada deck se publica en un servidor Apache, así que el output es **HTML estático + CSS + JS**, sin build step, sin dependencias de runtime.

## Identidad: AURORA

Todas las slides comparten un único sistema visual llamado **AURORA**. No es genérico: tiene firma propia. Antes de generar nada, **leer obligatoriamente**:

- `.claude/skills/create-deck/reference/STYLE_GUIDE.md` — el design system completo (paleta, tipografía, espaciado, animaciones, do/don'ts).
- `assets/css/aurora.css` — los tokens y componentes ya implementados.
- `deck/curso-ia-logistica-m01-fundamentos/index.html` — primer deck real del curso, útil como referencia adicional.

Resumen express de AURORA (no sustituye al STYLE_GUIDE):
- **Modo oscuro por defecto**, con slides en `cream` como contraste editorial.
- Paleta: midnight `#0B0F1A`, cream `#F5EFE3`, gradiente firma violeta→cian (`#7B4DFF → #00D4FF`), ámbar `#FFB627`.
- Tipografía: **Space Grotesk** (display) + **Inter** (body) + **JetBrains Mono** (datos/código).
- Decoración firma: texto con gradiente aurora, textura grain sutil, formas geométricas flotantes con parallax, marcadores numéricos grandes, barra de progreso inferior.
- Animaciones: entrada con stagger fade+rise, transición horizontal 600ms con cubic-bezier suave, contadores animados, líneas que se dibujan.

## Estructura del proyecto

```
public-slides/
├── CLAUDE.md                           ← este archivo
├── README.md                           ← descripción del repo (deploy con Docker + Apache)
├── index.html                          ← portada: índice de todos los decks disponibles
├── .claude/
│   ├── agents/                         ← agentes especializados
│   │   ├── slide-architect.md          ← diseña la estructura del deck
│   │   ├── slide-designer.md           ← genera HTML de slides
│   │   └── slide-reviewer.md           ← audita consistencia y estilo
│   └── skills/
│       ├── create-deck/                ← /create-deck (skill principal)
│       │   ├── SKILL.md
│       │   ├── reference/
│       │   │   ├── STYLE_GUIDE.md      ← design system AURORA completo
│       │   │   └── LAYOUTS.md          ← catálogo de layouts disponibles
│       │   └── templates/
│       │       ├── deck.html           ← shell de deck
│       │       └── layouts.html        ← snippets por layout
│       └── add-slide/                  ← /add-slide (añadir a deck existente)
│           └── SKILL.md
├── assets/
│   ├── css/aurora.css                  ← design system implementado
│   └── js/deck.js                      ← navegación + animaciones
└── deck/                               ← output (cada subcarpeta = un deck)
    ├── curso-ia-logistica-m01-fundamentos/
    ├── curso-ia-logistica-m02-productividad/
    ├── curso-ia-logistica-m03-automatizacion/
    ├── curso-ia-logistica-m04-analisis-datos/
    ├── curso-ia-logistica-m05-prediccion-demanda/
    ├── curso-ia-logistica-m06-transporte/
    ├── curso-ia-logistica-m07-documental/
    └── curso-ia-logistica-m08-transformacion/
```

> **Nota:** el directorio de output es `deck/` (sin 's'), no `decks/`. Las rutas relativas en los deck HTML deben apuntar a `../../assets/...`.

## Flujo de trabajo

### Crear una deck nueva
1. Usuario invoca `/create-deck` con un tema/prompt.
2. La skill lee `STYLE_GUIDE.md` y delega en orden:
   - **slide-architect**: convierte el prompt en una estructura (lista de slides con tipo + intención narrativa).
   - **slide-designer**: por cada slide en la estructura, genera HTML respetando AURORA.
   - **slide-reviewer**: revisa la deck completa contra el STYLE_GUIDE y propone correcciones.
3. Se guarda en `deck/<nombre-slug>/index.html`, listo para servir por Apache.
4. Si el deck es nuevo, añadir manualmente una tarjeta en `index.html` (portada) para mantener el índice actualizado.

### Servir por Apache
Cada deck es **autocontenida**: importa CSS/JS por ruta relativa (`../../assets/...`) o por URL absoluta si se sirve desde el VirtualHost. Sin frameworks, sin npm, sin servidor de Node.

El servidor expone `index.html` en la raíz como portada pública. El deploy se gestiona con **Docker Compose + Apache** tal como describe el `README.md`.

## Reglas duras (no negociables)

1. **NUNCA inventar un estilo nuevo.** Si AURORA no cubre algo, extender los tokens en `aurora.css` en lugar de inline styles ad-hoc.
2. **Toda deck importa `aurora.css` y `deck.js`.** No CSS embebido salvo para overrides puntuales documentados.
3. **Cada slide tiene un `data-layout`** (cover, section, content, bullets, split, quote, stat, code, timeline, team, gallery, closing). Si necesitas un layout nuevo, primero añádelo al sistema.
4. **El idioma del contenido** sigue al prompt del usuario; pero los nombres de archivo, clases CSS y comentarios técnicos siempre en inglés/kebab-case.
5. **Animaciones con sentido.** Cada animación debe servir a la jerarquía (entrada de contenido, énfasis), no decorar por decorar. Respetar `prefers-reduced-motion`.
6. **Accesibilidad mínima:** contraste AA, `alt` en imágenes, navegación por teclado (ya implementada en `deck.js`).
7. **Self-contained:** una deck servida desde Apache no debe romper si pierde conexión a internet (las fuentes se cargan de Google Fonts — aceptable — pero el resto debe funcionar).

## Cómo navegar las decks generadas

- `→` / `Espacio`: siguiente slide
- `←`: anterior
- `F`: pantalla completa
- `O`: vista general (overview con todas las miniaturas)
- `?`: ayuda

## Notas de mantenimiento

- Al actualizar `aurora.css` o `deck.js`, todas las decks ya servidas se benefician (ruta compartida).
- Si una deck necesita una variante (p.ej. tema light-first), crear una clase modificadora en `aurora.css` (`.deck--light-first`) en vez de duplicar la deck.
