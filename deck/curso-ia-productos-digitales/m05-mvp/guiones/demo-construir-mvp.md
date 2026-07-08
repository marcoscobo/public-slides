# Guion — Demo en vivo: "Construyendo el MVP con Claude"

**Módulo:** 05 · Diseño y Construcción de un MVP (4 horas totales)
**Slides:** 08 (`PAUSA · ACTIVIDAD` — preparación, 10 min) y 20 (`DEMO EN VIVO` — construcción) + check-in intermedio en la slide 19
**Duración recomendada:** 10 min (prep) + 35 min (versión corta de la demo) / 10 min (prep) + 75 min (versión completa con 4 ciclos)
**Objetivo pedagógico:** que la clase viva el ciclo iterativo completo (requisito → prompt → revisión → ejecución → commit) las veces suficientes para interiorizarlo como hábito, no como teoría.

Esta es la demo central del curso — la más larga y la que más presupuesto de tiempo necesita. Léete el guion entero antes del módulo, no solo el bloque que vayas a usar en clase.

---

## Antes de empezar

- [ ] Decide de antemano la idea de MVP que vas a construir tú en la demo (recomendado: un tablero Kanban simple — "crear tarea", "ver tablero", "marcar completada/pendiente", "eliminar tarea" — es lo bastante pequeño para completarse en clase y lo bastante vistoso para que se note el progreso).
- [ ] Ten preparado el proyecto base con Next.js ya iniciado (`npx create-next-app@latest`) y una cuenta de Vercel Postgres lista, para no perder los primeros 10 minutos en el "scaffold" — la demo empieza con el proyecto ya arrancando, no desde `npx create-next-app` en directo (eso ya se explicó en módulos anteriores).
- [ ] Ten Vercel conectado a un repo de prueba de antemano (lo desplegarás de verdad en el Módulo 6, aquí basta con tenerlo listo en local).
- [ ] Anota mentalmente 4 "features" a construir en 4 ciclos: (1) crear tarea, (2) ver tablero, (3) marcar completada, (4) eliminar tarea — cada una es un ciclo completo de principio a fin.

## Parte 1 — Preparación (slide 08, 10 minutos, ANTES de la demo)

**Qué decir:**
> "Antes de que yo construya nada, cada uno de vosotros define su propia idea. Vais a usar estos requisitos en la parte 2, cuando yo construya un MVP en directo — vosotros seguiréis el mismo patrón por vuestra cuenta después."

**Qué hacer (actividad del alumnado, tú circulas resolviendo dudas):**
1. Elige un problema que conozcas bien (1 frase).
2. Escribe 3-4 user stories: *"Como [usuario], quiero [funcionalidad], para [beneficio]"*.
3. Marca cuáles son MVP y cuáles son backlog (repásalo con la slide 05 de scope si alguien duda).
4. Prepara el prompt inicial que le darías a Claude.

**Cronómetro en pantalla o verbal:** avisa a los 5 minutos ("mitad de tiempo") y a los 9 minutos ("último minuto, cerrad la idea aunque no esté perfecta").

## Check-in intermedio (slide 19, justo antes de la demo, ~2 min)
Pregunta rápida a mano alzada: *"¿Quién tiene una idea clara? ¿Quién tiene varias y no sabe cuál? ¿Quién tiene un boceto que no sabe si es viable? ¿Quién no tiene ninguna aún?"* — esto te dice si necesitas ir más despacio explicando el "por qué" durante la demo o si puedes ir directo al "cómo".

---

## Parte 2 — La demo (slide 20)

### El ciclo que vas a repetir cada vez
1. **Requisito** — enuncia la feature en una frase.
2. **Prompt** — pídesela a Claude en lenguaje natural.
3. **Revisión** — lee el plan/código antes de aceptar.
4. **Ejecución** — deja que Claude implemente.
5. **Commit** — guarda el avance.

### Ciclo 1 — Crear tarea (15-20 min la primera vez, incluye arrancar el proyecto)
**Decir:** "Primer ciclo, el más largo porque montamos la base de datos."
**Prompt:**
```
Necesito una tabla "tasks" en la base de datos (Vercel Postgres) con: id, título, estado (pendiente/completada) y fecha de creación. Crea también una API route para insertar una tarea nueva y un formulario simple en la página principal para crear tareas.
```
Revisa el plan antes de confirmar, ejecuta, prueba en el navegador creando una tarea real, y:
```bash
git add . && git commit -m "feat: crear tarea"
```

### Ciclo 2 — Ver tablero (8-12 min)
**Prompt:**
```
Añade a la página principal una lista que muestre todas las tareas guardadas en la base de datos, ordenadas por fecha de creación descendente.
```
Prueba, commit: `git commit -m "feat: ver tablero de tareas"`.

### Ciclo 3 — Marcar completada/pendiente (8-12 min)
**Prompt:**
```
Añade un checkbox o botón a cada tarea de la lista para marcarla como completada o pendiente, actualizando el estado en la base de datos.
```
Prueba, commit: `git commit -m "feat: marcar tarea completada"`.

### Ciclo 4 — Eliminar tarea (8-12 min, solo versión completa)
**Prompt:**
```
Añade un botón para eliminar una tarea de la lista y de la base de datos, con una confirmación antes de borrar.
```
Prueba, commit: `git commit -m "feat: eliminar tarea"`.

### Cierre de la demo (2-3 min)
**Decir:** "En un módulo de 4 horas hemos construido 4 features completas, con base de datos real, en menos de una hora y media. Esto es lo que cambia con IA: no es que programe más rápido, es que el ciclo completo —pensar, pedir, revisar, ejecutar— se comprime."

---

## Versión corta (35 min, 2 ciclos) vs versión completa (75 min, 4 ciclos)

| Bloque | Corta | Completa |
|---|---|---|
| Ciclo 1 (crear tarea + arranque) | 20 min | 20 min |
| Ciclo 2 (ver tablero) | 12 min | 10 min |
| Ciclo 3 (marcar completada) | ❌ se omite, se explica de palabra | 12 min |
| Ciclo 4 (eliminar tarea) | ❌ se omite | 12 min |
| Cierre | 3 min | 3 min |

**Regla de decisión en directo:** si al terminar el Ciclo 2 ves que vas muy justo de tiempo, para ahí y di: *"con estos dos ciclos ya habéis visto el patrón completo — los ciclos 3 y 4 son exactamente lo mismo, cambiando el requisito. Los tenéis detallados para replicarlos vosotros"*. No sacrifiques calidad de explicación por hacer los 4 ciclos a toda prisa — es preferible hacer 2 bien que 4 corriendo.

## Qué hacer si algo falla

- **La conexión a Vercel Postgres falla en directo (a menudo el problema real de esta demo):** ten preparada de antemano una versión con los 4 ciclos ya completados en un proyecto paralelo, y si el directo se atasca más de 3-4 minutos en un solo problema, cambia a mostrar ese resultado ya construido explicando qué se hizo en cada paso.
- **Claude genera una implementación distinta a la esperada (usa otra librería, otra estructura):** no lo corrijas en directo salvo que rompa la demo — es la naturaleza real de trabajar con IA, coméntalo: *"esto es exactamente lo que os vais a encontrar vosotros: el resultado exacto varía, el proceso no"*.
- **Si vas muy sobrado de tiempo:** añade un 5º ciclo improvisado pidiendo algo estético (*"añade una barra de progreso con el % de tareas completadas"*) — es un buen cierre visual.

## Vuelta a las slides

Retoma en la slide 21 (`IMPACTO REAL — Con IA vs sin IA`).
