/**
 * ============================================================
 * TEACHERS' DAY MEMORY BOOK — script.js
 * ============================================================
 */

'use strict';

/* ── ① MEDIA CONSTANTS ───────────────────────────────────────── */

const PHOTO_DATA = {
  src: 'assets/photos/govardhan.jpeg',
  title: 'Our Memory',
  caption: 'One little moment worth remembering.'
};

const VIDEO_DATA = {
  src: 'assets/videos/govardhannn....mp4',
  title: 'A Little Moment',
  caption: 'Some memories are better watched than described.'
};

/* ── ② LANDING SCREEN ────────────────────────────────────────── */

/** Create floating particles in the landing section */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 50;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left     = Math.random() * 100 + '%';
    p.style.top      = Math.random() * 100 + '%';
    p.style.setProperty('--duration', (6 + Math.random() * 10) + 's');
    p.style.setProperty('--delay',    (Math.random() * 10) + 's');
    p.style.setProperty('--max-op',   (0.15 + Math.random() * 0.35).toFixed(2));
    const size = 1.5 + Math.random() * 3;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    container.appendChild(p);
  }
}

/** Handle the "Open Your Surprise" button */
function initLanding() {
  const landing     = document.getElementById('landing');
  const mainSite    = document.getElementById('mainSite');
  const openBtn     = document.getElementById('openSurpriseBtn');
  const musicPlayer = document.getElementById('musicPlayer');

  if (!openBtn || !landing || !mainSite) return;

  openBtn.addEventListener('click', () => {
    // 1. Animate the landing section out
    landing.classList.add('exit');

    // 2. Show the main site with a brief delay
    setTimeout(() => {
      landing.style.display       = 'none';
      mainSite.classList.remove('hidden');
      mainSite.removeAttribute('aria-hidden');

      // Trigger reflow before adding visible class (for transition)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mainSite.classList.add('visible');
        });
      });

      // Show music player (if audio file exists)
      if (musicPlayer) musicPlayer.style.display = 'block';

      // Kick off scroll reveals
      triggerInitialReveals();
    }, 700);
  });
}

/* ── ③ NAVIGATION ────────────────────────────────────────────── */

function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = document.querySelectorAll('.nav-link');
  const navbar    = document.getElementById('navbar');

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close when a link is clicked
    allLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link highlighting on scroll
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => {
          item.classList.toggle(
            'active',
            item.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ── ④ SCROLL REVEAL (IntersectionObserver) ──────────────────── */

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (idx % 4));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));
}

function triggerInitialReveals() {
  initScrollReveal();
}

/* ── ⑤ 4 INTERACTIVE CARDS & MODALS ─────────────────────────── */

function initMemoryCards() {
  const photoCard = document.getElementById('photoCard');
  const videoCard = document.getElementById('videoCard');
  const letterCard = document.getElementById('letterCard');
  const finalCard = document.getElementById('finalCard');

  // 1. PHOTO CARD
  if (photoCard) {
    const triggerPhoto = () => openLightbox();
    photoCard.addEventListener('click', triggerPhoto);
    photoCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerPhoto();
      }
    });
  }

  // 2. VIDEO CARD
  if (videoCard) {
    const triggerVideo = () => openVideoModal();
    videoCard.addEventListener('click', triggerVideo);
    videoCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerVideo();
      }
    });
  }

  // 3. LETTER CARD
  if (letterCard) {
    const triggerLetter = () => openLetterModal();
    letterCard.addEventListener('click', triggerLetter);
    letterCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerLetter();
      }
    });
  }

  // 4. FINAL THANK YOU CARD
  if (finalCard) {
    const triggerFinal = () => revealFinalMessage();
    finalCard.addEventListener('click', triggerFinal);
    finalCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerFinal();
      }
    });
  }
}

/* Lightbox Functions */
function openLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cap = document.getElementById('lightboxCaption');
  if (!lb) return;

  if (img) img.src = PHOTO_DATA.src;
  if (title) title.textContent = PHOTO_DATA.title;
  if (cap) cap.textContent = PHOTO_DATA.caption;

  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('lightboxClose');
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.style.display = 'none';
  document.body.style.overflow = '';
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lb) return;

  closeBtn?.addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lb.style.display !== 'none' && e.key === 'Escape') {
      closeLightbox();
    }
  });
}

/* Video Modal Functions */
function openVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoEl = document.getElementById('modalVideo');
  const titleEl = document.getElementById('modalVideoTitle');
  const capEl = document.getElementById('modalVideoCaption');
  if (!modal || !videoEl) return;

  if (videoEl.src !== VIDEO_DATA.src && !videoEl.currentSrc) {
    videoEl.src = VIDEO_DATA.src;
  }
  if (titleEl) titleEl.textContent = VIDEO_DATA.title;
  if (capEl) capEl.textContent = VIDEO_DATA.caption;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  videoEl.play().catch(() => {
    // Autoplay prevented if any, user can play with controls
  });

  const closeBtn = document.getElementById('videoModalClose');
  if (closeBtn) closeBtn.focus();
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoEl = document.getElementById('modalVideo');
  if (!modal) return;

  if (videoEl) {
    videoEl.pause();
  }
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  if (!modal) return;

  closeBtn?.addEventListener('click', closeVideoModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'none' && e.key === 'Escape') {
      closeVideoModal();
    }
  });
}

/* Letter Modal & Envelope Animation */
let letterAnimationTimer1 = null;
let letterAnimationTimer2 = null;

function openLetterModal() {
  const modal = document.getElementById('letterModal');
  const envelope = document.getElementById('envelope');
  const flap = document.getElementById('envelopeFlap');
  const letterPaper = document.getElementById('letterPaper');
  if (!modal) return;

  // Reset envelope animation state cleanly
  if (letterAnimationTimer1) clearTimeout(letterAnimationTimer1);
  if (letterAnimationTimer2) clearTimeout(letterAnimationTimer2);

  if (envelope) {
    envelope.style.display = 'flex';
    envelope.style.opacity = '1';
    envelope.style.transform = 'scale(1)';
    envelope.style.pointerEvents = 'auto';
  }
  if (flap) {
    flap.classList.remove('opened');
  }
  if (letterPaper) {
    letterPaper.style.display = 'none';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('letterModalClose');
  if (closeBtn) closeBtn.focus();

  // Trigger envelope opening animation smoothly
  triggerEnvelopeOpening();
}

function triggerEnvelopeOpening() {
  const flap = document.getElementById('envelopeFlap');
  const envelope = document.getElementById('envelope');
  const letterPaper = document.getElementById('letterPaper');

  // Step 1: Open envelope flap
  letterAnimationTimer1 = setTimeout(() => {
    if (flap) flap.classList.add('opened');

    // Step 2: Fade out envelope and reveal heartfelt letter
    letterAnimationTimer2 = setTimeout(() => {
      if (envelope) {
        envelope.style.opacity = '0';
        envelope.style.transform = 'scale(0.95)';
        envelope.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        envelope.style.pointerEvents = 'none';
      }
      setTimeout(() => {
        if (envelope) envelope.style.display = 'none';
        if (letterPaper) {
          letterPaper.style.display = 'block';
        }
      }, 500);
    }, 700);
  }, 400);
}

function closeLetterModal() {
  const modal = document.getElementById('letterModal');
  if (!modal) return;

  if (letterAnimationTimer1) clearTimeout(letterAnimationTimer1);
  if (letterAnimationTimer2) clearTimeout(letterAnimationTimer2);

  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function initLetterModal() {
  const modal = document.getElementById('letterModal');
  const closeBtn = document.getElementById('letterModalClose');
  const backdrop = document.getElementById('letterModalBackdrop');
  const openBtn = document.getElementById('openLetterBtn');
  const envelope = document.getElementById('envelope');

  if (!modal) return;

  closeBtn?.addEventListener('click', closeLetterModal);
  backdrop?.addEventListener('click', closeLetterModal);

  // If user clicks the envelope or button directly
  openBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerEnvelopeOpening();
  });
  envelope?.addEventListener('click', () => {
    triggerEnvelopeOpening();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'none' && e.key === 'Escape') {
      closeLetterModal();
    }
  });
}

/* Final Message Reveal */
function revealFinalMessage() {
  const finalSection = document.getElementById('final');
  const finalLines = document.querySelectorAll('.final-line');
  if (!finalSection) return;

  // Smooth scroll to the final section
  const navH = document.getElementById('navbar')?.offsetHeight || 60;
  const targetY = finalSection.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: targetY, behavior: 'smooth' });

  // Play line-by-line reveal animation
  finalLines.forEach(line => line.classList.remove('show'));

  finalLines.forEach((line) => {
    const delay = parseInt(line.getAttribute('data-delay') || '0', 10);
    setTimeout(() => {
      line.classList.add('show');
    }, delay + 300);
  });
}

/* ── ⑥ FINAL SECTION STARS & INTERSECTION ─────────────────────── */

function createStars() {
  const container = document.getElementById('finalStars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left     = Math.random() * 100 + '%';
    star.style.top      = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (3 + Math.random() * 6) + 's');
    star.style.setProperty('--delay',    (Math.random() * 6) + 's');
    const size = 1 + Math.random() * 2.5;
    star.style.width  = size + 'px';
    star.style.height = size + 'px';
    container.appendChild(star);
  }
}

function initFinalSection() {
  const finalSection = document.getElementById('final');
  const finalLines   = document.querySelectorAll('.final-line');

  if (!finalSection || finalLines.length === 0) return;

  let animationStarted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        finalLines.forEach((line) => {
          const delay = parseInt(line.getAttribute('data-delay') || '0', 10);
          setTimeout(() => {
            line.classList.add('show');
          }, delay);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(finalSection);
}

/* ── ⑦ MUSIC PLAYER ──────────────────────────────────────────── */

function initMusicPlayer() {
  const musicBtn = document.getElementById('musicBtn');
  const bgAudio  = document.getElementById('bgAudio');
  if (!musicBtn || !bgAudio) return;

  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgAudio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('aria-pressed', 'false');
      musicBtn.setAttribute('aria-label', 'Play background music');
      isPlaying = false;
    } else {
      bgAudio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-pressed', 'true');
        musicBtn.setAttribute('aria-label', 'Pause background music');
        isPlaying = true;
      }).catch(() => {
        const player = document.getElementById('musicPlayer');
        if (player) player.style.display = 'none';
      });
    }
  });

  bgAudio.addEventListener('error', () => {
    const player = document.getElementById('musicPlayer');
    if (player) player.style.display = 'none';
  });
}

/* ── ⑧ EASTER EGG ──────────────────────────────────────────────── */

function initEasterEgg() {
  const btn     = document.getElementById('eggHeart');
  const message = document.getElementById('eggMessage');
  const icon    = btn?.querySelector('.egg-heart-icon');
  if (!btn || !message) return;

  let clickCount = 0;
  const threshold = 5;

  btn.addEventListener('click', () => {
    clickCount++;

    btn.style.transform = 'scale(1.25)';
    setTimeout(() => { btn.style.transform = ''; }, 200);

    if (clickCount >= threshold) {
      message.style.display = 'block';
      if (icon) icon.textContent = '❤️';
      btn.disabled = true;
      btn.style.opacity = '0.6';
    } else {
      const progress = clickCount / threshold;
      if (icon) {
        if (progress >= 0.6) icon.textContent = '🧡';
        else if (progress >= 0.4) icon.textContent = '🤎';
      }
    }
  });
}

/* ── ⑨ SMOOTH SCROLLING ──────────────────────────────────────── */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 60;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}

/* ── ⑩ INITIALISE EVERYTHING ─────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Landing screen
  createParticles();
  initLanding();

  // Core navigation & scrolling
  initNavigation();
  initSmoothScroll();

  // 4 Interactive cards and their modals
  initMemoryCards();
  initLightbox();
  initVideoModal();
  initLetterModal();

  // Final section & music
  createStars();
  initFinalSection();
  initMusicPlayer();
  initEasterEgg();
});
