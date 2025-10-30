// Brightness swap.
let darkBackground = getComputedStyle(document.documentElement).getPropertyValue("--dark-background-color");
let lightBackground = getComputedStyle(document.documentElement).getPropertyValue("--light-background-color");
let darkText = getComputedStyle(document.documentElement).getPropertyValue("--dark-text-color");
let lightText = getComputedStyle(document.documentElement).getPropertyValue("--light-text-color");
let darkTitleText = getComputedStyle(document.documentElement).getPropertyValue("--dark-title-text-color");
let lightTitleText = getComputedStyle(document.documentElement).getPropertyValue("--light-title-text-color");
let darkHover = getComputedStyle(document.documentElement).getPropertyValue("--dark-hover-text-color");
let lightHover = getComputedStyle(document.documentElement).getPropertyValue("--light-hover-text-color");
let darkAccent = getComputedStyle(document.documentElement).getPropertyValue("--dark-accent-color");
let lightAccent = getComputedStyle(document.documentElement).getPropertyValue("--light-accent-color");

function swapBrightness() {
  let icon = document.querySelector('#brightswap img');
  
  icon.onmouseover = () => {
    icon.setAttribute("src","Resources/sun-full.svg");
  }
  icon.onmouseout = () => {
    icon.setAttribute("src","Resources/sun-empty.svg");
  }
  icon.onclick = () => {
    let color = getComputedStyle(document.documentElement).getPropertyValue("--current-background-color");
    if(color == lightBackground){
      icon.setAttribute("src","Resources/sun-empty.svg");
      document.documentElement.style.setProperty('--current-background-color', darkBackground);
      document.documentElement.style.setProperty('--current-text-color', darkText);
      document.documentElement.style.setProperty('--current-title-text-color', darkTitleText);
      document.documentElement.style.setProperty('--current-hover-text-color', darkHover);
      document.documentElement.style.setProperty('--current-accent-color', darkAccent);
      
      icon.onmouseover = () => {
        icon.setAttribute("src","Resources/sun-full.svg");
      }
      icon.onmouseout = () => {
        icon.setAttribute("src","Resources/sun-empty.svg");
      }
    } 
    else {
      icon.setAttribute("src","Resources/moon-empty.svg");
      document.documentElement.style.setProperty('--current-background-color', lightBackground);
      document.documentElement.style.setProperty('--current-text-color', lightText);
      document.documentElement.style.setProperty('--current-title-text-color', lightTitleText);
      document.documentElement.style.setProperty('--current-hover-text-color', lightHover);
      document.documentElement.style.setProperty('--current-accent-color', lightAccent);

      icon.onmouseover = () => {
          icon.setAttribute("src","Resources/moon-full.svg");
      }
      icon.onmouseout = () => {
          icon.setAttribute("src","Resources/moon-empty.svg");
      }
    }
  }
}

// Display Section.
function displaySection(link,section) {
  let lnk = document.querySelector(`#${link}`);
  let sec = document.querySelector(`#${section}`);
  if (!lnk) return;

  // Derive a route name from the target section id (e.g., "esd" from "esd-project-section")
  let route = section
    .replace("-project-section", "")
    .replace("-me-section", "")
    .replace("-section", "")
    .replace("about", "about")
    .replace("contact", "contact")
    .replace("resume", "resume");

  // Ensure the anchor has a meaningful href so middle-click / ctrl/cmd+click works
  try {
    lnk.setAttribute('href', `#/${route}`);
  } catch (_) {}

  // Intercept plain left-clicks (no modifier keys) so SPA navigation is used.
  // Let middle-click (button === 1) and modifier clicks (ctrl/meta/shift) fall through
  // so the browser can open a new tab/window as expected.
  lnk.addEventListener('click', (event) => {
    // Only handle primary button without modifiers
    if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      if (location.hash.replace(/^#\/?/, "") !== route) {
        location.hash = route;
      } else {
        navigateTo(route);
      }
    }
    // Otherwise, do nothing and allow default browser behavior (open in new tab/window)
  });
}

function startSection(link,section) {
  var elem = document.getElementById(link);
  if (!elem) return;
  // Prefer programmatic click to trigger any handlers added via addEventListener.
  // Fallback to updating the hash directly if click() is not available.
  try {
    if (typeof elem.click === 'function') {
      elem.click();
    } else {
      // Derive route from section as a fallback
      let route = section
        .replace("-project-section", "")
        .replace("-me-section", "")
        .replace("-section", "")
        .replace("about", "about")
        .replace("contact", "contact")
        .replace("resume", "resume");
      if (location.hash.replace(/^#\/?/, "") !== route) location.hash = route;
      else navigateTo(route);
    }
  } catch (e) {
    // Last-resort fallback: navigate directly
    let route = section
      .replace("-project-section", "")
      .replace("-me-section", "")
      .replace("-section", "")
      .replace("about", "about")
      .replace("contact", "contact")
      .replace("resume", "resume");
    if (location.hash.replace(/^#\/?/, "") !== route) location.hash = route;
    else navigateTo(route);
  }
}

function stopAllYouTubeVideos() {
  var iframes = document.querySelectorAll('iframe');
  Array.prototype.forEach.call(iframes, iframe => {
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
  });
}

// Replace blocked YouTube embeds with clickable thumbnails
function setupYouTubeFallbacks() {
  const origin = 'https://MorganHJames.github.io';
  const embedIframes = document.querySelectorAll('iframe[src*="youtube.com/embed/"]');
  embedIframes.forEach((iframe) => {
    // Ensure recommended params are present
    try {
      const url = new URL(iframe.src);
      url.searchParams.set('enablejsapi', '1');
      url.searchParams.set('rel', '0');
      url.searchParams.set('modestbranding', '1');
      url.searchParams.set('origin', origin);
      iframe.src = url.toString();
    } catch (_) {}

    // Attach error fallback
    const onError = () => {
      try {
        const url = new URL(iframe.src);
        const vid = url.pathname.split('/').pop();
        const videoId = (vid || '').split('?')[0];
        const thumb = document.createElement('a');
        thumb.href = `https://www.youtube.com/watch?v=${videoId}`;
        thumb.target = '_blank';
        thumb.rel = 'noopener noreferrer';
        thumb.style.display = 'block';
        thumb.style.position = 'relative';
        thumb.style.width = '100%';
        thumb.style.height = iframe.style.height || 'auto';

        const img = document.createElement('img');
        img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        img.alt = 'Open on YouTube';
        img.style.width = '100%';
        img.style.display = 'block';

        const play = document.createElement('div');
        play.style.position = 'absolute';
        play.style.top = '50%';
        play.style.left = '50%';
        play.style.transform = 'translate(-50%, -50%)';
        play.style.background = 'rgba(0,0,0,0.6)';
        play.style.color = '#fff';
        play.style.padding = '0.6em 1em';
        play.style.borderRadius = '4px';
        play.style.fontFamily = 'roboto mono, monospace';
        play.textContent = 'Watch on YouTube';

        thumb.appendChild(img);
        thumb.appendChild(play);
        iframe.replaceWith(thumb);
      } catch (_) {
        // noop
      }
    };

    iframe.addEventListener('error', onError, { passive: true });
    // Some browsers don’t fire error for blocked embeds; add a quick post-init check
    setTimeout(() => {
      // If the iframe hasn't loaded by now, fallback
      if (!iframe.contentWindow) onError();
    }, 2000);
  });
}

// Normalize embeds at runtime to the canonical form: https://www.youtube.com/embed/VIDEO_ID?enablejsapi=1
function normalizeYouTubeEmbeds() {
  const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed/"], iframe[src*="youtube-nocookie.com/embed/"]');
  iframes.forEach((iframe) => {
    try {
      const src = iframe.getAttribute('src') || '';
      // extract video id
      const match = src.match(/(?:embed\/|vi\/|v=)([A-Za-z0-9_-]{7,})/);
      let id = null;
      if (match && match[1]) id = match[1];
      else {
        // fallback: last segment of path
        try {
          const u = new URL(src);
          id = u.pathname.split('/').pop().split('?')[0];
        } catch (_) {}
      }

      if (id) {
        const newSrc = `https://www.youtube.com/embed/${id}?enablejsapi=1`;
        if (iframe.src !== newSrc) iframe.src = newSrc;
      }

      // set a consistent referrer policy if not already present
      try { iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin'); } catch (_) {}
    } catch (_) {
      // noop
    }
  });
}

// Safari fallback for embedded PDFs
// Many Safari instances (especially iOS) show only the first page when using iframes.
// This function replaces PDF iframes with a simple progressive link for Safari so the
// user opens the PDF in the browser's native viewer (which reliably shows all pages).
function adjustPDFEmbedsForSafari() {
  try {
    const pdfIframes = document.querySelectorAll('iframe[src*=".pdf"]');
    if (!pdfIframes || pdfIframes.length === 0) return;

    // Only change behavior for Safari (desktop or iOS)
    if (!isSafari()) return;

    pdfIframes.forEach((iframe) => {
      const src = iframe.getAttribute('src');
      const wrapper = document.createElement('div');
      wrapper.className = 'pdf-link-group';

      const openLink = document.createElement('a');
      openLink.href = src;
      openLink.target = '_blank';
      openLink.rel = 'noopener noreferrer';
      openLink.textContent = 'Open PDF (view all pages)';

      const note = document.createElement('span');
      note.style.marginLeft = '0.5rem';
      note.style.color = '#666';
      note.textContent = '(Safari: open in new tab to view all pages)';

      wrapper.appendChild(openLink);
      wrapper.appendChild(note);

      iframe.replaceWith(wrapper);
    });
  } catch (e) {
    // noop — fail safely
  }
}



// Simple diagnostics capture for local debugging: returns origin, iframe srcs and any performance resource entries that mention youtube
function captureYouTubeDebug() {
  const origin = location.origin;
  const iframes = [...document.querySelectorAll('iframe[src*="youtube.com/embed/"]')].map(i => i.src);
  const res = (performance && performance.getEntriesByType) ? performance.getEntriesByType('resource').filter(r => r.name && r.name.includes('youtube')).map(r => ({name: r.name, initiatorType: r.initiatorType, duration: r.duration, startTime: r.startTime})) : [];
  const out = { origin, iframes, youtubeResources: res };
  // Print to console for quick copy/paste during debugging
  try { console.info('captureYouTubeDebug:', out); } catch (_) {}
  return out;
}

// Routing helpers
function getSectionFromRoute(route) {
  switch(route) {
    case 'about':
      return 'about-me-section';
    case 'resume':
      return 'resume-section';
    case 'contact':
      return 'contact-me-section';
    case 'projects':
      return 'projects-section';
    case 'dtt':
      return 'dtt-project-section';
    // Project routes default to their respective sections
    case 'esd':
      return 'esd-project-section';
    case 'cc':
      return 'cc-project-section';
    case 'ust':
      return 'ust-project-section';
    case 'ls':
      return 'ls-project-section';
    case 'kr':
      return 'kr-project-section';
    case 'mii':
      return 'mii-project-section';
    case 'atwu':
      return 'atwu-project-section';
    case 'transfr':
      return 'transfr-project-section';
    case 'spaceforge':
      return 'spaceforge-project-section';
    case 'drilling':
      return 'drilling-project-section';
    case 'mogis':
      return 'mogis-project-section';
    case 'ysob':
      return 'ysob-project-section';
    case 'ou':
      return 'ou-project-section';
    default:
      return 'projects-section';
  }
}

function setTopMenuActiveForSection(sectionId) {
  // Determine which top-level menu item should be active
  let activeTopId = 'projects';
  if (sectionId === 'about-me-section') activeTopId = 'about-me';
  else if (sectionId === 'resume-section') activeTopId = 'resume';
  else if (sectionId === 'contact-me-section') activeTopId = 'contact-me';
  else activeTopId = 'projects';

  let menu = document.getElementById('menList');
  if (menu) {
    let children = menu.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('active');
    }
    let activate = document.getElementById(activeTopId);
    if (activate) activate.classList.add('active');
  }
}

function showSection(sectionId) {
  let sec = document.getElementById(sectionId);
  if (!sec) return;

  // Hide all sections under <main>
  let main = document.querySelector('main');
  if (main) {
    for (let i = 0; i < main.children.length; i++) {
      main.children[i].style.display = 'none';
    }
  }

  // Show target section with animation
  sec.classList.remove('section');
  sec.style.display = 'block';
  sec.style.animationName = 'section';
  sec.style.animationDuration = '0.6s';
  sec.style.animationFillMode = 'forwards';

  // Safari-specific scaling class to enlarge embedded PDF content while keeping frame size
  if (sectionId === 'resume-section') {
    if (isSafari()) {
      document.body.classList.add('safari-resume-scale');
    }
  } else {
    document.body.classList.remove('safari-resume-scale');
  }

  // Update top menu active state
  setTopMenuActiveForSection(sectionId);

  // Stop videos and scroll to top
  stopAllYouTubeVideos();
  window.scrollTo(0, 0);
}

// Detect Safari (exclude Chrome/Chromium/Edge which also include "Safari" in UA)
function isSafari() {
  var ua = navigator.userAgent;
  var isSafari = /^((?!chrome|chromium|crios|edg).)*safari/i.test(ua);
  return isSafari;
}

function navigateTo(route) {
  let sectionId = getSectionFromRoute(route);
  showSection(sectionId);
}

// Handle back/forward (hash routing)
window.addEventListener('hashchange', () => {
  let route = location.hash.replace(/^#\/?/, '');
  navigateTo(route || 'projects');
});

swapBrightness();
stopAllYouTubeVideos();
displaySection("about-me","about-me-section");
displaySection("projects","projects-section");
displaySection("resume","resume-section");
displaySection("contact-me","contact-me-section");
displaySection("esd-project1","esd-project-section");
displaySection("esd-project2","esd-project-section");
displaySection("esd-project3","esd-project-section");
displaySection("cc-project1","cc-project-section");
displaySection("cc-project2","cc-project-section");
displaySection("cc-project3","cc-project-section");
displaySection("ust-project1","ust-project-section");
displaySection("ust-project2","ust-project-section");
displaySection("ust-project3","ust-project-section");
displaySection("ls-project1","ls-project-section");
displaySection("ls-project2","ls-project-section");
displaySection("ls-project3","ls-project-section");
displaySection("kr-project1","kr-project-section");
displaySection("kr-project2","kr-project-section");
displaySection("kr-project3","kr-project-section");
displaySection("transfr-project1","transfr-project-section");
displaySection("transfr-project2","transfr-project-section");
displaySection("transfr-project3","transfr-project-section");
displaySection("spaceforge-project1","spaceforge-project-section");
displaySection("spaceforge-project2","spaceforge-project-section");
displaySection("spaceforge-project3","spaceforge-project-section");
displaySection("drilling-project1","drilling-project-section");
displaySection("drilling-project2","drilling-project-section");
displaySection("drilling-project3","drilling-project-section");
displaySection("mogis-project1","mogis-project-section");
displaySection("mogis-project2","mogis-project-section");
displaySection("mogis-project3","mogis-project-section");
displaySection("atwu-project1","atwu-project-section");
displaySection("atwu-project2","atwu-project-section");
displaySection("atwu-project3","atwu-project-section");
displaySection("dtt-project1","dtt-project-section");
displaySection("dtt-project2","dtt-project-section");
displaySection("dtt-project3","dtt-project-section");
displaySection("mii-project1","mii-project-section");
displaySection("mii-project2","mii-project-section");
displaySection("mii-project3","mii-project-section");
displaySection("ysob-project1","ysob-project-section");
displaySection("ysob-project2","ysob-project-section");
displaySection("ysob-project3","ysob-project-section");
displaySection("ou-project1","ou-project-section");
displaySection("ou-project2","ou-project-section");
displaySection("ou-project3","ou-project-section");
// Initial navigation based on current hash
navigateTo(location.hash.replace(/^#\/?/, '') || 'projects');

// Run normalization and enable fallback once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    normalizeYouTubeEmbeds();
  } catch (_) {}
  try {
    setupYouTubeFallbacks();
  } catch (_) {}
  try {
    adjustPDFEmbedsForSafari();
  } catch (_) {}
  // Expose the debug capture helper for manual use in DevTools
  try { window.captureYouTubeDebug = captureYouTubeDebug; } catch (_) {}
});