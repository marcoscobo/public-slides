# Guion — Demo en vivo 1: "De cero a URL pública en Vercel en directo"

**Módulo:** 06 · Despliegue, Evolución y Mantenimiento (2 horas totales)
**Slide:** 09 — caption `DEMO EN VIVO`
**Duración recomendada:** 15 min (versión corta) / 20 min (versión completa)
**Objetivo pedagógico:** el momento más satisfactorio del curso — ver el MVP del Módulo 5 (o el `hola-mundo-express` si no llegasteis al MVP) funcionando en una URL pública, accesible desde cualquier sitio.

**Requisito de continuidad:** usa el proyecto del Módulo 5 (el MVP) si está desplegable; si no, usa `hola-mundo-express`. Decide cuál ANTES de clase y prepáralo.

---

## Antes de empezar

- [ ] Ten una cuenta de Vercel creada de antemano y conectada a tu GitHub.
- [ ] Ten el proyecto a desplegar con sus variables de entorno identificadas (si usa Vercel Postgres del Módulo 5, la base de datos debe existir ya).
- [ ] Prueba TÚ el despliegue completo la noche anterior al menos una vez — este es el momento con más piezas externas (GitHub, Vercel, DNS) que pueden fallar en directo.
- [ ] Ten el móvil a mano y cargado — el cierre de esta demo es abrir la URL desde el móvil ante la clase.

## Qué decir antes de saltar al escritorio

> "Le pedimos a Claude que prepare el repositorio para Vercel antes de hacer el primer deploy. Este es el momento en que todo lo que hemos construido en el curso deja de vivir solo en nuestro portátil."

---

## Guion paso a paso

### Paso 1 — Preparar el repo (3 min)
**Prompt a Claude:**
```
Prepara este proyecto Next.js para desplegarlo en Vercel. Asegúrate de que vercel.json y el entorno estén listos.
```

### Paso 2 — Cuenta y conexión (3 min)
**Hacer:** vercel.com → si no tienes cuenta, "Sign up with GitHub" (evita hacerlo en directo si ya la tienes, ahorra tiempo — solo muéstralo si hay tiempo de sobra).

### Paso 3 — Import Project (3 min)
**Hacer:** Vercel Dashboard → "Add New" → "Project" → selecciona el repo del curso en la lista de GitHub.

### Paso 4 — Variables de entorno (3 min)
**Decir:** "Aquí es donde van las claves de la base de datos — nunca en el código, las vimos en el Módulo 3."
**Hacer:** en la pantalla de configuración del import, añade las variables necesarias (p. ej. `POSTGRES_URL` si usas Vercel Postgres).

### Paso 5 — Primer deploy (3-5 min)
**Hacer:** clic en "Deploy" y muestra los build logs en directo mientras corren. Narra lo que va apareciendo: *"detectando el framework... instalando dependencias... compilando..."*

### Paso 6 — Probar y redeploy (3 min)
**Hacer:** abre la URL pública generada (`https://tuapp.vercel.app`). Haz un cambio pequeño y visible en el código (p. ej. un texto del título), y:
```bash
git add . && git commit -m "fix: update title" && git push
```
Muestra el dashboard de Vercel detectando el push y desplegando automáticamente — suele tardar 1 minuto.

### ★ Momento especial (obligatorio si puedes)
Cuando el redeploy termine, **abre la URL en tu móvil delante de la clase**. Es el cierre visual más potente del curso: de código en el portátil a una app real en el bolsillo, en menos de 30 minutos de curso.

---

## Versión corta (15 min) vs versión completa (20 min)

| Bloque | Corta | Completa |
|---|---|---|
| Preparar repo + cuenta/conexión (si ya tenías cuenta, se omite parte) | 3 min | 6 min |
| Import + variables de entorno | 4 min | 6 min |
| Primer deploy + ver logs | 4 min | 5 min |
| Cambio + push + redeploy + móvil | 4 min | 3 min |

Si vas corto, **ten el proyecto ya importado en Vercel de antemano** (salta el paso 3) y empieza directamente mostrando el primer deploy — menciona de palabra que "importar el proyecto es un botón, 'Add New → Project', y seleccionar el repo".

## Qué hacer si algo falla

- **El build falla en Vercel por una variable de entorno olvidada:** apunta el error en voz alta y corrígelo en directo — es un ejemplo real y valioso de depuración de despliegue, no lo escondas.
- **El wifi del aula va lento y el deploy tarda mucho:** ten preparado un despliegue YA HECHO de antemano (misma app, otra URL) y muestra ese mientras el directo termina en segundo plano: *"mientras esto termina, os enseño cómo queda ya desplegado"*.
- **No tienes cobertura móvil en el aula para el momento especial:** usa el wifi del aula en el móvil, o si tampoco hay, sáltate el momento móvil y muestra la URL en una segunda pestaña del navegador como alternativa.

## Vuelta a las slides

Retoma en la slide 10 (`CAPÍTULO 03 — CI/CD y gestión de cambios`).
