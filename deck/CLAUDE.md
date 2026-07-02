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
└── deck/                               ← output, agrupado por curso/grupo
    ├── personal/
    │   └── about-me-marcos-cobo/
    ├── curso-ia-productos-digitales/   ← un curso = una carpeta
    │   ├── m01-introduccion/
    │   ├── m02-entorno/
    │   ├── m03-colaboracion/
    │   ├── m04-entorno-ia/
    │   ├── m05-mvp/
    │   ├── m06-despliegue/
    │   └── m07-proyecto-final/
    └── curso-ia-logistica/
        ├── m01-fundamentos/
        ├── m02-productividad/
        ├── m03-automatizacion/
        ├── m04-analisis-datos/
        ├── m05-prediccion-demanda/
        ├── m06-transporte/
        ├── m07-documental/
        └── m08-transformacion/
```

> **Nota:** el directorio de output es `deck/` (sin 's'), no `decks/`. Cada deck vive en `deck/<curso>/<modulo>/index.html`, así que las rutas relativas a los assets compartidos deben apuntar a `../../../assets/...` y al índice raíz con `../../../index.html`. Los enlaces entre módulos del mismo curso son hermanos: `../<modulo>/index.html`.

## Flujo de trabajo

### Crear una deck nueva
1. Usuario invoca `/create-deck` con un tema/prompt.
2. La skill lee `STYLE_GUIDE.md` y delega en orden:
   - **slide-architect**: convierte el prompt en una estructura (lista de slides con tipo + intención narrativa).
   - **slide-designer**: por cada slide en la estructura, genera HTML respetando AURORA.
   - **slide-reviewer**: revisa la deck completa contra el STYLE_GUIDE y propone correcciones.
3. Se guarda en `deck/<curso>/<modulo-slug>/index.html`, listo para servir por Apache.
4. Si el deck es nuevo, añadir manualmente una tarjeta en `index.html` (portada) para mantener el índice actualizado.

### Servir por Apache
Cada deck es **autocontenida**: importa CSS/JS por ruta relativa (`../../../assets/...`) o por URL absoluta si se sirve desde el VirtualHost. Sin frameworks, sin npm, sin servidor de Node.

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
- **Táctil (tablet/móvil horizontal):** swipe izq/dcha o las flechas en pantalla.
- **Móvil vertical:** scroll vertical (las slides se apilan).

## Responsive

El sistema funciona en dos modos, ambos automáticos vía `aurora.css` + `deck.js` (las decks no necesitan nada extra):
- **Modo canvas** (desktop y tablet/móvil en horizontal, ≥768px): el canvas fijo 1920×1080 se escala y **se centra** en el viewport (`deck.js` aplica `translate + scale` con `transform-origin: 0 0`). Navegación por teclado, swipe o flechas táctiles.
- **Modo flujo** (móvil en vertical, <768px): se desactiva el escalado; las slides se apilan en vertical con scroll-snap, la tipografía se reduce vía tokens y las rejillas colapsan a una columna. La navegación es scroll.

## Notas de mantenimiento

- Al actualizar `aurora.css` o `deck.js`, todas las decks ya servidas se benefician (ruta compartida).
- Si una deck necesita una variante (p.ej. tema light-first), crear una clase modificadora en `aurora.css` (`.deck--light-first`) en vez de duplicar la deck.
- Para previsualizar decks en local hay un `python3 -m http.server` configurado en `.claude/launch.json` (puerto 8731).
