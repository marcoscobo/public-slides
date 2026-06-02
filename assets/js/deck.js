/* ==========================================================================
   AURORA — Deck runtime
   Navegación, escalado de canvas 1920x1080, animaciones de entrada,
   count-up, parallax y vista overview.
   ========================================================================== */
(function () {
  'use strict';

  const deck = document.querySelector('.deck');
  if (!deck) return;

  const stage = deck.querySelector('.deck-stage');
  const slides = Array.from(stage.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;

  // ---------- Numeración + paginación -----------------------------------
  slides.forEach((slide, i) => {
    const num = String(i + 1).padStart(2, '0');
    slide.setAttribute('data-slide-num', num);
    const pag = document.createElement('div');
    pag.className = 'pagination';
    pag.textContent = `${num} / ${String(total).padStart(2, '0')}`;
    slide.appendChild(pag);
  });

  // ---------- Barra de progreso -----------------------------------------
  const progress = document.createElement('div');
  progress.className = 'progress-bar';
  document.body.appendChild(progress);

  // ---------- Escalado de canvas ----------------------------------------
  const CANVAS_W = 1920;
  const CANVAS_H = 1080;
  function fit() {
    const scale = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
    stage.style.transform = `scale(${scale})`;
  }
  window.addEventListener('resize', fit);
  fit();

  // ---------- Navegación -------------------------------------------------
  function goto(idx, opts = {}) {
    if (idx < 0 || idx >= total) return;
    const prev = current;
    current = idx;
    slides.forEach((s, i) => {
      s.classList.remove('is-active', 'is-prev');
      if (i === current) s.classList.add('is-active');
      else if (i < current) s.classList.add('is-prev');
    });
    progress.style.width = `${((current + 1) / total) * 100}%`;
    updateHash();
    triggerSlideAnimations(slides[current]);
    if (!opts.silent) closeOverview();
  }
  function next() { goto(Math.min(current + 1, total - 1)); }
  function prev() { goto(Math.max(current - 1, 0)); }

  function updateHash() {
    history.replaceState(null, '', `#${current + 1}`);
  }
  function readHash() {
    const m = location.hash.match(/^#(\d+)$/);
    if (m) {
      const idx = Math.min(Math.max(parseInt(m[1], 10) - 1, 0), total - 1);
      goto(idx, { silent: true });
    } else {
      goto(0, { silent: true });
    }
  }
  window.addEventListener('hashchange', readHash);

  // ---------- Teclado ----------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home':
        e.preventDefault(); goto(0); break;
      case 'End':
        e.preventDefault(); goto(total - 1); break;
      case 'f':
      case 'F':
        toggleFullscreen(); break;
      case 'o':
      case 'O':
        toggleOverview(); break;
      case '?':
        toggleHelp(); break;
      case 'Escape':
        closeOverview(); closeHelp(); break;
    }
  });

  // ---------- Click avance ----------------------------------------------
  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .overview, .overview-thumb, .help-modal, .help-card')) return;
    next();
  });

  // ---------- Fullscreen -------------------------------------------------
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }

  // ---------- Overview ---------------------------------------------------
  const overview = document.createElement('div');
  overview.className = 'overview';
  overview.innerHTML = '<div class="overview-grid"></div>';
  document.body.appendChild(overview);
  const overviewGrid = overview.querySelector('.overview-grid');

  function buildOverview() {
    overviewGrid.innerHTML = '';
    slides.forEach((slide, i) => {
      const t = document.createElement('div');
      t.className = 'overview-thumb';
      const title = (slide.querySelector('h1, h2, .display-xl, .display-l, .display-m, .h1, .h2') || {}).textContent || `Slide ${i + 1}`;
      t.innerHTML = `
        <span class="overview-thumb-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="overview-thumb-title">${escapeHtml(title.trim())}</span>
      `;
      t.addEventListener('click', () => goto(i));
      overviewGrid.appendChild(t);
    });
  }
  function toggleOverview() {
    if (overview.classList.contains('is-open')) closeOverview();
    else openOverview();
  }
  function openOverview() {
    buildOverview();
    overview.classList.add('is-open');
  }
  function closeOverview() {
    overview.classList.remove('is-open');
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------- Help -------------------------------------------------------
  const help = document.createElement('div');
  help.className = 'help-modal';
  help.innerHTML = `
    <div class="help-card">
      <h3 class="h3">Atajos de teclado</h3>
      <dl>
        <dt>→ / Espacio</dt><dd>Siguiente slide</dd>
        <dt>←</dt><dd>Slide anterior</dd>
        <dt>Home / End</dt><dd>Primera / última</dd>
        <dt>F</dt><dd>Pantalla completa</dd>
        <dt>O</dt><dd>Vista general</dd>
        <dt>?</dt><dd>Esta ayuda</dd>
        <dt>Esc</dt><dd>Cerrar</dd>
      </dl>
    </div>
  `;
  document.body.appendChild(help);
  function toggleHelp() {
    if (help.classList.contains('is-open')) closeHelp();
    else help.classList.add('is-open');
  }
  function closeHelp() { help.classList.remove('is-open'); }
  help.addEventListener('click', (e) => { if (e.target === help) closeHelp(); });

  // ---------- Animaciones por slide -------------------------------------
  function triggerSlideAnimations(slide) {
    // Count-up
    slide.querySelectorAll('.count-up').forEach((el) => {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = (target * eased).toFixed(decimals);
        el.textContent = val + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // ---------- Parallax suave en formas decorativas ----------------------
  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
    const active = slides[current];
    if (!active) return;
    active.querySelectorAll('[data-parallax]').forEach((el) => {
      const k = parseFloat(el.dataset.parallax) || 0.2;
      el.style.transform = `translate(${mx * 30 * k}px, ${my * 30 * k}px)`;
    });
  });

  // ---------- Init -------------------------------------------------------
  readHash();
})();
