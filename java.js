// Elements
const hamburger = document.getElementById('hamburger');
const navBar = document.getElementById('bar');
const backToTopBtn = document.getElementById('back-to-top');
const navbar = document.querySelector('nav');
const header = document.querySelector('header');

// Quotes
const quotes = [
  "Every great developer was once a beginner.",
  "A collection of things I've built, broken, and fixed again.",
  "Code is the brush, the web is the canvas.",
  "Curiosity built this page — and it's not done yet.",
  "Design with purpose. Code with clarity.",
  "Turning coffee into code, and bugs into features.",
  "Built from late nights, mistakes, and breakthroughs."
];

// Random quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Close mobile menu
function closeMenu() {
  if (!navBar || !hamburger) return;
  navBar.classList.remove('show');
  hamburger.classList.remove('open');
  document.body.classList.remove('blur');
  header?.classList.remove('menu-open');
  navbar?.classList.remove('menu-open');
}

// Hamburger toggle
if (hamburger && navBar) {
  hamburger.addEventListener('click', () => {
    const isOpen = navBar.classList.toggle('show');
    hamburger.classList.toggle('open', isOpen);
    document.body.classList.toggle('blur', isOpen);
    header?.classList.toggle('menu-open', isOpen);
    navbar?.classList.toggle('menu-open', isOpen);
  });

  // Click outside closes menu
  document.addEventListener('click', (e) => {
    if (!navBar.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on nav link click
  const navLinks = document.querySelectorAll('#bar a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Navbar blur effect on scroll
if (navbar) {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
      navbar.classList.add('blur-on-scroll');
      if (header) {
        header.classList.add('blur-on-scroll');
        header.classList.add('scrolled');
      }
    } else {
      navbar.classList.remove('blur-on-scroll');
      if (header) {
        header.classList.remove('blur-on-scroll');
        header.classList.remove('scrolled');
      }
    }
  });
}

// Back to top button functionality
if (backToTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Scroll to anchor
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.querySelector(".intro-right .quote");
  if (quoteElement) quoteElement.textContent = getRandomQuote();

  const clickSound = document.getElementById('clickSound');
  if (clickSound) {
    const buttons = document.querySelectorAll('button, .cta-btn, a[href^="#"]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Sound error:', e));
      });
    });
  }

  // Animate cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
  });

  // Setup scroll animations
  setupScrollAnimations();
});

// Scroll animations with intersection observer
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element comes into view
        entry.target.classList.add('animate');
        
        // Add staggered delay for cards
        if (entry.target.classList.contains('scroll-animate-scale')) {
          const cards = document.querySelectorAll('.scroll-animate-scale');
          cards.forEach((card, index) => {
            if (card === entry.target) {
              card.style.animationDelay = `${index * 0.2}s`;
            }
          });
        }
      } else {
        // Remove animation class when element leaves view to allow replay
        entry.target.classList.remove('animate');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
    observer.observe(el);
  });
}

// Error handling
window.addEventListener('error', (event) => {
  console.error('JS error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});
