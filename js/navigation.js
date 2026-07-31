/* ============================================
   PCEA - NAVIGATION
   ============================================ */

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.mobileBtn = document.querySelector('.mobile-menu-btn');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.sections = document.querySelectorAll('section[id]');
    this.backToTop = document.querySelector('.back-to-top');
    
    this.init();
  }

  init() {
    if (!this.navbar) return;
    this.bindEvents();
    this.setActiveLink();
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.mobileBtn?.addEventListener('click', () => this.toggleMobileMenu());
    this.backToTop?.addEventListener('click', () => this.scrollToTop());
    
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    window.addEventListener('resize', () => this.closeMobileMenu());
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    if (this.backToTop) {
      if (window.scrollY > 500) {
        this.backToTop.classList.add('visible');
      } else {
        this.backToTop.classList.remove('visible');
      }
    }

    this.setActiveLink();
  }

  toggleMobileMenu() {
    this.mobileBtn.classList.toggle('active');
    this.mobileMenu.classList.toggle('active');
    document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.mobileBtn.classList.remove('active');
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setActiveLink() {
    let current = '';
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
}

window.Navigation = Navigation;