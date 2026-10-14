# Guion — Demo en vivo: "Del asistente al agente"

**Módulo:** 01 · Introducción (2 horas totales)
**Slide:** 08b — caption `DEMO EN VIVO` (justo después de "Ecosistema · 2026")
**Duración recomendada:** 10 min (versión corta) / 15 min (versión completa)
**Objetivo pedagógico:** que el alumno VEA con sus propios ojos la diferencia entre un asistente conversacional (responde) y un agente (actúa sobre el sistema de archivos), antes de que se lo sigas explicando en teoría.

---

## Antes de empezar (preparar en el descanso previo o la noche antes)

- [ ] Ventana de navegador con sesión iniciada en **claude.ai** (pestaña 1) y en **gemini.google.com** (pestaña 2).
- [ ] **App de escritorio de Claude** abierta en la pestaña **Code**, sobre una carpeta vacía de prueba (p. ej. `~/demo-m01/`).
- [ ] **IDE de Antigravity** instalado y abierto sobre la misma carpeta o una copia limpia.
- [ ] Cierra cualquier proyecto real para no confundir a la clase con archivos que no vienen al caso.
- [ ] Ten la carpeta `~/demo-m01/` vacía o borrada de una ejecución anterior — si ya existe un `README.md` de una demo previa, bórralo antes de entrar en clase para que el "antes/después" se note.

## Qué decir antes de saltar al escritorio

> "Antes de seguir, quiero que veáis la diferencia entre estas dos categorías con vuestros propios ojos, no solo en una slide. Dejo de compartir las slides un momento."

Cambia a compartir pantalla completa del escritorio (o la ventana del navegador + la app de Claude).

---

## Guion paso a paso

### Paso 1 — Asistente (Claude.ai o Gemini)

**Qué decir:**

> "Esto es un asistente: converso con él, me responde, pero no toca nada de mi ordenador."

**Qué hacer:**

1. Ve a la pestaña de Claude.ai.
2. Escribe literalmente: `¿Cómo se crea una API REST con Node.js?`
3. Deja que responda. Señala en voz alta: *"Fijaos: me da una explicación y ejemplos de código, pero no ha creado ningún archivo, no ha tocado mi proyecto. Yo tendría que copiar y pegar."*

### Paso 2 — Agente (Claude Code o Antigravity)

**Qué decir:**

> "Ahora, lo mismo pero dándole una instrucción a un agente."

**Qué hacer:**

1. Cambia a la app de Claude, pestaña **Code**, con la carpeta `~/demo-m01/` seleccionada.
2. Escribe literalmente: `Crea un archivo README.md con una descripción de este proyecto`
3. Deja que ejecute. Cuando termine, enseña los archivos creados en el diff de la app y abre el `README.md` generado.
4. Señala en voz alta: *"Ha decidido solo qué escribir, ha creado el archivo de verdad en mi disco. Esto es actuar, no solo responder."*

---

## Qué hacer si algo falla

- **Si Claude Code tarda o da un error de red:** ten preparado de antemano un `README.md` ya generado en una carpeta paralela (`~/demo-m01-backup/`) y muestra ese resultado explicando que es el mismo que acabas de pedir.
- **Si no hay wifi de aula fiable:** salta directamente a mostrar capturas de pantalla (prepara 2 capturas: respuesta de Claude.ai y el README generado por Claude Code) en vez de hacerlo en vivo.

## Vuelta a las slides

Al terminar, di: *"Volvemos a las slides"*, deja de compartir el escritorio y retoma en la slide 09 (`CAPACIDADES REALES · 2026`).
