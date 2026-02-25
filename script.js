const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const listEl = document.getElementById('list');
const statusEl = document.getElementById('status');

async function loadPosts() {
  try {
    statusEl.textContent = 'Loading...';

    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch posts');

    const posts = await res.json();
    renderPosts(posts.slice(0, 10));
    statusEl.textContent = '';
  } catch (err) {
    statusEl.textContent = err.message;
  }
}

function renderPosts(posts) {
  listEl.innerHTML = posts
    .map(
      post => `
        <li>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </li>
      `
    )
    .join('');
}

loadPosts();