// script.js

/**
 * Atraso na execução de uma função para otimizar eventos como digitação em buscas.
 * @param {Function} func A função a ser executada após o delay.
 * @param {number} delay O tempo de espera em milissegundos.
 * @returns {Function} A nova função com o comportamento de "debounce".
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

document.addEventListener("DOMContentLoaded", () => {
  //
  // ─── CONFIGURAÇÕES GLOBAIS E FUNÇÕES DA API ───────────────────────────────────────
  //
  const API_BASE_URL = "https://api.eternityready.com/";

  /**
   * Busca as categorias de vídeo da API.
   * @returns {Promise<Array>} Uma promessa que resolve para um array de categorias.
   */
  async function fetchCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}api/categories`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return (await response.json()) || [];
    } catch (error) {
      console.error("Falha ao buscar categorias:", error);
      return [];
    }
  }

  /**
   * Busca vídeos de uma categoria específica pelo nome.
   * @param {string} categoryName O nome da categoria.
   * @returns {Promise<Array>} Uma promessa que resolve para um array de vídeos.
   */
  async function fetchVideosByCategory(categoryName) {
    try {
      const url = `${API_BASE_URL}api/search?category=${encodeURIComponent(
        categoryName
      )}`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.videos || [];
    } catch (error) {
      console.error(
        `Falha ao buscar vídeos para a categoria ${categoryName}:`,
        error
      );
      return [];
    }
  }

  /**
   * Cria o HTML para um único card de vídeo.
   * @param {object} video O objeto de vídeo da API.
   * @returns {string} A string HTML do card.
   */
  function createVideoCard(video) {
    const imageUrl = video.thumbnail?.url
      ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
      : "images/placeholder.jpg";
    const playerUrl = `/player.html?q=${video.id}`;

    return `
      <a href="${playerUrl}" class="media-card-link">
        <div class="media-card">
          <div class="media-thumb">
            <img src="${imageUrl}" alt="${video.title}" loading="lazy" />
            ${
              video.duration
                ? `<span class="media-duration">${video.duration}</span>`
                : ""
            }
          </div>
          <div class="media-info-col">
            <p class="media-title">${video.title}</p>
            <div class="media-subinfo">
              <p class="media-genre">${video.categories
                .map((c) => c.name)
                .join(", ")}</p>
              <p class="media-by">by <span class="media-author">${
                video.author || "EternityReady"
              }</span></p>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  //
  // ─── CONTROLES DO PLAYER DE VÍDEO PRINCIPAL (HERO) ──────────────────────────────
  //
  function initializeHeroPlayer() {
    const heroVideo = document.querySelector(".hero-bg");
    if (!heroVideo) return;

    const playBtn = document.querySelector(".control-play");
    const progress = document.querySelector(".control-progress");
    const fsBtn = document.querySelector(".control-fullscreen");
    const likeBtn = document.querySelector(".btn-like");
    const settingsBtn = document.querySelector(".control-settings");
    const settingsMenu = document.getElementById("settings-menu");

    heroVideo.play().catch(() => {});

    if (playBtn) {
      const playIconPath = playBtn.querySelector("svg path");
      const PLAY_D = "M8 5v14l11-7z";
      const PAUSE_D = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

      playBtn.addEventListener("click", () => {
        if (heroVideo.paused) {
          heroVideo.play();
          playIconPath.setAttribute("d", PAUSE_D);
        } else {
          heroVideo.pause();
          playIconPath.setAttribute("d", PLAY_D);
        }
      });
    }

    if (progress) {
      heroVideo.addEventListener("timeupdate", () => {
        const pct = (heroVideo.currentTime / heroVideo.duration) * 100 || 0;
        progress.value = pct;
      });
      progress.addEventListener("input", () => {
        heroVideo.currentTime = (progress.value / 100) * heroVideo.duration;
      });
    }

    const modal = document.getElementById("video-modal");
    if (fsBtn && modal) {
      const modalVideo = document.getElementById("modal-video");
      const modalClose = document.getElementById("video-modal-close");

      fsBtn.addEventListener("click", () => {
        modalVideo.src = heroVideo.currentSrc || heroVideo.src;
        modalVideo.currentTime = heroVideo.currentTime;
        modal.classList.add("video-modal-open");
        modalVideo.play();
      });

      modalClose.addEventListener("click", () => {
        modal.classList.remove("video-modal-open");
        modalVideo.pause();
        heroVideo.currentTime = modalVideo.currentTime;
        if (playBtn.querySelector("svg path[d*='M6']")) {
          heroVideo.play();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modal.classList.contains("video-modal-open")
        ) {
          modalClose.click();
        }
      });
    }

    if (likeBtn) {
      likeBtn.addEventListener("click", () => {
        likeBtn.classList.toggle("liked");
      });
    }

    if (settingsBtn && settingsMenu) {
      settingsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        settingsMenu.style.display =
          settingsMenu.style.display === "flex" ? "none" : "flex";
      });
      document.addEventListener("click", (e) => {
        if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
          settingsMenu.style.display = "none";
        }
      });
      settingsMenu.querySelectorAll(".setting-item").forEach((item) => {
        item.addEventListener("click", () => {
          if (item.dataset.speed) {
            heroVideo.playbackRate = parseFloat(item.dataset.speed);
          }
          if (item.classList.contains("toggle-mute")) {
            heroVideo.muted = !heroVideo.muted;
            item.textContent = heroVideo.muted ? "Unmute" : "Mute";
          }
        });
      });
    }
  }

  //
  // ─── LÓGICA DA BARRA DE PESQUISA DINÂMICA ─────────────────────────────────────────
  //
  async function initializeSearch() {
    const input = document.getElementById("search-input");
    const dropdown = document.getElementById("search-dropdown");
    if (!input || !dropdown) return;

    const historyList = document.getElementById("history-list");
    const noHistory = document.getElementById("no-history");
    const categoriesList = document.getElementById("categories-list");
    const categoriesSection = document.getElementById("categories-section");
    const historySection = document.getElementById("history-section");
    const mediaSection = document.getElementById("media-section");
    const mediaList = document.getElementById("media-list");
    const trendingList = document.getElementById("trending-list");
    const seeAllLink = document.getElementById("see-all");

    const trending = [
      "Countdown",
      "Smoke",
      "The Bear",
      "The Gilded Age",
      "The Amateur",
      "Squid Game",
    ];
    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    let availableCategories = await fetchCategories();

    async function searchMidia(query) {
      try {
        const url = `${API_BASE_URL}api/search?search_query=${encodeURIComponent(
          query
        )}`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.videos || [];
      } catch (error) {
        console.error(`Falha ao buscar mídia: ${error}`);
        return [];
      }
    }

    function renderTrending() {
      if (!trendingList) return;
      trendingList.innerHTML = "";
      trending.forEach((t) => {
        const btn = document.createElement("button");
        btn.className = "chip";
        btn.textContent = t;
        btn.onclick = () => {
          input.value = t;
          input.dispatchEvent(
            new Event("input", {
              bubbles: true,
            })
          );
        };
        trendingList.appendChild(btn);
      });
    }

    function renderCategories(categoriesData) {
      if (!categoriesList) return;
      categoriesList.innerHTML = "";
      categoriesData.slice(0, 6).forEach((category) => {
        const btn = document.createElement("button");
        btn.className = "chip";
        btn.textContent = category.name;
        btn.onclick = () => {
          input.value = category.name;
          input.dispatchEvent(
            new Event("input", {
              bubbles: true,
            })
          );
        };
        categoriesList.appendChild(btn);
      });
    }

    function renderLiveResults(videos) {
      mediaSection.style.display = "block";
      categoriesSection.style.display = "none";
      historySection.style.display = "none";
      mediaList.innerHTML = "";

      if (videos.length === 0) {
        mediaList.innerHTML =
          '<li class="search-feedback">Nenhum resultado encontrado.</li>';
        return;
      }

      videos.slice(0, 5).forEach((video) => {
        const imageUrl = video.thumbnail?.url
          ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
          : "images/placeholder.jpg";
        const videoUrl = `/player.html?q=${video.id}`;

        const li = document.createElement("li");
        li.className = "media-item";
        li.innerHTML = `
          <a href="${videoUrl}" class="media-item-link">
            <img src="${imageUrl}" alt="${video.title}">
            <div class="media-info">
              <p class="media-title">${video.title}</p>
              <p class="media-meta">${video.categories
                .map((c) => c.name)
                .join(", ")}</p>
            </div>
          </a>`;
        mediaList.appendChild(li);
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
        li.textContent = term;
        li.onclick = () => {
          input.value = term;
          input.dispatchEvent(
            new Event("input", {
              bubbles: true,
            })
          );
        };
        historyList.appendChild(li);
      });

      renderCategories(availableCategories);
      renderTrending();

      seeAllLink.textContent = "Ver todos os resultados »";
      seeAllLink.href = "/search";
    }

    const performLiveSearch = async (event) => {
      const query = event.target.value.trim();
      if (query) {
        seeAllLink.href = `/search?query=${encodeURIComponent(query)}`;
        seeAllLink.textContent = `Ver todos os resultados para "${query}" »`;
      }
      if (query.length < 2) {
        renderEmpty();
        return;
      }
      mediaSection.style.display = "block";
      categoriesSection.style.display = "none";
      historySection.style.display = "none";
      mediaList.innerHTML = '<li class="search-feedback">Buscando...</li>';
      const results = await searchMidia(query);
      renderLiveResults(results);
    };

    const debouncedSearch = debounce(performLiveSearch, 400);

    input.addEventListener("input", debouncedSearch);

    input.addEventListener("focus", () => {
      dropdown.style.display = "block";
      if (input.value.trim() === "") {
        renderEmpty();
      } else {
        debouncedSearch({
          target: {
            value: input.value,
          },
        });
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          history = [query, ...history.filter((h) => h !== query)].slice(0, 5);
          localStorage.setItem("searchHistory", JSON.stringify(history));
          window.location.href = `/search?query=${encodeURIComponent(query)}`;
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (!document.querySelector(".search-container")?.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  //
  // ─── LÓGICA DA PÁGINA DE CATEGORIA ────────────────────────────────────────────────
  //
  async function handleCategoryPage() {
    const videosGrid = document.getElementById("dynamic-content-area");

    if (!videosGrid) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (!category) {
      videosGrid.innerHTML =
        "<p>O ID da categoria não foi fornecido na URL.</p>";
      return;
    }

    videosGrid.innerHTML = '<p class="loading-feedback">Buscando vídeos...</p>';

    const videos = await fetchVideosByCategory(category);

    if (videos.length === 0) {
      videosGrid.innerHTML = `<p>No videos were found for this category.</p>`;
      return;
    }

    const categoryName = category || "Categoria";

    cardsHTML = videos.map((video) => createVideoCard(video)).join("");
    videosGrid.innerHTML = `
    
    <a class="backHome-Button" href="/">Back Home</a>

     <h1 class="section-title">${categoryName} <span>${videos.length} Videos </span></h1>

    <section class="media-section">
        <div class="all-videos-section">
          <div class="media-grid all-videos-grid">
            ${cardsHTML}
          </div>
        </div>
      </section>`;
  }

  //
  // ─── LÓGICA DOS SLIDERS DINÂMICOS (PÁGINA INICIAL) ──────────────────────────────
  //
  async function initializeDynamicSliders() {
    const slidersContainer = document.getElementById(
      "dynamic-sliders-container"
    );
    if (!slidersContainer) {
      return;
    }

    slidersContainer.innerHTML =
      '<p class="loading-feedback">Loading results</p>';
    const categories = await fetchCategories();

    if (categories.length === 0) {
      slidersContainer.innerHTML =
        '<p class="loading-feedback">No categories found.</p>';
      return;
    }

    slidersContainer.innerHTML = "";

    for (const category of categories) {
      const videos = await fetchVideosByCategory(category.name);
      if (videos.length > 0) {
        const sliderHTML = createSliderHTML(category, videos);
        const sliderSection = document.createElement("div");
        sliderSection.className = `category-section ${category.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-section`;
        sliderSection.innerHTML = sliderHTML;
        slidersContainer.appendChild(sliderSection);
      }
    }
  }

  function createSliderHTML(category, videos) {
    const videoCardsHTML = videos
      .map((video) => createVideoCard(video))
      .join("");

    return `
      <div class="section-header">
        <h2 class="section-title"><a href="/categories.html?category=${category.id}">${category.name}</a></h2>
        <a href="/categories.html?category=${category.id}" class="section-link"><i class="fa fa-chevron-right"></i></a>
      </div>
      <section class="media-section">
        <div class="all-videos-section">
          <div class="section-header">
            <h2 class="section-title">${title}</h2>
          </div>
          <div class="media-grid all-videos-grid">
            ${cardsHTML}
          </div>
        </div>
      </section>`;
  }

  //
  // ─── INICIALIZAÇÃO DE UI GERAL (SLIDERS, MENU MOBILE) ───────────────────────────
  //
  function initializeAllSlidersAndUI() {
    // --- Setas e Drag-to-Scroll para TODOS os sliders ---
    document.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
      const slider = wrapper.querySelector(
        ".media-grid, .browse-slider, .people-slider"
      );
      const prevBtn = wrapper.querySelector(".slider-arrow.prev");
      const nextBtn = wrapper.querySelector(".slider-arrow.next");

      if (!slider) return;

      if (prevBtn && nextBtn) {
        const scrollAmount = slider.clientWidth * 0.8;
        prevBtn.addEventListener("click", () =>
          slider.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          })
        );
        nextBtn.addEventListener("click", () =>
          slider.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          })
        );
      }

      let isDown = false,
        startX,
        scrollLeft;
      const startDrag = (e) => {
        isDown = true;
        slider.classList.add("dragging");
        startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };
      const moveDrag = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
      };
      const endDrag = () => {
        isDown = false;
        slider.classList.remove("dragging");
      };

      slider.addEventListener("mousedown", startDrag);
      slider.addEventListener("mousemove", moveDrag);
      slider.addEventListener("mouseup", endDrag);
      slider.addEventListener("mouseleave", endDrag);
      slider.addEventListener("touchstart", startDrag, {
        passive: true,
      });
      slider.addEventListener("touchmove", moveDrag, {
        passive: false,
      });
      slider.addEventListener("touchend", endDrag);
    });

    // --- Navegação Mobile ---
    const menuBtn = document.querySelector(".btn-menu");
    const overlay = document.querySelector(".menu-overlay");
    const mobileNav = document.querySelector(".mobile-nav");
    const closeBtn = document.querySelector(".btn-nav-close");
    if (menuBtn && overlay && mobileNav && closeBtn) {
      const toggleMobileNav = () => {
        mobileNav.classList.toggle("open");
        overlay.classList.toggle("open");
      };
      menuBtn.addEventListener("click", toggleMobileNav);
      closeBtn.addEventListener("click", toggleMobileNav);
      overlay.addEventListener("click", toggleMobileNav);
    }

    // --- Submenus "Accordion" na Navegação Mobile ---
    document.querySelectorAll(".mobile-nav .nav-group > a").forEach((link) => {
      if (!link.nextElementSibling?.classList.contains("submenu")) return;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        link.classList.toggle("open");
      });
    });
  }

  //
  // ─── PONTO DE ENTRADA PRINCIPAL ───────────────────────────────────────────────────
  //
  async function main() {
    // Funções que rodam em todas as páginas
    initializeHeroPlayer();
    initializeSearch();
    initializeAllSlidersAndUI(); // Roda uma vez para UI estática

    // Lógica condicional baseada na página atual
    if (window.location.pathname.includes("/categories")) {
      handleCategoryPage();
    } else {
      await initializeDynamicSliders();
      initializeAllSlidersAndUI();
    }
  }

  main();
});
