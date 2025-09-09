/**
 * @param {Function} func
 * @param {number} delay
 * @returns {Function}
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
  // --- CONFIGURAÇÕES GLOBAIS ---
  const API_BASE_URL = "https://api.eternityready.com/";

  // =======================================================================
  // --- LÓGICA DO PLAYER DE VÍDEO ---
  // =======================================================================

  /**
   * Busca um vídeo específico apenas na API. Usado como fallback.
   * @param {string} videoId O ID do vídeo.
   * @returns {Promise<object|null>} Os dados do vídeo ou null.
   */
  async function fetchVideoFromAPI(videoId) {
    try {
      const url = `${API_BASE_URL}api/video/${videoId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // A API retorna um objeto com uma chave 'video'
      return data.video || null;
    } catch (e) {
      console.error(`Failed to fetch video from API: ${e}`);
      return null;
    }
  }

  /**
   * Normaliza os dados de diferentes fontes (JSON, API) para um formato consistente.
   * @param {object} item O item de mídia encontrado.
   * @param {string} type O tipo de mídia ('channel', 'music', 'movie').
   * @returns {object} Um objeto com estrutura padronizada.
   */
  function normalizeData(item, type) {
    const normalized = {
      title: item.title || item.name || "Title Unavailable",
      description: item.description || "",
      author: item.author || "Unknow Origin", // Padrão se não houver autor
      embedUrl: item.embed,
      sourceType: "unknown",
      videoId: null,
    };

    // Detecta se é um vídeo do YouTube e extrai o ID
    if (
      item.embed &&
      item.embed.includes("googleusercontent.com/youtube.com")
    ) {
      const parts = item.embed.split("/");
      normalized.videoId = parts.pop(); // Pega o último segmento da URL
      normalized.sourceType = "youtube";
    } else if (item.embed) {
      // Para outras fontes como canais, usamos o embed direto em um iframe
      normalized.sourceType = "iframe";
    }

    return normalized;
  }

  /**
   * Busca dados de mídia primeiro nos arquivos JSON locais, depois na API.
   * @param {string} mediaId O ID da mídia a ser buscada.
   * @returns {Promise<object|null>} Os dados da mídia normalizados ou null.
   */
  async function fetchMediaData(mediaId) {
    if (!mediaId) return null;

    // 1. Tenta buscar nos arquivos JSON locais primeiro
    try {
      const [channelsRes, musicRes, moviesRes] = await Promise.all([
        fetch("../data/channels.json"),
        fetch("../data/music.json"),
        fetch("../data/movies.json"),
      ]);

      if (!channelsRes.ok || !musicRes.ok || !moviesRes.ok) {
        throw new Error("Failed to load one or more JSON files.");
      }

      const channelsData = await channelsRes.json();
      const musicData = await musicRes.json();
      const moviesData = await moviesRes.json();

      let foundItem = null;
      let itemType = "";

      // Procura em filmes
      foundItem = moviesData.movies.find((item) => item.id === mediaId);
      if (foundItem) itemType = "movie";

      // Procura em músicas se não encontrou em filmes
      if (!foundItem) {
        foundItem = musicData.music.find((item) => item.id === mediaId);
        if (foundItem) itemType = "music";
      }

      // Procura em canais se não encontrou ainda
      // NOTA: Seu channels.json precisa ter um campo "id" em cada canal para isso funcionar.
      if (!foundItem) {
        foundItem = channelsData.channels.find((item) => item.id === mediaId);
        if (foundItem) itemType = "channel";
      }

      if (foundItem) {
        console.log(`Media found locally at ${itemType}s.json`);
        return normalizeData(foundItem, itemType);
      }
    } catch (e) {
      console.error("Error loading or processing local JSON files:", e);
      // O erro não impede de tentar a API, pode ser que o arquivo não exista.
    }

    // 2. Se não encontrou localmente, busca na API como fallback
    console.log("Media not found locally, trying API...");
    const apiData = await fetchVideoFromAPI(mediaId);
    // Dados da API já vêm num formato mais próximo, mas podemos normalizar para garantir consistência
    return apiData ? apiData : null;
  }

  /**
   * Renderiza o vídeo na página.
   * @param {object} video Objeto com os dados do vídeo.
   */
  function renderVideo(video) {
    const player = document.getElementById("video-player");
    const titleElement = document.getElementById("video-title");
    const authorElement = document.getElementById("video-author");
    const descriptionElement = document.getElementById("video-description");

    if (!video || !player || !titleElement || !descriptionElement) {
      if (titleElement) titleElement.textContent = "Midia not found.";
      console.error("DOM Elements or midia data not found.");
      return;
    }

    // Lógica de renderização melhorada para diferentes fontes
    if (video.sourceType === "youtube" && video.videoId) {
      // Usando o embed padrão do YouTube para maior compatibilidade
      player.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
    } else if (video.sourceType === "iframe" && video.embedUrl) {
      // Para canais e outros embeds diretos
      player.src = video.embedUrl;
    } else {
      console.error("Unknown video type or missing embed URL:", video);
      titleElement.textContent = "This media could not be loaded..";
      return;
    }

    titleElement.textContent = video.title;
    authorElement.textContent = video.author || ""; // Mostra autor se existir
    descriptionElement.innerHTML = video.description.replace(/\n/g, "<br />");
  }

  /**
   * Inicializa a página do player.
   */
  async function initializePlayerPage() {
    const params = new URLSearchParams(window.location.search);
    const mediaId = params.get("q");

    if (mediaId) {
      const mediaData = await fetchMediaData(mediaId);
      renderVideo(mediaData);
    } else {
      const titleElement = document.getElementById("video-title");
      if (titleElement) {
        titleElement.textContent = "No media selected.";
      }
    }
  }

  // =======================================================================
  // --- LÓGICA DA BARRA DE PESQUISA ---
  // (O código da barra de pesquisa permanece o mesmo)
  // =======================================================================

  async function fetchCategories() {
    try {
      const url = `${API_BASE_URL}api/categories`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  }

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
      console.error(`Failed to retrieve media: ${error}`);
      return [];
    }
  }

  async function initializeSearch() {
    const input = document.getElementById("search-input");
    const dropdown = document.getElementById("search-dropdown");
    const mediaList = document.getElementById("media-list");
    const mediaSection = document.getElementById("media-section");
    const historySection = document.getElementById("history-section");
    const categoriesSection = document.getElementById("categories-section");
    const historyList = document.getElementById("history-list");
    const noHistory = document.getElementById("no-history");
    const categoriesList = document.getElementById("categories-list");
    const seeAllLink = document.getElementById("see-all");

    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    let availableCategories = [];

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

    function renderLiveResults(videos) {
      categoriesSection.style.display = "none";
      historySection.style.display = "none";
      mediaSection.style.display = "block";
      mediaList.innerHTML = "";

      if (videos.length === 0) {
        mediaList.innerHTML =
          '<li class="search-feedback">No results found.</li>';
        return;
      }

      videos.slice(0, 5).forEach((video) => {
        const imageUrl = video.thumbnail?.url
          ? `http://localhost:3002${video.thumbnail.url}`
          : "images/placeholder.jpg";
        const videoUrl = `/player/?q=${video.id}`;

        const li = document.createElement("li");
        li.className = "media-item";
        li.innerHTML = `
        <img src="${imageUrl}" alt="${video.title}">
        <div class="media-info">
          <p class="media-title">${video.title}</p>
          <p class="media-meta">${video.categories
            .map((c) => c.name)
            .join(", ")}</p>
        </div>`;

        li.onclick = () => {
          window.location.href = videoUrl;
        };

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
        li.innerHTML = `<a href="/search.html?query=${encodeURIComponent(
          term
        )}">${term}</a>`;
        li.onclick = (e) => {
          e.preventDefault();
          input.value = term;
          window.location.href = `/search.html?query=${encodeURIComponent(
            term
          )}`;
        };
        historyList.appendChild(li);
      });

      renderCategories(availableCategories);

      seeAllLink.textContent = "See all results »";
      seeAllLink.href = "/search.html";
    }

    const performLiveSearch = async (event) => {
      const query = event.target.value.trim();
      seeAllLink.href = `/search.html?query=${encodeURIComponent(query)}`;
      seeAllLink.textContent = `See all results for "${query}" »`;

      if (query.length < 2) {
        renderEmpty();
        return;
      }

      mediaSection.style.display = "block";
      categoriesSection.style.display = "none";
      historySection.style.display = "none";
      mediaList.innerHTML = '<li class="search-feedback">Searching...</li>';

      const results = await searchMidia(query);
      renderLiveResults(results);
    };

    // --- INICIALIZAÇÃO E CARREGAMENTO DOS DADOS DE BUSCA ---
    availableCategories = await fetchCategories();
    const debouncedSearch = debounce(performLiveSearch, 400);

    input.addEventListener("input", debouncedSearch);
    input.addEventListener("focus", () => {
      dropdown.style.display = "block";
      if (input.value.trim() === "") renderEmpty();
      else performLiveSearch({ target: { value: input.value } });
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          history = [query, ...history.filter((h) => h !== query)].slice(0, 5);
          localStorage.setItem("searchHistory", JSON.stringify(history));
          window.location.href = `/search.html?query=${encodeURIComponent(
            query
          )}`;
        }
      }
    });
    document.addEventListener("click", (e) => {
      if (!document.querySelector(".search-container").contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  // =======================================================================
  // --- LÓGICA DE UI GERAL (ex: Menu Mobile) ---
  // (O código da UI geral permanece o mesmo)
  // =======================================================================

  function initializeGeneralUI() {
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

  // =======================================================================
  // --- PONTO DE ENTRADA ---
  // Decide qual parte do script inicializar com base nos elementos da página.
  // =======================================================================

  if (document.getElementById("video-player")) {
    initializePlayerPage();
  }

  if (document.getElementById("search-input")) {
    initializeSearch();
  }

  initializeGeneralUI();
});
