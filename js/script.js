// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Set current year in footer
  document.getElementById('current-year').textContent =
    new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  // Waitlist form submission
  const waitlistForm = document.getElementById('waitlist-form');
  const thankYouMessage = document.getElementById('thank-you-message');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        updates: document.getElementById('updates').checked,
        timestamp: new Date().toISOString(),
      };

      // In a real app, you would send this to your server
      // For now, we'll log it and show success message
      console.log('Waitlist signup:', formData);

      // Save to localStorage as a simple simulation
      let submissions = JSON.parse(
        localStorage.getItem('lionWizardWaitlist') || '[]'
      );
      submissions.push(formData);
      localStorage.setItem('lionWizardWaitlist', JSON.stringify(submissions));

      // Show success message
      waitlistForm.style.display = 'none';
      thankYouMessage.style.display = 'block';

      // Scroll to thank you message
      thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Optional: Send email notification (you'd need a backend for this)
      // simulateEmailNotification(formData);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll('.value-card, .project-card, .waitlist-card')
    .forEach((el) => {
      observer.observe(el);
    });

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
        .value-card, .project-card, .waitlist-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  // Form input animations
  const formInputs = document.querySelectorAll('.form-group input');
  formInputs.forEach((input) => {
    input.addEventListener('focus', function () {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});

// Simulate email notification (for demo purposes)
function simulateEmailNotification(formData) {
  console.log('Simulating email notification...');

  // This is where you would normally make an API call to your backend
  // Example using fetch:
  /*
    fetch('/api/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    */
}

// Optional: Add a console welcome message
console.log(
  `
%c🦁⚡ Welcome to Lion Wizard Tech! 🔮💻
%c
Making the complicated understandable.

Website: lionwizardtech.com
Project: T&CSimplify (coming soon)

`,
  'color: #D4AF37; font-size: 16px; font-weight: bold;',
  'color: #8E8E93; font-size: 14px;'
);
