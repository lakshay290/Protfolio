/* ===== Particle Background ===== */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let particles = [];
  const PARTICLE_COUNT = 80;
  const CONNECTION_DIST = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 170, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 170, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
})();

/* ===== Navbar Scroll Effect ===== */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ===== Mobile Menu Toggle ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* ===== Scroll Reveal ===== */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ===== Typing Effect for Tagline ===== */
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const phrases = [
    'CSE Student | AI/ML Enthusiast | Backend Developer',
    'Building intelligent systems & scalable backends',
    'Turning coffee into code since day one ☕'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 60;

  function typeEffect() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typingSpeed = 2000; // pause at end
      } else {
        typingSpeed = 60 + Math.random() * 40;
      }
    } else {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
    }
    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 1500);
}

/* ===== Staggered Card Animations ===== */
document.querySelectorAll('.projects-grid .project-card, .certs-grid .cert-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

/* ===== Read More Button Functionality ===== */
const projectPages = [
  'project-hms.html',
  'project-lms.html',
  'project-appointment-scheduler.html',
  'project-medical-predictor.html',
  'project-chatbot.html',
  'project-process-monitor.html',
  'project-event-reminder.html'
];

document.querySelectorAll('.read-more-btn').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (projectPages[index]) {
      window.location.href = projectPages[index];
    }
  });
});
