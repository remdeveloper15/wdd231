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

//Filter gold and silver members
function getTopMembers(member) {
    return member
        .filter(m => m.membershipLevel === 3 || m.membershipLevel === 2) 
        .slice(0, 3);
}

// Crea una card de negocio

function createMemberCard(member) {
  const article = document.createElement("article");
  article.classList.add("member-card");

  const logoWrapper = document.createElement("div");
  logoWrapper.classList.add("member-logo-wrapper");

  const img = document.createElement("img");
  img.src = `images/${member.logo}`;
  img.alt = `Logo of ${member.name}`;
  img.loading = "lazy";
  img.width = 50;
  img.height = 50;
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

    //Filter just gold and silver members and just 3 of them
    const topMember = getTopMembers(members);

    //Load just only those 3 members
    renderMembers(topMember);

  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = "<p>There was a problem loading the directory. Please try again later.</p>";
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
});