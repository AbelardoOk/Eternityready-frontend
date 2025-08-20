// script.js

/**
 * @param {Function} func A função a ser executada após o delay.
 * @param {number} delay O tempo de espera em milissegundos.
 * @returns {Function} A nova função debounced.
 */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  const API_BASE_URL = "https://api.eternityready.com";
  const dynamicContentArea = document.getElementById("dynamic-content-area");

  const params = new URLSearchParams(window.location.search);
  const queryValue = params.get("query") || "";

  /**
   * Cria o HTML para um único card de vídeo.
   * @param {object} video - O objeto de vídeo da API.
   * @param {string} title
   * @param {Array} videos
   * @returns {string} - O HTML do media-card.
   */

  function renderLiveResults(videos) {
    // Esconde as seções de histórico e categorias
    categoriesSection.style.display = "none";
    historySection.style.display = "none";
    mediaSection.style.display = "block"; // Mostra a seção de resultados
    mediaList.innerHTML = ""; // Limpa resultados antigos

    if (videos.length === 0) {
      mediaList.innerHTML =
        '<li class="search-feedback">No results found.</li>';
      return;
    }

    videos.slice(0, 5).forEach((video) => {
      const imageUrl = video.thumbnail?.url
        ? `${API_BASE_URL}${video.thumbnail.url}`
        : "images/placeholder.jpg";

      const li = document.createElement("li");
      li.className = "media-item";
      const videoUrl = `/player/?q=${video.id}`;
      li.innerHTML = `
        <img src="${imageUrl}" alt="${video.title}">
        <div class="media-info">
          <p class="media-title">${video.title}</p>
          <p class="media-meta">${video.categories
            .map((c) => c.name)
            .join(", ")}</p>
        </div>`;

      // Opcional: Adiciona um evento de clique para ir para a página do vídeo
      li.onclick = () => {
        window.location.href = videoUrl; // Exemplo de navegação
        console.log("Clicou em:", video.title);
      };

      mediaList.appendChild(li);
    });
  }

  function createAllVideosGridHTML(title, videos) {
    // Gera o HTML para todos os cards de vídeo
    const cardsHTML = videos.map(createVideoCardHTML).join("");

    return `
      <section class="media-section">
        <div class="all-videos-section">
          <div class="section-header">
            <h2 class="section-title">${title}</h2>
          </div>
          <div class="media-grid all-videos-grid">
            ${cardsHTML}
          </div>
        </div>
      </section>
    `;
  }

  function createVideoCardHTML(video) {
    const imageUrl = video.thumbnail?.url
      ? `${API_BASE_URL}${video.thumbnail.url}`
      : "images/placeholder.jpg";

    const videoUrl = `/player/?q=${video.id}`;

    const title = video.title;
    const author = video.author || "Eternity Ready";
    const categoriesText = video.categories.map((cat) => cat.name).join(", ");

    return `
      <div class="media-card" onclick="window.location.href='${videoUrl}'">
        <div class="media-thumb">
          <img src="${imageUrl}" alt="${title}" />
          <span class="media-badge">New</span>
          <span class="media-duration"></span> </div>
        <div class="media-info-col">
          <p class="media-title">${title}</p>
          <div class="media-subinfo">
            <p class="media-genre">${categoriesText}</p>
            <p class="media-by">by <span class="media-author">${author}</span></p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Cria a estrutura completa de uma seção de slider para uma categoria.
   * @param {string} categoryTitle - O nome da categoria.
   * @param {Array} videos - A lista de vídeos para essa categoria.
   * @returns {string} - O HTML da seção do slider.
   */
  function createSliderSectionHTML(categoryTitle, videos) {
    // Gera o HTML para todos os cards de vídeo nesta categoria
    const cardsHTML = videos.map(createVideoCardHTML).join("");

    return `
      <section class="media-section">
        <div class="newest-section">
          <div class="section-header">
            <h2 class="section-title"><a href="#" class="section-link">${categoryTitle}</a></h2>
          </div>
          <div class="slider-wrapper">
            <button class="slider-arrow prev" aria-label="Previous">
              <i class="fa fa-chevron-left"></i>
            </button>
            <div class="media-grid newest">
              ${cardsHTML}
            </div>
            <button class="slider-arrow next" aria-label="Next">
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  function initializeSliderControls() {
    document.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
      const slider = wrapper.querySelector(".media-grid");
      const prevBtn = wrapper.querySelector(".slider-arrow.prev");
      const nextBtn = wrapper.querySelector(".slider-arrow.next");
      if (!slider || !prevBtn || !nextBtn) return;

      const scrollAmount = slider.clientWidth * 0.8; // Rola 80% da largura visível
      prevBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
      nextBtn.addEventListener("click", () => {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
  }

  async function fetchAndRenderSliders() {
    if (!dynamicContentArea) return;
    const backHomeButtonHTML =
      '<a class="backHome-Button" href="/">Back Home</a>';

    try {
      const data = await searchMidia(queryValue);
      const allVideos = Array.isArray(data) ? data : data.videos || [];

      // 2. Agrupar vídeos por categoria
      const videosByCategory = {};
      allVideos.forEach((video) => {
        video.categories.forEach((category) => {
          if (!videosByCategory[category.name]) {
            videosByCategory[category.name] = [];
          }
          videosByCategory[category.name].push(video);
        });
      });

      // 3. Gerar o HTML para cada slider e juntar tudo
      let finalHTML = "";

      if (allVideos.length > 0) {
        finalHTML += createAllVideosGridHTML(
          `Found ${allVideos.length} videos`,
          allVideos
        );
      }

      for (const categoryName in videosByCategory) {
        if (videosByCategory[categoryName].length >= 3) {
          finalHTML += createSliderSectionHTML(
            categoryName,
            videosByCategory[categoryName]
          );
        }
      }

      // 4. Inserir o HTML gerado no contêiner da página
      if (finalHTML) {
        dynamicContentArea.innerHTML = backHomeButtonHTML + finalHTML;
      } else {
        dynamicContentArea.innerHTML =
          backHomeButtonHTML +
          '<p class="container" style="text-align: center;">No content to display.</p>';
      }

      // 5. Ativar os controles dos sliders recém-criados
      initializeSliderControls();
    } catch (error) {
      console.error("Erro ao renderizar sliders:", error);
      if (dynamicContentArea) {
        dynamicContentArea.innerHTML =
          backHomeButtonHTML +
          '<p class="container" style="text-align: center; color: red;">The content could not be loaded.</p>';
      }
    }
  }

  //
  // ─── SETTINGS MENU ───────────────────────────────────────────────────────────
  //
  const settingsBtn = document.querySelector(".control-settings");
  const settingsMenu = document.getElementById("settings-menu");

  if (settingsBtn && settingsMenu) {
    settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // toggle menu
      settingsMenu.style.display =
        settingsMenu.style.display === "flex" ? "none" : "flex";
    });

    // click outside to close
    document.addEventListener("click", (e) => {
      if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
        settingsMenu.style.display = "none";
      }
    });

    // wire up each menu item
    settingsMenu.querySelectorAll(".setting-item").forEach((item) => {
      item.addEventListener("click", () => {
        // playback speed?
        if (item.dataset.speed) {
          heroVideo.playbackRate = parseFloat(item.dataset.speed);
        }
        // mute toggle?
        if (item.classList.contains("toggle-mute")) {
          heroVideo.muted = !heroVideo.muted;
          item.textContent = heroVideo.muted ? "Unmute" : "Mute";
        }
      });
    });
  }

  //
  // ─── SEARCH DROPDOWN ─────────────────────────────────────────────────────────
  //
  const input = document.getElementById("search-input");
  const dropdown = document.getElementById("search-dropdown");
  const historyList = document.getElementById("history-list");
  const noHistory = document.getElementById("no-history");
  const categoriesList = document.getElementById("categories-list");
  const categoriesSection = document.getElementById("categories-section");
  const historySection = document.getElementById("history-section");
  const mediaSection = document.getElementById("media-section");
  const mediaList = document.getElementById("media-list");
  const trendingList = document.getElementById("trending-list");
  const seeAllLink = document.getElementById("see-all");

  let avaliableCategories = [];
  avaliableCategories = await fetchCategories();

  async function fetchCategories() {
    try {
      const url = `${API_BASE_URL}/api/categories`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Falha ao buscar categorias:", error);
      return [];
    }
  }

  function renderCategories(categoriesData) {
    if (!categoriesList) return;
    categoriesList.innerHTML = "";
    categoriesData.forEach((category) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = category.name;
      btn.onclick = () => {
        input.value = category.name;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      };
      categoriesList.appendChild(btn);
    });
  }

  const categories = [
    "Movies",
    "Podcasts",
    "Music",
    "Radio",
    "TV Shows",
    "Web Pages",
  ];
  const trending = [
    "Countdown",
    "Smoke",
    "The Bear",
    "The Gilded Age",
    "The Amateur",
    "Squid Game",
    "Hell Motel",
    "Dept. Q",
    "Wicked",
  ];
  const mediaData = [
    {
      title: "My Fault",
      type: "movie",
      year: "2024",
      img: "images/images.jpeg",
    },
    {
      title: "Stick",
      type: "movie",
      year: "2024",
      img: "images/sticklong.jpeg",
    },
    { title: "Smoke", type: "movie", year: "2024", img: "images/smoke.jpeg" },
    {
      title: "Murderbot",
      type: "movie",
      year: "2024",
      img: "images/murder.jpeg",
    },
    { title: "Ted Lasso", type: "movie", year: "2024", img: "images/ted.jpeg" },
    {
      title: "Your Friends & Neighors",
      type: "movie",
      year: "2024",
      img: "images/your.jpeg",
    },
    {
      title: "The Better",
      type: "movie",
      year: "2024",
      img: "images/thebetter.jpeg",
    },
  ];

  let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

  function renderTrending() {
    trendingList.innerHTML = "";
    trending.forEach((t) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = t;
      btn.onclick = () => {
        input.value = t;
        input.dispatchEvent(new Event("input"));
      };
      trendingList.appendChild(btn);
    });
  }

  function renderEmpty() {
    mediaSection.style.display = "none";
    categoriesSection.style.display = "block";
    historySection.style.display = "block";
    noHistory.style.display = history.length ? "none" : "block";

    historyList.innerHTML = "";
    history.forEach((term) => {
      const li = document.createElement("li");
      li.className = "history-item";
      li.innerHTML = `<a href="/search.html?query=${encodeURIComponent(
        term
      )}">${term}</a>`;
      li.onclick = (e) => {
        e.preventDefault();
        input.value = term;
        window.location.href = `/search.html?query=${encodeURIComponent(term)}`;
      };
      historyList.appendChild(li);
    });

    renderCategories(avaliableCategories);

    seeAllLink.textContent = "Ver todos os resultados »";
    seeAllLink.href = "/search.html";
  }

  function renderResults(query) {
    mediaSection.style.display = "block";
    categoriesSection.style.display = "none";
    historySection.style.display = "none";
    mediaList.innerHTML = "";
    mediaData
      .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
      .forEach((m) => {
        const li = document.createElement("li");
        li.className = "media-item";
        li.innerHTML = `
          <img src="${m.img}" alt="${m.title}">
          <div class="media-info">
            <p class="media-title">${m.title}</p>
            <p class="media-meta">${m.type}, ${m.year}</p>
          </div>`;
        mediaList.appendChild(li);
      });

    renderTrending();

    seeAllLink.textContent = `See all results for ${query} »`;
    seeAllLink.href = `?query=${encodeURIComponent(query)}`;
  }

  function updateDropdown() {
    const q = input.value.trim();
    if (!q) renderEmpty();
    else renderResults(q);
  }

  const performLiveSearch = async (event) => {
    const query = event.target.value.trim();
    if (query.length < 2) {
      renderEmpty(); // Função que você já tem para mostrar histórico, etc.
      return;
    }

    // Mostra um feedback de carregamento
    mediaSection.style.display = "block";
    categoriesSection.style.display = "none";
    historySection.style.display = "none";
    mediaList.innerHTML = '<li class="search-feedback">Searching...</li>';

    const results = await searchMidia(query);
    renderLiveResults(results);

    // Atualiza o link "See all results"
    seeAllLink.textContent = `See all results for ${query} »`;
    seeAllLink.href = `?query=${encodeURIComponent(query)}`;
  };

  const debouncedSearch = debounce(performLiveSearch, 400);

  input.addEventListener("input", debouncedSearch);

  input.addEventListener("focus", () => {
    dropdown.style.display = "block";
    // Mostra o histórico se o campo estiver vazio
    if (input.value.trim() === "") {
      renderEmpty();
    }
  });

  document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-container").contains(e.target)) {
      dropdown.style.display = "none";
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim();
      if (q) {
        history = [q, ...history.filter((h) => h !== q)].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(history));
        // Redirecionar para a página de busca, por exemplo:
        // window.location.href = `/search?search_query=${encodeURIComponent(q)}`;
      }
      dropdown.style.display = "none";
    }
  });

  input.addEventListener("focus", () => {
    dropdown.style.display = "block";
    updateDropdown();
  });
  input.addEventListener("input", updateDropdown);
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-container").contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim();
      if (q) {
        history = [q, ...history.filter((h) => h !== q)].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(history));
      }
      dropdown.style.display = "none";
    }
  });

  //
  // ─── DRAG-TO-SCROLL FOR TOP 10 CAROUSEL ─────────────────────────────────────
  //
  // const top10 = document.querySelector(".media-grid.top10");
  // if (top10) {
  //   let isDown = false,
  //     startX,
  //     scrollLeft;

  //   const startDrag = (x) => {
  //     isDown = true;
  //     top10.classList.add("dragging");
  //     startX = x - top10.offsetLeft;
  //     scrollLeft = top10.scrollLeft;
  //   };
  //   const moveDrag = (x) => {
  //     if (!isDown) return;
  //     const walk = (x - startX) * 1;
  //     top10.scrollLeft = scrollLeft - walk;
  //   };
  //   const endDrag = () => {
  //     isDown = false;
  //     top10.classList.remove("dragging");
  //   };

  //   top10.addEventListener("mousedown", (e) => startDrag(e.pageX));
  //   top10.addEventListener("mousemove", (e) => moveDrag(e.pageX));
  //   top10.addEventListener("mouseup", endDrag);
  //   top10.addEventListener("mouseleave", endDrag);

  //   top10.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
  //   top10.addEventListener(
  //     "touchmove",
  //     (e) => {
  //       moveDrag(e.touches[0].pageX);
  //       e.preventDefault();
  //     },
  //     { passive: false }
  //   );
  //   top10.addEventListener("touchend", endDrag);
  // }

  //
  // ─── SLIDER ARROWS ────────────────────────────────────────────────────────────
  //
  // document.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
  //   const slider = wrapper.querySelector(
  //     ".media-grid, .browse-slider, .people-slider"
  //   );
  //   const prevBtn = wrapper.querySelector(".slider-arrow.prev");
  //   const nextBtn = wrapper.querySelector(".slider-arrow.next");
  //   if (!slider || !prevBtn || !nextBtn) return;

  //   const scrollAmount = slider.clientWidth;
  //   prevBtn.addEventListener("click", () => {
  //     slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  //   });
  //   nextBtn.addEventListener("click", () => {
  //     slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  //   });
  // });

  const menuBtn = document.querySelector(".btn-menu");
  const overlay = document.querySelector(".menu-overlay");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".btn-nav-close");

  function toggleMobileNav() {
    mobileNav.classList.toggle("open");
    overlay.classList.toggle("open");
  }

  menuBtn.addEventListener("click", toggleMobileNav);
  closeBtn.addEventListener("click", toggleMobileNav);
  overlay.addEventListener("click", toggleMobileNav);
  // ─── ACCORDION TOGGLE FOR ALL MOBILE-NAV SUBMENUS ───────────────────────────
  document.querySelectorAll(".mobile-nav .nav-group > a").forEach((link) => {
    // only bind if there's a <ul class="submenu"> immediately after
    if (!link.nextElementSibling?.classList.contains("submenu")) return;

    link.addEventListener("click", (e) => {
      e.preventDefault(); // don’t actually navigate
      link.classList.toggle("open");
    });
  });

  // Search
  async function searchMidia(query) {
    try {
      const url = `${API_BASE_URL}/api/search?search_query=${encodeURIComponent(
        query
      )}`;
      console.log(searchMidia);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.text()}`
        );
      }
      const data = await response.json();

      return data.videos || [];
    } catch (error) {
      console.error(`Failed featching media: ${error}`);
      return [];
    }
  }

  async function searchFromUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const queryFromUrl = params.get("search_query");

    if (queryFromUrl) {
      input.value = queryFromUrl;
      dropdown.style.display = "block";
      const results = await searchMidia(queryFromUrl);
      renderResults(queryFromUrl, results);
    }
  }

  searchFromUrlParams();
  fetchAndRenderSliders();
});
