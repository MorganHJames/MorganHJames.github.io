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
};

function getRoute() {
  return (location.hash || '').replace(/^#\/?/, '').toLowerCase().trim();
}

function navigateTo(route) {
  const sectionId = ROUTES[route] || 'projects-section';

  // Hide all sections
  document.querySelectorAll('section').forEach(s => s.classList.remove('visible'));

  // Show target
  const target = document.getElementById(sectionId);
  if (target) target.classList.add('visible');

  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const topRoute = ['about','resume','contact'].find(r => route === r || route.startsWith(r));
  if (topRoute && TOP_NAV[topRoute]) {
    const navEl = document.getElementById(TOP_NAV[topRoute]);
    if (navEl) navEl.classList.add('active');
  } else {
    const projNav = document.getElementById('projects');
    if (projNav) projNav.classList.add('active');
  }

  // Stop any playing YouTube videos
  document.querySelectorAll('iframe[src*="youtube"]').forEach(iframe => {
    try {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
    } catch(_) {}
  });

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
    location.hash = route;
  });
});

// Project card clicks — any element with data-route
function bindDataRoutes() {
  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
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

// Boot
document.addEventListener('DOMContentLoaded', () => {
  bindDataRoutes();
  bindBackButtons();
  bindHeroCTAs();
  setupYouTubeFallbacks();

  // Initial route
  const initial = getRoute();
  navigateTo(initial || '');
});
