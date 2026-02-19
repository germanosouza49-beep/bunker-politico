/**
 * Custom Cursor — dot + ring with GSAP
 * Centering e posicionamento 100% via GSAP (sem CSS transform)
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

  // Centering via GSAP (substitui CSS translate(-50%, -50%))
  gsap.set(dot, { xPercent: -50, yPercent: -50 });
  gsap.set(ring, { xPercent: -50, yPercent: -50 });

  // Seletores de elementos interativos
  var linkSelector = 'a, button, [role="button"], input[type="submit"], .btn';
  var cardSelector = '.card, .problem-card, .bento-card, .pricing-card, .faq-item, [data-cursor="card"]';

  var hasMoved = false;

  // Mouse move — GSAP tracking
  document.addEventListener('mousemove', function (e) {
    if (!hasMoved) {
      hasMoved = true;
      document.documentElement.classList.add('cursor-active');
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.set(ring, { x: e.clientX, y: e.clientY });
    }

    gsap.to(dot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: true
    });

    gsap.to(ring, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true
    });
  });

  // Hover effects via event delegation (scale via GSAP)
  document.addEventListener('mouseover', function (e) {
    var link = e.target.closest(linkSelector);
    var card = e.target.closest(cardSelector);

    if (card) {
      ring.classList.add('is-card');
      ring.classList.remove('is-link');
      gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3, overwrite: 'auto' });
    } else if (link) {
      ring.classList.add('is-link');
      ring.classList.remove('is-card');
      gsap.to(ring, { scale: 1.5, opacity: 0.5, duration: 0.3, overwrite: 'auto' });
    }
  });

  document.addEventListener('mouseout', function (e) {
    var link = e.target.closest(linkSelector);
    var card = e.target.closest(cardSelector);

    if (link || card) {
      ring.classList.remove('is-link');
      ring.classList.remove('is-card');
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, overwrite: 'auto' });
    }
  });

  // Esconder ao sair da janela
  document.addEventListener('mouseleave', function () {
    gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
  });

  document.addEventListener('mouseenter', function () {
    if (hasMoved) {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    }
  });
})();
