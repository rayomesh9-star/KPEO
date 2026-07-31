/* ============================================
   PCEA - CONTACT
   ============================================ */

class Contact {
  constructor() {
    this.forms = document.querySelectorAll('.contact-form');
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    this.forms.forEach(form => this.validateForm(form));
    this.faqItems.forEach(item => this.toggleFaq(item));
  }

  validateForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const requiredFields = form.querySelectorAll('[required]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          this.showError(field, 'This field is required');
        } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
          isValid = false;
          this.showError(field, 'Please enter a valid email');
        } else {
          this.clearError(field);
        }
      });

      if (isValid) {
        this.submitForm(form, submitBtn);
      }
    });

    requiredFields.forEach(field => {
      field.addEventListener('blur', () => {
        if (!field.value.trim()) {
          this.showError(field, 'This field is required');
        } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
          this.showError(field, 'Please enter a valid email');
        } else {
          this.clearError(field);
        }
      });
    });
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(field, message) {
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.textContent = message;
    field.style.borderColor = '#e53935';
  }

  clearError(field) {
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.textContent = '';
    field.style.borderColor = '';
  }

  submitForm(form, btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.backgroundColor = '#2E7D32';
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.backgroundColor = '';
      }, 3000);
    }, 1500);
  }

  toggleFaq(item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  }
}

window.Contact = Contact;