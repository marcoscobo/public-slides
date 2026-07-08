# Guion — Demo en vivo 1: "Reestructurar el proyecto con DevContainers"

**Módulo:** 04 · Construyendo un Entorno Optimizado para IA (4 horas totales)
**Slide:** 08 — caption `DEMO EN VIVO · 01`
**Duración recomendada:** 12 min (versión corta) / 18 min (versión completa)
**Objetivo pedagógico:** mostrar que un DevContainer no es teoría — el mismo proyecto que arrastramos desde el Módulo 3 se reestructura en minutos para que "funcione igual en cualquier máquina".

**Requisito de continuidad:** esta demo reutiliza `hola-mundo-express`, el proyecto construido en el Módulo 3 (demo 2). Ábrelo desde `~/curso-ia/hola-mundo-express/` — si algún alumno no lo tiene, que trabaje sobre el proyecto de un compañero o sobre una copia que tú repartas antes de clase.

---

## Antes de empezar

- [ ] Ten `~/curso-ia/hola-mundo-express/` abierto y funcionando (verifica con `git log --oneline` que están los commits del Módulo 3).
- [ ] Ten Docker Desktop arrancado (los DevContainers lo necesitan corriendo de fondo).
- [ ] Ten instalada en VS Code la extensión "Dev Containers" (`ms-vscode-remote.remote-containers`) de antemano — no la instales en directo, consume tiempo.
- [ ] Si algún alumno no tiene Docker corriendo desde el Módulo 2, avísalo al principio del módulo, no en mitad de esta demo.

## Qué decir antes de saltar al escritorio

> "Vamos a coger el proyecto que construimos en el módulo anterior y pedirle a Claude que lo reestructure para trabajar con DevContainers. No vamos a escribir el `devcontainer.json` a mano — se lo pedimos."

---

## Guion paso a paso

### Paso 1 — Abrir el proyecto existente (2 min)
**Hacer:** `cd ~/curso-ia/hola-mundo-express && code .` — muestra brevemente la estructura actual (sin `.devcontainer/`).

### Paso 2 — Prompt a Claude (5 min)
**Decir:** "Le pedimos que reestructure el repo, no que empiece de cero."
**Hacer:** en Claude Code, prompt literal:
```
Reestructura este repo para trabajar con DevContainers. Añade el .devcontainer/devcontainer.json apropiado para un proyecto Node.js + Express con Docker, manteniendo la funcionalidad actual.
```
Mientras genera, comenta en voz alta las 5 secciones que debería incluir (ya vistas en la slide 06): imagen base, extensiones, puertos, comandos post-creación, variables de entorno.

### Paso 3 — Reopen in Container (6 min)
**Decir:** "Ahora la magia: le decimos a VS Code que abra el proyecto DENTRO del contenedor que acaba de definir."
**Hacer:** paleta de comandos (`Cmd/Ctrl+Shift+P`) → "Dev Containers: Reopen in Container". Mientras construye (puede tardar 1-2 min la primera vez), explica qué está pasando: *"está construyendo la imagen exacta que necesitamos, con Node ya instalado, sin que hayamos tocado nuestra máquina."*

### Paso 4 — Verificar entorno y commit (3 min)
**Hacer:** una vez dentro del contenedor, abre una terminal INTEGRADA (ya estará "dentro" del contenedor) y ejecuta:
```bash
node --version
npm --version
git status
git add .
git commit -m "chore: añadir configuración de DevContainer"
git push
```
**Decir:** "Fijaos: la terminal de VS Code ya está corriendo dentro del contenedor, no en mi Mac/Windows."

---

## Versión corta (12 min) vs versión completa (18 min)

| Bloque | Corta | Completa |
|---|---|---|
| Abrir proyecto | 1 min | 2 min |
| Prompt + generación | 4 min | 5 min |
| Reopen in Container (build) | 4 min (ten uno pre-construido de backup si tarda) | 8 min (deja ver el proceso completo) |
| Verificar + commit | 3 min | 3 min |

Si el build del contenedor tarda mucho en directo (primera vez puede tardar varios minutos), en la versión corta **ten preparado de antemano un segundo proyecto ya con el DevContainer construido** y salta directamente a mostrar "esto es lo que se obtiene" mientras el build real corre en segundo plano.

## Qué hacer si algo falla

- **El build del contenedor se cuelga o tarda demasiado (>3 min):** cambia a la ventana con el proyecto ya preparado de antemano y di: *"mientras esto termina en segundo plano, os enseño el resultado ya construido"*.
- **Docker no tiene suficiente memoria asignada:** ten a mano cómo subir el límite de memoria en Docker Desktop → Settings → Resources, por si hay que ajustarlo en directo.

## Vuelta a las slides

Retoma en la slide 09 (`CAPÍTULO 02 — CLAUDE.md`).
