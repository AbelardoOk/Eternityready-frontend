// script.js

document.addEventListener("DOMContentLoaded", () => {
  //
  // ─── HERO VIDEO CONTROLS ──────────────────────────────────────────────────────
  //
  const heroVideo = document.querySelector(".hero-bg");
  const playBtn = document.querySelector(".control-play");
  const progress = document.querySelector(".control-progress");
  const playIconPath = playBtn.querySelector("svg path");
  const PLAY_D = "M8 5v14l11-7z";
  const PAUSE_D = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

  // Try autoplay (muted)
  heroVideo.play().catch(() => {});

  // Toggle play / pause + icon swap
  playBtn.addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play();
      playIconPath.setAttribute("d", PAUSE_D);
    } else {
      heroVideo.pause();
      playIconPath.setAttribute("d", PLAY_D);
    }
  });

  // Sync progress bar as video plays
  heroVideo.addEventListener("timeupdate", () => {
    const pct = (heroVideo.currentTime / heroVideo.duration) * 100 || 0;
    progress.value = pct;
  });

  // Seek when user drags slider
  progress.addEventListener("input", () => {
    heroVideo.currentTime = (progress.value / 100) * heroVideo.duration;
  });

  //
  // ─── FULLSCREEN POPUP MODAL ──────────────────────────────────────────────────
  //
  const fsBtn = document.querySelector(".control-fullscreen");
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const modalClose = document.getElementById("video-modal-close");

  fsBtn.addEventListener("click", () => {
    // load current video source + time into modal
    modalVideo.src = heroVideo.currentSrc || heroVideo.src;
    modalVideo.currentTime = heroVideo.currentTime;
    modal.classList.add("video-modal-open");
    modalVideo.play();
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("video-modal-open");
    modalVideo.pause();
    // sync back time & resume hero
    heroVideo.currentTime = modalVideo.currentTime;
    heroVideo.play();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("video-modal-open")) {
      modalClose.click();
    }
  });

  //
  // ─── LIKE BUTTON ─────────────────────────────────────────────────────────────
  //
  const likeBtn = document.querySelector(".btn-like");
  if (likeBtn) {
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("liked");
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
      // toggle menu
      settingsMenu.style.display =
        settingsMenu.style.display === "flex" ? "none" : "flex";
    });

    // click outside to close
    document.addEventListener("click", (e) => {
      if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
        settingsMenu.style.display = "none";
      }
    });

    // wire up each menu item
    settingsMenu.querySelectorAll(".setting-item").forEach((item) => {
      item.addEventListener("click", () => {
        // playback speed?
        if (item.dataset.speed) {
          heroVideo.playbackRate = parseFloat(item.dataset.speed);
        }
        // mute toggle?
        if (item.classList.contains("toggle-mute")) {
          heroVideo.muted = !heroVideo.muted;
          item.textContent = heroVideo.muted ? "Unmute" : "Mute";
        }
      });
    });
  }

  //
  // ─── SEARCH DROPDOWN ─────────────────────────────────────────────────────────
  //
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

  const categories = [
    "Movies",
    "Podcasts",
    "Music",
    "Radio",
    "TV Shows",
    "Web Pages",
  ];
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
  const mediaData = [
    {
      title: "My Fault",
      type: "movie",
      year: "2024",
      img: "images/images.jpeg",
    },
    {
      title: "Stick",
      type: "movie",
      year: "2024",
      img: "images/sticklong.jpeg",
    },
    { title: "Smoke", type: "movie", year: "2024", img: "images/smoke.jpeg" },
    {
      title: "Murderbot",
      type: "movie",
      year: "2024",
      img: "images/murder.jpeg",
    },
    { title: "Ted Lasso", type: "movie", year: "2024", img: "images/ted.jpeg" },
    {
      title: "Your Friends & Neighors",
      type: "movie",
      year: "2024",
      img: "images/your.jpeg",
    },
    {
      title: "The Better",
      type: "movie",
      year: "2024",
      img: "images/thebetter.jpeg",
    },
  ];

  let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

  function renderTrending() {
    trendingList.innerHTML = "";
    trending.forEach((t) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = t;
      btn.onclick = () => {
        input.value = t;
        input.dispatchEvent(new Event("input"));
      };
      trendingList.appendChild(btn);
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
        input.dispatchEvent(new Event("input"));
      };
      historyList.appendChild(li);
    });

    categoriesList.innerHTML = "";
    categories.forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = c;
      btn.onclick = () => {
        input.value = c;
        input.dispatchEvent(new Event("input"));
      };
      categoriesList.appendChild(btn);
    });

    renderTrending();

    seeAllLink.textContent = "See all results »";
    seeAllLink.href = "#";
  }

  function renderResults(query) {
    mediaSection.style.display = "block";
    categoriesSection.style.display = "none";
    historySection.style.display = "none";
    mediaList.innerHTML = "";
    mediaData
      .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
      .forEach((m) => {
        const li = document.createElement("li");
        li.className = "media-item";
        li.innerHTML = `
          <img src="${m.img}" alt="${m.title}">
          <div class="media-info">
            <p class="media-title">${m.title}</p>
            <p class="media-meta">${m.type}, ${m.year}</p>
          </div>`;
        mediaList.appendChild(li);
      });

    renderTrending();

    seeAllLink.textContent = `See all results for ${query} »`;
    seeAllLink.href = `#search?query=${encodeURIComponent(query)}`;
  }

  function updateDropdown() {
    const q = input.value.trim();
    if (!q) renderEmpty();
    else renderResults(q);
  }

  input.addEventListener("focus", () => {
    dropdown.style.display = "block";
    updateDropdown();
  });
  input.addEventListener("input", updateDropdown);
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-container").contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim();
      if (q) {
        history = [q, ...history.filter((h) => h !== q)].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(history));
      }
      dropdown.style.display = "none";
    }
  });

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
      const walk = (x - startX) * 1;
      top10.scrollLeft = scrollLeft - walk;
    };
    const endDrag = () => {
      isDown = false;
      top10.classList.remove("dragging");
    };

    top10.addEventListener("mousedown", (e) => startDrag(e.pageX));
    top10.addEventListener("mousemove", (e) => moveDrag(e.pageX));
    top10.addEventListener("mouseup", endDrag);
    top10.addEventListener("mouseleave", endDrag);

    top10.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
    top10.addEventListener(
      "touchmove",
      (e) => {
        moveDrag(e.touches[0].pageX);
        e.preventDefault();
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

  const menuBtn = document.querySelector(".btn-menu");
  const overlay = document.querySelector(".menu-overlay");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".btn-nav-close");

  function toggleMobileNav() {
    mobileNav.classList.toggle("open");
    overlay.classList.toggle("open");
  }

  menuBtn.addEventListener("click", toggleMobileNav);
  closeBtn.addEventListener("click", toggleMobileNav);
  overlay.addEventListener("click", toggleMobileNav);
  // ─── ACCORDION TOGGLE FOR ALL MOBILE-NAV SUBMENUS ───────────────────────────
document
  .querySelectorAll(".mobile-nav .nav-group > a")
  .forEach(link => {
    // only bind if there's a <ul class="submenu"> immediately after
    if (!link.nextElementSibling?.classList.contains("submenu")) return;

    link.addEventListener("click", e => {
      e.preventDefault();           // don’t actually navigate
      link.classList.toggle("open");
    });
  });

});
