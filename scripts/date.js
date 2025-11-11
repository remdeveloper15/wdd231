// Copyright year
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Last modified string
const lm = document.getElementById('lastModified');
if (lm) {
  lm.textContent = `Last Modified: ${document.lastModified}`;
}
