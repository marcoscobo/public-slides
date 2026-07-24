# Material para Moodle — Curso IA para Productos Digitales

Qué se sube a Moodle por cada módulo: las slides en PDF (generadas con `tools/generate-pdfs.sh`, ver `pdfs/curso-ia-productos-digitales/`) y, cuando el módulo lo requiere, una plantilla descargable. Las plantillas están alineadas con el proyecto de ejemplo que se construye en las demos en vivo (ver `GUIONES.md` → "Hilo de continuidad entre demos"): `hola-mundo-express` en los Módulos 02-04, el MVP tipo tablero Kanban (Next.js + Vercel Postgres) en el Módulo 05, y su despliegue en el Módulo 06.

| Módulo | Slides (PDF) | Plantilla | Material |
|---|---|---|---|
| 01 · Introducción | m01-introduccion.pdf | — | — |
| 02 · Entorno | m02-entorno.pdf | Stack base (Dockerfile + docker-compose.yml) | [m02-entorno/material/](m02-entorno/material/) |
| 03 · Colaboración | m03-colaboracion.pdf | Archivos de arranque del proyecto (README.md, .gitignore, CHANGELOG.md) | [m03-colaboracion/material/](m03-colaboracion/material/) |
| 04 · Entorno IA | m04-entorno-ia.pdf | Pack de entorno IA (CLAUDE.md, devcontainer.json, agente y skill de ejemplo) | [m04-entorno-ia/material/](m04-entorno-ia/material/) |
| 05 · MVP | m05-mvp.pdf | Alcance y requisitos del MVP (plantilla para rellenar) | [m05-mvp/material/](m05-mvp/material/) |
| 06 · Despliegue | m06-despliegue.pdf | — | — |
| 07 · Proyecto Final | m07-proyecto-final.pdf | Memoria del Proyecto (plantilla de 5 secciones) | [m07-proyecto-final/material/](m07-proyecto-final/material/) |

## Contenido de cada `material/`

- **m02-entorno** — `Dockerfile` + `docker-compose.yml`: el mismo stack Node.js 20 + Express en el puerto 3000 que se construye en la demo del módulo, listo para `docker compose up`.
- **m03-colaboracion** — `README.md`, `.gitignore` y `CHANGELOG.md`: los tres archivos de arranque siguiendo las convenciones enseñadas (anatomía del README, qué nunca sube a GitHub, Conventional Commits). Se copian tal cual a la raíz de un repo nuevo.
- **m04-entorno-ia** — `CLAUDE.md` (con las 5 secciones enseñadas), `.devcontainer/devcontainer.json`, `.claude/agents/code-reviewer.md` y `.claude/skills/review/SKILL.md`. Toda la carpeta se puede copiar tal cual a la raíz de un proyecto para darle identidad y automatizaciones desde el primer commit.
- **m05-mvp** — `mvp-scope-requirements.md`: las tres preguntas para clarificar el alcance, la tabla de user stories (MVP vs backlog) y un hueco para el prompt inicial a Claude.
- **m07-proyecto-final** — `project-report-template.md`: las 5 secciones de la Memoria del Proyecto (La Idea · Los Requisitos · Lo que Construiste · El Proceso con IA · Reflexión) listas para rellenar y exportar a PDF.

Los Módulos 01 y 06 no tienen plantilla propia — solo se sube el PDF de las slides.
