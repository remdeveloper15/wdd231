const courses = [
  { id: 1, code: "WDD 130", title: "Web Fundamentals",              credits: 2, type: "WDD", completed: true  },
  { id: 2, code: "WDD 131", title: "Dynamic Web Fundamentals",       credits: 2, type: "WDD", completed: true  },
  { id: 3, code: "WDD 231", title: "Frontend Web Dev I",             credits: 3, type: "WDD", completed: false },
  { id: 4, code: "CSE 110", title: "Introduction to Programming",    credits: 2, type: "CSE", completed: true  },
  { id: 5, code: "CSE 111", title: "Programming with Functions",     credits: 3, type: "CSE", completed: true  },
  { id: 6, code: "CSE 210", title: "Programming with Classes",       credits: 3, type: "CSE", completed: true  },
];

const grid = document.getElementById('course-grid');
const creditOut = document.getElementById('credit-total');
const filterButtons = document.querySelectorAll('.filter-btn');

// 👇 dialog del HTML
const courseDetails = document.getElementById('course-details');

function formatBadge(type) {
  return type === 'WDD'
    ? '<span class="badge wdd">WDD</span>'
    : '<span class="badge cse">CSE</span>';
}

function renderCourses(list) {
  if (!grid) return;
  grid.innerHTML = '';

  list.forEach((c) => {
    const card = document.createElement('article');
    card.className = 'course-card';
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <header>
        <span class="course-code">${c.code}</span>
        ${formatBadge(c.type)}
      </header>
      <div class="course-title">${c.title}</div>
      <div class="course-meta">
        <span class="badge" aria-label="Credits">${c.credits} cr</span>
        ${c.completed ? '<span class="badge done" aria-label="Completed">Completed</span>' : ''}
      </div>
    `;

    // 👇 Abrir modal al hacer click en la tarjeta
    card.addEventListener('click', () => {
      displayCourseDetails(c);
    });

    // (Opcional) abrir también con Enter cuando la card tiene foco
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        displayCourseDetails(c);
      }
    });

    grid.appendChild(card);
  });

  // Total de créditos de la lista filtrada
  const total = list.reduce((sum, c) => sum + c.credits, 0);
  if (creditOut) creditOut.textContent = total;
}

function applyFilter(kind) {
  let list = courses;
  if (kind === 'WDD') list = courses.filter(c => c.type === 'WDD');
  if (kind === 'CSE') list = courses.filter(c => c.type === 'CSE');
  renderCourses(list);
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    applyFilter(btn.dataset.filter);
  });
});

// Render inicial
applyFilter('all');

// ========= MODAL / DIALOG ============

function displayCourseDetails(course) {
  if (!courseDetails) return;

  // Rellenamos el contenido del dialog
  courseDetails.innerHTML = `
    <div class="course-dialog">
      <button type="button" id="closeModal" class="close-btn" aria-label="Close details">✕</button>
      <h2>${course.code}</h2>
      <h3>${course.title}</h3>
      <p><strong>Type:</strong> ${course.type}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Status:</strong> ${course.completed ? 'Completed ✅' : 'In progress ⏳'}</p>
    </div>
  `;

  // Abrir el diálogo
  courseDetails.showModal();

  // Botón de cerrar (lo buscamos después de poner innerHTML)
  const closeBtn = courseDetails.querySelector('#closeModal');
  closeBtn.addEventListener('click', () => {
    courseDetails.close();
  });

  // Cerrar también con tecla Escape (el <dialog> ya maneja esto en la mayoría de navegadores)
  courseDetails.addEventListener('cancel', (event) => {
    event.preventDefault();
    courseDetails.close();
  });
}
