# Guion — Demo en vivo 2: "Repo + web completa con Claude Code / Antigravity"

**Módulo:** 03 · Colaboración (3 horas totales)
**Slide:** 25 — caption `DEMO EN VIVO`
**Duración recomendada:** 20 min (versión corta) / 30 min (versión completa)
**Objetivo pedagógico:** mostrar el flujo real de trabajo con Git + un agente de IA: repo → rama de feature → revisión humana → merge. Este proyecto (`hola-mundo-express`) es la base que se reutiliza en los Módulos 4, 5 y 6 — constrúyelo con cuidado, con nombres de carpeta y de rama consistentes, porque volverás a abrirlo en las próximas sesiones.

---

## Antes de empezar

- [ ] Crea de antemano una carpeta de trabajo limpia, p. ej. `~/curso-ia/hola-mundo-express/`, que usarás también en los módulos 4-6. **No la borres al terminar esta sesión.**
- [ ] Verifica que tienes sesión iniciada en GitHub y Claude Code/Antigravity funcionando.
- [ ] Decide antes de clase si vas a hacerlo con Claude Code o Antigravity como demo principal (recomendado: Claude Code, y mencionar de palabra que con Antigravity es el mismo flujo).

## Qué decir antes de saltar al escritorio

> "Vamos a construir, en tres fases, el mismo proyecto que arrastraremos el resto del curso: una web Node.js + Express que dice 'Hola mundo', con Docker. Prestad atención al orden: primero estructura, luego la funcionalidad en una rama aparte, y al final dejamos que el propio agente gestione el flujo de Git."

---

## Guion paso a paso

### Fase 1 — Estructura del repo (8 min)
**Decir:** "Primero le pedimos al agente que nos prepare el esqueleto: repo, README, .gitignore."
**Hacer:**
```bash
mkdir hola-mundo-express && cd hola-mundo-express
git init
claude
```
Prompt literal a Claude:
```
Prepara el repo completo para un proyecto llamado "hola-mundo-express". Necesito: README.md describiendo el proyecto, .gitignore para Node.js, y la estructura de carpetas inicial. El proyecto será: "Crea una aplicación web simple con Node.js y Express que muestre 'Hola mundo' en el puerto 3000. Incluye un Dockerfile."
```
Cuando termine, revisa el resultado con el alumnado (`ls`, abre el README) y haz commit:
```bash
git add .
git commit -m "chore: estructura inicial del repo"
git branch -M main
git remote add origin <url-del-repo-en-github>
git push -u origin main
```

### Fase 2 — La web en una rama de feature (10 min)
**Decir:** "Ahora la funcionalidad real va en una rama aparte, nunca directamente en main."
**Hacer:**
```bash
git checkout -b feature/hola-mundo
```
Prompt literal a Claude:
```
Construye la web Express que muestra "Hola mundo" en el puerto 3000, junto con el Dockerfile para contenedorizarla.
```
Revisa el código generado en voz alta con la clase (*"mirad, aquí ha creado el `server.js`, aquí el `Dockerfile`"*), pruébalo:
```bash
node server.js
```
y luego fusiona:
```bash
git add .
git commit -m "feat: web Hola mundo con Express + Dockerfile"
git checkout main
git merge feature/hola-mundo
git push
```

### Fase 3 — El agente gestiona el flujo completo (7 min, versión completa)
**Decir:** "Y para cerrar, le delegamos también la gestión de la rama: que la cree él, añada algo visual, y tras nuestra revisión, la suba."
**Hacer:** prompt literal a Claude:
```
Crea una nueva rama llamada feature/estilo, añade algo visual a la página (un poco de CSS o un mensaje más elaborado), y espera a que yo lo revise antes de hacer commit y push.
```
Cuando el agente muestre el resultado y pida confirmación, revísalo en voz alta con la clase y responde "adelante, haz commit y push" para que complete el flujo.

**Placeholder importante para decir en voz alta (viene en la slide siguiente, 26):** *"Todo esto se lo podemos pedir directamente al agente de una vez, pero es recomendable hacerlo paso a paso al principio para mantener el control del repo — con la práctica vais delegando más, como en esta Fase 3."*

---

## Versión corta (20 min) vs versión completa (30 min)

| Bloque | Corta | Completa |
|---|---|---|
| Fase 1 — estructura | 6 min | 8 min |
| Fase 2 — feature branch | 9 min | 10 min |
| Fase 3 — agente gestiona todo | ❌ se omite, solo se explica de palabra | 7 min |
| Cierre / preguntas | 5 min | 5 min |

Si vas corto, haz **Fase 1 + Fase 2** en directo (son las que enseñan el hábito fundamental: commit en main solo tras revisar en una rama) y resume la Fase 3 verbalmente: *"con más práctica, el propio agente puede crear la rama, hacer el cambio y esperar vuestro visto bueno antes de subir — lo veréis en la slide siguiente"*.

## Qué hacer si algo falla

- **El agente genera algo distinto a lo esperado (versión de Express, estructura distinta):** no pasa nada, es una demo de flujo de Git, no de código exacto — sigue adelante con lo que haya generado.
- **Conflicto de merge inesperado en `git merge feature/hola-mundo`:** aprovéchalo como ejemplo real en vivo de por qué se trabaja en ramas, resuélvelo con `git status` + edición manual sin pánico.
- **Falta de tiempo:** salta directamente a la Fase 3 si el grupo ya domina Git de antes (pregúntalo en la pausa interactiva de la slide 17, justo antes de esta demo) y dedica menos tiempo a la Fase 1.

## Vuelta a las slides

Retoma en la slide 26 (`FLUJO DIARIO CON GIT + IA — El ritual que repetirás cada día`). Recuerda: **no borres `~/curso-ia/hola-mundo-express/`**, la retomarás en el Módulo 4 (demo de DevContainers).
