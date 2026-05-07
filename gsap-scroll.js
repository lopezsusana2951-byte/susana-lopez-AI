/* ─── GSAP ScrollTrigger Animations ─────────────────────────────────────────
   Lightweight pass — word-by-word splits removed (too expensive).
   Formats pin removed — it caused video state thrashing + break on click.
   Kept: clip-path reveals, slide-ups, staggered entrances.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const E    = 'power1.out';
  const ONCE = { once: true };

  function st(trigger, startPct, extra) {
    return { scrollTrigger: { trigger, start: `top ${startPct || 80}%`, ...extra } };
  }

  /* ════════════════════════════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════════════════════════════ */
  function init() {

    /* ── PAGE 2: MANIFESTO ─────────────────────────────────────────────────── */
    const manifesto = document.querySelector('.ns--manifesto');
    if (manifesto) {

      // Eyebrow — clip wipe
      const eyebrow = manifesto.querySelector('.eyebrow');
      if (eyebrow) {
        gsap.fromTo(eyebrow,
          { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'sine.inOut',
            ...st(eyebrow, 85, ONCE) }
        );
      }

      // H2 — lines slide up (only 3 nodes, cheap)
      const h2 = manifesto.querySelector('.ns__h');
      if (h2) {
        gsap.fromTo(h2,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: E, ...st(h2, 82, ONCE) }
        );
      }

      // Beliefs — slide from left, staggered
      const beliefs = manifesto.querySelectorAll('.ns__beliefs li');
      if (beliefs.length) {
        gsap.fromTo(beliefs,
          { x: -32, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.0, ease: E, stagger: 0.18,
            ...st('.ns__beliefs', 84, ONCE) }
        );
      }

      // Video panel — curtain rise
      const video = manifesto.querySelector('.ns__video');
      if (video) {
        gsap.fromTo(video,
          { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.8, ease: 'power2.inOut',
            ...st(video, 85, ONCE) }
        );
      }
    }

    /* ── STATS ─────────────────────────────────────────────────────────────── */
    const statGrid = document.querySelector('.stats__grid');
    if (statGrid) {
      gsap.fromTo(statGrid.querySelectorAll('.stat'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: E, stagger: 0.14,
          ...st(statGrid, 82, ONCE) }
      );
    }

    /* ── SIGNATURE ─────────────────────────────────────────────────────────── */
    const sigCopy = document.querySelector('.sig__copy');
    if (sigCopy) {
      gsap.fromTo(sigCopy,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: E, ...st(sigCopy, 78, ONCE) }
      );
    }

    const sigQuote = document.querySelector('.sig__quote');
    if (sigQuote) {
      gsap.fromTo(sigQuote,
        { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power2.inOut',
          ...st(sigQuote, 82, ONCE) }
      );
    }

    const sigSkyline = document.querySelector('.sig__skyline');
    if (sigSkyline) {
      gsap.fromTo(sigSkyline,
        { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power2.inOut', delay: 0.28,
          ...st(sigSkyline, 82, ONCE) }
      );
    }

    /* ── FORMATS (Page 4) — entrance only, NO pin, NO scroll-driving ────────
       Removing the pin + scrub eliminates the video state thrashing that
       caused videos to flicker open/close and crash the component tree.
    ─────────────────────────────────────────────────────────────────────────── */
    const formatsSection = document.querySelector('.formats--case');
    if (formatsSection) {

      const fmtHead = formatsSection.querySelector('.formats__head');
      if (fmtHead) {
        gsap.fromTo(fmtHead,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: E,
            scrollTrigger: { trigger: fmtHead, start: 'top 85%', once: true } }
        );
      }

      const tabs = formatsSection.querySelectorAll('.fmt-tab');
      if (tabs.length) {
        gsap.fromTo(tabs,
          { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power2.inOut', stagger: 0.14,
            scrollTrigger: { trigger: '.fmt-tabs', start: 'top 88%', once: true } }
        );
      }

      const fmtShow = formatsSection.querySelector('.fmt-show');
      if (fmtShow) {
        gsap.fromTo(fmtShow,
          { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power2.inOut',
            scrollTrigger: { trigger: fmtShow, start: 'top 90%', once: true } }
        );
      }
    }

    ScrollTrigger.refresh();
  }

  /* ── Wait for React to fully paint, then run once ── */
  function boot() {
    if (document.querySelector('.ns--manifesto')) {
      requestAnimationFrame(() => requestAnimationFrame(init));
      return;
    }
    const mo = new MutationObserver(() => {
      if (document.querySelector('.ns--manifesto')) {
        mo.disconnect();
        requestAnimationFrame(() => requestAnimationFrame(init));
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
