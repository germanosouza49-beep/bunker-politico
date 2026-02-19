/**
 * Metodo Zero v20
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initScrollProgress();
  initParallax();
  initHeroEntrance();
  initVslCta();
  initMarquee();
  initScrollAnimations();
  initForms();
  initPhoneInput();
  initYear();
});

/* ==========================================
   LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER
   ========================================== */

function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutExpo approximation
    smooth: true
  });

  // Integrar com GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback: requestAnimationFrame loop sem GSAP
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Anchor links: interceptar cliques em links com href="#..."
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target);
      }
    });
  });

  // Respeitar prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis.destroy();
    return;
  }

  // Expor globalmente para uso externo se necessario
  window.lenis = lenis;
}

/* ==========================================
   SCROLL PROGRESS BAR
   ========================================== */

function initScrollProgress() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

/* ==========================================
   PARALLAX — data-speed
   ========================================== */

function initParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('[data-speed]').forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 1;
    // speed=1 = normal, speed=0.5 = metade da velocidade (fica pra tras)
    // Calculo: quanto menor o speed, maior o deslocamento Y positivo (fica pra tras)
    const distance = (1 - speed) * 300;

    gsap.to(el, {
      y: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Hero glow — parallax dedicado com deslocamento maior
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    gsap.to(heroGlow, {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

/* ==========================================
   HERO ENTRANCE — SPLIT TEXT + STAGGERED REVEAL
   ========================================== */

function initHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  // Split text em words (preserva espacos)
  splitIntoWords(headline);

  const words = headline.querySelectorAll('.word');
  const badge = document.querySelector('.hero-badge');
  const subheadline = document.querySelector('.hero-subheadline');
  const heroCta = document.querySelector('.hero-cta');

  // Revelar elementos (estavam com visibility: hidden)
  document.querySelectorAll('[data-hero-animate]').forEach(el => {
    el.classList.add('is-revealed');
  });

  // Timeline sequencial
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // 1. Badge aparece primeiro
  if (badge) {
    tl.from(badge, { y: -20, opacity: 0, duration: 0.5 });
  }

  // 2. Headline words com stagger + rotateX
  if (words.length) {
    tl.from(words, {
      y: 80,
      opacity: 0,
      rotateX: -40,
      duration: 0.9,
      stagger: 0.06
    }, badge ? '-=0.1' : 0);
  }

  // 3. Subheadline aparece apos headline
  if (subheadline) {
    tl.from(subheadline, { y: 30, opacity: 0, duration: 0.6 }, '-=0.3');
  }

  // 4. CTA aparece por ultimo
  if (heroCta) {
    tl.from(heroCta, { y: 20, opacity: 0, duration: 0.5 }, '-=0.2');
  }
}

function splitIntoWords(element) {
  const text = element.textContent;
  element.innerHTML = '';

  text.split(/(\s+)/).forEach(part => {
    if (/^\s+$/.test(part)) {
      element.appendChild(document.createTextNode(part));
    } else if (part) {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = part;
      element.appendChild(span);
    }
  });
}

/* ==========================================
   CTA VSL — TIMED REVEAL + BOUNCE ENTRANCE
   ========================================== */

function initVslCta() {
  if (typeof gsap === 'undefined') return;

  const cta = document.querySelector('.btn--primary[data-vsl-cta]');
  if (!cta) return;

  // Delay configuravel via atributo (em segundos), default 0
  const delay = parseFloat(cta.dataset.vslCta) || 0;

  setTimeout(() => {
    // Tornar visivel antes da animacao GSAP
    cta.style.visibility = 'visible';

    gsap.from(cta, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      onComplete: () => {
        // Ativar pulse continuo apos entrada
        cta.classList.add('is-visible');
      }
    });
  }, delay * 1000);
}

/* ==========================================
   MARQUEE — DUPLICACAO INFINITA
   ========================================== */

function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    // Duplicar conteudo para loop infinito seamless
    const items = track.innerHTML;
    track.innerHTML = items + items;
  });
}

/* ==========================================
   SCROLL ANIMATIONS (substitui AOS)
   ========================================== */

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Defaults por tipo de animacao
  const animations = {
    'fade-up':    { y: 60, opacity: 0 },
    'fade-down':  { y: -60, opacity: 0 },
    'fade-left':  { x: 60, opacity: 0 },
    'fade-right': { x: -60, opacity: 0 },
    'fade':       { opacity: 0 },
    'zoom-in':    { scale: 0.85, opacity: 0 },
    'zoom-out':   { scale: 1.15, opacity: 0 },
  };

  gsap.utils.toArray('[data-animate]').forEach(el => {
    const type = el.dataset.animate || 'fade-up';
    const from = animations[type] || animations['fade-up'];
    const delay = parseFloat(el.dataset.animateDelay) || 0;
    const duration = parseFloat(el.dataset.animateDuration) || 0.8;

    gsap.from(el, {
      ...from,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ==========================================
   FORMULARIOS
   ========================================== */

const tempEmailDomains = [
  'tempmail', 'guerrillamail', '10minutemail', 'mailinator',
  'throwaway', 'fakeinbox', 'yopmail', 'trashmail', 'temp-mail',
  'disposable', 'sharklasers'
];

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;
  const domain = email.split('@')[1].toLowerCase();
  return !tempEmailDomains.some(temp => domain.includes(temp));
}

function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('[type="submit"]');
  const feedback = form.querySelector('.form-feedback');

  // Validacao
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');

    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'tel') {
      const iti = field._iti;
      if (iti && !iti.isValidNumber()) {
        field.classList.add('error');
        valid = false;
      }
    }
  });

  if (!valid) {
    showFeedback(feedback, 'error', 'Preencha todos os campos corretamente.');
    return;
  }

  // Captura nome e email ANTES do envio (form.reset limpa os campos)
  const nome = form.querySelector('[name="nome"]')?.value || '';
  const email = form.querySelector('[name="email"]')?.value || '';

  // Telefone internacional - pega instancia do input DESTE form
  const phone = form.querySelector('input[type="tel"]');
  if (phone && phone._iti) {
    phone.value = phone._iti.getNumber();
  }

  // Envio
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    const res = await fetch(form.getAttribute('action') || window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (res.ok) {
      // Meta Pixel
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }

      // GTM dataLayer
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'generate_lead', form_name: form.getAttribute('name') || 'contato', method: 'netlify_form' });
      }

      // Redirect com parametros
      const action = form.getAttribute('action');
      if (action) {
        const redirectUrl = new URL(action, window.location.origin);

        // Repassa todos os parametros da URL atual (utm_source, fbclid, etc)
        new URLSearchParams(window.location.search).forEach((value, key) => {
          redirectUrl.searchParams.set(key, value);
        });

        // Passa nome e email como parametros
        if (nome) redirectUrl.searchParams.set('nome', nome);
        if (email) redirectUrl.searchParams.set('email', email);

        window.location.href = redirectUrl.toString();
        return;
      }

      // Fallback: mostrar mensagem (quando nao tem action)
      showFeedback(feedback, 'success', 'Mensagem enviada com sucesso!');
      form.reset();
      if (phone && phone._iti) phone._iti.setNumber('');
    } else {
      throw new Error('Erro');
    }
  } catch {
    showFeedback(feedback, 'error', 'Erro ao enviar. Tente novamente.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function showFeedback(el, type, msg) {
  if (!el) return;
  el.className = 'form-feedback ' + type;
  el.textContent = msg;
  setTimeout(() => {
    el.className = 'form-feedback';
    el.textContent = '';
  }, 5000);
}

/* ==========================================
   TELEFONE INTERNACIONAL
   ========================================== */

function initPhoneInput() {
  if (typeof intlTelInput === 'undefined') return;

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input._iti = intlTelInput(input, {
      initialCountry: 'br',
      preferredCountries: ['br', 'us', 'pt'],
      separateDialCode: true,
      strictMode: true,
      loadUtilsOnInit: 'https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/js/utils.js'
    });
  });
}

/* ==========================================
   UTILS
   ========================================== */

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
