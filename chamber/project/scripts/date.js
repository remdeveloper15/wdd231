export function initDates() {
  const yearSpan = document.querySelector("#current-year");
  const lastModifiedP = document.querySelector("#lastModified");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  if (lastModifiedP) {
    lastModifiedP.textContent = `Last updated: ${document.lastModified}`;
  }
}
