# Guion — Demo en vivo 2: "Claude genera su propio CLAUDE.md"

**Módulo:** 04 · Construyendo un Entorno Optimizado para IA (4 horas totales)
**Slide:** 13 — caption `DEMO EN VIVO · 02`
**Duración recomendada:** 8 min (versión corta) / 10 min (versión completa)
**Objetivo pedagógico:** que el alumno vea que el `CLAUDE.md` no se escribe a mano desde cero — se le pide al propio agente, que ya conoce el proyecto porque lo acaba de explorar.

**Requisito de continuidad:** sigue sobre `hola-mundo-express`, ahora con `.devcontainer/` (demo anterior).

---

## Antes de empezar

- [ ] Continúa con el mismo proyecto abierto (dentro o fuera del DevContainer, no importa para esta demo).
- [ ] Ten ya vistas las slides 10-12 (qué es CLAUDE.md, las 5 secciones clave, ejemplo real) — esta demo da por hecho que la clase ya sabe qué debería contener.

## Qué decir antes de saltar al escritorio

> "No vamos a escribir el CLAUDE.md a mano. Se lo pedimos a Claude, que ya conoce el proyecto porque lo acaba de tocar en la demo anterior."

---

## Guion paso a paso

### Paso único — El prompt (6-8 min)
**Decir:** "Fijaos que el prompt no solo pide 'genera un CLAUDE.md genérico' — le damos reglas concretas de cómo queremos trabajar."

**Hacer:** prompt literal en Claude Code:
```
Genera el CLAUDE.md para el proyecto hola-mundo-express. Incluye el stack real, la convención de commits que hemos visto y estas dos reglas: 1) antes de cualquier cambio al Dockerfile explícame el plan, 2) mantén el CHANGELOG.md actualizado.
```

Mientras Claude genera el archivo, ve señalando en voz alta lo que va apareciendo:
- *"Mirad, ha leído el proyecto antes de escribir nada — sabe que es Express, que tiene Dockerfile, que usamos DevContainers."*
- *"Aquí están las dos reglas que le hemos pedido, ya integradas como si fueran parte del proyecto desde el principio."*

Abre el `CLAUDE.md` generado y léelo en voz alta, comparándolo con las 5 secciones de la slide 11.

**Cierre importante — demuéstralo en el momento:** pide a Claude que toque el `Dockerfile` (p. ej. "cambia la imagen base de Node a la versión 20") y comprueba en voz alta que, por la regla 1 que le acabáis de dar, **primero os explica el plan antes de tocar el archivo**. Esto es la prueba de que el CLAUDE.md no es un documento decorativo — cambia el comportamiento real del agente.
```
Cambia la imagen base de Node en el Dockerfile a la versión 20.
```

---

## Versión corta (8 min) vs versión completa (10 min)

| Bloque | Corta | Completa |
|---|---|---|
| Prompt de generación + lectura del resultado | 5 min | 6 min |
| Prueba de la regla 1 (cambio al Dockerfile) | 3 min | 4 min |

Si vas muy corto, omite la prueba final de la regla 1 y dilo de palabra: *"si ahora le pidiera que tocase el Dockerfile, por la regla que le hemos dado, primero me explicaría el plan — os lo enseño con calma en la demo del Módulo 6."* Pero si puedes, **haz siempre la prueba final** — es el momento que más convence a la clase de que el CLAUDE.md "funciona de verdad".

## Qué hacer si algo falla

- **Claude no aplica la regla 1 al pedirle el cambio de Dockerfile:** no pasa nada, coméntalo como aprendizaje real: *"esto nos enseña que las reglas del CLAUDE.md son una guía fuerte, no una orden absoluta — hay que revisar igualmente"*. Es un matiz honesto y válido para la clase.

## Vuelta a las slides

Retoma en la slide 14 (quote: "El mismo prompt produce resultados completamente distintos...").
