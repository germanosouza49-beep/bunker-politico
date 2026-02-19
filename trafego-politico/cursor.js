/**
 * Custom Cursor — dot + ring with GSAP quickTo
 * Uses gsap.quickTo() for smooth, high-performance tracking
 * Desativado em touch devices
 */

(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  if (typeof gsap === 'undefined') return;

  // Criar elementos
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Centering via GSAP
  gsap.set(dot, { xPercent: -50, yPercent: -50 });
  gsap.set(ring, { xPercent: -50, yPercent: -50 });

  // quickTo — creates reusable, high-perf position updaters
  var dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' });
  var dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' });
  var ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
  var ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

  // Seletores de elementos interativos
  var linkSelector = 'a, button, [role="button"], input[type="submit"], .btn';
  var cardSelector = '.card, .problem-card, .bento-card, .pricing-card, .faq-item, [data-cursor="card"]';

  var hasMoved = false;
  var isVisible = false;

  function showCursor() {
    if (!isVisible) {
      isVisible = true;
      gsap.to(dot, { opacity: 1, duration: 0.3, overwrite: 'auto' });
      gsap.to(ring, { opacity: 1, duration: 0.3, overwrite: 'auto' });
    }
  }

  function hideCursor() {
    if (isVisible) {
      isVisible = false;
      gsap.to(dot, { opacity: 0, duration: 0.2, overwrite: 'auto' });
      gsap.to(ring, { opacity: 0, duration: 0.2, overwrite: 'auto' });
    }
  }

  // Mouse move — quickTo tracking (no new tweens created)
  document.addEventListener('mousemove', function (e) {
    if (!hasMoved) {
      hasMoved = true;
      document.documentElement.classList.add('cursor-active');
      // Jump to position immediately on first move
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.set(ring, { x: e.clientX, y: e.clientY });
      showCursor();
      return;
    }

    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  });

  // Hover effects — separate tweens that don't conflict with position
  document.addEventListener('mouseover', function (e) {
    var link = e.target.closest(linkSelector);
    var card = e.target.closest(cardSelector);

    if (card) {
      ring.classList.add('is-card');
      ring.classList.remove('is-link');
      gsap.to(ring, { scale: 1.8, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    } else if (link) {
      ring.classList.add('is-link');
      ring.classList.remove('is-card');
      gsap.to(ring, { scale: 1.5, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    }
  });

  document.addEventListener('mouseout', function (e) {
    var link = e.target.closest(linkSelector);
    var card = e.target.closest(cardSelector);

    if (link || card) {
      ring.classList.remove('is-link');
      ring.classList.remove('is-card');
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    }
  });

  // Esconder ao sair da janela
  document.addEventListener('mouseleave', hideCursor);
  document.addEventListener('mouseenter', function () {
    if (hasMoved) showCursor();
  });
})();
