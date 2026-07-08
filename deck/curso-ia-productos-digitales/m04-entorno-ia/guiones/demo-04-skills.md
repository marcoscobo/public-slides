# Guion — Demo en vivo 4: "Claude genera skills útiles para el proyecto"

**Módulo:** 04 · Construyendo un Entorno Optimizado para IA (4 horas totales)
**Slide:** 21 — caption `DEMO EN VIVO · 04`
**Duración recomendada:** 10 min (versión corta) / 14 min (versión completa)
**Objetivo pedagógico:** cerrar el círculo de "el proyecto se configura solo": tras DevContainers, CLAUDE.md y un equipo de agentes, ahora el propio Claude decide qué automatizaciones (skills) le ahorrarían tiempo a partir de ahora.

**Requisito de continuidad:** sigue sobre `hola-mundo-express`, con `CLAUDE.md` y `.claude/agents/` ya creados (demos anteriores). Este es el último eslabón de las 4 demos del módulo — dale un cierre con algo más de solemnidad ("hemos llegado al final de este proyecto de ejemplo").

---

## Antes de empezar

- [ ] Continúa con el mismo proyecto abierto.
- [ ] Ya se han visto las slides 19-20 (qué son las skills, la skill `create-skill` que crea otras skills) — la demo asume ese contexto.

## Qué decir antes de saltar al escritorio

> "Última demo de este módulo: le pedimos a Claude que mire el proyecto entero — DevContainers, CLAUDE.md, agentes — y decida qué automatizaciones le ahorrarían tiempo a partir de ahora."

---

## Guion paso a paso

### Paso único — El prompt (8-10 min)
**Hacer:** prompt literal en Claude Code:
```
Analiza el proyecto y propón 3 skills que me ahorrarían tiempo. Créalas en .claude/skills/ y actualiza el CLAUDE.md para que sepas cuándo usarlas.
```

Mientras genera, narra:
- *"Está mirando todo lo que hemos construido hasta ahora en las tres demos anteriores para decidir qué merece la pena automatizar."*
- Cuando termine: `ls .claude/skills/` y abre el contenido de una de las skills generadas (`SKILL.md`).
- Abre `CLAUDE.md` y señala dónde ahora se listan las skills disponibles y cuándo usarlas.

**Cierre — pruébalo en directo:** invoca una de las skills recién creadas (si generó algo como `/deploy` o `/review`, pruébalo tal cual):
```
/review
```
o el nombre exacto que Claude haya elegido. Deja que la clase vea la skill ejecutándose de principio a fin.

**Hacer commit final:**
```bash
git add .claude/ CLAUDE.md
git commit -m "feat: añadir skills personalizadas del proyecto"
git push
```

**Cierre del bloque de las 4 demos (decir en voz alta):**
> "Repasad lo que hemos hecho en un solo módulo, sin escribir configuración a mano: DevContainers, CLAUDE.md, un equipo de agentes y ahora skills — todo generado y mantenido por el propio proyecto."

---

## Versión corta (10 min) vs versión completa (14 min)

| Bloque | Corta | Completa |
|---|---|---|
| Prompt + generación | 5 min | 6 min |
| Revisar 1 skill generada | 2 min | 3 min |
| Probar la skill en directo (`/review` o equivalente) | 2 min | 4 min |
| Commit + cierre de las 4 demos | 1 min | 1 min |

Si vas muy corto de tiempo en todo el módulo (ha pasado factura el resto del contenido), esta es la demo que más se puede recortar sin perder el mensaje: haz solo el prompt + mostrar 1 skill generada, y omite probarla en directo — di *"os la dejo para que la probéis vosotros"*.

## Qué hacer si algo falla

- **La skill generada no se ejecuta como comando de barra (`/nombre`) porque Claude Code necesita reiniciar sesión para detectarla:** explica esto en voz alta como un detalle técnico real (*"a veces hay que reiniciar la sesión de Claude Code para que detecte una skill nueva"*) y sigue adelante mostrando el contenido del archivo en vez de ejecutarla.

## Vuelta a las slides

Retoma en la slide 22 (`CAPÍTULO 04 — Anatomía de un Prompt Efectivo`).
