#!/usr/bin/env bash
# generate-pdfs.sh — Genera un PDF por módulo del deck indicado
# Uso directo:  bash tools/generate-pdfs.sh [nombre-del-curso]
# Desde VSCode: ejecutar el task "Generar PDFs — seleccionar deck"
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DECK_DIR="$ROOT/deck"
PDF_DIR="$ROOT/pdfs"
PORT=8731

# ── verificar dependencias ─────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo "❌  Node.js no encontrado. Instálalo para usar este script."
  exit 1
fi

# ── localizar Chrome del sistema ───────────────────────────────────────────────
chrome=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$(command -v google-chrome 2>/dev/null || true)" \
  "$(command -v chromium 2>/dev/null || true)"; do
  [[ -x "$candidate" ]] && chrome="$candidate" && break
done

if [[ -z "$chrome" ]]; then
  echo "❌  Chrome o Chromium no encontrado en las rutas habituales."
  echo "    Instala Google Chrome en /Applications/ y vuelve a intentarlo."
  exit 1
fi

# ── leer cursos disponibles ────────────────────────────────────────────────────
courses=()
while IFS= read -r dir; do
  courses+=("$(basename "$dir")")
done < <(find "$DECK_DIR" -mindepth 1 -maxdepth 1 -type d | sort)

if [[ ${#courses[@]} -eq 0 ]]; then
  echo "❌  No se encontraron cursos en $DECK_DIR"
  exit 1
fi

# ── selección del deck ─────────────────────────────────────────────────────────
selected="${1:-}"

if [[ -z "$selected" ]]; then
  CYAN=$'\033[1;36m'
  BOLD=$'\033[1m'
  RESET=$'\033[0m'
  DIM=$'\033[2m'

  echo ""
  echo "${BOLD}  Selecciona el deck a exportar${RESET}"
  echo ""
  for i in "${!courses[@]}"; do
    printf "  ${CYAN}%2d${RESET}  %s\n" "$((i+1))" "${courses[$i]}"
  done
  echo ""

  while true; do
    printf "  ${DIM}Número [1-${#courses[@]}]:${RESET} "
    read -r choice
    if [[ "$choice" =~ ^[0-9]+$ ]] && (( choice >= 1 && choice <= ${#courses[@]} )); then
      selected="${courses[$((choice-1))]}"
      break
    fi
    echo "  Número inválido."
  done
fi

# ── verificar que el curso existe ──────────────────────────────────────────────
if [[ ! -d "$DECK_DIR/$selected" ]]; then
  echo "❌  No existe deck/$selected/"
  exit 1
fi

echo ""
echo "▶  Deck: $selected"
echo "   Chrome: $(basename "$chrome")"

# ── módulos del curso ──────────────────────────────────────────────────────────
module_paths=()
while IFS= read -r dir; do
  module_paths+=("$dir")
done < <(find "$DECK_DIR/$selected" -mindepth 1 -maxdepth 1 -type d | sort)

if [[ ${#module_paths[@]} -eq 0 ]]; then
  echo "❌  No hay módulos en deck/$selected/"
  exit 1
fi

echo "   Módulos: ${#module_paths[@]}"
echo ""

# ── servidor HTTP local ────────────────────────────────────────────────────────
server_pid=""
if ! nc -z localhost "$PORT" 2>/dev/null; then
  echo "   Iniciando servidor en http://localhost:$PORT …"
  python3 -m http.server "$PORT" -d "$ROOT" &>/dev/null &
  server_pid=$!
  sleep 1
  echo "   Servidor listo"
  echo ""
fi

cleanup() { [[ -n "${server_pid:-}" ]] && kill "$server_pid" 2>/dev/null || true; }
trap cleanup EXIT

# ── generar PDFs ───────────────────────────────────────────────────────────────
out_dir="$PDF_DIR/$selected"
mkdir -p "$out_dir"
ok=0
fail=0

echo "   Exportando módulos…"
echo ""

for module_path in "${module_paths[@]}"; do
  module=$(basename "$module_path")
  url="http://localhost:$PORT/deck/$selected/$module/?export=1"
  out="$out_dir/$module.pdf"

  # Contar slides reales para que decktape no cicle indefinidamente
  slide_count=$(grep -c '<section class="slide' "$module_path/index.html" 2>/dev/null || echo 60)

  printf "   %-44s" "$module"

  if PUPPETEER_EXECUTABLE_PATH="$chrome" \
     npx --yes decktape@3 generic \
       --slides "1-${slide_count}" \
       --size 1920x1080 \
       --load-pause 2000 \
       "$url" "$out" \
       >/dev/null 2>&1; then
    echo "✓"
    ((ok++)) || true
  else
    echo "✗"
    ((fail++)) || true
  fi
done

# ── resumen ────────────────────────────────────────────────────────────────────
echo ""
echo "─────────────────────────────────────────────────────"
printf "   ✓ %-3d generados    ✗ %-3d errores\n" "$ok" "$fail"
echo "   Ruta: $out_dir"
echo "─────────────────────────────────────────────────────"
echo ""

[[ $ok -gt 0 ]] && command -v open &>/dev/null && open "$out_dir" || true
