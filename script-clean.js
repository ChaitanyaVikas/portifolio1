/* ====================================================
   CLEAN & OPTIMIZED PORTFOLIO JAVASCRIPT
   Formspree Integration - No Security Issues
   ==================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ----- Typing Animation -----
  const typedTextElement = document.getElementById('typed-text');
  const roles = ['Web Developer', 'Data Analyst', 'Problem Solver', 'Creative Thinker'];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeText() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeText, 2500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeText, 400);
    } else {
      setTimeout(typeText, isDeleting ? 40 : 80);
    }
  }

  if (typedTextElement) typeText();

  // ----- Smooth Scroll for Anchor Links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ----- Navbar Scroll Effect -----
  const navbar = document.querySelector('.navbar');
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // ----- Mobile Menu Toggle -----
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('active')) {
        icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
      } else {
        icon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
      }
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('svg').innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
      });
    });
  }

  // ----- Skill Bars Animation (Intersection Observer) -----
  const skillBars = document.querySelectorAll('.skill-fill');
  if (skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level || '0';
          bar.style.width = level + '%';
          skillsObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillsObserver.observe(bar));
  }

  // ----- Reveal Animations on Scroll -----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ----- Contact Form (Formspree) -----
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');

    // Validation
    const validators = {
      name: (val) => !val.trim() ? 'Name required' : val.length < 2 ? 'Min 2 characters' : '',
      email: (val) => {
        if (!val.trim()) return 'Email required';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Invalid email';
      },
      subject: (val) => !val.trim() ? 'Subject required' : '',
      message: (val) => !val.trim() ? 'Message required' : val.length < 10 ? 'Min 10 characters' : ''
    };

    const showError = (input, message) => {
      const formGroup = input.closest('.form-group');
      let errorEl = formGroup.querySelector('.error-message');
      
      if (message) {
        input.classList.add('error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'error-message';
          formGroup.appendChild(errorEl);
        }
        errorEl.textContent = message;
      } else {
        input.classList.remove('error');
        if (errorEl) errorEl.remove();
      }
    };

    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      input.addEventListener('blur', function() {
        const error = validators[this.id](this.value);
        showError(this, error);
      });

      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          const error = validators[this.id](this.value);
          showError(this, error);
        }
      });
    });

    // Form Submit with Formspree
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate all
      let isValid = true;
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        const error = validators[input.id](input.value);
        showError(input, error);
        if (error) isValid = false;
      });

      if (!isValid) return;

      // Show loading
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      submitBtn.disabled = true;

      try {
        const data = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          // Success
          submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Message Sent!';
          submitBtn.classList.remove('loading');
          
          contactForm.reset();
          showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

          // Reset button after 3s
          setTimeout(() => {
            submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Send Message';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error(error);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Send Message';
        showNotification('Error sending message. Please try again.', 'error');
      }
    });
  }

  // ----- Toast Notification -----
  function showNotification(message, type = 'success') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: hsl(220, 18%, 12%);
      border: 1px solid ${type === 'success' ? 'hsl(38, 92%, 50%)' : 'hsl(0, 84%, 60%)'};
      border-radius: 0.75rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      color: hsl(45, 20%, 95%);
      font-size: 0.875rem;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ----- Update Copyright Year -----
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ----- Counter Animation -----
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.textContent;
          const number = parseFloat(text);
          const suffix = text.replace(/[\d.]/g, '');
          const duration = 2000;
          const start = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = number * easeOutQuart;
            
            element.textContent = (Number.isInteger(number) ? Math.floor(current) : current.toFixed(1)) + suffix;
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(val => statsObserver.observe(val));
  }
});
