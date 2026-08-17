// ── Route → section ID map ────────────────────────────────────
const ROUTES = {
  '':           'hero-section',
  'home':       'hero-section',
  'about':      'about-me-section',
  'resume':     'resume-section',
  'contact':    'contact-me-section',
  'projects':   'projects-section',
  'transfr':    'transfr-project-section',
  'spaceforge': 'spaceforge-project-section',
  'drilling':   'drilling-project-section',
  'mogis':      'mogis-project-section',
  'ou':         'ou-project-section',
  'dtt':        'dtt-project-section',
  'esd':        'esd-project-section',
  'cc':         'cc-project-section',
  'atwu':       'atwu-project-section',
  'ust':        'ust-project-section',
  'kr':         'kr-project-section',
  'ls':         'ls-project-section',
  'ysob':       'ysob-project-section',
  'mii':        'mii-project-section',
  'abbey':      'abbey-project-section',
};

// Top-level nav routes (for active state)
const TOP_NAV = {
  'about':   'about-me',
  'resume':  'resume',
  'contact': 'contact-me',
  'projects': 'projects',
};

// Project sub-routes that should highlight Projects nav
const PROJECT_ROUTES = new Set([
  'projects','transfr','spaceforge','drilling','mogis','ou',
  'dtt','esd','cc','atwu','ust','kr','ls','ysob','mii','abbey'
]);

function getRoute() {
  return (location.hash || '').replace(/^#\/?/, '').toLowerCase().trim();
}

// ── Stop all YouTube audio properly ──────────────────────────
function stopAllVideos() {
  document.querySelectorAll('iframe[src*="youtube"]').forEach(iframe => {
    // Replace src with itself — forces iframe reload and kills audio
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
  });
}

function navigateTo(route) {
  const sectionId = ROUTES[route] !== undefined ? ROUTES[route] : 'projects-section';

  // Stop videos before hiding sections
  stopAllVideos();

  // Hide all sections
  document.querySelectorAll('section').forEach(s => s.classList.remove('visible'));

  // Show target
  const target = document.getElementById(sectionId);
  if (target) target.classList.add('visible');

  // Update nav active state — nothing active on hero/home
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (route === '' || route === 'home') {
    // No nav item active on hero
  } else if (TOP_NAV[route]) {
    const navEl = document.getElementById(TOP_NAV[route]);
    if (navEl) navEl.classList.add('active');
  } else if (PROJECT_ROUTES.has(route)) {
    const projNav = document.getElementById('projects');
    if (projNav) projNav.classList.add('active');
  }

  window.scrollTo(0, 0);
}

// Hash routing
window.addEventListener('hashchange', () => navigateTo(getRoute()));

// Nav link clicks
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    const route = (a.getAttribute('href') || '').replace(/^#\/?/, '');
    if (location.hash.replace(/^#\/?/, '') === route) {
      navigateTo(route);
    } else {
      location.hash = route;
    }
  });
});

// Project card clicks — any element with data-route
function closeMobileMenu() {
  const btn = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  if (btn) btn.classList.remove('open');
  if (links) links.classList.remove('mobile-open');
}

function bindDataRoutes() {
  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
      closeMobileMenu();
      const route = el.getAttribute('data-route');
      location.hash = route;
    });
    el.style.cursor = 'pointer';
  });
}

// Back buttons
function bindBackButtons() {
  document.querySelectorAll('.project-back').forEach(el => {
    el.addEventListener('click', () => { location.hash = 'projects'; });
    el.style.cursor = 'pointer';
  });
}

// Hero CTA buttons
function bindHeroCTAs() {
  const hp = document.getElementById('hero-projects');
  if (hp) hp.addEventListener('click', e => { e.preventDefault(); location.hash = 'projects'; });
  const hc = document.getElementById('hero-contact');
  if (hc) hc.addEventListener('click', e => { e.preventDefault(); location.hash = 'contact'; });
}

// Nav logo → home
function bindNavLogo() {
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      location.hash = '';
      navigateTo('');
    });
  }
}

// ── Lightbox for project images ───────────────────────────────
function buildLightbox() {
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div id="lb-overlay"></div>
    <div id="lb-content">
      <button id="lb-prev"><i class="fas fa-chevron-left"></i></button>
      <img id="lb-img" src="" alt="">
      <button id="lb-next"><i class="fas fa-chevron-right"></i></button>
      <button id="lb-close"><i class="fas fa-times"></i></button>
    </div>
  `;
  document.body.appendChild(lb);

  let images = [];
  let current = 0;

  function show(idx) {
    current = (idx + images.length) % images.length;
    document.getElementById('lb-img').src = images[current].src;
    document.getElementById('lb-img').alt = images[current].alt;
  }

  function open(imgs, idx) {
    images = imgs;
    show(idx);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    images = [];
  }

  document.getElementById('lb-overlay').addEventListener('click', close);
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('lb-next').addEventListener('click', () => show(current + 1));

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Bind all img-container images
  function bindImages() {
    document.querySelectorAll('.img-container').forEach(container => {
      const imgs = Array.from(container.querySelectorAll('img'));
      imgs.forEach((img, idx) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => open(imgs, idx));
      });
    });
    // Also bind abbey standalone screenshots
    document.querySelectorAll('.abbey-screenshots img').forEach((img, idx, list) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => open(Array.from(list), idx));
    });
  }

  return { bindImages };
}

// YouTube fallbacks
function setupYouTubeFallbacks() {
  document.querySelectorAll('iframe[src*="youtube.com/embed/"]').forEach(iframe => {
    try {
      const url = new URL(iframe.src);
      url.searchParams.set('enablejsapi', '1');
      url.searchParams.set('rel', '0');
      iframe.src = url.toString();
    } catch(_) {}
  });
}

// ── Mobile hamburger ──────────────────────────────────────────
function bindHamburger() {
  const btn = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('mobile-open');
  });

  // Close menu when a nav link is tapped
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('mobile-open');
    });
  });
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  bindDataRoutes();
  bindBackButtons();
  bindHeroCTAs();
  bindNavLogo();
  bindHamburger();
  setupYouTubeFallbacks();
  const lb = buildLightbox();
  lb.bindImages();

  // Initial route
  const initial = getRoute();
  navigateTo(initial || '');
});
