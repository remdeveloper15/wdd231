// scripts/directory.js

const MEMBERS_URL = "data/members.json";

const membersContainer = document.querySelector("#members");
const viewButtons = document.querySelectorAll(".view-button");

// Mapea el nivel numérico a texto
function getMembershipLabel(level) {
  switch (level) {
    case 3:
      return "Gold Member";
    case 2:
      return "Silver Member";
    default:
      return "Member";
  }
}

// Crea una card de negocio
function createMemberCard(member) {
  const article = document.createElement("article");
  article.classList.add("member-card");

  const logoWrapper = document.createElement("div");
  logoWrapper.classList.add("member-logo-wrapper");

  const img = document.createElement("img");
  img.src = `images/members/${member.logo}`;
  img.alt = `Logo of ${member.name}`;
  img.loading = "lazy";
  img.width = 120;
  img.height = 120;
  logoWrapper.appendChild(img);

  const content = document.createElement("div");
  content.classList.add("member-content");

  const name = document.createElement("h2");
  name.textContent = member.name;

  const level = document.createElement("p");
  level.classList.add("member-level");
  level.textContent = getMembershipLabel(member.membershipLevel);

  const address = document.createElement("p");
  address.classList.add("member-address");
  address.textContent = member.address;

  const phone = document.createElement("p");
  phone.classList.add("member-phone");
  phone.textContent = member.phone;

  if (member.description) {
    const desc = document.createElement("p");
    desc.classList.add("member-description");
    desc.textContent = member.description;
    content.appendChild(desc);
  }

  const linkWrapper = document.createElement("p");
  linkWrapper.classList.add("member-link-wrapper");

  const website = document.createElement("a");
  website.href = member.website;
  website.target = "_blank";
  website.rel = "noopener";
  website.textContent = "Visit website";

  linkWrapper.appendChild(website);

  content.appendChild(name);
  content.appendChild(level);
  content.appendChild(address);
  content.appendChild(phone);
  content.appendChild(linkWrapper);

  article.appendChild(logoWrapper);
  article.appendChild(content);

  return article;
}

// Renderiza todos los miembros
function renderMembers(members) {
  membersContainer.innerHTML = "";
  members.forEach(member => {
    const card = createMemberCard(member);
    membersContainer.appendChild(card);
  });
}

// Carga datos desde el JSON
async function loadMembers() {
  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    const members = data.members || [];
    renderMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = "<p>There was a problem loading the directory. Please try again later.</p>";
  }
}

// Toggle entre grid y list
function setupViewToggle() {
  viewButtons.forEach(button => {
    button.addEventListener("click", () => {
      const view = button.dataset.view; // "grid" o "list"

      membersContainer.classList.remove("grid", "list");
      membersContainer.classList.add(view);

      viewButtons.forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    });
  });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  setupViewToggle();
  loadMembers();
});
