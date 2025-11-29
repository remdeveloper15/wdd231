// scripts/discover.js
import { spots } from "../data/discover-spots.mjs";

function renderVisitMessage() {
  const messageEl = document.querySelector("#visit-message");
  if (!messageEl) return;

  const STORAGE_KEY = "discover-last-visit";
  const now = Date.now();
  const lastVisit = localStorage.getItem(STORAGE_KEY);

  if (!lastVisit) {
    // Primera visita
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
    localStorage.setItem(STORAGE_KEY, String(now));
    return;
  }

  const lastVisitMs = Number(lastVisit);
  const diffMs = now - lastVisitMs;
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (diffMs < oneDayMs) {
    messageEl.textContent = "Back so soon! Awesome!";
  } else {
    const days = Math.floor(diffMs / oneDayMs);
    const label = days === 1 ? "day" : "days";
    messageEl.textContent = `You last visited ${days} ${label} ago.`;
  }

  // Actualizar la fecha de última visita al final
  localStorage.setItem(STORAGE_KEY, String(now));
}

function createSpotCard(spot, index) {
  const article = document.createElement("article");
  article.classList.add("discover-card");
  // Para poder depurar si hace falta
  article.dataset.id = spot.id;
  article.dataset.index = index + 1;

  const title = document.createElement("h2");
  title.textContent = spot.name;

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = spot.image;
  img.alt = spot.alt;
  img.loading = "lazy";
  img.width = 300;
  img.height = 200;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = spot.name;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  const addressEl = document.createElement("address");
  addressEl.textContent = spot.address;

  const desc = document.createElement("p");
  desc.textContent = spot.description;

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("learn-more-btn");
  button.textContent = "Learn more";

  article.appendChild(title);
  article.appendChild(figure);
  article.appendChild(addressEl);
  article.appendChild(desc);
  article.appendChild(button);

  return article;
}

function renderSpots() {
  const grid = document.querySelector(".discover-grid");
  if (!grid) return;

  spots.forEach((spot, index) => {
    const card = createSpotCard(spot, index);
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderVisitMessage();
  renderSpots();
});
