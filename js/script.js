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
    this.initSearch();
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

  initSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.project-card').forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const desc = card.querySelector('.card-text').textContent.toLowerCase();
        if (title.includes(term) || desc.includes(term)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

ready(() => {
  new App();
  new Navigation();
  new Gallery();
  new Counters();
  new ScrollAnimations();
  new Contact();
});