const BOOKING_URL = "https://app.thecut.co/barbers/Don--Johnson-dj6i4ey";
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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  const formNote = document.getElementById('formNote');

  if (!form.checkValidity()) {
    form.reportValidity();
    formNote.textContent = 'Please complete every field before sending.';
    formNote.className = 'form-note form-error';
    return;
  }

  const data = new FormData(form);
  data.append('_subject', `DJ Live AC booking inquiry from ${data.get('name')}`);
  data.append('_template', 'table');
  data.append('_captcha', 'false');

  submitButton.disabled = true;
  submitButton.classList.add('is-loading');
  submitButton.firstChild.textContent = 'Sending… ';
  formNote.textContent = 'Sending your booking inquiry…';
  formNote.className = 'form-note';

  fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: data
  })
    .then((response) => {
      if (!response.ok) throw new Error('Submission failed');
      return response.json();
    })
    .then(() => {
      form.reset();
      formNote.textContent = 'Thank you — your inquiry was sent. We’ll be in touch soon.';
      formNote.className = 'form-note form-success';
    })
    .catch(() => {
      formNote.textContent = 'We couldn’t send that right now. Please try again or message @djliveac on Instagram.';
      formNote.className = 'form-note form-error';
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.classList.remove('is-loading');
      submitButton.firstChild.textContent = 'Send Inquiry ';
    });
});
