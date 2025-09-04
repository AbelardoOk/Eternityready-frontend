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

  // Estado para armazenar dados de ambas as fontes
  let localData = { channels: [], movies: [], music: [] };
  let normalizedData = { channels: [], movies: [], music: [] };
  let apiCategories = [];

  const LOCAL_CATEGORIES_MAP = {
    Channels: "channels",
    Movies: "movies",
    Music: "music",
  };
  const LOCAL_CATEGORY_NAMES = Object.keys(LOCAL_CATEGORIES_MAP);

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
      const type = key.slice(0, -1);
      normalizedData[key] = localData[key].map((item) =>
        normalizeLocalItem(item, type)
      );
    }
    localData = { channels: [], movies: [], music: [] };
  }

  function normalizeLocalItem(item, type) {
    const isChannel = type === "channel";
    let thumbnail = isChannel ? item.logo : item.thumbnail;

    if (thumbnail && !thumbnail.startsWith("http")) {
      thumbnail = new URL(thumbnail, API_BASE_URL).href;
    }

    const categories = Array.isArray(item.categories)
      ? item.categories.map((name) => ({ name }))
      : [];

    let videoId = null;
    if (item.embed) {
      let urlString = item.embed;
      if (urlString.trim().startsWith("<iframe")) {
        const match = urlString.match(/src=['"]([^'"]+)['"]/);
        urlString = match ? match[1] : null;
      }
      if (urlString && urlString.includes("youtube.com")) {
        try {
          const potentialId = new URL(urlString).pathname.split("/").pop();
          if (potentialId) {
            videoId = potentialId.replace(/[^A-Za-z0-9_-]/g, ""); // Sanitiza o ID
          }
        } catch (e) {
          console.warn(
            `Não foi possível analisar a URL do embed: "${urlString}"`,
            e
          );
        }
      }
    }

    return {
      id: item.id || item.title,
      title: item.title || item.name,
      description: item.description || "",
      thumbnail: { url: thumbnail },
      categories: categories,
      author: item.author || "EternityReady",
      duration: item.duration || null,
      videoId: videoId,
    };
  }

  async function fetchCategories() {
    const combinedCategories = [...apiCategories];
    const apiCategoryNames = new Set(
      apiCategories.map((c) => c.name.toLowerCase())
    );

    const localToApiEquivalents = {
      Movies: "movies",
      Music: "music",
      Channels: "channels",
    };

    LOCAL_CATEGORY_NAMES.forEach((localName) => {
      const equivalentApiName = localToApiEquivalents[localName.toLowerCase()];
      if (
        !apiCategoryNames.has(localName.toLowerCase()) &&
        !apiCategoryNames.has(equivalentApiName)
      ) {
        combinedCategories.push({ name: localName });
      }
    });

    return combinedCategories;
  }

  async function fetchVideosByCategory(categoryName) {
    if (LOCAL_CATEGORY_NAMES.includes(categoryName)) {
      const localKey = LOCAL_CATEGORIES_MAP[categoryName];
      return normalizedData[localKey] || [];
    }

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
        `Falha ao buscar vídeos da API para a categoria ${categoryName}:`,
        error
      );
      return [];
    }
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

  //
  // ─── LÓGICA DA BARRA DE PESQUISA DINÂMICA ──────────────────────────────────────────
  //
  async function initializeSearch() {
    const input = document.getElementById("search-input");
    const dropdown = document.getElementById("search-dropdown");
    if (!input || !dropdown) return;

    // ... (restante das declarações de variáveis da busca)
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
      const apiResultTitles = new Set(apiResults.map((v) => v.title));
      const uniqueLocalResults = localResults.filter(
        (v) => !apiResultTitles.has(v.title)
      );
      return [...apiResults, ...uniqueLocalResults];
    }

    // ... (O restante da função initializeSearch permanece praticamente o mesmo)
    function renderTrending() {
      /* ...código sem alterações... */ trendingList.innerHTML = "";
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
      /* ...código sem alterações... */ categoriesList.innerHTML = "";
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
        // Lógica ajustada para pegar URL da thumbnail de qualquer fonte
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
      /* ...código sem alterações... */ mediaSection.style.display = "none";
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
    // playersToCreate.forEach(createPlayerForCard);
    // playersToCreate = [];
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
    let playerInstanceCounter = 0;

    for (const category of categories) {
      const videos = await fetchVideosByCategory(category.name);
      if (videos.length > 0) {
        // A função createSliderHTML agora só prepara o container do player
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
              .join(
                ", "
              )}</p><p class="media-by">by <span class="media-author">${
              video.author || "EternityReady"
            }</span></p></div></div></div></a>`;
          })
          .join("");

        // --- CORREÇÃO APLICADA AQUI ---
        // Usando a variável 'sliderHTML' em vez de 'sliderContent'
        const sliderContent = `<div class="section-header"><h2 class="section-title"><a href="/categories/?category=${category.name}">${category.name}</a></h2><a href="/categories?category=${category.name}" class="section-link"><i class="fa fa-chevron-right"></i></a></div><div class="slider-wrapper"><button class="slider-arrow prev" aria-label="Anterior"><i class="fa fa-chevron-left"></i></button><div class="media-grid">${sliderHTML}</div><button class="slider-arrow next" aria-label="Próximo"><i class="fa fa-chevron-right"></i></button></div><hr class="media-separator" />`;

        const sliderSection = document.createElement("div");
        sliderSection.className = `category-section ${category.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-section`;
        sliderSection.innerHTML = sliderContent;
        slidersContainer.appendChild(sliderSection);
      }
    }
    initializeSliderControls();
  }

  function createSliderHTML(category, videos) {
    const videoCardsHTML = videos
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
    return `<div class="section-header"><h2 class="section-title"><a href="/categories/?category=${category.name}">${category.name}</a></h2><a href="/categories?category=${category.name}" class="section-link"><i class="fa fa-chevron-right"></i></a></div><div class="slider-wrapper"><button class="slider-arrow prev" aria-label="Anterior"><i class="fa fa-chevron-left"></i></button><div class="media-grid">${videoCardsHTML}</div><button class="slider-arrow next" aria-label="Próximo"><i class="fa fa-chevron-right"></i></button></div><hr class="media-separator" />`;
  }

  //
  // ─── INICIALIZAÇÃO DOS COMPONENTES DE UI E FUNÇÃO PRINCIPAL ─────────
  //
  function initializeSliderControls() {
    /* ...código sem alterações... */ document
      .querySelectorAll(".slider-wrapper")
      .forEach((wrapper) => {
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
    /* ...código sem alterações... */ const menuBtn =
        document.querySelector(".btn-menu"),
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

  /**
   * Função principal de inicialização para orquestrar o carregamento e a renderização.
   */
  async function main() {
    await loadAllDataSources();
    normalizeAllLocalData();

    initializeHeroPlayer();
    initializeSearch();
    initializeDynamicSliders();
    initializeGeneralUI();
    initializePlayerPreviews();
  }

  main(); // Executa a aplicação.
});
