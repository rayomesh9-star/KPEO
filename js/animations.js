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
  }
}

window.ScrollAnimations = ScrollAnimations;