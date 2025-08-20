// script.js

/**
 * Atraso na execução de uma função (ótimo para buscas ao vivo).
 * @param {Function} func A função a ser executada após o delay.
 * @param {number} delay O tempo de espera em milissegundos.
 * @returns {Function} A nova função "debounced".
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
  const API_BASE_URL = "http://localhost:3002/";

  // =======================================================================
  // --- LÓGICA DA PÁGINA DO PLAYER ---
  // Esta parte só será executada se encontrar os elementos do player na página.
  // =======================================================================

  async function fetchVideo(videoId) {
    if (!videoId) return null;
    try {
      const url = `${API_BASE_URL}api/video/${videoId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.video || null;
    } catch (e) {
      console.error(`Falha ao buscar vídeo: ${e}`);
      return null;
    }
  }

  function renderVideo(video) {
    const player = document.getElementById("video-player");
    const titleElement = document.getElementById("video-title");
    const descriptionElement = document.getElementById("video-description");

    if (!video || !player || !titleElement || !descriptionElement) {
      if (titleElement) titleElement.textContent = "Vídeo não encontrado.";
      console.error("Elementos do DOM ou dados do vídeo não encontrados.");
      return;
    }

    if (video.sourceType === "youtube" && video.videoId) {
      player.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
    }

    titleElement.textContent = video.title;
    descriptionElement.innerHTML = video.description.replace(/\n/g, "<br />");
  }

  async function initializePlayerPage() {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get("q"); // 'q' é o ID do vídeo para a página do player
    if (videoId) {
      const videoData = await fetchVideo(videoId);
      if (videoData) {
        renderVideo(videoData);
      }
    }
  }

  // =======================================================================
  // --- LÓGICA DA BARRA DE PESQUISA ---
  // Esta parte só será executada se encontrar a barra de pesquisa na página.
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
      console.error("Falha ao buscar categorias:", error);
      return [];
    }
  }

  async function searchMidia(query) {
    if (!query) return [];
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
          '<li class="search-feedback">Nenhum resultado encontrado.</li>';
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
          window.location.href = videoUrl; // Exemplo de navegação
          console.log("Clicou em:", video.title);
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

      seeAllLink.textContent = "Ver todos os resultados »";
      seeAllLink.href = "/search.html";
    }

    const performLiveSearch = async (event) => {
      const query = event.target.value.trim();
      seeAllLink.href = `/search.html?query=${encodeURIComponent(query)}`;
      seeAllLink.textContent = `Ver todos os resultados para "${query}" »`;

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
  // Pode ser executado em todas as páginas.
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
