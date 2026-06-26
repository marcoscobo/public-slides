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

  // ---------- Modo flujo (móvil) vs canvas (desktop/tablet) -------------
  // En pantallas estrechas el CSS apila las slides en vertical; aquí solo
  // evitamos que el escalado de canvas pelee con ese layout.
  const flowMode = window.matchMedia('(max-width: 768px)');

  // ---------- Escalado de canvas ----------------------------------------
  const CANVAS_W = 1920;
  const CANVAS_H = 1080;
  function fit() {
    if (flowMode.matches) { stage.style.transform = ''; return; }
    const scale = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
    // Centrar el canvas escalado en el viewport (origin top-left + translate)
    const tx = (window.innerWidth - CANVAS_W * scale) / 2;
    const ty = (window.innerHeight - CANVAS_H * scale) / 2;
    stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
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
    slides[current].scrollTop = 0; // abrir cada slide desde arriba (scroll interno en móvil)
    updateHash();
    triggerSlideAnimations(slides[current]);
    updateNavButtons();
    if (!opts.silent) closeOverview();
  }
  function next() { if (current < total - 1) goto(current + 1); }
  function prev() { if (current > 0) goto(current - 1); }

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

  // ---------- Navegación en pantalla (flechas táctiles) -----------------
  const nav = document.createElement('div');
  nav.className = 'deck-nav';
  nav.innerHTML = `
    <button type="button" data-nav="prev" aria-label="Slide anterior">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button type="button" data-nav="next" aria-label="Siguiente slide">
      <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
    </button>`;
  document.body.appendChild(nav);
  const navPrev = nav.querySelector('[data-nav="prev"]');
  const navNext = nav.querySelector('[data-nav="next"]');
  navPrev.addEventListener('click', prev);
  navNext.addEventListener('click', next);

  function updateNavButtons() {
    navPrev.disabled = current === 0;
    navNext.disabled = current === total - 1;
  }

  // Mostrar las flechas en dispositivos táctiles o cuando el deck está en
  // modo flujo (móvil): en ambos casos no hay teclado para navegar.
  const coarsePointer = window.matchMedia('(pointer: coarse)');
  function syncNavVisibility() {
    const show = coarsePointer.matches || flowMode.matches;
    nav.classList.toggle('is-visible', show);
  }

  // ---------- Swipe horizontal (canvas y flujo) -------------------------
  // El gesto vertical queda libre para el scroll interno de slides altas;
  // solo el desplazamiento claramente horizontal cambia de slide.
  let touchX = 0, touchY = 0;
  deck.addEventListener('touchstart', (e) => {
    touchX = e.changedTouches[0].clientX;
    touchY = e.changedTouches[0].clientY;
  }, { passive: true });
  deck.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  function applyMode() {
    fit();
    syncNavVisibility();
  }
  flowMode.addEventListener('change', applyMode);
  coarsePointer.addEventListener('change', syncNavVisibility);

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
  applyMode();
})();
