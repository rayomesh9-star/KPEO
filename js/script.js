/* ============================================
   KPEO - MAIN SCRIPT
   ============================================ */

const ready = (fn) => {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

class App {
  constructor() {
    this.init();
  }

  init() {
    this.hideLoader();
  }

  hideLoader() {
    const loader = document.querySelector('.loading-screen');
    if (loader) {
      window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 500);
      });
    }
  }

  initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      return;
    }
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

/* ============================================
   HERO CAROUSEL
   ============================================ */
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.dots = document.querySelectorAll('.hero-dots .dot');
    this.prevBtn = document.querySelector('.hero-prev');
    this.nextBtn = document.querySelector('.hero-next');
    this.currentIndex = 0;
    this.interval = null;
    this.paused = false;

    if (!this.slides.length) return;
    this.init();
  }

  init() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    this.dots.forEach((dot, idx) => {
      dot?.addEventListener('click', () => this.goTo(idx));
    });

    const hero = document.querySelector('.hero');
    hero?.addEventListener('mouseenter', () => this.pause());
    hero?.addEventListener('mouseleave', () => this.resume());
    hero?.addEventListener('mousemove', (e) => this.handleMouseMove(e));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    this.startAuto();
  }

  handleMouseMove(e) {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const activeSlide = document.querySelector('.hero-slide.active .hero-background');
    if (activeSlide) {
      activeSlide.style.transform = `scale(1.08) translate(${x * -15}px, ${y * -15}px)`;
    }
  }

  goTo(index) {
    if (index === this.currentIndex) return;
    
    this.slides[this.currentIndex].classList.remove('active');
    this.dots[this.currentIndex]?.classList.remove('active');
    this.dots[this.currentIndex]?.classList.add('pulse');
    
    this.currentIndex = index;
    if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
    if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
    
    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex]?.classList.add('active');
    
    setTimeout(() => {
      this.dots[this.currentIndex]?.classList.remove('pulse');
    }, 600);
  }

  next() {
    this.goTo(this.currentIndex + 1);
    this.resetAuto();
  }

  prev() {
    this.goTo(this.currentIndex - 1);
    this.resetAuto();
  }

  startAuto() {
    this.interval = setInterval(() => {
      if (!this.paused) this.next();
    }, 5000);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    const activeSlide = document.querySelector('.hero-slide.active .hero-background');
    if (activeSlide) {
      activeSlide.style.transform = 'scale(1) translate(0, 0)';
    }
  }

  resetAuto() {
    clearInterval(this.interval);
    this.startAuto();
  }
}

ready(() => {
  new App();
  new Navigation();
  new Gallery();
  new Counters();
  new ScrollAnimations();
  new Contact();
  new HeroCarousel();
});