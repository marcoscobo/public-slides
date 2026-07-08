# Guion — Demo en vivo 1: "Crea tu cuenta en GitHub y tu primer repositorio"

**Módulo:** 03 · Colaboración (3 horas totales)
**Slide:** 16 — caption `DEMO EN VIVO · PAUSA`
**Duración recomendada:** 15 min (versión corta) / 20 min (versión completa)
**Objetivo pedagógico:** que cada alumno tenga, al salir de esta pausa, una cuenta de GitHub creada y su primer repositorio clonado localmente. Es una demo + tiempo de práctica guiada, no solo una demostración pasiva.

---

## Antes de empezar

- [ ] Ten Git instalado y verificado en tu máquina de demo (`git --version`).
- [ ] Ten ya una cuenta de GitHub de prueba (o usa la tuya real) para no exponer credenciales reales en el proyector — si usas la tuya, considera tener 2FA con código de respaldo a mano.
- [ ] Ten preparados los dos caminos (A y B) para poder elegir cuál mostrar según cómo veas a la clase de perdida.

## Qué decir antes de saltar al escritorio

> "Esta parte es distinta: no solo miráis, la hacéis conmigo. Sacad el portátil, abrid github.com, y vamos creando la cuenta y el primer repo a la vez. Os doy dos caminos, elegid el que os resulte más cómodo."

---

## Guion paso a paso

### Camino A — GitHub primero (recomendado para quien nunca ha usado Git)
1. **Decir:** "Si nunca habéis tocado GitHub, empezad por la web."
2. **Hacer:** en github.com → "New repository" → nombre `my-first-repo` → crear.
3. En terminal:
   ```bash
   git clone <url-del-repo>
   cd my-first-repo
   code .
   ```
4. Crea un archivo cualquiera (`touch nota.txt`), y:
   ```bash
   git add .
   git commit -m "primer commit"
   git push
   ```
5. Refresca la página del repo en GitHub y muestra el archivo ya subido.

### Camino B — Terminal primero (para quien ya conoce comandos básicos)
1. **Decir:** "Si os sentís más cómodos en terminal, empezáis al revés."
2. **Hacer:**
   ```bash
   git init my-first-repo
   cd my-first-repo
   touch nota.txt
   git add .
   git commit -m "primer commit"
   ```
3. Crea el repo vacío en GitHub (sin README, sin .gitignore) y copia la URL.
4. ```bash
   git remote add origin <url-del-repo>
   git push -u origin main
   ```

### Tiempo de práctica guiada (parte central de esta pausa)
**Decir:** "Ahora os toca a vosotros. Tenéis unos minutos para crear vuestra cuenta si no la teníais y replicar cualquiera de los dos caminos. Yo circulo por la sala para quien se atasque."
Camina por el aula (o abre el chat/canal si es online) resolviendo bloqueos individuales: la mayoría de problemas en este punto son de autenticación (SSH key / token de acceso personal), ten preparado el comando de ayuda:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```
y el enlace a la [documentación de tokens de GitHub](https://docs.github.com/es/authentication) por si alguien necesita generarlo en directo.

---

## Versión corta (15 min) vs versión completa (20 min)

| Bloque | Corta | Completa |
|---|---|---|
| Explicar los 2 caminos | 3 min | 5 min |
| Hacer tú uno de los dos en directo (elige el Camino A, es el más intuitivo) | 5 min | 7 min |
| Tiempo de práctica guiada del alumnado | 6 min | 7 min |
| Resolver dudas de autenticación | incluido arriba | 1 min extra si hace falta |

Si vas muy corto de tiempo, haz **solo el Camino A** en directo y deja el Camino B únicamente como referencia en la slide (ya está documentado ahí con los comandos exactos) — di: *"el Camino B está en la slide con los mismos pasos, usadlo si preferís terminal"*.

## Qué hacer si algo falla

- **Alguien no puede hacer push por falta de token/SSH:** no bloquees a toda la clase por un caso individual — dile que continúe mirando y lo resolvéis en el descanso.
- **El wifi del aula va lento para crear cuentas en directo:** adelanta que "quien no llegue a crear la cuenta ahora, lo hace de deberes antes de la próxima sesión, no es bloqueante para seguir hoy".

## Vuelta a las slides

Retoma en la slide 17 (`PAUSA · PREGUNTA AL GRUPO — ¿Has usado alguna vez Git?`).
