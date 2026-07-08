# Guion — Demo en vivo 3: "Claude genera su propio equipo de agentes"

**Módulo:** 04 · Construyendo un Entorno Optimizado para IA (4 horas totales)
**Slide:** 18 — caption `DEMO EN VIVO · 03`
**Duración recomendada:** 10 min (versión corta) / 14 min (versión completa)
**Objetivo pedagógico:** mostrar que un "equipo de agentes especializados" no es una arquitectura que se diseña a mano — se le pide al agente principal que se auto-organice, y que dicha organización quede escrita (y por tanto reproducible) en el propio repo.

**Requisito de continuidad:** sigue sobre `hola-mundo-express`, que ya tiene `CLAUDE.md` (demo anterior).

---

## Antes de empezar

- [ ] Continúa con el mismo proyecto abierto, con `CLAUDE.md` ya generado.
- [ ] Ya se ha visto la slide 17 (anatomía de un agente especializado, carpeta `.claude/agents/`) — la demo da por sentado ese vocabulario.

## Qué decir antes de saltar al escritorio

> "Ahora vamos a pedirle a Claude que se organice él solo en un equipo de agentes especializados para este proyecto, y que dicha organización quede escrita — no en mi cabeza, en el repo."

---

## Guion paso a paso

### Paso único — El prompt (8-10 min)
**Decir:** "El prompt tiene dos partes: que proponga el equipo Y que actualice el CLAUDE.md para orquestarlos. Si solo le pedimos lo primero, la próxima sesión no se acordaría de que existen."

**Hacer:** prompt literal en Claude Code:
```
Basándote en el proyecto actual, propón un equipo de 3-4 agentes especializados que me ayuden a trabajar mejor. Créalos en .claude/agents/ y actualiza el CLAUDE.md para que sepas cómo usarlos.
```

Mientras genera, ve narrando:
- *"Fijaos que primero está razonando qué roles tienen sentido PARA ESTE proyecto concreto — no son genéricos, son sobre hola-mundo-express."*
- Cuando termine: `ls .claude/agents/` y abre 1-2 de los archivos generados. Lee en voz alta el rol y "criterio de activación" de cada uno.
- Abre el `CLAUDE.md` y muestra el punto donde ahora menciona el equipo de agentes.

**Cierre — demuéstralo:** invoca a uno de los agentes recién creados con una petición sencilla relacionada con su rol (por ejemplo, si generó un agente de "revisión de código", pídele: *"revisa el código actual del proyecto"*) para que la clase vea que no son archivos decorativos, son utilizables de inmediato.

**Hacer:**
```bash
git add .claude/ CLAUDE.md
git commit -m "feat: añadir equipo de agentes especializados"
git push
```

---

## Versión corta (10 min) vs versión completa (14 min)

| Bloque | Corta | Completa |
|---|---|---|
| Prompt + generación | 5 min | 6 min |
| Revisar 1-2 agentes generados | 3 min | 4 min |
| Invocar uno de los agentes para probarlo | ❌ se omite, solo se menciona | 3 min |
| Commit | 2 min | 1 min |

Si vas corto, omite la prueba de invocar el agente y di: *"estos agentes ya se pueden usar ahora mismo desde Claude Code, os lo dejo para que lo probéis vosotros después"*.

## Qué hacer si algo falla

- **Claude propone menos o más agentes de los esperados (2 o 5 en vez de 3-4):** no es un error, es variabilidad normal — sigue adelante, el número exacto no es el objetivo pedagógico.
- **El agente invocado en la prueba no responde como se esperaba:** aprovéchalo para explicar que los agentes especializados son una guía de comportamiento, no una garantía absoluta — "por eso seguimos revisando lo que hacen".

## Vuelta a las slides

Retoma en la slide 19 (`SKILLS PERSONALIZADOS — Skills: flujos de trabajo en un comando`).
