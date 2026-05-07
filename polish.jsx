/* global React */
// Robust reveal: applies `.shown` to `.fade` elements when in viewport.
// Runs after every render via requestIdleCallback + observer that re-binds
// on DOM mutations. Belt-and-braces with a CSS failsafe (4s).
(function () {
  let io;
  function bind() {
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("shown");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    }
    document.querySelectorAll(".fade:not(.shown)").forEach((el) => {
      // Reveal anything already in/above viewport immediately
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) {
        el.classList.add("shown");
      } else {
        io.observe(el);
      }
    });
  }
  // Initial bind once DOM is ready
  function kick() { bind(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", kick);
  } else {
    kick();
  }
  // Re-bind after React mounts/updates
  const mo = new MutationObserver(() => {
    if (mo._t) cancelAnimationFrame(mo._t);
    mo._t = requestAnimationFrame(bind);
  });
  mo.observe(document.body, { childList: true, subtree: true });
  // Final failsafe
  setTimeout(() => {
    document.querySelectorAll(".fade:not(.shown)").forEach((el) => el.classList.add("shown"));
  }, 5000);
})();

// (Section counter is now rendered by SideRail in app.jsx.)
