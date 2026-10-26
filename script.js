// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// "Say Hello" menu: choose Email or LinkedIn
const hello = document.querySelector('.hello');
const helloToggle = hello.querySelector('.hello-toggle');
const setHelloOpen = open => {
  hello.classList.toggle('open', open);
  helloToggle.setAttribute('aria-expanded', open);
};
helloToggle.addEventListener('click', e => {
  e.stopPropagation();
  setHelloOpen(!hello.classList.contains('open'));
});
hello.querySelectorAll('.hello-menu a').forEach(a => a.addEventListener('click', () => setHelloOpen(false)));
document.addEventListener('click', e => { if (!hello.contains(e.target)) setHelloOpen(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setHelloOpen(false); });

// Theme toggle (persists choice; defaults to OS preference)
const root = document.documentElement;
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const current = root.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  })
);

// Typing effect for the role line
const roles = ['AI/ML Engineer', 'NLP & LLM Enthusiast', 'Computer Vision Developer', 'Data-Driven Problem Solver'];
const typed = document.getElementById('typed');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  let roleIndex = 0, charIndex = roles[0].length, deleting = true;
  const tick = () => {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typed.textContent = word.slice(0, charIndex);
    let delay = deleting ? 45 : 90;
    if (!deleting && charIndex === word.length) { deleting = true; delay = 1800; }
    else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2000);
}

// Reveal sections on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Highlight the active nav link
const links = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
