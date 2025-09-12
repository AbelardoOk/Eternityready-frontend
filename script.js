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
  // --- CONFIGURAÇÕES GLOBAIS E ESTADO DA APLICAÇÃO ---
  const API_BASE_URL = "https://api.eternityready.com/";

  // Estado para armazenar dados
  let localData = { channels: [], movies: [], music: [] };
  let normalizedData = { channels: [], movies: [], music: [] };
  let apiCategories = [];

  const LOCAL_CATEGORIES_MAP = {
    Channels: "channels",
    Movies: "movies",
    Music: "music",
  };
  const LOCAL_CATEGORY_NAMES = Object.keys(LOCAL_CATEGORIES_MAP);

  let sliderObserver;
  let allPlaceholders = [];
  let lastObservedIndex = -1;
  const BATCH_SIZE = 5;

  async function loadAllDataSources() {
    const promises = [
      fetch(`${API_BASE_URL}api/categories`), // API
      fetch("/data/channels.json"), // Local
      fetch("/data/movies.json"), // Local
      fetch("/data/music.json"), // Local
    ];

    const results = await Promise.allSettled(promises);

    if (results[0].status === "fulfilled") {
      const response = results[0].value;
      if (response.ok) {
        apiCategories = (await response.json()) || [];
      } else {
        console.error("Falha ao buscar categorias da API:", response.status);
      }
    } else {
      console.error(
        "Erro de rede ao buscar categorias da API:",
        results[0].reason
      );
    }

    const localFiles = ["channels", "movies", "music"];
    for (let i = 0; i < localFiles.length; i++) {
      const result = results[i + 1];
      const fileName = localFiles[i];
      if (result.status === "fulfilled") {
        const response = result.value;
        if (response.ok) {
          const data = await response.json();
          localData[fileName] = data[fileName] || [];
        } else {
          console.error(
            `Falha ao carregar /data/${fileName}.json:`,
            response.status
          );
        }
      } else {
        console.error(
          `Erro de rede ao carregar /data/${fileName}.json:`,
          result.reason
        );
      }
    }
    console.log(
      "Fontes de dados carregadas. API Categorias:",
      apiCategories.length,
      "Itens Locais:",
      localData
    );
  }

  function normalizeAllLocalData() {
    for (const key of Object.keys(localData)) {
      normalizedData[key] = localData[key].map((item) =>
        normalizeLocalItem(item)
      );
    }
    // Limpa os dados brutos para liberar memória
    localData = { channels: [], movies: [], music: [] };
  }

  function normalizeLocalItem(item) {
    let thumbnail = item.logo || item.thumbnail;
    if (thumbnail && !thumbnail.startsWith("http")) {
      thumbnail = new URL(thumbnail, API_BASE_URL).href;
    }

    // Garante que as categorias sejam sempre um array de objetos {name: string}
    const categories = Array.isArray(item.categories)
      ? item.categories.map((name) =>
          typeof name === "string" ? { name } : name
        )
      : [];

    let videoId = null;
    if (item.embed) {
      let urlString = item.embed;
      if (urlString.trim().startsWith("<iframe")) {
        const match = urlString.match(/src=['"]([^'"]+)['"]/);
        urlString = match ? match[1] : null;
      }
      if (
        urlString &&
        urlString.includes("googleusercontent.com/youtube.com")
      ) {
        try {
          const potentialId = new URL(urlString).pathname.split("/").pop();
          if (potentialId) {
            videoId = potentialId.replace(/[^A-Za-z0-9_-]/g, "");
          }
        } catch (e) {
          console.warn(`URL do embed inválida: "${urlString}"`, e);
        }
      }
    }

    return {
      id: item.id || item.title || item.name,
      title: item.title || item.name,
      description: item.description || "",
      thumbnail: { url: thumbnail },
      categories: categories,
      author: item.author || "EternityReady",
      duration: item.duration || null,
      videoId: videoId,
    };
  }

  /**
   * MODIFICADO: Coleta categorias da API, as categorias principais locais
   * e também varre todos os itens locais para encontrar sub-categorias únicas.
   */
  async function fetchCategories() {
    // Começa com as categorias da API
    const combinedCategories = [...apiCategories];
    const allCategoryNames = new Set(
      apiCategories.map((c) => c.name.toLowerCase())
    );

    // Adiciona as categorias locais principais (Channels, Movies, Music) se ainda não existirem
    LOCAL_CATEGORY_NAMES.forEach((localName) => {
      if (!allCategoryNames.has(localName.toLowerCase())) {
        allCategoryNames.add(localName.toLowerCase());
        combinedCategories.push({ name: localName });
      }
    });

    // Varre todos os dados locais normalizados para encontrar outras categorias
    for (const key of Object.keys(normalizedData)) {
      // 'channels', 'movies', 'music'
      for (const item of normalizedData[key]) {
        // cada item individual
        if (item.categories && Array.isArray(item.categories)) {
          for (const category of item.categories) {
            if (
              category.name &&
              !allCategoryNames.has(category.name.toLowerCase())
            ) {
              allCategoryNames.add(category.name.toLowerCase());
              combinedCategories.push({ name: category.name });
            }
          }
        }
      }
    }

    return combinedCategories;
  }

  /**
   * MODIFICADO: Busca vídeos/mídia para uma categoria específica,
   * combinando resultados da API e dos arquivos locais.
   */
  async function fetchVideosByCategory(categoryName) {
    // Se for uma categoria principal local, retorna todos os itens desse tipo.
    if (LOCAL_CATEGORY_NAMES.includes(categoryName)) {
      const localKey = LOCAL_CATEGORIES_MAP[categoryName];
      return normalizedData[localKey] || [];
    }

    const lowerCaseCategory = categoryName.toLowerCase();

    // Promessa para buscar na API
    const apiPromise = fetch(
      `${API_BASE_URL}api/search?category=${encodeURIComponent(categoryName)}`
    )
      .then((res) => (res.ok ? res.json() : Promise.resolve({ videos: [] })))
      .then((data) => data.videos || [])
      .catch((err) => {
        console.error(`Falha na API para categoria ${categoryName}:`, err);
        return [];
      });

    // Promessa para filtrar os dados locais
    const localPromise = new Promise((resolve) => {
      const allLocalItems = [
        ...normalizedData.channels,
        ...normalizedData.movies,
        ...normalizedData.music,
      ];
      const results = allLocalItems.filter((item) =>
        item.categories.some(
          (cat) => cat.name.toLowerCase() === lowerCaseCategory
        )
      );
      resolve(results);
    });

    // Aguarda ambas as buscas e combina os resultados
    const [apiResults, localResults] = await Promise.all([
      apiPromise,
      localPromise,
    ]);

    // Remove duplicados, dando preferência aos resultados da API
    const apiResultIds = new Set(apiResults.map((v) => v.id));
    const uniqueLocalResults = localResults.filter(
      (v) => !apiResultIds.has(v.id)
    );

    return [...apiResults, ...uniqueLocalResults];
  }

  // ─── CONTROLES DO PLAYER DE VÍDEO PRINCIPAL (HERO) ─────────────────────────────────
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
        progress.value =
          (heroVideo.currentTime / heroVideo.duration) * 100 || 0;
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
      const closeModal = () => {
        modal.classList.remove("video-modal-open");
        modalVideo.pause();
        heroVideo.currentTime = modalVideo.currentTime;
        if (!playBtn.querySelector("svg path[d*='M6']")) {
          heroVideo.play();
        }
      };
      modalClose.addEventListener("click", closeModal);
      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modal.classList.contains("video-modal-open")
        ) {
          closeModal();
        }
      });
    }
    if (likeBtn) {
      likeBtn.addEventListener("click", () =>
        likeBtn.classList.toggle("liked")
      );
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

  // ─── LÓGICA DA BARRA DE PESQUISA DINÂMICA ──────────────────────────────────────────
  async function initializeSearch() {
    const input = document.getElementById("search-input");
    const dropdown = document.getElementById("search-dropdown");
    if (!input || !dropdown) return;

    const historyList = document.getElementById("history-list"),
      noHistory = document.getElementById("no-history"),
      categoriesList = document.getElementById("categories-list"),
      categoriesSection = document.getElementById("categories-section"),
      historySection = document.getElementById("history-section"),
      mediaSection = document.getElementById("media-section"),
      mediaList = document.getElementById("media-list"),
      trendingList = document.getElementById("trending-list"),
      seeAllLink = document.getElementById("see-all");

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
      const lowerCaseQuery = query.toLowerCase();

      const apiSearchPromise = fetch(
        `${API_BASE_URL}api/search?search_query=${encodeURIComponent(query)}`
      )
        .then((res) => (res.ok ? res.json() : Promise.resolve({ videos: [] })))
        .then((data) => data.videos || [])
        .catch((err) => {
          console.error("Erro na busca da API:", err);
          return [];
        });

      const localSearchPromise = new Promise((resolve) => {
        const allLocalItems = [
          ...normalizedData.channels,
          ...normalizedData.movies,
          ...normalizedData.music,
        ];
        const results = allLocalItems.filter(
          (item) =>
            item.title.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery) ||
            item.categories.some((cat) =>
              cat.name.toLowerCase().includes(lowerCaseQuery)
            )
        );
        resolve(results);
      });

      const [apiResults, localResults] = await Promise.all([
        apiSearchPromise,
        localSearchPromise,
      ]);
      const apiResultIds = new Set(apiResults.map((v) => v.id));
      const uniqueLocalResults = localResults.filter(
        (v) => !apiResultIds.has(v.id)
      );
      return [...apiResults, ...uniqueLocalResults];
    }

    function renderTrending() {
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
      categoriesList.innerHTML = "";
      categoriesData.slice(0, 6).forEach((c) => {
        const btn = document.createElement("button");
        btn.className = "chip";
        btn.textContent = c.name;
        btn.onclick = () => {
          input.value = c.name;
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
        const imageUrl = video.thumbnail?.url?.startsWith("http")
          ? video.thumbnail.url
          : video.thumbnail?.url
          ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
          : "images/placeholder.jpg";
        const videoUrl = `/player/?q=${video.id}`;
        const li = document.createElement("li");
        li.className = "media-item";
        li.innerHTML = `<a href="${videoUrl}" class="media-item-link"><img src="${imageUrl}" alt="${
          video.title
        }"><div class="media-info"><p class="media-title">${
          video.title
        }</p><p class="media-meta">${video.categories
          .map((c) => c.name)
          .join(", ")}</p></div></a>`;
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
        seeAllLink.href = `/search/?query=${encodeURIComponent(query)}`;
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
          window.location.href = `/search/?query=${encodeURIComponent(query)}`;
        }
      }
    });
    document.addEventListener("click", (e) => {
      if (!document.querySelector(".search-container")?.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  // ─── LÓGICA DOS SLIDERS (CARROSSÉIS) DINÂMICOS ──────────────────────────────────────────
  let sharedYTPlayer = null;
  let playerReady = false;
  let activeCard = null;

  function createSharedPlayer(card, videoId) {
    const playerContainer = card.querySelector(".youtube-player-embed");
    if (!playerContainer) return;

    try {
      new YT.Player(playerContainer.id, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: (event) => {
            event.target.unMute();
            card.addEventListener("mouseenter", () => {
              event.target.playVideo();
              event.target.seekTo(30);
            });
            card.addEventListener("mouseleave", () => {
              event.target.mute();
              event.target.pauseVideo();
              event.target.seekTo(0);
            });
          },
        },
      });
    } catch (e) {
      console.error(`Error creating YT Player for ${videoId}: ${e}`);
    }
  }

  window.onYouTubeIframeAPIReady = function () {
    playerReady = true;
  };

  function initializePlayerPreviews() {
    const slidersContainer = document.getElementById(
      "dynamic-sliders-container"
    );
    if (!slidersContainer) return;

    slidersContainer.addEventListener("mouseover", (event) => {
      if (!playerReady) return;

      const card = event.target.closest(".media-card[data-youtube-id]");
      if (card && card !== activeCard) {
        const videoId = card.dataset.youtubeId;
        const playerContainer = card.querySelector(".youtube-player-embed");
        if (!videoId || !playerContainer) return;

        activeCard = card;

        if (!sharedYTPlayer) {
          createSharedPlayer(card, videoId);
        } else {
          playerContainer.appendChild(sharedYTPlayer.getIframe());
          sharedYTPlayer.loadVideoById({ videoId: videoId });
          sharedYTPlayer.mute();
        }
      }
    });

    slidersContainer.addEventListener("mouseout", (event) => {
      if (!activeCard || !sharedYTPlayer) return;

      if (!activeCard.contains(event.relatedTarget)) {
        sharedYTPlayer.pauseVideo();
        activeCard = null;
      }
    });
  }

  /**
   * @param {HTMLElement} placeholder
   * @param {object} category
   */
  async function loadAndBuildSlider(placeholder, category) {
    const videos = await fetchVideosByCategory(category.name);

    if (videos.length < 3) {
      placeholder.remove();
      return false;
    }

    let playerInstanceCounter = document.querySelectorAll(
      ".youtube-player-embed"
    ).length;

    const sliderHTML = videos
      .map((video) => {
        const imageUrl = video.thumbnail?.url?.startsWith("http")
          ? video.thumbnail.url
          : video.thumbnail?.url
          ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
          : "images/placeholder.jpg";
        const playerUrl = `/player/?q=${video.id}`;
        const youtubeVideoId = video.videoId;
        const videoHoverData = youtubeVideoId
          ? `data-youtube-id="${youtubeVideoId}"`
          : "";
        let playerContainer = "";
        if (youtubeVideoId) {
          playerInstanceCounter++;
          const uniquePlayerId = `yt-player-instance-${playerInstanceCounter}`;
          playerContainer = `<div class="youtube-player-embed" id="${uniquePlayerId}"></div>`;
        }
        return `<a href="${playerUrl}" class="media-card-link"><div class="media-card" ${videoHoverData}><div class="media-thumb">${playerContainer} <img src="${imageUrl}" alt="${
          video.title
        }" loading="lazy" class="media-thumbnail" />${
          video.duration
            ? `<span class="media-duration">${video.duration}</span>`
            : ""
        }</div><div class="media-info-col"><p class="media-title">${
          video.title
        }</p><div class="media-subinfo"><p class="media-genre">${video.categories
          .map((c) => c.name)
          .join(", ")}</p><p class="media-by">by <span class="media-author">${
          video.author || "EternityReady"
        }</span></p></div></div></div></a>`;
      })
      .join("");

    const sliderContent = `<div class="section-header"><h2 class="section-title"><a href="/categories/?category=${encodeURIComponent(
      category.name
    )}">${
      category.name
    }</a></h2><a href="/categories?category=${encodeURIComponent(
      category.name
    )}" class="section-link"><i class="fa fa-chevron-right"></i></a></div><div class="slider-wrapper"><button class="slider-arrow prev" aria-label="Anterior"><i class="fa fa-chevron-left"></i></button><div class="media-grid">${sliderHTML}</div><button class="slider-arrow next" aria-label="Próximo"><i class="fa fa-chevron-right"></i></button></div><hr class="media-separator" />`;

    const sliderSection = document.createElement("div");
    sliderSection.className = `category-section ${category.name
      .toLowerCase()
      .replace(/[\s+&]/g, "-")}-section`;
    sliderSection.innerHTML = sliderContent;

    placeholder.replaceWith(sliderSection);
    initializeSliderControls(sliderSection);
    return true;
  }

  async function initializeDynamicSliders() {
    const slidersContainer = document.getElementById(
      "dynamic-sliders-container"
    );
    if (!slidersContainer) return;

    slidersContainer.innerHTML =
      '<p class="loading-feedback">Carregando categorias...</p>';
    const categories = await fetchCategories();

    if (categories.length === 0) {
      slidersContainer.innerHTML =
        '<p class="loading-feedback">Nenhuma categoria encontrada.</p>';
      return;
    }

    // 1. Limpa o container e cria os placeholders
    slidersContainer.innerHTML = "";
    categories.forEach((category) => {
      const placeholder = document.createElement("div");
      placeholder.className = "slider-placeholder";
      placeholder.dataset.categoryName = category.name;
      // Adiciona um feedback visual de carregamento
      placeholder.innerHTML = `<div class="loading-spinner"></div>`;
      slidersContainer.appendChild(placeholder);
    });

    allPlaceholders = Array.from(
      document.querySelectorAll(".slider-placeholder")
    );

    sliderObserver = new IntersectionObserver(
      async (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const placeholder = entry.target;
            const categoryName = placeholder.dataset.categoryName;

            // Para de observar imediatamente para não disparar de novo
            observer.unobserve(placeholder);

            // Carrega o slider e, SE for bem-sucedido, aciona a observação do PRÓXIMO item da lista geral
            const success = await loadAndBuildSlider(placeholder, {
              name: categoryName,
            });
            if (success) {
              // Tenta observar o PRÓXIMO placeholder na lista geral
              const nextPlaceholderToObserve =
                allPlaceholders[lastObservedIndex + 1];
              if (nextPlaceholderToObserve) {
                nextPlaceholderToObserve.classList.add("is-observable");
                sliderObserver.observe(nextPlaceholderToObserve);
                lastObservedIndex++;
              }
            }
          }
        }
      },
      {
        rootMargin: "200px 0px", // Começa a carregar quando estiver a 200px de distância da tela
        threshold: 0.01,
      }
    );

    for (let i = 0; i < BATCH_SIZE; i++) {
      const placeholder = allPlaceholders[i];
      if (placeholder) {
        placeholder.classList.add("is-observable");
        sliderObserver.observe(placeholder);
        lastObservedIndex = i;
      } else {
        break;
      }
    }
  }

  // ─── INICIALIZAÇÃO DOS COMPONENTES DE UI E FUNÇÃO PRINCIPAL ─────────
  /**
   * @param {HTMLElement} context
   */
  function initializeSliderControls(context = document) {
    context.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
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
    context.querySelectorAll(".media-grid").forEach((slider) => {
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
    const menuBtn = document.querySelector(".btn-menu"),
      overlay = document.querySelector(".menu-overlay"),
      mobileNav = document.querySelector(".mobile-nav"),
      closeBtn = document.querySelector(".btn-nav-close");
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

  async function main() {
    await loadAllDataSources();
    normalizeAllLocalData();

    initializeHeroPlayer();
    initializeSearch();
    initializeDynamicSliders();
    initializeGeneralUI();
    initializePlayerPreviews();
  }

  main();
});
