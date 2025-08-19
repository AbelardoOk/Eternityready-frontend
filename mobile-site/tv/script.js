// Aguarda o DOM estar completamente carregado para executar o script
document.addEventListener("DOMContentLoaded", () => {
  const dropdownBtn = document.getElementById("dropdown-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");

  dropdownBtn.addEventListener("click", function (event) {
    event.preventDefault();
    dropdownMenu.classList.toggle("show");
  });

  window.addEventListener("click", function (event) {
    if (!dropdownBtn.contains(event.target)) {
      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show");
      }
    }
  });

  // =================================================================================
  // 1. ESTADO DA APLICAÇÃO E CACHE DE ELEMENTOS
  // =================================================================================
  // Armazena os dados carregados para evitar novas requisições
  let allChannels = [];
  let allMovies = [];
  let savedChannels = []; // Array que será a fonte da verdade para canais salvos

  // Guarda referências para elementos do DOM que não mudam
  const mainContainer = document.getElementById("main-container");
  const channelButton = document.getElementById("channel-button");
  const movieButton = document.getElementById("movie-button");
  const contentDisplaySection = document.getElementById("content-display-section");
  const contentIframe = document.getElementById("main-content-iframe");
  const contentTitle = document.getElementById("content-title");
  const contentDescription = document.getElementById("content-description");
  const contentCategoriesList = document.getElementById("content-categories-list");

  // =================================================================================
  // 2. INICIALIZAÇÃO
  // =================================================================================
  // Função principal que inicia a aplicação
  async function init() {
    setupEventListeners();

    // Carrega os canais salvos dos cookies
    savedChannels = getSavedChannelsFromCookies();

    try {
      // Carrega os dados de canais e filmes em paralelo
      const [channelData, movieData] = await Promise.all([
        fetch("channels.json").then((res) => res.json()),
        fetch("movies.json").then((res) => res.json()),
      ]);

      allChannels = channelData.channels.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      // Assumindo que seu movies.json tem uma estrutura { "movies": [...] }
      allMovies = movieData.movies.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      // Inicia a aplicação na visualização de canais
      updateView("channel");

      if (window.updatePrograms) {
        window.updatePrograms();
      }
    } catch (error) {
      mainContainer.innerHTML =
        "<h2>Error loading data. Please try again later.</h2>";
      console.error("Error loading data:", error);
    }
  }

  // =================================================================================
  // 3. GERENCIAMENTO DE EVENTOS (LISTENERS)
  // =================================================================================
  // Configura todos os listeners estáticos da página
  function setupEventListeners() {
    channelButton.addEventListener("click", () => updateView("channel"));
    movieButton.addEventListener("click", () => updateView("movie"));

    // Delegação de Eventos: um único listener no container principal
    mainContainer.addEventListener("input", handleDynamicInput);
    mainContainer.addEventListener("change", handleDynamicChange);
  }

  // >>>>> MODIFICADO: Adicionado listener para filtros de filmes <<<<<
  function handleDynamicInput(event) {
    if (event.target.id === "search-input") {
      applyChannelFilters();
    } else if (event.target.id === "movie-search-input") {
      applyMovieFilters();
    }
  }

  // >>>>> MODIFICADO: Adicionado listener para filtros de filmes <<<<<
  function handleDynamicChange(event) {
    if (event.target.id === "categoryFilter") {
      applyChannelFilters();
    } else if (event.target.id === "movie-genre-filter") {
      applyMovieFilters();
    }
  }

  // =================================================================================
  // 4. GERENCIAMENTO DE VIEWS
  // =================================================================================
  function updateView(viewName) {
    // Limpa o container
    mainContainer.innerHTML = "";

    // Atualiza o estado ativo dos botões
    channelButton.classList.toggle("ativo", viewName === "channel");
    movieButton.classList.toggle("ativo", viewName === "movie");

    // Renderiza a view correspondente
    if (viewName === "channel") {
      renderChannelView();
    } else if (viewName === "movie") {
      renderMovieView();
    }
  }

  // =================================================================================
  // 5. LÓGICA DE RENDERIZAÇÃO
  // =================================================================================

  // --- RENDERIZAÇÃO DA VIEW DE CANAIS ---
  function renderChannelView() {
    const channelViewHTML = `
        <div class="search-section">
            <h2>Browse channels</h2>
            <div class="channelssearch">
                <div class="second-search-parent">
                    <div class="second-search-bar">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="search-input" placeholder="Search for channels..."/>
                    </div>
                    <select id="categoryFilter">
                        <option value="all">All Categories</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="channel-carousels-container"></div>
        <div id="saved-channels-container"></div>
        <div class="cardbg">
            <div class="main-parent">
                <div class="count">
                    <p id="channel-count">channels</p>
                </div>
                <div id="channel-grid" class="channel-grid"></div>
            </div>
        </div>
    `;
    mainContainer.innerHTML = channelViewHTML;

    // 1. Render channel carousels using MOVIE classes and structure
    const groupedChannels = { featured: [], popular: [], sports: [] };
    allChannels.forEach((channel) => {
      (channel.tags || []).forEach((tag) => {
        if (groupedChannels[tag]) groupedChannels[tag].push(channel);
      });
    });

    const carouselsContainer = document.getElementById(
      "channel-carousels-container"
    );
    Object.entries({
      featured: "Featured",
      popular: "Popular",
    }).forEach(([tag, title]) => {
      const channelsInGroup = groupedChannels[tag];
      if (channelsInGroup && channelsInGroup.length > 0) {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "movie-section"; // Using MOVIE class here
        sectionDiv.innerHTML = `
                <h2>${title}</h2>
                <div class="swiper">
                    <div class="swiper-wrapper"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>`;

        // Wrap in the same structure as movies
        const cardBgWrapper = document.createElement("div");
        cardBgWrapper.className = "cardbgg";
        const mainParentWrapper = document.createElement("div");
        mainParentWrapper.className = "main-parent";

        mainParentWrapper.appendChild(sectionDiv);
        cardBgWrapper.appendChild(mainParentWrapper);
        carouselsContainer.appendChild(cardBgWrapper);

        const swiperWrapper = sectionDiv.querySelector(".swiper-wrapper");
        channelsInGroup.forEach((channel) => {
          const card = createChannelCard(channel);
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.appendChild(card);
          swiperWrapper.appendChild(slide);
        });

        new Swiper(sectionDiv.querySelector(".swiper"), {
          slidesPerView: "auto",
          spaceBetween: 8,
          navigation: {
            nextEl: sectionDiv.querySelector(".swiper-button-next"),
            prevEl: sectionDiv.querySelector(".swiper-button-prev"),
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          },
        });
      }
    });

    // 2. Original channel view setup
    const categoryFilterElement = document.getElementById("categoryFilter");
    populateCategories(allChannels, categoryFilterElement, "categories");
    renderSavedChannels();
    renderSavedList();
    applyChannelFilters();
  }

  // --- RENDERIZAÇÃO DA VIEW DE FILMES (MODIFICADA) ---
  function renderMovieView() {
    const movieContainer = document.createElement("div");
    movieContainer.id = "movie-sections-container";
    mainContainer.appendChild(movieContainer);

    // 1. Renderiza os Carrosséis (código original)
    const groupedMovies = { featured: [], popular: [], new: [] };
    allMovies.forEach((movie) => {
      (movie.tags || []).forEach((tag) => {
        if (groupedMovies[tag]) groupedMovies[tag].push(movie);
      });
    });

    Object.entries({
      featured: "Featured",
      popular: "Popular",
    }).forEach(([tag, title]) => {
      const moviesInGroup = groupedMovies[tag];
      if (moviesInGroup && moviesInGroup.length > 0) {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "movie-section";
        sectionDiv.innerHTML = `
                    <h2>${title}</h2>
                    <div class="swiper">
                        <div class="swiper-wrapper"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>`;

        const swiperWrapper = sectionDiv.querySelector(".swiper-wrapper");
        moviesInGroup.forEach((movie) => {
          const card = createMovieCard(movie);
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.appendChild(card);
          swiperWrapper.appendChild(slide);
        });
        movieContainer.appendChild(sectionDiv);
        new Swiper(sectionDiv.querySelector(".swiper"), {
          slidesPerView: "auto",
          spaceBetween: 8,
          navigation: {
            nextEl: sectionDiv.querySelector(".swiper-button-next"),
            prevEl: sectionDiv.querySelector(".swiper-button-prev"),
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          },
        });
      }
    });

    // 2. Renderiza a nova Grid de Todos os Filmes
    const allMoviesGridHTML = `
            <div class="second-search-section" style="margin-top: 40px;">
                <h2>Browse all movies</h2>
                <div class="second-search-parent">
                    <div class="second-search-bar">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="movie-search-input" placeholder="Search for movies..."/>
                    </div>
                    <select id="movie-genre-filter">
                        <option value="all">All Genres</option>
                    </select>
                </div>
            </div>
            <div class="cardbg">
                <div class="main-parent">
                    <div class="count">
                        <p id="movie-count">movies</p>
                    </div>
                    <div id="movie-grid" class="channel-grid"></div>
                </div>
            </div>
        `;
    // Adiciona a nova seção ao container principal
    mainContainer.insertAdjacentHTML("beforeend", allMoviesGridHTML);

    const genreFilterElement = document.getElementById("movie-genre-filter");
    // Assumindo que a propriedade se chama 'genres' no seu JSON de filmes
    populateCategories(allMovies, genreFilterElement, "categories");
    applyMovieFilters();
  }

  // --- FUNÇÕES DE RENDERIZAÇÃO DE GRIDS ---
  function renderChannelGrid(channelsToRender) {
    const channelGrid = document.getElementById("channel-grid");
    channelGrid.innerHTML = "";
    channelsToRender.forEach((channel) => {
      if (!isChannelSaved(channel.name)) {
        channelGrid.appendChild(createChannelCard(channel));
      }
    });
    document.getElementById(
      "channel-count"
    ).textContent = `Results found: ${channelsToRender.length}`;
  }

  // >>>>> NOVO: Função para renderizar a grid de filmes <<<<<
  function renderMovieGrid(moviesToRender) {
    const movieGrid = document.getElementById("movie-grid");
    movieGrid.innerHTML = ""; // Limpa a grid antes de adicionar novos itens
    moviesToRender.forEach((movie) => {
      movieGrid.appendChild(createMovieCard(movie));
    });
    document.getElementById(
      "movie-count"
    ).textContent = `Results found: ${moviesToRender.length}`;
  }

  function renderSavedChannels() {
    const savedContainer = document.getElementById("saved-channels-container");
    savedContainer.innerHTML = "";
    const savedChannelObjects = allChannels.filter((ch) =>
      isChannelSaved(ch.name)
    );

    if (savedChannelObjects.length > 0) {
      savedContainer.innerHTML = "<h2>Saved Channels</h2>";
      const savedGrid = document.createElement("div");
      savedGrid.className = "channel-grid";
      savedChannelObjects.forEach((channel) => {
        savedGrid.appendChild(createChannelCard(channel));
      });
      savedContainer.appendChild(savedGrid);
    }
  }

  // =================================================================================
  // 6. CRIAÇÃO DE ELEMENTOS (CARDS)
  // =================================================================================
  function createChannelCard(channel) {
    const card = document.createElement("div");
    card.className = "channel-card";
    const isSaved = isChannelSaved(channel.name);
    const currentShowName = "Not Found";
    var online = "Online";
    if (channel.status != "ON") {
      online = "Offline";
    }

    card.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}">
            <div class="channel-details">
                <h3>${channel.name}</h3>
                <p class="online">${online}</p>
                <div class="raiting-save">
                    <div class="rating" data-rating="${channel.rating}"></div>
                    <button class="watch-later-btn" data-channel="${
                      channel.name
                    }">
                        <i class="fa-solid fa-bookmark bookmark-icon ${
                          isSaved ? "active" : ""
                        }"></i>
                        <div class="spinner">
                            <i class="fa-solid fa-circle-notch fa-spin"></i>
                        </div>
                    </button>
                </div>
                <p class="current-program" data-channel-name="${
                  channel.name
                }"><span>On Now: </span>${currentShowName}</p>
            </div>`;

    card.addEventListener("click", () => displayContent(channel));

    const watchLaterBtn = card.querySelector(".watch-later-btn");
    watchLaterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleSaveClick(channel, card);
    });
    return card;
  }

  function createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "movie-card"; // Reutilize o estilo se já tiver
    card.innerHTML = `
        <img src="${movie.thumbnail}" alt="${movie.title}">
        <div class="movie-details">
            <h3>${movie.title}</h3>
            <div class="rating" data-rating="${movie.rating}"></div>
        </div>
    `;
    card.addEventListener("click", () => displayContent(movie));
    return card;
  }

  // =================================================================================
  // 7. LÓGICA DE AÇÕES DO USUÁRIO
  // =================================================================================
  async function handleSaveClick(channel, cardElement) {
    const watchLaterBtn = cardElement.querySelector(".watch-later-btn");
    const spinner = watchLaterBtn.querySelector(".spinner");
    const bookmarkIcon = watchLaterBtn.querySelector(".bookmark-icon");

    // Show loading state
    spinner.style.display = "block";
    bookmarkIcon.style.display = "none";

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Toggle save state
    const isCurrentlySaved = isChannelSaved(channel.name);
    if (isCurrentlySaved) {
      removeChannelFromCookies(channel.name);
      savedChannels = savedChannels.filter((name) => name !== channel.name);
    } else {
      saveChannelToCookies(channel.name);
      savedChannels.push(channel.name);
    }

    // Update ONLY the clicked card's visual state
    bookmarkIcon.classList.toggle("active", !isCurrentlySaved);

    // Update saved channels lists without full re-render
    updateSavedChannelsUI();

    // Restore icon
    spinner.style.display = "none";
    bookmarkIcon.style.display = "block";
  }

  function updateSavedChannelsUI() {
    // Efficiently update both saved channels displays
    renderSavedChannels();
    renderSavedList();

    // Only update filters if needed
    if (document.getElementById("categoryFilter").value !== "all") {
      applyChannelFilters();
    }
  }
  function renderSavedList() {
    const savedListContainer = document.getElementById("savedList");
    savedListContainer.innerHTML = "";

    const savedChannelObjects = allChannels.filter((ch) =>
      isChannelSaved(ch.name)
    );
    const emptyMessage = document.querySelector(".wejaskdscs");

    if (savedChannelObjects.length > 0) {
      // Hide "no items" message if it exists
      if (emptyMessage) emptyMessage.style.display = "none";

      const savedGrid = document.createElement("div");
      savedGrid.className = "channel-grid";

      savedChannelObjects.forEach((channel) => {
        savedGrid.appendChild(createChannelCard(channel));
      });

      savedListContainer.appendChild(savedGrid);
      savedListContainer.classList.add("cardbg");

      const mainParent = document.createElement("div");
      mainParent.className = "main-parent";
      savedListContainer.insertBefore(mainParent, savedGrid);
      mainParent.appendChild(savedGrid);
    } else {
      // Show "no items" message when empty
      if (emptyMessage) {
        emptyMessage.style.display = "block";
      } else {
        const message = document.createElement("p");
        message.className = "wejaskdscs";
        message.textContent = "No items in watch later";
        savedListContainer.appendChild(message);
      }
    }
  }

  function applyChannelFilters() {
    const searchTerm =
      document.getElementById("search-input")?.value.toLowerCase() || "";
    const selectedCategory =
      document.getElementById("categoryFilter")?.value || "all";

    const filtered = allChannels.filter((channel) => {
      const matchesSearch =
        channel.name.toLowerCase().includes(searchTerm) ||
        (channel.keywords || []).some((k) =>
          k.toLowerCase().includes(searchTerm)
        );
      const matchesCategory =
        selectedCategory === "all" ||
        (channel.categories || [])
          .map((c) => c.toLowerCase())
          .includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
    renderChannelGrid(filtered);
  }

  // >>>>> NOVO: Função para filtrar os filmes <<<<<
  function applyMovieFilters() {
    const searchTerm =
      document.getElementById("movie-search-input")?.value.toLowerCase() || "";
    const selectedGenre =
      document.getElementById("movie-genre-filter")?.value || "all";

    const filtered = allMovies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
      // Assumindo que a propriedade se chama 'genres' no seu JSON
      const matchesGenre =
        selectedGenre === "all" ||
        (movie.categories || [])
          .map((g) => g.toLowerCase())
          .includes(selectedGenre.toLowerCase());
      return matchesSearch && matchesGenre;
    });

    renderMovieGrid(filtered);
  }

  // =================================================================================
  // 8. LÓGICA DE EXIBIÇÃO DE CONTEÚDO
  // =================================================================================
   function renderRecommendations(currentItem) {
    const recommendationsContainer = document.getElementById(
      "modal-recommendations-grid"
    );
    recommendationsContainer.innerHTML = ""; // Limpa recomendações anteriores

    const itemCategories = currentItem.categories || currentItem.genres || [];
    if (itemCategories.length === 0) return; // Não faz nada se o item não tem categoria

    // Junta canais e filmes em uma única lista para buscar recomendações
    const allMedia = [...allChannels, ...allMovies];
    const currentTitle = currentItem.name || currentItem.title;

    const recommendations = allMedia
      .filter((media) => {
        // 1. Não recomendar o próprio item que está aberto
        const mediaTitle = media.name || media.title;
        if (mediaTitle === currentTitle) {
          return false;
        }

        // 2. Verificar se há pelo menos uma categoria em comum
        const mediaCategories = media.categories || media.genres || [];
        return itemCategories.some((cat) => mediaCategories.includes(cat));
      })
      // Limita o número de recomendações (ex: 6) e embaralha para variedade
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);

    if (recommendations.length > 0) {
      document.querySelector(".recommendations-section").style.display =
        "block";
      recommendations.forEach((recItem) => {
        let card;
        // Verifica se é um canal ou filme para usar a função de criação de card correta
        if (recItem.logo) {
          // Canais têm 'logo'
          card = createChannelCard(recItem);
        } else {
          // Filmes têm 'thumbnail'
          card = createMovieCard(recItem);
        }
        recommendationsContainer.appendChild(card);
      });
    } else {
      // Opcional: esconde a seção se não houver recomendações
      document.querySelector(".recommendations-section").style.display = "none";
    }
  }
  
  
  
  function displayContent(item) {
    // Show the content display section
    contentDisplaySection.style.display = "block";
    
    // Scroll to the content section smoothly
    contentDisplaySection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });

    // Update iframe source
    contentIframe.src = item.embed || "";

    // Update title
    contentTitle.textContent = item.name || item.title || "Untitled";

    // Update description
    contentDescription.innerHTML = item.description || "No description available.";

    // Update categories
    const categories = item.categories || item.genres || [];
    if (categories.length > 0) {
      contentCategoriesList.textContent = categories.sort().join(", ");
      renderRecommendations(item);
    } else {
      contentCategoriesList.textContent = "No categories";
    }


  }



  // =================================================================================
  // 9. FUNÇÕES UTILITÁRIAS (Cookies, Categorias, etc.)
  // =================================================================================

  // >>>>> MODIFICADO: Função genérica para popular categorias/gêneros <<<<<
  function populateCategories(items, selectElement, categoryKey) {
    const categories = new Set();
    items.forEach((item) => {
      // Usa a chave passada (ex: 'categories' ou 'genres') para buscar os dados
      (item[categoryKey] || []).forEach((cat) => categories.add(cat));
    });

    Array.from(categories)
      .sort()
      .forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.toLowerCase(); // usa valor em minúsculo para consistência
        option.textContent = cat;
        selectElement.appendChild(option);
      });
  }

  function saveChannelToCookies(channelName) {
    let saved = getSavedChannelsFromCookies();
    if (!saved.includes(channelName)) {
      saved.push(channelName);
    }
    document.cookie = `savedChannels=${JSON.stringify(
      saved
    )};max-age=31536000;path=/`;
  }

  function removeChannelFromCookies(channelName) {
    let saved = getSavedChannelsFromCookies();
    saved = saved.filter((name) => name !== channelName);
    document.cookie = `savedChannels=${JSON.stringify(
      saved
    )};max-age=31536000;path=/`;
  }

  function getSavedChannelsFromCookies() {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("savedChannels="));
    if (cookie) {
      try {
        return JSON.parse(cookie.split("=")[1]);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  function isChannelSaved(channelName) {
    return savedChannels.includes(channelName);
  }

  // =================================================================================
  // 10. PONTO DE ENTRADA DA APLICAÇÃO
  // =================================================================================
  init();
});

window.onload = function () {
  // --- Variáveis de Controle ---
  let item_timeous = []; // Guarda os timers de animação para poder limpá-los
  let previousIndex = 0; // **IMPORTANTE**: Guarda o índice do slide anterior

  // --- Funções Auxiliares ---

  // Função que aplica a classe .show item por item, criando o efeito de fade-in
  function fadeInByRows(activeSlide) {
    // Limpa timers de animações anteriores para evitar sobreposição
    item_timeous.forEach((timeout) => clearTimeout(timeout));
    item_timeous = [];

    const items = Array.from(activeSlide.querySelectorAll(".container .item"));
    const rows = {};

    items.forEach((item) => {
      const top = item.offsetTop;
      if (!rows[top]) rows[top] = [];
      rows[top].push(item);
    });

    const rowKeys = Object.keys(rows).sort((a, b) => a - b);

    rowKeys.forEach((rowTop, index) => {
      const rowItems = rows[rowTop];
      const timeout = setTimeout(() => {
        rowItems.forEach((item) => item.classList.add("show"));
      }, index * 100); // Atraso de 100ms entre cada linha
      item_timeous.push(timeout);
    });
  }

  // Função que "limpa" um slide, removendo as animações
  function cleanupSlide(slide) {
    if (slide) {
      slide.querySelectorAll(".item.show").forEach((item) => {
        item.classList.remove("show");
      });
    }
  }

  // --- Inicialização do Swiper ---
  const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Eventos do Swiper
    on: {
      // Evento que roda quando o Swiper é criado
      init: function () {
        const activeSlide = this.slides[this.activeIndex];
        fadeInByRows(activeSlide);
        previousIndex = this.activeIndex;
      },

      // Evento que roda AO FINAL de uma transição de slide
      transitionEnd: function () {
        // Se não houve mudança de slide, não faz nada
        if (this.activeIndex === previousIndex) {
          return;
        }

        // 1. Limpa o slide que ficou para trás (o anterior)
        const oldSlide = this.slides[previousIndex];
        cleanupSlide(oldSlide);

        // 2. Anima o novo slide que apareceu
        const newActiveSlide = this.slides[this.activeIndex];
        fadeInByRows(newActiveSlide);

        // 3. Atualiza o índice para a próxima transição
        previousIndex = this.activeIndex;
      },
    },
  });
};
