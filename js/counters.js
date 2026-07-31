/* ============================================
   PCEA - ANIMATED COUNTERS
   ============================================ */

class Counters {
  constructor() {
    this.counters = document.querySelectorAll('.counter');
    this.animated = new Set();
    this.init();
  }

  init() {
    if (!this.counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animated.add(entry.target);
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    
    const duration = 2000;
    const start = performance.now();
    const startVal = 0;
    
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.floor(startVal + (target - startVal) * eased);
      
      el.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    
    requestAnimationFrame(update);
  }
}

window.Counters = Counters;