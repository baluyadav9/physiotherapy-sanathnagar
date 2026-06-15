// Physiotherapy Sanathnagar — Main JS

// ── Hamburger menu ──────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    const isOpen = navMobile.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navMobile.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// ── Active nav link ─────────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Scroll animations ────────────────────────────────────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
  .forEach(el => animObserver.observe(el));

// ── Counter animation ────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.textContent.replace(/[0-9]/g, '');
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = (target >= 1000)
      ? Math.floor(current).toLocaleString() + (suffix || '+')
      : Math.floor(current) + (suffix || '');
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ── Form submission (demo) ───────────────────────────────────────
document.querySelectorAll('form[data-demo]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successEl = form.nextElementSibling;
    if (successEl && successEl.classList.contains('success-msg')) {
      form.style.display = 'none';
      successEl.style.display = 'block';
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// ── Booking: min date = today ────────────────────────────────────
const dateInput = document.getElementById('appt-date');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
  dateInput.value = dateInput.min;
}

// ── Time slot selector ───────────────────────────────────────────
document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
  slot.addEventListener('click', () => {
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    slot.classList.add('selected');
    const hiddenInput = document.getElementById('selected-time');
    if (hiddenInput) hiddenInput.value = slot.dataset.time;
  });
});

// ── Navbar scroll shadow ─────────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 32px rgba(14,116,144,0.12)'
      : '0 2px 20px rgba(14,116,144,0.06)';
  }, { passive: true });
}
