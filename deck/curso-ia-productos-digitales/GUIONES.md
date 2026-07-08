# Guiones de demos en vivo — Curso IA para Productos Digitales

Un guion markdown por cada momento de "DEMO EN VIVO" del curso, pensado para que el profesor lo tenga abierto en una segunda pantalla o impreso mientras presenta. Cada guion incluye: qué decir, qué hacer, tiempos por bloque, una versión corta y una completa (para adaptarse al tiempo real disponible en el aula), y qué hacer si algo falla.

| Módulo | Duración | Demo | Guion |
|---|---|---|---|
| 01 · Introducción | 2h | Del asistente al agente | [demo-asistente-vs-agente.md](m01-introduccion/guiones/demo-asistente-vs-agente.md) |
| 02 · Entorno | 3h | Stack completo: de cero a producción | [demo-stack-completo.md](m02-entorno/guiones/demo-stack-completo.md) |
| 03 · Colaboración | 3h | 1 — Primer repositorio en GitHub | [demo-01-primer-repositorio.md](m03-colaboracion/guiones/demo-01-primer-repositorio.md) |
| 03 · Colaboración | 3h | 2 — Repo + web con Claude Code | [demo-02-repo-web-claude.md](m03-colaboracion/guiones/demo-02-repo-web-claude.md) |
| 04 · Entorno IA | 4h | 1 — DevContainers | [demo-01-devcontainers.md](m04-entorno-ia/guiones/demo-01-devcontainers.md) |
| 04 · Entorno IA | 4h | 2 — CLAUDE.md generado por Claude | [demo-02-claude-md.md](m04-entorno-ia/guiones/demo-02-claude-md.md) |
| 04 · Entorno IA | 4h | 3 — Equipo de agentes | [demo-03-equipo-agentes.md](m04-entorno-ia/guiones/demo-03-equipo-agentes.md) |
| 04 · Entorno IA | 4h | 4 — Skills personalizadas | [demo-04-skills.md](m04-entorno-ia/guiones/demo-04-skills.md) |
| 05 · MVP | 4h | Definir y construir el MVP (prep + build) | [demo-construir-mvp.md](m05-mvp/guiones/demo-construir-mvp.md) |
| 06 · Despliegue | 2h | 1 — Deploy en Vercel | [demo-01-deploy-vercel.md](m06-despliegue/guiones/demo-01-deploy-vercel.md) |
| 06 · Despliegue | 2h | 2 — Monitorización con UptimeRobot | [demo-02-uptimerobot.md](m06-despliegue/guiones/demo-02-uptimerobot.md) |
| 06 · Despliegue | 2h | 3 — Redeploy automático | [demo-03-redeploy-automatico.md](m06-despliegue/guiones/demo-03-redeploy-automatico.md) |

El Módulo 07 (Proyecto Final) no tiene demos en vivo del profesor — es la sesión de trabajo y presentación de los proyectos del alumnado.

## Hilo de continuidad entre demos

Varias demos reutilizan el MISMO proyecto de ejemplo de una sesión a otra. No lo borres entre módulos:

```
M03 demo 2  →  crea "hola-mundo-express" (Node + Express + Dockerfile)
M04 demo 1  →  lo reestructura con DevContainers
M04 demo 2  →  le añade CLAUDE.md
M04 demo 3  →  le añade equipo de agentes (.claude/agents/)
M04 demo 4  →  le añade skills (.claude/skills/)
M05 demo    →  proyecto NUEVO y distinto (MVP con Next.js + Vercel Postgres)
M06 demo 1  →  despliega el MVP de M05 (o hola-mundo-express si no hay MVP) en Vercel
M06 demo 3  →  sigue sobre el mismo despliegue de M06 demo 1
```

## Antes de cada sesión

1. Lee el guion completo de la(s) demo(s) de ese módulo la noche anterior, no en el descanso previo.
2. Verifica el checklist "Antes de empezar" de cada guion (cuentas, software instalado, proyecto en el estado correcto).
3. Decide de antemano si vas a poder permitirte la versión completa o necesitas la versión corta, según cómo vaya el resto del módulo — cada guion trae ambas con tiempos exactos por bloque.
