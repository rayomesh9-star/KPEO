/* ============================================
   PCEA - GALLERY
   ============================================ */

class Gallery {
  constructor() {
    this.buttonGroups = document.querySelectorAll('.filter-buttons');
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.lightbox = document.querySelector('.lightbox');
    this.lightboxImg = this.lightbox?.querySelector('.lightbox-content img, .lightbox-content video');
    this.closeBtn = this.lightbox?.querySelector('.lightbox-close');
    this.prevBtn = this.lightbox?.querySelector('.lightbox-prev');
    this.nextBtn = this.lightbox?.querySelector('.lightbox-next');
    
    this.currentIndex = 0;
    this.filteredItems = [];
    
    this.init();
  }

  init() {
    if (!this.galleryItems.length) return;
    
    this.buttonGroups.forEach(group => {
      const buttons = group.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => this.handleFilter(e, buttons));
      });
    });

    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });

    this.closeBtn?.addEventListener('click', () => this.closeLightbox());
    this.prevBtn?.addEventListener('click', () => this.navigate(-1));
    this.nextBtn?.addEventListener('click', () => this.navigate(1));
    
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    this.lightbox?.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });

    this.filteredItems = Array.from(this.galleryItems);
  }

  handleFilter(e, buttons) {
    const filter = e.target.dataset.filter;
    
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    this.galleryItems.forEach(item => {
      const category = item.dataset.category;
      if (filter === 'all' || filter === category) {
        item.style.display = 'block';
        setTimeout(() => item.style.display = 'block', 10);
      } else {
        item.style.display = 'none';
      }
    });

    this.filteredItems = Array.from(this.galleryItems).filter(item => {
      const cat = item.dataset.category;
      return filter === 'all' || cat === filter || item.style.display !== 'none';
    });
  }

  openLightbox(index) {
    const visibleItems = Array.from(this.galleryItems).filter(i => i.style.display !== 'none');
    this.filteredItems = visibleItems;
    this.currentIndex = this.filteredItems.indexOf(this.galleryItems[index]);
    
    if (this.currentIndex < 0 && visibleItems.length > 0) {
      this.currentIndex = 0;
    }
    
    this.showImage();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  showImage() {
    const item = this.filteredItems[this.currentIndex];
    if (!item) return;
    
    const media = item.querySelector('img, video');
    if (!media) return;
    
    if (media.tagName === 'IMG') {
      this.lightboxImg.src = media.src;
      this.lightboxImg.alt = media.alt;
    } else if (media.tagName === 'VIDEO') {
      this.lightboxImg.src = media.querySelector('source')?.src || media.poster;
      this.lightboxImg.alt = media.dataset.title || '';
    }
  }

  navigate(direction) {
    this.currentIndex += direction;
    if (this.currentIndex < 0) this.currentIndex = this.filteredItems.length - 1;
    if (this.currentIndex >= this.filteredItems.length) this.currentIndex = 0;
    this.showImage();
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleKeydown(e) {
    if (!this.lightbox?.classList.contains('active')) return;
    
    if (e.key === 'Escape') this.closeLightbox();
    if (e.key === 'ArrowLeft') this.navigate(-1);
    if (e.key === 'ArrowRight') this.navigate(1);
  }
}

window.Gallery = Gallery;