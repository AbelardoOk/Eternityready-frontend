/**
 * Returns a function that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds.
 * @param {Function} func The function to debounce.
 * @param {number} delay The number of milliseconds to delay.
 * @returns {Function} The new debounced function.
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

  // =======================================================================
  // --- CORE SEARCH AND DATA FETCHING LOGIC ---
  // =======================================================================

  /**
   * Normalizes a local JSON item to match the structure expected by the card renderer.
   * @param {object} item - The item from a local JSON file.
   * @param {string} type - The type ('movie', 'music', 'channel').
   * @returns {object} - A standardized object for rendering.
   */
  function normalizeLocalItemForSearch(item, type) {
    const categories = (item.categories || []).map((name) => ({
      name,
    }));
    const imageUrl = type === "channel" ? item.logo : item.thumbnail;

    return {
      id: item.id,
      title: item.title || item.name,
      author: item.author || "Eternity Ready", // Provide a default author
      thumbnail: {
        url: imageUrl,
      },
      categories: categories,
    };
  }

  /**
   * Searches for media in both local JSON files and the remote API.
   * @param {string} query The search query.
   * @returns {Promise<Array>} A combined and deduplicated list of search results.
   */
  async function searchMedia(query) {
    if (!query) return [];
    const lowerCaseQuery = query.toLowerCase();

    // --- Start both searches in parallel ---
    const localSearchPromise = (async () => {
      try {
        const responses = await Promise.all([
          fetch("../data/channels.json"),
          fetch("../data/music.json"),
          fetch("../data/movies.json"),
        ]);
        const [channelsData, musicData, moviesData] = await Promise.all(
          responses.map((res) => res.json())
        );

        const allItems = [
          ...moviesData.movies.map((item) =>
            normalizeLocalItemForSearch(item, "movie")
          ),
          ...musicData.music.map((item) =>
            normalizeLocalItemForSearch(item, "music")
          ),
          ...channelsData.channels.map((item) =>
            normalizeLocalItemForSearch(item, "channel")
          ),
        ];

        return allItems.filter((item) => {
          const title = (item.title || "").toLowerCase();
          const categories = (item.categories || [])
            .map((c) => c.name.toLowerCase())
            .join(" ");
          return (
            title.includes(lowerCaseQuery) ||
            categories.includes(lowerCaseQuery)
          );
        });
      } catch (error) {
        console.error("Failed to fetch or process local search data:", error);
        return [];
      }
    })();

    const apiSearchPromise = (async () => {
      try {
        const url = `${API_BASE_URL}/api/search?search_query=${encodeURIComponent(
          query
        )}`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.videos || [];
      } catch (error) {
        console.error(`Failed to fetch API search results: ${error}`);
        return [];
      }
    })();

    // --- Wait for both searches to complete and combine results ---
    const [localResults, apiResults] = await Promise.all([
      localSearchPromise,
      apiSearchPromise,
    ]);
    const combinedResults = [...localResults, ...apiResults];

    // Deduplicate results based on item ID
    const uniqueResults = Array.from(
      new Map(combinedResults.map((item) => [item.id, item])).values()
    );
    return uniqueResults;
  }

  // =======================================================================
  // --- PAGE CONTENT RENDERING LOGIC ---
  // =======================================================================

  /**
   * Creates the HTML for a single video card.
   * @param {object} video - The unified video object (from API or local).
   * @returns {string} - The HTML of the media-card.
   */
  function createVideoCardHTML(video) {
    let imageUrl = "images/placeholder.jpg"; // Default placeholder
    if (video.thumbnail && video.thumbnail.url) {
      // Handle both absolute URLs (from local JSON) and relative URLs (from API)
      if (video.thumbnail.url.startsWith("http")) {
        imageUrl = video.thumbnail.url;
      } else {
        imageUrl = `${API_BASE_URL}${video.thumbnail.url}`;
      }
    }

    const videoUrl = `/player/?q=${video.id}`;
    const title = video.title;
    const author = video.author || "Eternity Ready";
    const categoriesText = (video.categories || [])
      .map((cat) => cat.name)
      .join(", ");

    return `
      <div class="media-card" onclick="window.location.href='${videoUrl}'">
        <div class="media-thumb">
          <img src="${imageUrl}" alt="${title}" />
        </div>
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
   * Creates the HTML for the main grid of search results.
   * @param {string} title - The title for the section.
   * @param {Array} videos - The array of video objects.
   * @returns {string} - The HTML for the entire grid section.
   */
  function createAllVideosGridHTML(title, videos) {
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

  /**
   * Fetches search results based on URL query and renders them on the page.
   */
  async function fetchAndRenderSearchResults() {
    if (!dynamicContentArea) return;

    const params = new URLSearchParams(window.location.search);
    const queryValue = params.get("query") || "";
    const backHomeButtonHTML =
      '<a class="backHome-Button" href="/">Back Home</a>';

    if (!queryValue) {
      dynamicContentArea.innerHTML =
        backHomeButtonHTML +
        '<p class="container" style="text-align: center;">Please enter a search term.</p>';
      return;
    }

    try {
      const allVideos = await searchMedia(queryValue);
      let finalHTML = "";

      if (allVideos.length > 0) {
        finalHTML += createAllVideosGridHTML(
          `Search results for "${queryValue}"`,
          allVideos
        );
      }

      if (finalHTML) {
        dynamicContentArea.innerHTML = backHomeButtonHTML + finalHTML;
      } else {
        dynamicContentArea.innerHTML =
          backHomeButtonHTML +
          `<p class="container" style="text-align: center;">No results found for "${queryValue}".</p>`;
      }
    } catch (error) {
      console.error("Error rendering search results:", error);
      dynamicContentArea.innerHTML =
        backHomeButtonHTML +
        '<p class="container" style="text-align: center; color: red;">The content could not be loaded.</p>';
    }
  }

  // =======================================================================
  // --- HEADER SEARCH DROPDOWN LOGIC ---
  // =======================================================================

  async function initializeSearchDropdown() {
    const input = document.getElementById("search-input");
    const dropdown = document.getElementById("search-dropdown");
    if (!input || !dropdown) return; // Exit if search elements aren't on this page

    const mediaList = document.getElementById("media-list");
    const mediaSection = document.getElementById("media-section");
    const historySection = document.getElementById("history-section");
    const categoriesSection = document.getElementById("categories-section");
    const historyList = document.getElementById("history-list");
    const noHistory = document.getElementById("no-history");
    const categoriesList = document.getElementById("categories-list");
    const seeAllLink = document.getElementById("see-all");

    let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

    // Helper functions for the dropdown
    const renderLiveResults = (videos) => {
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
        let imageUrl = "images/placeholder.jpg";
        if (video.thumbnail && video.thumbnail.url) {
          if (video.thumbnail.url.startsWith("http")) {
            imageUrl = video.thumbnail.url;
          } else {
            imageUrl = `${API_BASE_URL}${video.thumbnail.url}`;
          }
        }
        const li = document.createElement("li");
        li.className = "media-item";
        li.innerHTML = `
          <img src="${imageUrl}" alt="${video.title}">
          <div class="media-info">
            <p class="media-title">${video.title}</p>
            <p class="media-meta">${(video.categories || [])
              .map((c) => c.name)
              .join(", ")}</p>
          </div>`;
        li.onclick = () => {
          window.location.href = `/player/?q=${video.id}`;
        };
        mediaList.appendChild(li);
      });
    };

    const renderEmpty = () => {
      mediaSection.style.display = "none";
      categoriesSection.style.display = "block";
      historySection.style.display = "block";
      noHistory.style.display = history.length ? "none" : "block";
      historyList.innerHTML = "";
      history.forEach((term) => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `<a href="/search/?query=${encodeURIComponent(
          term
        )}">${term}</a>`;
        historyList.appendChild(li);
      });
      seeAllLink.textContent = "See all results »";
      seeAllLink.href = "/search";
    };

    const performLiveSearch = async (event) => {
      const query = event.target.value.trim();
      seeAllLink.href = `/search/?query=${encodeURIComponent(query)}`;
      seeAllLink.textContent = `See all results for "${query}" »`;

      if (query.length < 2) {
        renderEmpty();
        return;
      }
      mediaSection.style.display = "block";
      categoriesSection.style.display = "none";
      historySection.style.display = "none";
      mediaList.innerHTML = '<li class="search-feedback">Searching...</li>';
      const results = await searchMedia(query);
      renderLiveResults(results);
    };

    // Event Listeners
    const debouncedSearch = debounce(performLiveSearch, 400);
    input.addEventListener("input", debouncedSearch);

    input.addEventListener("focus", () => {
      dropdown.style.display = "block";
      if (input.value.trim() === "") {
        renderEmpty();
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
      if (!e.target.closest(".search-container")) {
        dropdown.style.display = "none";
      }
    });
  }

  // =======================================================================
  // --- GENERAL UI & INITIALIZATION ---
  // =======================================================================

  // Mobile Menu Logic
  const menuBtn = document.querySelector(".btn-menu");
  const overlay = document.querySelector(".menu-overlay");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".btn-nav-close");

  if (menuBtn && mobileNav) {
    const toggleMobileNav = () => {
      mobileNav.classList.toggle("open");
      overlay.classList.toggle("open");
    };
    menuBtn.addEventListener("click", toggleMobileNav);
    closeBtn.addEventListener("click", toggleMobileNav);
    overlay.addEventListener("click", toggleMobileNav);

    document.querySelectorAll(".mobile-nav .nav-group > a").forEach((link) => {
      if (!link.nextElementSibling?.classList.contains("submenu")) return;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        link.classList.toggle("open");
      });
    });
  }

  // --- PAGE INITIALIZER ---
  // This decides what functions to run when the page loads.
  if (dynamicContentArea) {
    // We are on the search results page.
    fetchAndRenderSearchResults();
  }
  initializeSearchDropdown(); // Initialize the header search bar on all pages.
});
