/**
 * Custom Cursor — dot + ring with GSAP
 * Desativado em touch devices
 */

(function () {
  // Desativar em touch devices
  if (window.matchMedia('(hover: none)').matches) return;
  if (typeof gsap === 'undefined') return;

  // Criar elementos
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Seletores de elementos interativos
  const linkSelector = 'a, button, [role="button"], input[type="submit"], .btn';
  const cardSelector = '.card, [data-cursor="card"]';

  // Mouse move — GSAP tracking com durations diferentes
  let hasMoved = false;

  document.addEventListener('mousemove', (e) => {
    if (!hasMoved) {
      hasMoved = true;
      document.documentElement.classList.add('cursor-active');
      // Posicionar imediatamente na primeira vez
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

  // Hover effects via event delegation
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest(linkSelector);
    const card = e.target.closest(cardSelector);

    if (card) {
      ring.classList.add('is-card');
      ring.classList.remove('is-link');
    } else if (link) {
      ring.classList.add('is-link');
      ring.classList.remove('is-card');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const link = e.target.closest(linkSelector);
    const card = e.target.closest(cardSelector);

    if (link) ring.classList.remove('is-link');
    if (card) ring.classList.remove('is-card');
  });

  // Esconder cursor ao sair da janela
  document.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
  });

  document.addEventListener('mouseenter', () => {
    if (hasMoved) {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    }
  });
})();
