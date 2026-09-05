const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Staggered hero entrance
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.classList.add('loaded');
}));

// Header shadow on scroll
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Animated stat counters
const statEls = document.querySelectorAll('.stat-value');
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
statEls.forEach(el => statObserver.observe(el));

// Scroll reveal for sections
const revealEls = document.querySelectorAll('.card, .feature, .topper-card, .testimonial, .about-copy, .about-media');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Draw-in animation for marker highlights
const markObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      markObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.mark').forEach(el => markObserver.observe(el));

// Scrollspy — highlight the nav link for the section in view
const navLinks = Array.from(nav.querySelectorAll('a'));
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = `#${entry.target.id}`;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
sections.forEach(section => scrollSpy.observe(section));

// Cursor-tilt on the hero notebook stack
if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const heroArt = document.getElementById('heroArt');
  const tiltWrap = document.getElementById('tiltWrap');
  if (heroArt && tiltWrap) {
    heroArt.addEventListener('mousemove', (e) => {
      const rect = heroArt.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tiltWrap.style.transform = `perspective(900px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
    });
    heroArt.addEventListener('mouseleave', () => {
      tiltWrap.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  }
}

// Contact form (front-end only placeholder — wire up to a real backend/email service before going live)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks! This form is a placeholder — connect it to your email/CRM to start receiving enquiries.';
  contactForm.reset();
});
