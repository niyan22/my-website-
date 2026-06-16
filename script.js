/* ============================================================
   PORTFOLIO — Chahniyan Regina Kasih
   Main JavaScript
   ============================================================ */

// ---- Init ----
function initAll() {
  initLoading();
  initTheme();
  initAOS();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initTyping();
  initSkillTabs();
  initPortfolioFilter();
  initCertModal();
  initGalleryLightbox();
  initContactForm();
  initSmoothScroll();
  initParticles();
  initParallax();
  initCardTilt();
  initRipple();
}

// Lucide needs to load from CDN first; retry until available
function waitForLucide(cb, attempts = 0) {
  if (window.lucide) { lucide.createIcons(); cb(); }
  else if (attempts < 30) setTimeout(() => waitForLucide(cb, attempts + 1), 100);
  else cb();
}

document.addEventListener('DOMContentLoaded', () => {
  waitForLucide(initAll);
});

// ---- Loading Screen ----
function initLoading() {
  const loading = document.getElementById('loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.classList.add('hidden');
    }, 900);
  });
  // Fallback
  setTimeout(() => loading.classList.add('hidden'), 3000);
}

// ---- Theme Toggle ----
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (theme === 'light') {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      // GitHub icon filter for light mode
      document.querySelectorAll('.devicon-github-original').forEach(el => {
        el.style.filter = 'none';
      });
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }
}

// ---- AOS ----
function initAOS() {
  if (window.AOS) {
    AOS.init({
      once: true,
      offset: 60,
      easing: 'ease-out-cubic',
    });
  }
}

// ---- Navbar ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    // Scrolled class
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    menuOpen.classList.toggle('hidden', !isOpen);
    menuClose.classList.toggle('hidden', isOpen);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      menuOpen.classList.remove('hidden');
      menuClose.classList.add('hidden');
    });
  });
}

// ---- Scroll Progress ----
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ---- Typing Animation ----
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const words = ['Web Developer', 'Mobile Developer', 'UI/UX Designer', 'Problem Solver'];
  let wIdx = 0, cIdx = 0, deleting = false;

  const SPEED_TYPE = 100;
  const SPEED_DELETE = 55;
  const PAUSE = 1800;

  function tick() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === word.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      el.textContent = word.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }
  tick();
}

// ---- Skill Tabs ----
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  const grids = document.querySelectorAll('.skill-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      grids.forEach(g => g.classList.remove('active'));

      tab.classList.add('active');
      const grid = document.getElementById(target);
      if (grid) grid.classList.add('active');
    });
  });
}

// ---- Portfolio Filter ----
function initPortfolioFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#portfolio-grid .project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.dataset.cat;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ---- Certificate Modal ----
function initCertModal() {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalMeta = document.getElementById('cert-modal-meta');
  const modalClose = document.getElementById('cert-modal-close');

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      modalImg.src = card.dataset.img || '';
      modalTitle.textContent = card.dataset.title || '';
      modalMeta.textContent = (card.dataset.org || '') + ' - ' + (card.dataset.year || '');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ---- Gallery Lightbox ----
function initGalleryLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lb-close');

  document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
}

// ---- Contact Form ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', errId: 'name-err', validate: v => v.trim().length >= 2 },
      { id: 'email', errId: 'email-err', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'subject', errId: 'subject-err', validate: v => v.trim().length >= 3 },
      { id: 'message', errId: 'message-err', validate: v => v.trim().length >= 10 },
    ];

    fields.forEach(({ id, errId, validate }) => {
      const input = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!validate(input.value)) {
        input.classList.add('error');
        err.classList.remove('hidden');
        valid = false;
      } else {
        input.classList.remove('error');
        err.classList.add('hidden');
      }
    });

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" /></svg> Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Send Message';
      lucide.createIcons();
      form.reset();
      const success = document.getElementById('form-success');
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 4000);
    }, 1400);
  });

  // Clear error on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const err = document.getElementById(input.id + '-err');
      if (err) err.classList.add('hidden');
    });
  });
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ---- Hero Floating Particles ----
function initParticles() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const wrap = document.createElement('div');
  wrap.className = 'hero-particles';
  hero.insertBefore(wrap, hero.firstChild);
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 1.2 + Math.random() * 2.2;
    p.style.cssText = `left:${Math.random()*100}%;bottom:${Math.random()*60}%;width:${size}px;height:${size}px;--dur:${5+Math.random()*7}s;--delay:${Math.random()*9}s;`;
    wrap.appendChild(p);
  }
}

// ---- Hero Mouse Parallax ----
function initParallax() {
  const blobs = document.querySelectorAll('.hero-bg');
  if (!blobs.length || window.matchMedia('(max-width:768px)').matches) return;
  document.addEventListener('mousemove', (e) => {
    const cx = e.clientX / window.innerWidth - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;
    blobs.forEach((b, i) => {
      const d = (i + 1) * 18;
      b.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
    });
  });
}

// ---- 3D Card Tilt ----
function initCardTilt() {
  if (window.matchMedia('(max-width:768px)').matches) return;
  document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease';
      card.style.transform = '';
    });
  });
}

// ---- Button Ripple ----
function initRipple() {
  document.querySelectorAll('.btn-gold, .btn-outline').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const r = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - r.left) + 'px';
      ripple.style.top  = (e.clientY - r.top)  + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}
