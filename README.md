# public-slides

Presentaciones HTML modernas y animadas, generadas a partir de prompts con Claude Code. Cada deck es **HTML + CSS + JS estático**, sin build step ni dependencias de runtime, servido con Apache vía Docker Compose.

🔗 **slides.marcoscobo.com**

## Identidad: AURORA

Todas las decks comparten un único sistema visual llamado **AURORA**: modo oscuro por defecto (con slides en `cream` como contraste editorial), paleta midnight `#0B0F1A` / cream `#F5EFE3` / gradiente firma violeta→cian `#7B4DFF → #00D4FF` / ámbar `#FFB627`, tipografía Space Grotesk (display) + Inter (body) + JetBrains Mono (datos/código).

La fuente de verdad del design system es `.claude/skills/create-deck/reference/STYLE_GUIDE.md`, implementado en `assets/css/aurora.css`. Las instrucciones completas del proyecto para Claude Code están en `deck/CLAUDE.md`.

## Estructura del proyecto

```
public-slides/
├── README.md
├── index.html                          ← portada: índice de todas las decks disponibles
├── deck/
│   ├── CLAUDE.md                       ← instrucciones del proyecto para Claude Code
│   ├── personal/
│   └── <curso>/                        ← un curso = una carpeta
│       └── <modulo>/index.html         ← una deck = un módulo
├── assets/
│   ├── css/aurora.css                  ← design system implementado
│   └── js/deck.js                      ← navegación, animaciones, escalado de canvas
├── tools/
│   └── generate-pdfs.sh                ← exporta un deck completo a PDF (ver abajo)
├── .vscode/tasks.json                  ← task "Generar PDFs — seleccionar deck"
├── .claude/
│   ├── agents/                         ← slide-architect, slide-designer, slide-reviewer
│   └── skills/
│       ├── create-deck/                ← /create-deck (skill principal)
│       └── add-slide/                  ← /add-slide (añadir a una deck existente)
└── deploy/
    ├── docker-compose.yml              ← git-sync + Apache
    └── git-sync.sh
```

> El directorio de output es `deck/` (sin “s”). Cada deck vive en `deck/<curso>/<modulo>/index.html` y referencia los assets compartidos por ruta relativa (`../../../assets/...`).

## Crear una deck nueva

Con Claude Code, dentro del repo:

```
/create-deck <tema o prompt>
```

La skill lee el `STYLE_GUIDE.md` y orquesta `slide-architect` → `slide-designer` → `slide-reviewer`, dejando el resultado en `deck/<curso>/<modulo>/index.html`. Para añadir una slide a una deck existente: `/add-slide`.

## Previsualizar en local

```bash
python3 -m http.server 8731
```

y abrir `http://localhost:8731/deck/<curso>/<modulo>/`.

### Navegación dentro de una deck

| Tecla / gesto | Acción |
|---|---|
| `→` / `Espacio` | Siguiente slide |
| `←` | Anterior |
| `F` | Pantalla completa |
| `O` | Vista general (miniaturas) |
| `?` | Ayuda |
| Swipe / flechas en pantalla | Táctil (tablet/móvil horizontal) |
| Scroll vertical | Móvil en vertical (slides apiladas) |

## Exportar una deck a PDF

Cada deck está pensada para presentarse en vivo (canvas escalado por `deck.js`), no para imprimirse, así que la exportación a PDF usa un pipeline propio en vez de "Imprimir" del navegador.

**Desde VS Code:** ejecutar el task **"Generar PDFs — seleccionar deck"** (`.vscode/tasks.json`) y elegir el curso.

**Desde terminal:**

```bash
bash tools/generate-pdfs.sh <nombre-del-curso>
```

El script levanta un servidor local, recorre cada módulo del curso con [decktape](https://github.com/astefanutti/decktape) (navegación real slide a slide, para que animaciones y contadores terminen antes de capturar) y deja un PDF por módulo en `pdfs/<curso>/`. Requiere Node.js y Chrome/Chromium instalados; decktape se descarga automáticamente vía `npx` la primera vez.

Internamente, el script añade `?export=1` a la URL de cada deck: `deck.js` detecta ese flag y activa un modo de exportación (`aurora.css`, clase `.is-exporting`) que oculta la barra de progreso y los controles táctiles, y sustituye el degradado de `.text-aurora` por un color sólido — Chromium no compone bien `background-clip: text` en textos grandes al exportar a PDF, así que el fallback evita que el texto quede tapado.

## Despliegue

Gestionado con **Docker Compose + Apache** (`deploy/docker-compose.yml`):

- `slides-git-sync` clona el repo y hace `git pull` cada 60s sobre un volumen compartido.
- `slides-apache` sirve ese volumen como raíz de documentos, sin build step.

Cualquier `git push` a `main` se refleja en el sitio en menos de un minuto.

## Notas de mantenimiento

- Al actualizar `aurora.css` o `deck.js`, todas las decks ya servidas se benefician automáticamente (ruta compartida).
- **Nunca inventar un estilo nuevo.** Si AURORA no cubre algo, extender los tokens en `aurora.css` en vez de usar inline styles ad-hoc.
- Toda deck importa `aurora.css` y `deck.js`; sin CSS embebido salvo overrides puntuales documentados.
