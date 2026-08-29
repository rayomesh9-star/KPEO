/* ============================================
   KPEO - SCROLL ANIMATIONS
   ============================================ */

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Progressive enhancement: mark JS as available so CSS hides elements.
    document.documentElement.classList.add('js');

    // Auto-apply a reveal effect to every section so they "appear"
    // as you scroll down the page, without editing each HTML file.
    document.querySelectorAll('section').forEach(section => {
      const already = section.classList.contains('animate-fade-up') ||
        section.classList.contains('animate-fade-in') ||
        section.classList.contains('animate-fade-left') ||
        section.classList.contains('animate-fade-right') ||
        section.classList.contains('animate-zoom');
      if (!already) section.classList.add('animate-fade-up');
    });

    this.elements = document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-fade-left, .animate-fade-right, .animate-zoom');
    if (!this.elements.length) return;

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
      // threshold 0 + bottom margin reveals both small cards and large
      // sections (which may never reach a higher ratio) as they enter view.
      threshold: 0,
      rootMargin: '0px 0px -10% 0px'
    });

    this.elements.forEach(el => observer.observe(el));

    // Safety net: if the observer never fires (edge cases), reveal everything
    // shortly after load so nothing stays invisible.
    window.addEventListener('load', () => {
      setTimeout(revealAll, 1500);
    });
  }
}

window.ScrollAnimations = ScrollAnimations;
