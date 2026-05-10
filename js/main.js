/* ============================================================
   PsiForce Technology — Main JavaScript
   ============================================================ */

'use strict';

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id], div[id]');
const links    = document.querySelectorAll('.nav-link');

const activateLink = () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', activateLink, { passive: true });

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animated counter ──
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const numEl    = entry.target;
      const target   = parseInt(numEl.dataset.target, 10);
      const duration = 1800;
      const start    = performance.now();

      const animate = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        numEl.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(animate);
        else numEl.textContent = target;
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(numEl);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ── Contact form submit ──
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 1s linear infinite"></i> Mengirim...';

    // Simulate async send (replace with real fetch/API call)
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
  });
}

// ── Smooth anchor scroll with offset ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({
      top: targetEl.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});
