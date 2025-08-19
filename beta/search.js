
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let index = [];
let fuse;

function renderResults(results) {
  resultsDiv.innerHTML = "";
  results.forEach(result => {
    const item = result.item || result;
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `
      <a href="${item.url}">
        <img src="${item.thumbnail || ''}" class="thumb" />
        <strong>${item.title}</strong><br/>
        ${item.snippet}
      </a>
    `;
    resultsDiv.appendChild(div);
  });
}

async function loadIndex() {
  try {
    const cached = localStorage.getItem("site_index");
    if (cached) {
      index = JSON.parse(cached);
    } else {
      const res = await fetch("index.json");
      index = await res.json();
      localStorage.setItem("site_index", JSON.stringify(index));
    }

    fuse = new Fuse(index, {
      keys: ["title", "content", "snippet"],
      includeScore: true,
      threshold: 0.3
    });
  } catch (e) {
    console.error("Failed to load index:", e);
  }
}

searchInput.addEventListener("input", e => {
  const term = e.target.value.trim();
  if (!term) {
    resultsDiv.innerHTML = "";
    return;
  }
  const results = fuse.search(term);
  renderResults(results);
});

loadIndex();
