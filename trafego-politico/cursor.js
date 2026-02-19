/**
 * Custom Cursor v3 — Independent RAF Loop
 *
 * WHY NOT gsap.quickTo for positioning:
 * quickTo is tied to the GSAP ticker, which also runs Lenis smooth scroll.
 * When Lenis processing takes too long in a frame, the ticker stalls and
 * quickTo tweens freeze — causing the cursor to "stick" in place.
 *
 * SOLUTION: Dedicated requestAnimationFrame loop with manual lerp
 * for BOTH dot and ring. Runs independently of the GSAP ticker,
 * so Lenis can never freeze the cursor.
 *
 * GSAP is only used for: centering (one-time set), hover scale (occasional).
 * Never for per-frame positioning.
 */

(function () {
  // Touch detection — exit immediately, no DOM changes
  if (window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches) return;

  var hasGsap = typeof gsap !== 'undefined';
  if (!hasGsap) return; // Need GSAP for transforms

  // Create elements
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // State
  var mouseX = -100, mouseY = -100;
  var dotX = -100, dotY = -100;
  var ringX = -100, ringY = -100;
  var visible = false;
  var hasMoved = false;
  var rafId = null;
  var ringScale = 1;
  var ringScaleTarget = 1;

  // Lerp speeds (0–1, higher = snappier)
  var DOT_SPEED = 0.55;   // ~150ms feel
  var RING_SPEED = 0.12;  // ~400ms feel
  var SCALE_SPEED = 0.15;

  // Center offset via GSAP (one-time)
  gsap.set(dot, { xPercent: -50, yPercent: -50 });
  gsap.set(ring, { xPercent: -50, yPercent: -50 });

  // quickSetter — synchronous, zero ticker dependency
  var setDotX = gsap.quickSetter(dot, 'x', 'px');
  var setDotY = gsap.quickSetter(dot, 'y', 'px');
  var setRingX = gsap.quickSetter(ring, 'x', 'px');
  var setRingY = gsap.quickSetter(ring, 'y', 'px');
  var setRingScale = gsap.quickSetter(ring, 'scale');

  // Show / Hide
  function show() {
    if (visible) return;
    visible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  }

  function hide() {
    if (!visible) return;
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  }

  // Core render loop — 100% independent of GSAP ticker/Lenis
  function render() {
    // Dot — fast follow via lerp
    dotX += (mouseX - dotX) * DOT_SPEED;
    dotY += (mouseY - dotY) * DOT_SPEED;
    setDotX(dotX);
    setDotY(dotY);

    // Ring — smooth lag via lerp
    ringX += (mouseX - ringX) * RING_SPEED;
    ringY += (mouseY - ringY) * RING_SPEED;
    setRingX(ringX);
    setRingY(ringY);

    // Ring scale — smooth interpolation for hover effect
    ringScale += (ringScaleTarget - ringScale) * SCALE_SPEED;
    setRingScale(ringScale);

    rafId = requestAnimationFrame(render);
  }

  function startRaf() {
    if (!rafId) rafId = requestAnimationFrame(render);
  }

  function stopRaf() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  // ---- EVENT LISTENERS ----

  // Mouse move — update target position
  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!hasMoved) {
      hasMoved = true;
      document.documentElement.classList.add('cursor-active');
      // Jump instantly (no lerp on first move)
      dotX = mouseX; dotY = mouseY;
      ringX = mouseX; ringY = mouseY;
      setDotX(dotX); setDotY(dotY);
      setRingX(ringX); setRingY(ringY);
      show();
      startRaf();
      return;
    }

    if (!visible) show();
    startRaf();
  });

  // Mouse leaves window
  document.addEventListener('mouseleave', hide);

  // Mouse enters window — jump to entry point
  document.addEventListener('mouseenter', function (e) {
    if (!hasMoved) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
    dotX = mouseX; dotY = mouseY;
    ringX = mouseX; ringY = mouseY;
    setDotX(dotX); setDotY(dotY);
    setRingX(ringX); setRingY(ringY);
    show();
    startRaf();
  });

  // Tab visibility — pause/resume RAF to save resources
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopRaf();
    } else if (hasMoved) {
      startRaf();
    }
  });

  // Window blur/focus — additional safety
  window.addEventListener('blur', stopRaf);
  window.addEventListener('focus', function () {
    if (hasMoved) startRaf();
  });

  // ---- HOVER STATES ----
  // Scale via lerp in render loop (no GSAP tweens, no ticker dependency)

  var linkSelector = 'a, button, [role="button"], input[type="submit"], .btn';
  var cardSelector = '.bento-card, .pricing-card, .stacked-card, .faq-item, [data-cursor="card"]';

  document.addEventListener('mouseover', function (e) {
    var card = e.target.closest(cardSelector);
    var link = e.target.closest(linkSelector);

    if (card) {
      ring.classList.add('is-card');
      ring.classList.remove('is-link');
      ringScaleTarget = 1.8;
    } else if (link) {
      ring.classList.add('is-link');
      ring.classList.remove('is-card');
      ringScaleTarget = 1.5;
    }
  });

  document.addEventListener('mouseout', function (e) {
    var link = e.target.closest(linkSelector);
    var card = e.target.closest(cardSelector);

    if (link || card) {
      ring.classList.remove('is-link');
      ring.classList.remove('is-card');
      ringScaleTarget = 1;
    }
  });
})();
