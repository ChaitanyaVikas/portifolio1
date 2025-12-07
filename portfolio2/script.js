/* =====================================================
   PREMIUM PORTFOLIO - JAVASCRIPT
   Ultra-Premium Interactive Effects
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ----- Mouse Glow Effect -----
  const hero = document.querySelector('.hero');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  
  // Create mouse glow element
  const mouseGlow = document.createElement('div');
  mouseGlow.className = 'mouse-glow';
  mouseGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, hsla(38, 95%, 54%, 0.08) 0%, transparent 60%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(mouseGlow);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseGlow.style.opacity = '0.9';
  });

  document.addEventListener('mouseleave', () => {
    mouseGlow.style.opacity = '0';
  });

  // Smooth follow animation
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    mouseGlow.style.left = glowX + 'px';
    mouseGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ----- Parallax Effect on Hero Elements -----
  const blobs = document.querySelectorAll('.hero-bg .blob');
  const heroGrid = document.querySelector('.hero-grid');
  
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;
    
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.5;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
    
    if (heroGrid) {
      heroGrid.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
  });

  // ----- Counter Animation for Stats -----
  const statValues = document.querySelectorAll('.stat-value');
  
  const animateCounter = (element) => {
    const text = element.textContent;
    const number = parseFloat(text);
    const suffix = text.replace(/[\d.]/g, '');
    const duration = 2000;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = number * easeOutQuart;
      
      if (Number.isInteger(number)) {
        element.textContent = Math.floor(current) + suffix;
      } else {
        element.textContent = current.toFixed(1) + suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Observe stat cards
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statValue = entry.target.querySelector('.stat-value');
        if (statValue) {
          animateCounter(statValue);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
  });

  // ----- Typing Animation Effect -----
  const typedTextElement = document.getElementById('typed-text');
  const roles = ['Web Developer', 'Data Analyst', 'Problem Solver', 'Creative Thinker'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeText, typingSpeed);
  }

  if (typedTextElement) {
    typeText();
  }

  // ----- Navigation Scroll Effect with Progress -----
  const navbar = document.querySelector('.navbar');
  
  // Create scroll progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, hsl(38, 95%, 54%), hsl(45, 100%, 70%));
    z-index: 1001;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px hsla(38, 95%, 54%, 0.5);
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update progress bar
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // ----- Mobile Menu Toggle -----
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('svg');
    if (mobileMenu.classList.contains('active')) {
      icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
    } else {
      icon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
    }
  });

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('svg');
      icon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
    });
  });

  // ----- Skill Bars Animation -----
  const skillBars = document.querySelectorAll('.skill-fill');
  
  const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.skill-fill');
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.level + '%';
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  };

  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(animateSkillBars, {
      threshold: 0.2
    });
    skillsObserver.observe(skillsSection);
  }

  // ----- Reveal Animations on Scroll -----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
  
  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Also animate children with stagger class
        if (entry.target.classList.contains('stagger-children')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('active');
            }, index * 100);
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ----- Contact Form Validation -----
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');

    // Validation functions
    const validators = {
      name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      },
      email: (value) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      },
      subject: (value) => {
        if (!value.trim()) return 'Subject is required';
        return '';
      },
      message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      }
    };

    // Show/hide error
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

    // Validate on blur
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

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate all fields
      let isValid = true;
      const fields = [
        { input: nameInput, validator: validators.name },
        { input: emailInput, validator: validators.email },
        { input: subjectInput, validator: validators.subject },
        { input: messageInput, validator: validators.message }
      ];

      fields.forEach(({ input, validator }) => {
        const error = validator(input.value);
        showError(input, error);
        if (error) isValid = false;
      });

      if (!isValid) return;

      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success state
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        Message Sent!
      `;

      // Reset form
      contactForm.reset();

      // Show success notification
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

      // Reset button after delay
      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Send Message
        `;
      }, 3000);
    });
  }

  // ----- Toast Notification -----
  function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    // Create notification
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: hsl(220, 18%, 12%);
      border: 1px solid hsl(38, 92%, 50%);
      border-radius: 0.75rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      color: hsl(45, 20%, 95%);
      font-size: 0.875rem;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;

    toast.querySelector('svg').style.color = 'hsl(38, 92%, 50%)';

    document.body.appendChild(toast);

    // Add animation keyframes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);

    // Remove after delay
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ----- Smooth Scroll for Anchor Links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----- Update Copyright Year -----
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

//contact form formspree service
// contact form submission with formspree
const form = document.getElementById("contact-form");

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    alert("message sent successfully!");
    form.reset();
  } else {
    alert("error sending message. please try again.");
  }
});

