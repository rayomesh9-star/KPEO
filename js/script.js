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

    if (!this.slides.length) return;
    this.init();
  }

  init() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    this.dots.forEach((dot, idx) => {
      dot?.addEventListener('click', () => this.goTo(idx));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    this.startAuto();
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
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  startAuto() {
    this.interval = setInterval(() => {
      this.next();
    }, 5000);
  }
}

/* ============================================
   M-PESA MODAL
   ============================================ */
class MpesaModal {
  constructor() {
    this.triggers = document.querySelectorAll('.mpesa-trigger');
    this.modal = document.getElementById('mpesaModal');
    this.close = this.modal?.querySelector('.mpesa-modal-close');
    this.init();
  }

  init() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
    this.close?.addEventListener('click', () => this.closeModal());
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  open() {
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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
  new MpesaModal();
});