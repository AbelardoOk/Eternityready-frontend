document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('content.json');
  const pages = await res.json();
  const input = document.getElementById('searchBox');
  const resultsEl = document.getElementById('results');
      const el = document.getElementById('target');
const text = el.textContent;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      resultsEl.innerHTML = '';
      return;
    }

    const filtered = pages.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.video_slug.toLowerCase().includes(query)
    );

    //const video_url = "https://www.eternityready.com/watch.php?vid="+page.yt_id;

    resultsEl.innerHTML = filtered.map(page =>
      `<li><img src="${page.yt_thumb}" width="50px" /> <a href="${video_url}">${page.yt_id}</a></li>`
    ).join('');
  });
});
