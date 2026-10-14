# Guion — Demo en vivo: "Stack completo: de cero a producción"

**Módulo:** 02 · Configuración del Entorno de Desarrollo (3 horas totales)
**Slide:** 24 — caption `DEMO EN VIVO` (tras la pausa interactiva "¿Qué te resulta más nuevo?")
**Duración recomendada:** 25 min (versión corta) / 45 min (versión completa)
**Objetivo pedagógico:** que cada alumno termine la sesión con Docker + VS Code + un agente de IA (Claude Code o Antigravity) instalados y funcionando, habiendo visto el flujo completo una vez de principio a fin.

Esta es la demo más "operativa" del curso: no es solo mirar, es que la clase instale a la vez que tú. Va después de las slides de instalación paso a paso (11, 14, 20, 21), así que cuando llegues aquí la mayoría ya debería tener Docker y VS Code instalados — esta demo es la **integración final** y el margen para quien se haya quedado atrás.

---

## Antes de empezar

- [ ] Comprueba tu propia máquina la noche antes: desinstala o renombra temporalmente cualquier carpeta `demo-hola-mundo` de una ejecución anterior.
- [ ] Ten descargados de antemano (en una memoria USB o carpeta local) los instaladores de Docker Desktop y VS Code para Windows/Mac, por si el wifi del aula va lento — así puedes ofrecerlos a quien no consiga descargar en directo.
- [ ] Ten la app de escritorio de Claude (con sesión Pro/Max iniciada) y el IDE de Antigravity (con sesión de Google iniciada) ya instalados en tu máquina de demo. No los reinstales en directo: los pasos están en las slides 20 y 21.
- [ ] Avisa al inicio de la sesión (o en el descanso previo) de que en esta parte necesitan su portátil con permisos de administrador para instalar software.

## Qué decir antes de saltar al escritorio

> "Esta va a ser la demo más larga del módulo. Vamos a hacer, juntos, el camino completo: instalar Docker, instalar VS Code, tener un agente de IA funcionando, y levantar la primera web en un contenedor. Id siguiéndome en vuestro propio portátil, pero si os quedáis atrás en algún paso, no os paréis a resolverlo ahora — seguid mirando y lo resolvemos luego uno a uno."

---

## Guion paso a paso (versión completa, 45 min)

### Paso 1 — Docker (10 min)

**Decir:** "Empezamos por la base: sin Docker no hay entorno reproducible."
**Hacer:** abre Docker Desktop ya instalado, muestra el icono en la barra de tareas/menú, ejecuta en terminal:

```bash
docker --version
docker run hello-world
```

Señala la salida "Hello from Docker!" como prueba de que el motor funciona.

### Paso 2 — VS Code (5 min)

**Decir:** "Aquí podéis usar el editor que queráis. VS Code es donde veremos y revisaremos el código que genere el agente."
**Hacer:** abre VS Code sobre una carpeta nueva `demo-hola-mundo/` y enseña el explorador de archivos vacío.

### Paso 3 — Agente de IA (5 min)

**Decir:** "Ahora el agente. Os lo enseño con la app de escritorio de Claude; si no tenéis plan de pago de Claude, el mismo flujo es idéntico con Antigravity."
**Hacer:** abre la app de Claude, pulsa la pestaña **Code**, elige **Local** y selecciona la carpeta `demo-hola-mundo/`.

Confirma que la sesión está lista (cuadro de prompt activo sobre la carpeta).

> Si alguien prefiere la terminal: `claude` dentro de la carpeta hace lo mismo. No lo enseñes en directo salvo que te lo pidan.

### Paso 4 — Primera web en Docker (15 min)

**Decir:** "Ahora le vamos a pedir que monte un 'Hola mundo' con Node.js y lo meta en un contenedor."
**Hacer:** escribe literalmente en el cuadro de prompt de la pestaña Code:

```
Crea una aplicación web simple con Node.js y Express que muestre "Hola mundo" en el puerto 3000.
Incluye un Dockerfile para poder ejecutarla en un contenedor.
Ademas dime los comandos necesarios para desplegar el contenedor cuando este listo.
```

Cuando termine, revisa con la clase el diff de los archivos creados y, en la terminal integrada de VS Code:

```bash
docker build -t demo-hola-mundo .
docker run -p 3000:3000 demo-hola-mundo
```

Abre `localhost:3000` en el navegador y muestra el "Hola mundo" en vivo. Este es el momento "wow" de la demo — dale un segundo de silencio para que se note.

### Paso 5 — Repetir con Antigravity (10 min, solo versión completa)

**Decir:** "Y ahora, exactamente el mismo resultado, para quien use la capa gratuita de Google."
**Hacer:** abre el IDE de Antigravity sobre una carpeta distinta (`demo-hola-mundo-antigravity/`) y repite el paso 4 en el panel del agente con el mismo prompt literal, para que la comparación sea limpia.

---

## Versión corta (25 min) — recorta aquí si vas justo de tiempo

| Bloque                                | Minutos                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Docker (`hello-world`)              | 3 min                                                                                                                    |
| VS Code (solo mostrar, sin detenerte) | 2 min                                                                                                                    |
| Agente de IA + prompt de la web       | 12 min                                                                                                                   |
| Ver el resultado en`localhost:3000` | 3 min                                                                                                                    |
| Antigravity                           | ❌ se omite — di: "el mismo flujo, letra por letra, funciona con Antigravity, lo veréis en las instrucciones escritas" |
| Cierre                                | 5 min                                                                                                                    |

La clave de la versión corta es **no repetir el flujo completo dos veces**: haces todo con Claude Code y solo mencionas que Antigravity sigue exactamente los mismos pasos (ya lo tienen por escrito en las slides de instalación 20-22).

## Qué hacer si algo falla

- **Docker no arranca en algún portátil (Windows sin WSL2, Mac muy antiguo):** no pares la demo por eso. Anota quién se ha quedado atrás y resuélvelo en el siguiente descanso o al final de la sesión, 1 a 1.
- **La generación del agente tarda o fluctúa el wifi:** ten preparado un proyecto `demo-hola-mundo` YA construido de una ejecución previa como backup, y si el directo falla, muestra ese resultado explicando "esto es literalmente lo que acaba de generar, os lo enseño ya construido para no perder tiempo".
- **Alguien pregunta por errores de puerto ocupado:** ten a mano el comando `docker ps` + `docker stop <id>` para liberar el puerto 3000 sin perder el hilo de la explicación.

## Vuelta a las slides

Cierra el navegador y las apps, retoma slides en la 25 (`BUENAS PRÁCTICAS · Variables de entorno y secretos`).
