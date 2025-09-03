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
  // --- CONFIGURAÇÕES GLOBAIS E FUNÇÕES DA API ---
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
   * Busca vídeos de uma categoria específica.
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
        `Failed searching video from category ${categoryName}:`,
        error
      );
      return [];
    }
  }

  //
  // ─── CONTROLES DO PLAYER DE VÍDEO PRINCIPAL (HERO) ─────────────────────────────────
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

    // Tenta autoplay (silenciado)
    heroVideo.play().catch(() => {});

    // --- Controles de Play/Pause ---
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

    // --- Sincronização da Barra de Progresso ---
    if (progress) {
      heroVideo.addEventListener("timeupdate", () => {
        const pct = (heroVideo.currentTime / heroVideo.duration) * 100 || 0;
        progress.value = pct;
      });
      progress.addEventListener("input", () => {
        heroVideo.currentTime = (progress.value / 100) * heroVideo.duration;
      });
    }

    // --- Modal de Tela Cheia ---
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
        if (!playBtn.querySelector("svg path[d*='M6']")) {
          // Se não estiver pausado
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

    // --- Botão de Like ---
    if (likeBtn) {
      likeBtn.addEventListener("click", () => {
        likeBtn.classList.toggle("liked");
      });
    }

    // --- Menu de Configurações (Velocidade, Mudo) ---
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
  // ─── LÓGICA DA BARRA DE PESQUISA DINÂMICA ──────────────────────────────────────────────
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
          input.dispatchEvent(new Event("input", { bubbles: true }));
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
          input.dispatchEvent(new Event("input", { bubbles: true }));
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
        const videoUrl = `/player/?q=${video.id}`;

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
          input.dispatchEvent(new Event("input", { bubbles: true }));
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
        debouncedSearch({ target: { value: input.value } });
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
  // ─── LÓGICA DOS SLIDERS (CARROSSÉIS) DINÂMICOS ──────────────────────────────────────────
  //
  // async function initializeDynamicSliders() {
  //   const slidersContainer = document.getElementById(
  //     "dynamic-sliders-container"
  //   );
  //   if (!slidersContainer) {
  //     console.warn(
  //       "Container para sliders dinâmicos (#dynamic-sliders-container) não encontrado."
  //     );
  //     return;
  //   }

  //   slidersContainer.innerHTML =
  //     '<p class="loading-feedback">Carregando conteúdo...</p>';
  //   const categories = await fetchCategories();

  //   if (categories.length === 0) {
  //     slidersContainer.innerHTML =
  //       '<p class="loading-feedback">Nenhuma categoria encontrada.</p>';
  //     return;
  //   }

  //   slidersContainer.innerHTML = ""; // Limpa a mensagem de "carregando"

  //   for (const category of categories) {
  //     const videos = await fetchVideosByCategory(category.name);
  //     if (videos.length > 0) {
  //       const sliderHTML = createSliderHTML(category, videos);
  //       const sliderSection = document.createElement("div");
  //       sliderSection.className = `category-section ${category.name
  //         .toLowerCase()
  //         .replace(/\s+/g, "-")}-section`;
  //       sliderSection.innerHTML = sliderHTML;
  //       slidersContainer.appendChild(sliderSection);
  //     }
  //   }

  //   // Após adicionar todo o HTML, inicializa os scripts de interação dos sliders
  //   initializeSliderControls();
  // }

  let playersToCreate = [];
  let isYouTubeApiReady = false;

  /**
   * @param {HTMLElement}
   */

  function createPlayerForCard(card) {
    const videoId = card.dataset.youtubeId;
    const playerId = document.querySelector(".youtube-player-embed")?.id;

    if (!videoId || !playerId) return;

    try {
      const player = new YT.Player(playerId, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.mute();

            card.addEventListener("mouseenter", () => {
              player.playVideo();
            });
            card.addEventListener("mouseleave", () => {
              player.pauseVideo();
              player.seekTo(0);
            });
          },
        },
      });
    } catch (e) {
      console.error(`Error creating YT Player for ${videoId}: ${e}`);
    }
  }
  window.onYouTubeIframeAPIReady = function () {
    isYouTubeApiReady = true;
    playersToCreate.forEach(createPlayerForCard);
    playersToCreate = [];
  };

  async function initializeDynamicSliders() {
    const slidersContainer = document.getElementById(
      "dynamic-sliders-container"
    );
    if (!slidersContainer) return;

    slidersContainer.innerHTML =
      '<p class="loading-feedback">Carregando conteúdo...</p>';
    const categories = await fetchCategories();

    if (categories.length === 0) {
      slidersContainer.innerHTML =
        '<p class="loading-feedback">Nenhuma categoria encontrada.</p>';
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

    initializeSliderControls();

    document
      .querySelectorAll(".media-card[data-youtube-id]")
      .forEach((card) => {
        if (isYouTubeApiReady) {
          createPlayerForCard(card);
        } else {
          playersToCreate.push(card);
        }
      });
  }

  function createSliderHTML(category, videos) {
    const videoCardsHTML = videos
      .map((video) => {
        const imageUrl = video.thumbnail?.url
          ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
          : "images/placeholder.jpg";
        const playerUrl = `/player/?q=${video.id}`;
        const youtubeVideoId = video.videoId;

        const videoHoverData = youtubeVideoId
          ? `data-youtube-id="${youtubeVideoId}"`
          : "";

        const playerContainer = youtubeVideoId
          ? `<div class="youtube-player-embed" id="player-${video.id}"></div>`
          : "";

        return `
          <a href="${playerUrl}" class="media-card-link">
            <div class="media-card" ${videoHoverData}>
               <div class="media-thumb">
              ${playerContainer} <img src="${imageUrl}" alt="${
          video.title
        }" loading="lazy" class="media-thumbnail" />
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
          </a>`;
      })
      .join("");

    return `
      <div class="section-header">
        <h2 class="section-title"><a href="/categories/?category=${category.name}">${category.name}</a></h2>
        <a href="/categories?category=${category.name}" class="section-link"><i class="fa fa-chevron-right"></i></a>
      </div>
      <div class="slider-wrapper">
        <button class="slider-arrow prev" aria-label="Anterior"><i class="fa fa-chevron-left"></i></button>
        <div class="media-grid">${videoCardsHTML}</div>
        <button class="slider-arrow next" aria-label="Próximo"><i class="fa fa-chevron-right"></i></button>
      </div>
      <hr class="media-separator" />`;
  }

  //
  // ─── INICIALIZAÇÃO DOS COMPONENTES DE UI (SETAS, DRAG-SCROLL, MENU) ─────────
  //
  function initializeSliderControls() {
    document.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
      const slider = wrapper.querySelector(".media-grid");
      const prevBtn = wrapper.querySelector(".slider-arrow.prev");
      const nextBtn = wrapper.querySelector(".slider-arrow.next");
      if (!slider || !prevBtn || !nextBtn) return;

      const scrollAmount = slider.clientWidth * 0.8;
      prevBtn.addEventListener("click", () =>
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      );
      nextBtn.addEventListener("click", () =>
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" })
      );
    });

    document.querySelectorAll(".media-grid").forEach((slider) => {
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
      slider.addEventListener("touchstart", startDrag, { passive: true });
      slider.addEventListener("touchmove", moveDrag, { passive: false });
      slider.addEventListener("touchend", endDrag);
    });
  }

  function initializeGeneralUI() {
    // --- Navegação Mobile (Menu Hambúrguer) ---
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

    document.querySelectorAll(".mobile-nav .nav-group > a").forEach((link) => {
      if (!link.nextElementSibling?.classList.contains("submenu")) return;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        link.classList.toggle("open");
      });
    });
  }

  initializeHeroPlayer();
  initializeSearch();
  initializeDynamicSliders();
  initializeGeneralUI();
});
