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

document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURAÇÕES GLOBAIS ---
  const API_BASE_URL = "https://api.eternityready.com/";

  //
  // ─── LÓGICA DA BARRA DE PESQUISA (IMPLEMENTAÇÃO DINÂMICA) ───────────────────
  //
  async function initializeSearch() {
    // Seletores do DOM
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

    // Se algum elemento essencial da busca não existir, interrompe a execução.
    if (!input || !dropdown) return;

    // Dados estáticos para "Trending" (mantido do segundo arquivo)
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

    // Estado
    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    let availableCategories = [];

    // --- FUNÇÕES DA API ---
    async function fetchCategories() {
      try {
        const url = `${API_BASE_URL}api/categories`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return (await response.json()) || [];
      } catch (error) {
        console.error("Falha ao buscar categorias:", error);
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
        console.error(`Falha ao buscar mídia: ${error}`);
        return [];
      }
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
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
        // Usa a URL base da API para construir o caminho da imagem, caso seja um caminho relativo.
        const imageUrl = video.thumbnail?.url
          ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
          : "images/placeholder.jpg";
        const videoUrl = `/player.html?q=${video.id}`; // Assumindo uma página player.html

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
        const searchPageUrl = `/search?query=${encodeURIComponent(term)}`;
        li.innerHTML = `<a href="${searchPageUrl}">${term}</a>`;
        li.onclick = (e) => {
          e.preventDefault();
          input.value = term;
          window.location.href = searchPageUrl;
        };
        historyList.appendChild(li);
      });

      renderCategories(availableCategories);
      renderTrending();

      seeAllLink.textContent = "Ver todos os resultados »";
      seeAllLink.href = "/search";
    }

    // --- LÓGICA PRINCIPAL DA BUSCA ---
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

    // --- INICIALIZAÇÃO E EVENT LISTENERS ---
    availableCategories = await fetchCategories();
    const debouncedSearch = debounce(performLiveSearch, 400);

    input.addEventListener("input", debouncedSearch);

    input.addEventListener("focus", () => {
      dropdown.style.display = "block";
      if (input.value.trim() === "") {
        renderEmpty();
      } else {
        // Dispara a busca imediatamente se já houver texto ao focar
        performLiveSearch({ target: { value: input.value } });
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          // Adiciona ao histórico e redireciona
          history = [query, ...history.filter((h) => h !== query)].slice(0, 5);
          localStorage.setItem("searchHistory", JSON.stringify(history));
          window.location.href = `/search?query=${encodeURIComponent(query)}`;
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (!document.querySelector(".search-container").contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  //
  // ─── SETTINGS MENU ───────────────────────────────────────────────────────────
  //
  const settingsBtn = document.querySelector(".control-settings");
  const settingsMenu = document.getElementById("settings-menu");

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
        const heroVideo = document.querySelector(".hero-video"); // Assumindo que o vídeo tem essa classe
        if (!heroVideo) return;

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

  //
  // ─── DRAG-TO-SCROLL FOR TOP 10 CAROUSEL ─────────────────────────────────────
  //
  const top10 = document.querySelector(".media-grid.top10");
  if (top10) {
    let isDown = false,
      startX,
      scrollLeft;

    const startDrag = (x) => {
      isDown = true;
      top10.classList.add("dragging");
      startX = x - top10.offsetLeft;
      scrollLeft = top10.scrollLeft;
    };
    const moveDrag = (x) => {
      if (!isDown) return;
      const walk = (x - startX) * 1.5; // Multiplicador para acelerar o scroll
      top10.scrollLeft = scrollLeft - walk;
    };
    const endDrag = () => {
      isDown = false;
      top10.classList.remove("dragging");
    };

    top10.addEventListener("mousedown", (e) => startDrag(e.pageX));
    top10.addEventListener("mousemove", (e) => {
      e.preventDefault();
      moveDrag(e.pageX);
    });
    top10.addEventListener("mouseup", endDrag);
    top10.addEventListener("mouseleave", endDrag);

    top10.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
    top10.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        moveDrag(e.touches[0].pageX);
      },
      { passive: false }
    );
    top10.addEventListener("touchend", endDrag);
  }

  //
  // ─── SLIDER ARROWS ────────────────────────────────────────────────────────────
  //
  document.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
    const slider = wrapper.querySelector(
      ".media-grid, .browse-slider, .people-slider"
    );
    const prevBtn = wrapper.querySelector(".slider-arrow.prev");
    const nextBtn = wrapper.querySelector(".slider-arrow.next");
    if (!slider || !prevBtn || !nextBtn) return;

    const scrollAmount = slider.clientWidth;
    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  //
  // ─── MENU MOBILE ──────────────────────────────────────────────────────────────
  //
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

  // --- PONTO DE ENTRADA ---
  initializeSearch();
  initializeGeneralUI();
});
