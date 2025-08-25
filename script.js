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

  // --- FUNÇÕES GERAIS DA API ---
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

  //
  // ─── LÓGICA DA BARRA DE PESQUISA ──────────────────────────────────────────────
  //
  async function initializeSearch() {
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

    if (!input || !dropdown) return;

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
      /* ... implementação existente ... */
    }
    function renderCategories(categoriesData) {
      /* ... implementação existente ... */
    }
    function renderLiveResults(videos) {
      /* ... implementação existente ... */
    }
    function renderEmpty() {
      /* ... implementação existente ... */
    }

    // (Cole aqui as implementações completas das funções de renderização da busca do seu código anterior)
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
        const imageUrl = video.thumbnail?.url
          ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
          : "images/placeholder.jpg";
        const videoUrl = `/player.html?q=${video.id}`;

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
        performLiveSearch({ target: { value: input.value } });
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
      if (!document.querySelector(".search-container").contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  //
  // ─── LÓGICA DOS SLIDERS DINÂMICOS ──────────────────────────────────────────
  //

  /** Busca vídeos de uma categoria específica. */
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

  /** Cria o HTML para um único slider. */
  function createSliderHTML(category, videos) {
    const videoCardsHTML = videos
      .map((video) => {
        const imageUrl = video.thumbnail?.url
          ? `${API_BASE_URL}${video.thumbnail.url.replace(/^\//, "")}`
          : "images/placeholder.jpg";

        const playerUrl = `/player/?q=${video.id}`;

        return `
      <a href="${playerUrl}" class="media-card-link">
        <div class="media-card">
          <div class="media-thumb">
            <img src="${imageUrl}" alt="${video.title}" />
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
                video.author || "eternityready"
              }</span></p>
            </div>
          </div>
        </div>
      </a>
      `;
      })
      .join("");

    return `
      <div class="section-header">
        <h2 class="section-title"><a href="http://127.0.0.1:5500/categories?category=${
          category.id
        }/">${category.name}</a></h2>
        <a href="#" class="section-link"><i class="fa fa-chevron-right"></i></a>
      </div>
      <div class="slider-wrapper">
        <button class="slider-arrow prev" aria-label="Previous"><i class="fa fa-chevron-left"></i></button>
        <div class="media-grid">${videoCardsHTML}</div>
        <button class="slider-arrow next" aria-label="Next"><i class="fa fa-chevron-right"></i></button>
      </div>
      ${
        category.name !== "Newest Stuff" ? '<hr class="media-separator" />' : ""
      }
    `;
  }

  /** Função principal que busca dados e renderiza todos os sliders. */
  async function initializeDynamicSliders() {
    const slidersContainer = document.getElementById(
      "dynamic-sliders-container"
    );
    if (!slidersContainer) {
      console.error(
        "Container para sliders dinâmicos (#dynamic-sliders-container) não encontrado."
      );
      return;
    }

    slidersContainer.innerHTML = "<p>Loading content...</p>"; // Feedback visual
    const categories = await fetchCategories();

    if (categories.length === 0) {
      slidersContainer.innerHTML = "<p>No categories found.</p>";
      return;
    }

    slidersContainer.innerHTML = ""; // Limpa o container antes de adicionar os sliders

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

    // Após adicionar todo o HTML, inicializa os scripts dos sliders
    initializeSliderArrows();
    initializeDragToScroll();
  }

  //
  // ─── INICIALIZAÇÃO DOS COMPONENTES DE UI (SETAS, DRAG-SCROLL, ETC.) ─────────
  //
  function initializeSliderArrows() {
    document.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
      const slider = wrapper.querySelector(
        ".media-grid, .browse-slider, .people-slider"
      );
      const prevBtn = wrapper.querySelector(".slider-arrow.prev");
      const nextBtn = wrapper.querySelector(".slider-arrow.next");
      if (!slider || !prevBtn || !nextBtn) return;

      const itemCount = slider.querySelectorAll(".media-card").length;

      if (itemCount <= 5) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        return;
      }

      prevBtn.style.display = "";
      nextBtn.style.display = "";

      const scrollAmount = slider.clientWidth * 0.8; // Rola 80% da largura visível
      prevBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
      nextBtn.addEventListener("click", () => {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
  }

  function initializeDragToScroll() {
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
    /* ... implementação existente ... */
  }
  (function initializeSettingsMenu() {
    /* ... implementação existente ... */
  })();

  // (Cole aqui as implementações das funções de UI do seu código anterior)
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

  (function initializeSettingsMenu() {
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
          const heroVideo = document.querySelector(".hero-video");
          if (!heroVideo) return;
          if (item.dataset.speed)
            heroVideo.playbackRate = parseFloat(item.dataset.speed);
          if (item.classList.contains("toggle-mute")) {
            heroVideo.muted = !heroVideo.muted;
            item.textContent = heroVideo.muted ? "Unmute" : "Mute";
          }
        });
      });
    }
  })();

  // --- PONTO DE ENTRADA ---
  initializeSearch();
  initializeDynamicSliders();
  initializeGeneralUI();
});
