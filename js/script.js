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
    const reveal = () => {
      if (loader) loader.classList.add('hidden');
      const content = document.querySelector('main') || document.body;
      content.classList.add('page-loaded');
    };
    if (loader) {
      window.addEventListener('load', () => {
        setTimeout(reveal, 500);
      });
    } else {
      const content = document.querySelector('main') || document.body;
      content.classList.add('page-loaded');
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

class PageTransition {
  constructor() {
    this.init();
  }

  init() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || link.target === '_blank' || link.hasAttribute('download')) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        const dest = link.href;
        document.body.classList.add('page-fade-out');
        setTimeout(() => { window.location.href = dest; }, 400);
      });
    });
  }
}

class ScrollProgress {
  constructor() {
    this.init();
  }

  init() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    this.bar = bar;

    this.update = this.update.bind(this);
    window.addEventListener('scroll', this.update, { passive: true });
    window.addEventListener('resize', this.update, { passive: true });
    this.update();
  }

  update() {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    this.bar.style.width = pct + '%';
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
  new PageTransition();
  new ScrollProgress();
});