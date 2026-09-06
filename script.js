const BOOKING_URL = "https://booksy.com/en-us/1654_m-barbering_barber-shop_134655_los-angeles/staffer/109442#ba_s=dl_1";
const CONTACT_EMAIL = "donjohnson1902@gmail.com";

const startAtTop = () => {
  const root = document.documentElement;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    root.style.removeProperty('scroll-behavior');
  });
};

startAtTop();
window.addEventListener('pageshow', startAtTop);
window.addEventListener('load', startAtTop, { once: true });

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const logoButton = document.querySelector('.brand-mark');
const logoLightbox = document.querySelector('.logo-lightbox');
const logoCloseButton = document.querySelector('.logo-lightbox-close');
const logoBackdrop = document.querySelector('.logo-lightbox-backdrop');

const openLogo = () => {
  logoLightbox.hidden = false;
  document.body.classList.add('logo-open');
  logoCloseButton.focus();
};

const closeLogo = () => {
  logoLightbox.hidden = true;
  document.body.classList.remove('logo-open');
  logoButton.focus();
};

logoButton.addEventListener('click', openLogo);
logoCloseButton.addEventListener('click', closeLogo);
logoBackdrop.addEventListener('click', closeLogo);

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !logoLightbox.hidden) {
    closeLogo();
    return;
  }
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.focus();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!CONTACT_EMAIL || CONTACT_EMAIL === 'YOUR_EMAIL_HERE') {
    note.textContent = 'Add The Don’s contact email in script.js to activate this form.';
    note.style.color = '#c8ff3d';
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`The Don LA website inquiry from ${data.get('name')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Email: ${data.get('email')}
Phone: ${data.get('phone') || 'Not provided'}

${data.get('message')}`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
