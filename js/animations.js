/* ============================================
   KPEO - SCROLL ANIMATIONS
   ============================================ */

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-fade-left, .animate-fade-right, .animate-zoom');
    this.init();
  }

  init() {
    if (!this.elements.length) return;

    // Progressive enhancement: mark JS as available so CSS hides elements.
    document.documentElement.classList.add('js');

    // Failsafe: if anything goes wrong, reveal everything after load.
    const revealAll = () => this.elements.forEach(el => el.classList.add('visible'));

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    this.elements.forEach(el => observer.observe(el));

    // Safety net: if the observer never fires (e.g. off-screen edge cases),
    // reveal everything shortly after load so nothing stays invisible.
    window.addEventListener('load', () => {
      setTimeout(revealAll, 1500);
    });
  }
}

window.ScrollAnimations = ScrollAnimations;
