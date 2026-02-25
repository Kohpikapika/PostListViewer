const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const PAGE_SIZE = 10;

const listEl = document.getElementById('list');
const statusEl = document.getElementById('status');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchInput');

let posts = [];
let filteredPosts = [];
let currentPage = 1;

async function loadPosts() {
  try {
    statusEl.textContent = 'Loading...';
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch posts');
    posts = await res.json();
    filteredPosts = posts;
    statusEl.textContent = '';
    renderPage();
  } catch (err) {
    statusEl.textContent = err.message;
  }
}

function renderPage() {
  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);

  if (filteredPosts.length === 0) {
    listEl.innerHTML = '<li>No results found.</li>';
    pageInfo.textContent = '';
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = filteredPosts.slice(start, end);

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

  pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();

  filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(keyword)
  );

  currentPage = 1;
  renderPage();
});

prevBtn.addEventListener('click', () => {
  currentPage--;
  renderPage();
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  renderPage();
});

loadPosts();