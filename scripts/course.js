const courses = [
  { id: 1, code: "WDD 130", title: "Web Fundamentals",        credits: 2, type: "WDD", completed: true  },
  { id: 2, code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true  },
  { id: 3, code: "WDD 231", title: "Frontend Web Dev I",       credits: 3, type: "WDD", completed: false },
  { id: 4, code: "CSE 110", title: "Introduction to Programming",     credits: 2, type: "CSE", completed: true  },
  { id: 5, code: "CSE 111", title: "Programming with Functions",      credits: 3, type: "CSE", completed: true },
  { id: 6, code: "CSE 210", title: "Programming with Classes",        credits: 3, type: "CSE", completed: true },
];

const grid = document.getElementById('course-grid');
const creditOut = document.getElementById('credit-total');
const filterButtons = document.querySelectorAll('.filter-btn');

function formatBadge(type) {
  return type === 'WDD' ? '<span class="badge wdd">WDD</span>' : '<span class="badge cse">CSE</span>';
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
    grid.appendChild(card);
  });

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

applyFilter('all');
