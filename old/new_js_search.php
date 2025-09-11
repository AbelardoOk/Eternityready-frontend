<?php 
$searchQuery = urlencode($_GET['q'] ?? '');
$searchQuery = "la";
$sites = [
    'https://www.eternityready.com'
];

$results = [];

foreach ($sites as $url) {
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    var_dump($data);
    $results = array_merge($results, $data['results'] ?? []);
}

var_dump($results);
// Sort or filter results if needed
usort($results, fn($a, $b) => $b['relevance'] <=> $a['relevance']);

// Display results
foreach ($results as $item) {
    echo "<div><a href='{$item['url']}'>{$item['title']}</a><p>{$item['snippet']}</p></div>";
}




?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI-Like Search</title>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    input { width: 100%; padding: 0.5rem; font-size: 1rem; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; background: #f5f5f5; padding: 0.75rem; border-radius: 8px; }
  </style>
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>

    <input type="text" id="searchBox" placeholder="Type to search...">

<div id="channel-grid" class="channel-grid">
  
</div>
</div>

<style>
  body {
    background-color: #000;
      align-items: center;
      justify-content: center;
      color:#fff;
   }
   



/* ------------------------------ */
 .channel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
    gap: 1.5rem;
    justify-items: center;
    margin-top:20px;
}
.channel-card {
    position: relative;
    display: block;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    background-color: #18182a;
    width: 100%;
    max-height: 200px;
    max-width: 200px;
}
.channel-card img {
    opacity: 1 !important;
}

.channel-card img {
    width: 100%;
    object-fit: cover;
    display: block;
    aspect-ratio: 16 / 9;
}
img {
    object-fit: cover;
}
img, svg {
    vertical-align: middle;
}

.channel-details {
    position: relative;
    padding: 12px;
    background: #18182a;
    height: 40%;
    box-sizing: border-box;
}
.channel-details {
    position: relative;
    padding: 12px;
    background: #18182a;
    height: 40%;
    box-sizing: border-box;
}
@media (min-width: 1200px) {
    .h3, h3 {
        font-size: 1.75rem;
    }
}

.channel-details .online {
    font-size: 0.85rem;
    color: #a0a0a0;
    margin: 0 0 8px 0;
}
.online {
    color: #22c55e !important;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.85rem;
}

.current-program {
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
p {
    margin-top: 0;
    margin-bottom: 1rem;
}
.bookmark-icon {
    font-size: 16px;
    color: #ef4444;
    transition: all 0.3s ease;
}

.fa-solid {
    color: #ef4444;
    transition: color 0.3s ease;
}
.fa-solid, .fas {
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
}
   

</style>

<script>
const input = document.getElementById("searchInput");
const container = document.querySelector('.channel-grid');

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('content.json');
  const pages = await res.json();
  const input = document.getElementById('searchBox');

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      container.innerHTML = '';
      return;
    }

    const filtered = pages.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.video_slug.toLowerCase().includes(query)
    );

    
    container.innerHTML = filtered.map(page => `
    <div class="channel-card">
      <img src="${page.yt_thumb}" alt="${page.title}">
      <div class="channel-details"><div style="display:flex;"> 
      <div style="float:left; width:90%"><p class="online">Video</p></div>  
      <div style="float:right; width:10%"><i class="fa-solid fa-bookmark bookmark-icon"></i></div>
      </div><p class="current-program" data-channel-name="3ABN"><span></span></p></div></div>`).join('');

  });
});
</script>
</body>

</html>
