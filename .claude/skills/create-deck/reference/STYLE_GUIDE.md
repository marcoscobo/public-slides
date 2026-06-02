# AURORA — Design System

> Una sola identidad visual para todas las presentaciones de este proyecto.
> Este documento es la **fuente de verdad**. Si `aurora.css` y este documento divergen, gana este documento y se corrige el CSS.

---

## 1. Personalidad

AURORA es **moderna, premium, editorial-tech**. Mezcla:
- la sobriedad de una revista de diseño (mucho espacio, jerarquía clara),
- la energía de una marca tecnológica (gradientes, animaciones precisas),
- el oficio de la tipografía cuidada (Space Grotesk + Inter en pareja).

No es: corporativo plano, infantil, sobrecargado, neón saturado, plantilla genérica de slides.

---

## 2. Canvas

- **Aspect ratio:** 16:9.
- **Tamaño base:** 1920 × 1080 px (todo escalado vía `transform: scale()` para encajar el viewport).
- **Safe area:** márgenes mínimos de 96 px en horizontal y 80 px en vertical.

---

## 3. Paleta

### Modo oscuro (primario)
| Token              | Hex       | Uso                                      |
|--------------------|-----------|------------------------------------------|
| `--ink`            | `#0B0F1A` | Fondo principal                          |
| `--ink-soft`       | `#131826` | Superficies elevadas (cards)             |
| `--ink-line`       | `#1F2638` | Bordes sobre oscuro                      |
| `--text`           | `#ECEAE3` | Texto principal sobre oscuro             |
| `--text-muted`     | `#8B8D98` | Texto secundario, captions               |

### Modo claro (alternativo, slides "paper")
| Token              | Hex       | Uso                                      |
|--------------------|-----------|------------------------------------------|
| `--cream`          | `#F5EFE3` | Fondo claro principal                    |
| `--paper`          | `#FAF8F3` | Fondo claro más pálido                   |
| `--ink-on-paper`   | `#0F0E17` | Texto sobre cream                        |
| `--muted-on-paper` | `#5C5F6B` | Texto secundario sobre cream             |
| `--line-on-paper`  | `#E5DFD0` | Bordes sutiles sobre cream               |

### Acentos (los mismos en ambos modos)
| Token         | Hex       | Uso                                                |
|---------------|-----------|----------------------------------------------------|
| `--violet`    | `#7B4DFF` | Acento primario, inicio del gradiente firma        |
| `--cyan`      | `#00D4FF` | Acento secundario, final del gradiente firma       |
| `--amber`     | `#FFB627` | Highlight, CTAs, números destacados                |
| `--rose`      | `#FF5B7A` | Callouts puntuales, errores semánticos             |
| `--lime`      | `#C6FF3D` | Acento opcional para data positiva                 |

### Gradiente firma
```css
--aurora: linear-gradient(135deg, #7B4DFF 0%, #00D4FF 100%);
--aurora-soft: linear-gradient(135deg, rgba(123,77,255,0.18) 0%, rgba(0,212,255,0.18) 100%);
```

Reservado para: títulos clave, números monumentales, líneas de énfasis, barra de progreso, hover states selectos. **No** abusar — máximo 1 elemento gradiente por slide salvo la barra de progreso.

---

## 4. Tipografía

### Familias (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Rol     | Familia          | Pesos     |
|---------|------------------|-----------|
| Display | Space Grotesk    | 500, 700  |
| Body    | Inter            | 400, 500, 600 |
| Mono    | JetBrains Mono   | 400, 500  |

### Escala (1920×1080 canvas)
| Token             | Tamaño | Line-height | Letter-spacing | Familia      |
|-------------------|--------|-------------|----------------|--------------|
| `--fs-display-xl` | 144px  | 0.92        | -0.035em       | Space Grotesk 700 |
| `--fs-display-l`  | 104px  | 0.95        | -0.03em        | Space Grotesk 700 |
| `--fs-display-m`  | 72px   | 1.0         | -0.025em       | Space Grotesk 700 |
| `--fs-h1`         | 56px   | 1.05        | -0.02em        | Space Grotesk 600 |
| `--fs-h2`         | 40px   | 1.15        | -0.015em       | Space Grotesk 600 |
| `--fs-h3`         | 28px   | 1.25        | -0.01em        | Space Grotesk 500 |
| `--fs-body-l`     | 24px   | 1.5         | 0              | Inter 400    |
| `--fs-body`       | 20px   | 1.55        | 0              | Inter 400    |
| `--fs-caption`    | 14px   | 1.4         | 0.12em (UPPER) | Inter 600    |
| `--fs-mono`       | 18px   | 1.45        | 0              | JetBrains Mono 400 |

### Reglas tipográficas
- **Jerarquía limpia**: máximo 3 tamaños por slide.
- **Display** (Space Grotesk) solo para encabezados grandes. No para body.
- **Captions** siempre en mayúsculas con letter-spacing 0.12em, color `--violet` o `--text-muted`.
- **Números monumentales** (slides tipo `stat`): usar `--fs-display-xl` con gradiente aurora.
- **Mono** para datos tabulares, código, números pequeños técnicos.
- **No** justificar texto. **No** centrar párrafos largos.
- **Widows/orphans**: usar `text-wrap: balance` en H1/H2.

---

## 5. Espaciado

Base 8px. Tokens:
```
--space-1: 4px
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 32px
--space-6: 48px
--space-7: 64px
--space-8: 96px
--space-9: 128px
--space-10: 160px
```

Márgenes de slide: 96px horizontal × 80px vertical mínimo.
Gap entre títulos y subtítulos: 24px.
Gap entre secciones: 48–64px.

---

## 6. Grid

Sistema de 12 columnas con gutter 32px dentro del safe area.
Variantes habituales:
- **Cover/section**: contenido en 8 columnas, alineado a la izquierda.
- **Content**: heading en 7 columnas + sidebar/imagen en 5 columnas.
- **Split**: 6 + 6.
- **Stat**: número full-bleed centrado o alineado, contexto en columna estrecha.
- **Gallery**: grid 4×N o 3×N.

---

## 7. Elementos firma (lo que hace que una slide se reconozca como AURORA)

1. **Marcador numérico**: número de slide gigante en la esquina superior derecha, en Space Grotesk 700, color `--ink-line` (apenas visible). Tamaño 280px en cover, 140px en slides interiores.

2. **Caption con punto**: las etiquetas de sección llevan un punto antes — formato `<span class="caption">● CHAPTER 01</span>`. Color del punto: `--violet`.

3. **Línea de énfasis aurora**: barra de 4px de alto con gradiente aurora, ancho 72px, debajo de títulos clave. Se dibuja con animación (scaleX) al entrar.

4. **Textura grain**: capa SVG noise a 4% de opacidad sobre el fondo. Ya implementada como `::before` del `.slide`.

5. **Formas flotantes**: 1–2 elementos geométricos (círculo, arco SVG) con `position: absolute` y animación de drift infinita muy lenta (20–30s). Solo en cover, section y closing.

6. **Barra de progreso inferior**: 3px de alto, gradiente aurora, ancho proporcional al avance. Fija en bottom de la deck.

7. **Página numerada inferior izquierda**: `04 / 18` en JetBrains Mono 14px, color `--text-muted`.

8. **Texto con gradiente aurora**: aplicar a 1–3 palabras clave por slide (`.text-aurora`). Nunca al título completo: máximo una palabra/frase corta.

---

## 8. Animaciones

### Principios
- Toda animación tiene un propósito narrativo (introducir, enfatizar, transicionar).
- Duraciones cortas (200–600ms). Nada por encima de 800ms salvo decoración infinita.
- Easing por defecto: `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo suave).
- Respetar `prefers-reduced-motion: reduce` — desactivar todo lo no esencial.

### Catálogo
| Animación              | Duración | Easing                  | Uso                                |
|------------------------|----------|-------------------------|-------------------------------------|
| Transición de slide    | 600ms    | cubic-bezier(.22,1,.36,1) | Slide horizontal + fade            |
| Stagger entry          | 400ms    | cubic-bezier(.22,1,.36,1) | Elementos hijos, delay +80ms        |
| Number count-up        | 1200ms   | cubic-bezier(.22,1,.36,1) | Slides tipo stat                    |
| Línea de énfasis       | 500ms    | cubic-bezier(.22,1,.36,1) | scaleX(0→1) origen izquierda       |
| Drift de formas        | 24s      | linear (infinite)       | Decoración de fondo                 |
| Hover lift             | 200ms    | ease-out                | Cards en gallery/team               |

### Clases utilitarias
- `.reveal` — elemento aparece al entrar la slide (fade + translateY 20px → 0).
- `.reveal[data-delay="1"]` ... `.reveal[data-delay="6"]` — escalonamiento.
- `.draw-line` — línea aurora que se dibuja desde la izquierda.
- `.count-up` — número con `data-target="N"` que cuenta al entrar.

---

## 9. Iconografía

- Iconos en SVG inline, **stroke-based** (no fill), grosor 1.5px.
- Tamaño base 24×24, también 32×32 y 48×48.
- Color: `currentColor` (heredan del contexto).
- Set recomendado: Lucide o Phosphor (light o regular). No mezclar sets en la misma deck.

---

## 10. Imágenes

- Tratamiento por defecto: ligero `filter: saturate(0.95) contrast(1.05)` para uniformizar.
- En modo oscuro, opcional overlay `linear-gradient(to bottom, transparent, var(--ink))` para fundir con el fondo.
- Bordes: nunca cuadrados sin ningún radius — `border-radius: 16px` mínimo en cards/imágenes; 0 solo si la imagen es full-bleed.
- Object-fit: `cover` por defecto.

---

## 11. Data / Charts

Si una slide muestra datos:
- Usar SVG o `<canvas>` (Chart.js permitido vía CDN).
- Colores: gradiente aurora para la serie principal, ámbar para la secundaria, rose para alertas.
- Ejes en `--text-muted`, grid lines en `--ink-line` (oscuro) o `--line-on-paper` (claro).
- Tipografía: Inter 500, 14–16px.

---

## 12. Layouts disponibles (data-layout)

| Layout      | Cuándo usar                                       |
|-------------|---------------------------------------------------|
| `cover`     | Portada de la deck                                |
| `section`   | Divisor de capítulo                               |
| `content`   | Heading + párrafo + opcional media                |
| `bullets`   | Lista de 3–6 puntos                               |
| `split`     | Comparativa o antes/después                       |
| `quote`     | Cita o pull-quote                                 |
| `stat`      | Una cifra monumental con contexto                 |
| `code`      | Bloque de código + comentario                     |
| `timeline`  | Cronología o proceso de N pasos                   |
| `team`      | Tarjetas de personas                              |
| `gallery`   | Mosaico de imágenes                               |
| `closing`   | Cierre, CTA o contacto                            |

Detalles HTML de cada layout: ver `LAYOUTS.md`.

---

## 13. Modificadores de slide

Sobre `.slide` se pueden combinar:
- `.slide--paper` — fondo cream en lugar de ink (modo claro).
- `.slide--center` — alinea contenido al centro vertical y horizontal.
- `.slide--no-grain` — desactiva la textura (útil con imágenes full-bleed).
- `.slide--accent-amber` / `.slide--accent-rose` — cambia el acento secundario.

---

## 14. Do / Don't

### Do
- Una idea por slide.
- Máximo 3 tamaños tipográficos.
- Máximo 1 elemento con gradiente firma por slide (sin contar la barra inferior).
- Usar `text-wrap: balance` en titulares.
- Respetar la safe area (96/80 px).
- Animar con propósito.

### Don't
- No mezclar más de dos acentos en una slide.
- No usar sombras "drop-shadow" pesadas: máximo `0 10px 30px rgba(0,0,0,0.25)`.
- No bordes punteados, no esquinas con `border-radius` mayor a 24px en cards.
- No emojis en títulos.
- No animaciones que rebotan (bounce) — fuera de marca.
- No tipografías diferentes a las tres definidas.
- No fondos con foto a pantalla completa sin overlay (rompe legibilidad).
