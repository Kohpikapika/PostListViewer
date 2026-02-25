const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 10;

const listEl = document.getElementById('list');
const statusEl = document.getElementById('status');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

let posts = [];
let currentPage = 1;

async function loadPosts() {
  try {
    statusEl.textContent = 'Loading...';
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch posts');
    posts = await res.json();
    statusEl.textContent = '';
    renderPage();
  } catch (err) {
    statusEl.textContent = err.message;
  }
}

function renderPage() {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = posts.slice(start, end);

  listEl.innerHTML = pageItems
    .map(
      post => `
      <li>
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </li>
    `
    )
    .join('');

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
  currentPage--;
  renderPage();
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  renderPage();
});

loadPosts();