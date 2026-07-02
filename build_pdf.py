#!/usr/bin/env python3
"""Genera el dossier de contenidos del curso 'Desarrollo de Productos Digitales con IA' en PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, ListFlowable, ListItem,
)

# ── Paleta AURORA ───────────────────────────────────────────
INK        = colors.HexColor("#0B0F1A")
INK_SOFT   = colors.HexColor("#131826")
VIOLET     = colors.HexColor("#7B4DFF")
CYAN       = colors.HexColor("#00D4FF")
AMBER      = colors.HexColor("#FFB627")
TEXT       = colors.HexColor("#1F2430")
MUTED      = colors.HexColor("#5B6070")
CREAM      = colors.HexColor("#F5EFE3")
LINE       = colors.HexColor("#D9D3C6")
CARD_BG    = colors.HexColor("#F7F4EC")

styles = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, **kw)

body = S("body", fontName="Helvetica", fontSize=10, leading=15, textColor=TEXT, spaceAfter=4)
h1 = S("h1", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=VIOLET, spaceBefore=16, spaceAfter=8)
h2 = S("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16, textColor=INK, spaceBefore=12, spaceAfter=5)
modtitle = S("modtitle", fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=colors.white)
modintro = S("modintro", fontName="Helvetica-Oblique", fontSize=9, leading=13, textColor=MUTED, spaceAfter=4)
bullet = S("bullet", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=TEXT)
lead = S("lead", fontName="Helvetica", fontSize=11, leading=17, textColor=TEXT, spaceAfter=6)
quote = S("quote", fontName="Helvetica-Oblique", fontSize=10.5, leading=16, textColor=INK)
small = S("small", fontName="Helvetica", fontSize=8.5, leading=12, textColor=MUTED)
cellk = S("cellk", fontName="Helvetica-Bold", fontSize=9.5, leading=13, textColor=INK)
cellv = S("cellv", fontName="Helvetica", fontSize=9.5, leading=13, textColor=TEXT)

story = []

# ── Portada / cabecera ──────────────────────────────────────
cover = Table([[Paragraph(
    '<font color="#FFFFFF" size="9"><b>DOSSIER DE CONTENIDOS · MATERIAL PARA DIFUSIÓN</b></font><br/><br/>'
    '<font color="#FFFFFF" size="23"><b>Desarrollo de Productos<br/>Digitales con IA</b></font><br/><br/>'
    '<font color="#00D4FF" size="11"><b>Formación online en directo · Microsoft Teams</b></font><br/>'
    '<font color="#F5EFE3" size="10">Dos primeras semanas de noviembre de 2026 · 20 horas · 7 módulos</font>',
    S("cov", fontName="Helvetica", leading=29))]], colWidths=[170*mm])
cover.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), INK),
    ("LEFTPADDING", (0, 0), (-1, -1), 18),
    ("RIGHTPADDING", (0, 0), (-1, -1), 18),
    ("TOPPADDING", (0, 0), (-1, -1), 22),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 22),
    ("LINEBELOW", (0, 0), (-1, -1), 3, VIOLET),
]))
story.append(cover)
story.append(Spacer(1, 10))

story.append(Paragraph(
    "<b>Aprende a construir, validar y desplegar un producto digital real usando IA generativa "
    "&mdash; sin ser desarrollador profesional.</b> En dos semanas pasas de una idea a un producto "
    "en Internet con URL pública.", lead))
story.append(HRFlowable(width="100%", thickness=0.7, color=LINE, spaceBefore=4, spaceAfter=8))

# ── Ficha técnica ───────────────────────────────────────────
story.append(Paragraph("Datos generales", h1))
ficha = [
    ["Título", "Desarrollo de Productos Digitales con IA"],
    ["Fechas", "Dos primeras semanas de noviembre de 2026"],
    ["Modalidad", "Online en directo vía Microsoft Teams"],
    ["Duración", "20 horas de formación práctica"],
    ["Estructura", "7 módulos · 7 demos en vivo · 1 proyecto real desplegado"],
    ["Formato", "Teórico-práctico con demos en directo y pausas interactivas"],
]
ft = Table([[Paragraph(k, cellk), Paragraph(v, cellv)] for k, v in ficha], colWidths=[32*mm, 138*mm])
ft.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), CARD_BG),
    ("LINEBELOW", (0, 0), (-1, -2), 0.5, LINE),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBEFORE", (0, 0), (0, -1), 2.5, VIOLET),
]))
story.append(ft)

def bullets(items, style=bullet):
    return ListFlowable(
        [ListItem(Paragraph(i, style), leftIndent=6, value="•") for i in items],
        bulletType="bullet", start="•", leftIndent=12, bulletColor=VIOLET, bulletFontSize=8,
    )

# ── A quién va dirigido / rol ──────────────────────────────
story.append(Paragraph("¿A quién va dirigido?", h1))
story.append(Paragraph(
    "Personas con <b>criterio de producto o de negocio</b> que quieren construir productos digitales "
    "sin depender de un equipo de ingeniería: emprendedores, product managers, consultores, "
    "profesionales que quieren automatizar procesos internos y freelancers. "
    "<b>No requiere saber programar</b>: se aprende a <i>dirigir</i> a la IA, no a escribir código a mano.", body))

story.append(Paragraph("El rol que se forma: &laquo;AI Product Developer&raquo;", h2))
story.append(Paragraph(
    "El hilo conductor del curso. Una sola persona asume lo que antes eran cinco roles &mdash; director de "
    "producto, maestro del prompt, árbitro de calidad, comunicador negocio-IA y desplegador autónomo. "
    "Define <b>qué</b> construir <i>y</i> lo construye, controlando el ciclo completo.", body))

# ── Objetivos ───────────────────────────────────────────────
story.append(Paragraph("Objetivos de aprendizaje", h1))
story.append(Paragraph("Al terminar el curso, el alumno será capaz de:", body))
story.append(bullets([
    "Entender qué puede y qué no puede hacer la IA generativa aplicada al desarrollo.",
    "Montar un entorno de desarrollo reproducible y moderno (Docker + IDE + agente de IA).",
    "Usar control de versiones (Git/GitHub) y organizar un proyecto profesionalmente.",
    "Configurar el proyecto para que la IA trabaje con autonomía (CLAUDE.md, agentes, skills).",
    "Diseñar y construir un MVP real mediante el ciclo iterativo con IA.",
    "Validar el producto sin necesidad de expertise técnica profunda.",
    "Desplegar en Internet con URL pública, CI/CD, monitorización y seguridad básica.",
    "Documentar y presentar su proyecto como un AI Product Developer.",
]))

# ── Programa por módulos ────────────────────────────────────
story.append(Paragraph("Programa por módulos", h1))

modules = [
    ("01", "Introducción al Desarrollo Asistido por IA", "Conceptual e inspiracional. Marco del curso.", [
        "El momento histórico: de &laquo;solo desarrolladores&raquo; al no-code y a la IA generativa.",
        "Qué es la IA generativa: tú diriges, la IA implementa.",
        "Ecosistema 2026: asistentes conversacionales (ChatGPT, Claude, Gemini, Copilot) vs. agentes autónomos (Claude Code, Codex, Antigravity).",
        "Capacidades reales y limitaciones (alucinaciones, contexto, deuda técnica).",
        "El ciclo de vida del producto digital: Idea &rarr; Diseño &rarr; Construcción &rarr; Validación &rarr; Despliegue.",
        "El nuevo rol del AI Product Developer y casos reales de éxito.",
    ]),
    ("02", "Configuración del Entorno de Desarrollo", "Operacional y práctico.", [
        "El problema del &laquo;en mi máquina funciona&raquo; y la solución del &laquo;entorno como código&raquo;.",
        "Stack base: Docker + VS Code + agente de IA (Claude Code o Antigravity).",
        "Docker en profundidad: imágenes, contenedores, Dockerfile, docker-compose.",
        "Instalación y verificación paso a paso en Windows, macOS y Linux.",
        "Buenas prácticas con secretos y variables de entorno (.env, .gitignore).",
        "Demo: instalar el stack completo y crear la primera web &laquo;Hola mundo&raquo;.",
    ]),
    ("03", "Fundamentos de Colaboración con IA", "«La IA no trabaja sola».", [
        "Control de versiones con Git: las 4 zonas, los comandos esenciales, .gitignore.",
        "Ramas y flujo de trabajo (Gitflow) para experimentar sin romper nada.",
        "GitHub, Conventional Commits y el pipeline de despliegue hacia Vercel.",
        "Demo: crear cuenta en GitHub y primer repositorio real.",
    ]),
    ("04", "Construyendo un Entorno Optimizado para IA", "Que la IA trabaje dentro del proyecto, no al lado.", [
        "DevContainers: proyecto reproducible con devcontainer.json.",
        "CLAUDE.md: el archivo de identidad y onboarding persistente del proyecto para la IA.",
        "Agentes especializados (arquitecto, implementador, tester, documentador).",
        "Skills personalizados: flujos de trabajo en un comando (/deploy, /review).",
        "Anatomía de un prompt efectivo: los 5 bloques.",
    ]),
    ("05", "Diseño y Construcción de un MVP", "El corazón práctico del curso.", [
        "Qué es (y qué NO es) un MVP; el riesgo del feature creep.",
        "Definir el producto: scope, user stories, momento mínimo de valor.",
        "El ciclo iterativo con IA (5 pasos, 15&ndash;45 min por ciclo).",
        "Validar sin saber código: 5 estrategias de validación.",
        "Arquitectura mínima (Next.js + base de datos + Vercel) y testing.",
        "Demo: construir un MVP con IA en tiempo real.",
    ]),
    ("06", "Despliegue, Evolución y Mantenimiento", "De local a producción.", [
        "Dónde desplegar: Vercel (recomendado), Railway, Render, autohospedado.",
        "Variables de entorno en producción y despliegue paso a paso.",
        "CI/CD: git push &rarr; build &rarr; deploy automático en minutos.",
        "Monitorización (UptimeRobot, Vercel Logs, Sentry) y seguridad desde el día uno.",
        "Demo: desplegar el proyecto en Vercel con URL pública real.",
    ]),
    ("07", "Proyecto Final y Cierre del Curso", "Demostración del ciclo completo.", [
        "Proyecto final: una demostración, no un examen.",
        "Entregable: Memoria del Proyecto (PDF de 1&ndash;2 páginas, 5 secciones).",
        "El futuro del rol: oportunidades (emprendimiento, carrera, empresa, freelance).",
        "Recursos para seguir aprendiendo y hoja de ruta de progresión.",
    ]),
]

for num, title, intro, points in modules:
    header = Table([[
        Paragraph(f'<font color="#00D4FF">{num}</font>', S("num", fontName="Helvetica-Bold", fontSize=18, leading=18, textColor=CYAN, alignment=TA_CENTER)),
        Paragraph(f"Módulo {num} &mdash; {title}", modtitle),
    ]], colWidths=[16*mm, 154*mm])
    header.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (0, 0), "CENTER"),
        ("LEFTPADDING", (0, 0), (0, 0), 4),
        ("RIGHTPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    block = [header, Spacer(1, 3), Paragraph(intro, modintro), bullets(points), Spacer(1, 8)]
    story.append(KeepTogether(block))

# ── Herramientas ────────────────────────────────────────────
story.append(Paragraph("Herramientas y tecnologías", h1))
story.append(bullets([
    "<b>Agentes de IA:</b> Claude Code (Anthropic) y Antigravity (Google), enseñados como equivalentes.",
    "<b>Entorno:</b> Docker / Docker Desktop, DevContainers, VS Code (u otro IDE moderno), Node.js.",
    "<b>Versionado y despliegue:</b> Git, GitHub, Vercel (+ alternativas Railway/Render).",
    "<b>Stack de producto:</b> Next.js, Vercel Postgres / Supabase, PostgreSQL.",
    "<b>Operación:</b> UptimeRobot, Sentry, variables de entorno, CI/CD.",
]))

# ── Metodología y entregable ───────────────────────────────
story.append(Paragraph("Metodología y entregable final", h1))
story.append(Paragraph(
    "Cada módulo combina <b>teoría breve + demo en vivo + pausa interactiva</b> (encuestas y discusión "
    "en Teams). El énfasis está en el proceso iterativo y en construir algo real: cada módulo deja un "
    "entregable concreto y todo confluye en el proyecto final desplegado.", body))
story.append(Paragraph(
    "El <b>entregable final</b> del alumno es la <b>Memoria del Proyecto</b> (PDF de 1&ndash;2 páginas) con "
    "cinco secciones: La Idea · Los Requisitos · Lo que Construiste · El Proceso con IA · Reflexión. "
    "Se valora el proceso y la honestidad, no la perfección.", body))

# ── Mensajes clave ──────────────────────────────────────────
story.append(Paragraph("Mensajes clave para material promocional", h1))
msgs = [
    "&laquo;De una idea a un producto en Internet en dos semanas.&raquo;",
    "&laquo;No aprendes a programar. Aprendes algo más difícil y valioso: definir qué construir, para quién y por qué.&raquo;",
    "&laquo;20 horas · 7 módulos · 1 producto real desplegado.&raquo;",
    "&laquo;El AI Product Developer no es el futuro, es el presente.&raquo;",
]
for m in msgs:
    q = Table([[Paragraph(m, quote)]], colWidths=[170*mm])
    q.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CARD_BG),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBEFORE", (0, 0), (0, -1), 2.5, CYAN),
    ]))
    story.append(q)
    story.append(Spacer(1, 5))


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(25*mm, 12*mm, "Desarrollo de Productos Digitales con IA · Dossier para difusión")
    canvas.drawRightString(185*mm, 12*mm, f"{doc.page}")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(25*mm, 15*mm, 185*mm, 15*mm)
    canvas.restoreState()


doc = SimpleDocTemplate(
    "/Users/marcoscobo/Desktop/public-slides/curso-ia-productos-digitales-dossier.pdf",
    pagesize=A4, leftMargin=25*mm, rightMargin=25*mm, topMargin=18*mm, bottomMargin=20*mm,
    title="Desarrollo de Productos Digitales con IA — Dossier de contenidos",
    author="Marcos Cobo",
)
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("PDF generado correctamente.")
