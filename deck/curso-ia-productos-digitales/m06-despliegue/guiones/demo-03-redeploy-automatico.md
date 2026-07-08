# Guion — Demo en vivo 3: "Un cambio, un push, producción actualizada"

**Módulo:** 06 · Despliegue, Evolución y Mantenimiento (2 horas totales)
**Slide:** 21 — caption `DEMO EN VIVO`
**Duración recomendada:** 8 min (versión corta) / 10 min (versión completa)
**Objetivo pedagógico:** cierre práctico del módulo y del curso operativo — demostrar que, a partir de ahora, "mejorar el producto" es tan simple como cambiar código y hacer push. Es el último gesto técnico en vivo del curso antes del Módulo 7.

**Requisito de continuidad:** usa el mismo proyecto ya desplegado en la demo 1 de este módulo.

---

## Antes de empezar

- [ ] Ten el proyecto abierto en el editor, con el deploy de la demo 1 ya funcionando en producción.
- [ ] Decide de antemano QUÉ cambio visible vas a hacer (recomendado: cambiar un texto de la interfaz, como el título de la página o un mensaje de bienvenida) — algo que se note a simple vista al refrescar.

## Qué decir antes de saltar al escritorio

> "Cerramos el módulo con el gesto que vais a repetir cientos de veces a partir de ahora: cambiar algo, subirlo, y verlo en producción sin hacer nada más."

---

## Guion paso a paso

### Paso 1 — Cambiar el código (2 min)
**Hacer:** abre el archivo con el texto visible (p. ej. el título de la home) y cámbialo por algo notorio (p. ej. añade la fecha de hoy o el nombre de la clase).

### Paso 2 — Commit y push (2 min)
```bash
git add .
git commit -m "fix: update title"
git push
```

### Paso 3 — Observar el build en Vercel (3 min)
**Hacer:** abre el dashboard de Vercel y muestra el deployment disparándose automáticamente en tiempo real. Narra: *"no hemos tocado Vercel para nada, ha reaccionado solo al push"*.

### Paso 4 — Ver el cambio en producción (2 min)
**Hacer:** tras 1-2 minutos, refresca la URL pública (fuerza recarga sin caché, `Cmd/Ctrl+Shift+R`) y muestra el cambio ya visible en vivo.

**Cierre (decir):**
> "Esto es el ciclo completo del curso, en 10 segundos de trabajo real: cambiar, subir, ver el resultado en producción. Todo lo demás —Git, DevContainers, agentes, skills, MVP— existe para que este gesto final sea seguro y aburrido, en el buen sentido."

---

## Versión corta (8 min) vs versión completa (10 min)

| Bloque | Corta | Completa |
|---|---|---|
| Cambiar código | 1 min | 2 min |
| Commit + push | 1 min | 2 min |
| Ver build en Vercel | 3 min | 3 min |
| Ver resultado en producción + cierre | 3 min | 3 min |

Esta demo es ya muy ajustada; si vas extremadamente corto de tiempo al final del módulo, puedes fusionarla con el cierre de la demo 1 (haz el cambio y push justo después de mostrar la URL en el móvil, en la misma demo) y saltarte esta sección como bloque independiente — pero si tienes los 8 minutos, mantenla separada: es el mejor cierre emocional del módulo.

## Qué hacer si algo falla

- **El redeploy tarda más de 2 minutos:** sigue con la explicación de la slide siguiente mientras termina en segundo plano, y vuelve a mostrar el resultado en cuanto esté listo, aunque sea al principio del descanso.
- **El cambio no se ve por caché del navegador:** fuerza recarga sin caché o abre en ventana de incógnito — acláralo en voz alta para que la clase no piense que el despliegue falló.

## Vuelta a las slides

Retoma en la slide 22 (`FIN DEL MÓDULO 06 — Tu producto ya está en internet.`).
