const toggleBtn = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');

function toggleMenu() {
  const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  toggleBtn.setAttribute('aria-expanded', String(!expanded));
  toggleBtn.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  nav.classList.toggle('open', !expanded);
}

toggleBtn?.addEventListener('click', toggleMenu);

// Cerrar al hacer click en un link (mobile)
nav?.addEventListener('click', (e) => {
  if (e.target.closest('a') && toggleBtn.offsetParent !== null) {
    toggleMenu();
  }
});
