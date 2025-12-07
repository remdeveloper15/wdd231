import { initNavigation } from "./navigation.js";
import { initThemeToggle } from "./theme-toggle.js";
import { initDates } from "./date.js";

initNavigation();
initThemeToggle();
initDates();

// ====== CONFIGURACIÓN ======

const PRODUCTS_URL = "data/products.json";

let allProducts = [];

// ====== UTILIDAD: FORMATEAR PRECIO ======
function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

// ====== RENDERIZAR TARJETAS ======

function renderProducts(products) {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!products.length) {
    grid.innerHTML = `
      <article class="card">
        <h2>No products found</h2>
        <p class="text-muted">Try another combination of filters.</p>
      </article>
    `;
    return;
  }

  products.forEach((product) => {
    const article = document.createElement("article");
    article.className = "card product-card";
    article.innerHTML = `
      <div class="item-card-img">
        <img src="${product.image}"
             alt="${product.alt}"
             loading="lazy">
      </div>
      <span class="card-tag">${product.categoryLabel}</span>
      <h2>${product.name}</h2>
      <p>${product.shortDescription}</p>
      <p class="price">${formatPrice(product.price)}</p>
      <p class="text-muted">${product.suitableFor}</p>
      <button type="button"
              class="btn btn-outline product-details-btn"
              data-product-id="${product.id}">
        View details
      </button>
    `;
    grid.appendChild(article);
  });
}

// ====== FILTROS ======

function applyFilters() {
  const categorySelect = document.querySelector("#filter-category");
  const priceSelect = document.querySelector("#filter-price");

  let filtered = [...allProducts]; // copia

  const categoryValue = categorySelect?.value ?? "all";
  const priceValue = priceSelect?.value ?? "all";

  // filter por categoría
  if (categoryValue !== "all") {
    filtered = filtered.filter((product) => product.category === categoryValue);
  }

  // filter por precio máximo
  if (priceValue !== "all") {
    const maxPrice = Number(priceValue);
    filtered = filtered.filter((product) => product.price <= maxPrice);
  }

  renderProducts(filtered);
}

// ====== MODAL ======

function openProductModal(product) {
  const backdrop = document.querySelector("#product-modal-backdrop");
  const contentContainer = document.querySelector("#product-modal-content");

  if (!backdrop || !contentContainer) return;

  const featuresList = (product.features || [])
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  const stockText = product.inStock ? "In stock" : "Currently unavailable";

  contentContainer.innerHTML = `
    <h2 id="product-modal-title" class="modal-title">${product.name}</h2>
    <p class="modal-subtitle">${product.shortDescription}</p>

    <p class="modal-price">${formatPrice(product.price)}</p>

    <p>
      <span class="modal-badge">Category: ${product.categoryLabel}</span>
      <span class="modal-badge">${stockText}</span>
      ${
        product.recommended
          ? `<span class="modal-badge">Recommended</span>`
          : ""
      }
    </p>

    <p class="text-muted">${product.suitableFor}</p>

    ${
      featuresList
        ? `
      <h3 style="font-size: 0.95rem; margin-top: 1rem;">Key features</h3>
      <ul class="modal-features">
        ${featuresList}
      </ul>
    `
        : ""
    }
  `;

  backdrop.hidden = false;
  document.body.classList.add("modal-open");

  // focus al botón de cerrar
  const closeButton = backdrop.querySelector(".modal-close");
  closeButton?.focus();
}

function closeProductModal() {
  const backdrop = document.querySelector("#product-modal-backdrop");
  if (!backdrop) return;

  backdrop.hidden = true;
  document.body.classList.remove("modal-open");
}

function initModalEvents() {
  const backdrop = document.querySelector("#product-modal-backdrop");
  const closeButton = document.querySelector(".modal-close");
  const grid = document.querySelector("#product-grid");

  if (!backdrop || !closeButton || !grid) return;

  // Abrir modal al hacer clic en "View details"
  grid.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.classList.contains("product-details-btn")
    ) {
      const productId = target.getAttribute("data-product-id");
      const product = allProducts.find((item) => item.id === productId);
      if (product) {
        openProductModal(product);
      }
    }
  });

  // Cerrar modal con botón
  closeButton.addEventListener("click", () => {
    closeProductModal();
  });

  // Cerrar modal si haces click fuera del diálogo
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      closeProductModal();
    }
  });

  // Cerrar modal con ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !backdrop.hidden) {
      closeProductModal();
    }
  });
}

// ====== FETCH DE PRODUCTOS ======

async function loadProducts() {
  try {
    const response = await fetch(PRODUCTS_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    // Validar estructura mínima
    if (!data || !Array.isArray(data.products)) {
      throw new Error("Invalid products JSON format.");
    }

    allProducts = data.products;

    // Ordenar por recomendados primero (ejemplo de array method adicional)
    allProducts.sort((a, b) => Number(b.recommended) - Number(a.recommended));

    applyFilters();
  } catch (error) {
    console.error("Error loading products:", error);
    const grid = document.querySelector("#product-grid");
    if (grid) {
      grid.innerHTML = `
        <article class="card">
          <h2>There was a problem loading the products.</h2>
          <p class="text-muted">Please refresh the page or try again later.</p>
        </article>
      `;
    }
  }
}

// ====== INICIALIZACIÓN ======

function initFilters() {
  const categorySelect = document.querySelector("#filter-category");
  const priceSelect = document.querySelector("#filter-price");

  categorySelect?.addEventListener("change", applyFilters);
  priceSelect?.addEventListener("change", applyFilters);
}

function initStorePage() {
  initFilters();
  initModalEvents();
  loadProducts();
}

initStorePage();
