const BOOKING_URL = "https://mbarbering.booksy.com/a/";
const CONTACT_EMAIL = "YOUR_EMAIL_HERE"; // Example: hello@thedonla.com

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

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
