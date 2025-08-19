fetch("https://beta.ourmanna.com/api/v1/get/?format=json&order=daily")
  .then((response) => response.json())
  .then((data) => {
    console.log("Verse data: ", data);
    document.getElementById("verse-text").innerText = data.verse.details.text;
    document.getElementById("verse-ref").innerText =
      data.verse.details.reference;
  })
  .catch((error) => {
    console.error("Verse fetch error:", error);
    document.getElementById("verse-text").innerText = "Unable to load verse.";
  });

var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/6205ef4c9bd1f31184dc1213/1frjitgsu";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  const testimonialSwiper = new Swiper(".testimonial-swiper", {
    // Enable responsive breakpoints
    breakpoints: {
      // When window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // When window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // When window width is >= 1024px
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },

    // Enable auto-height to prevent cutting slides
    autoHeight: true,

    // Add pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Enable keyboard navigation
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Make slides have the same height
    watchSlidesProgress: true,

    // Add a11y support
    a11y: {
      prevSlideMessage: "Previous testimonial",
      nextSlideMessage: "Next testimonial",
    },
  });

  // Fade-in effect
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in, .gospel-card, .testimonial-slide")
    .forEach((element) => {
      observer.observe(element);
    });

  // Checklist functionality
  document
    .getElementById("check-result")
    .addEventListener("click", function () {
      const checkboxes = document.querySelectorAll(
        "#eternity-check-form .custom-checkbox"
      );
      let checkedCount = 0;

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          checkedCount++;
        }
      });

      const resultMessage = document.getElementById("result-message");

      if (checkedCount < 3) {
        resultMessage.innerHTML = `
        <p>Looks like you're still on your way! Don't worry.</p>
        <a href="#" class="btn btn-primary">I Want to Know More</a>
      `;
      } else if (checkedCount < 5) {
        resultMessage.innerHTML = `
        <p>You've already started your walk with Christ! Keep growing.</p>
        <a href="#" class="btn btn-primary">Next Steps</a>
      `;
      } else {
        resultMessage.innerHTML = `
        <p>Wonderful! You're on the right path to eternity with Christ!</p>
        <a href="#" class="btn btn-primary">How to Share your Faith</a>
      `;
      }

      resultMessage.classList.remove("hidden");
    });

  window.addEventListener("resize", function () {
    testimonialSwiper.update();
  });
});

function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const isOpen = faqItem.classList.contains("open");

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("open");
    item.querySelector(".faq-answer").style.display = "none";
  });

  if (!isOpen) {
    faqItem.classList.add("open");
    faqItem.querySelector(".faq-answer").style.display = "block";
  }
}


function openPopup(videoUrl) {
  const popup = document.getElementById("video-popup");
  const iframe = document.getElementById("popup-video");
  popup.style.display = "flex";
  iframe.src = videoUrl;
}

function closePopup() {
  const popup = document.getElementById("video-popup");
  const iframe = document.getElementById("popup-video");
  popup.style.display = "none";
  iframe.src = "";
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // só anima uma vez
    }
  });
});

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

let currentSlide = 0;
const carousel = document.getElementById("carouselWrapper");
const slides = document.querySelectorAll(".resource-box");
const totalSlides = slides.length;
const dotsContainer = document.getElementById("carouselDots");

// Calcular quantos slides mostrar por vez baseado no tamanho da tela
function getSlidesPerView() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

let slidesPerView = getSlidesPerView();
let maxSlide = Math.max(0, totalSlides - slidesPerView);

// Criar dots
function createDots() {
  dotsContainer.innerHTML = "";
  const numDots = maxSlide + 1;

  for (let i = 0; i <= maxSlide; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
}

// Atualizar posição do carrossel
function updateCarousel() {
  const slideWidth = slides[0].offsetWidth + 20; // incluindo margin
  const offset = -currentSlide * slideWidth;
  carousel.style.transform = `translateX(${offset}px)`;

  // Atualizar dots
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  // Atualizar botões
  document.getElementById("prevBtn").disabled = currentSlide === 0;
  document.getElementById("nextBtn").disabled = currentSlide === maxSlide;
}

// Mover carrossel
function moveCarousel(direction) {
  const newSlide = currentSlide + direction;

  if (newSlide >= 0 && newSlide <= maxSlide) {
    currentSlide = newSlide;
    updateCarousel();
  }
}

// Ir para slide específico
function goToSlide(slideIndex) {
  if (slideIndex >= 0 && slideIndex <= maxSlide) {
    currentSlide = slideIndex;
    updateCarousel();
  }
}

// Auto-play (opcional)
function startAutoPlay() {
  setInterval(() => {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateCarousel();
  }, 4000);
}

// Event listeners para redimensionamento
window.addEventListener("resize", () => {
  slidesPerView = getSlidesPerView();
  maxSlide = Math.max(0, totalSlides - slidesPerView);

  // Ajustar slide atual se necessário
  if (currentSlide > maxSlide) {
    currentSlide = maxSlide;
  }

  createDots();
  updateCarousel();
});

// Suporte para touch/swipe em dispositivos móveis
let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    // Mínimo de 50px para considerar swipe
    if (diffX > 0) {
      moveCarousel(1); // Swipe left - próximo
    } else {
      moveCarousel(-1); // Swipe right - anterior
    }
  }
});

// Inicializar
createDots();
updateCarousel();

// Iniciar auto-play (descomente se quiser)
// startAutoPlay();


document.addEventListener('DOMContentLoaded', function() {

         
        /* --- LÓGICA DO BUSCADOR DE IGREJA (MAPA) --- */
    const iframe = document.querySelector(".find-map iframe");
    const cepInput = document.getElementById("cep");
    const searchButton = document.getElementById("search");

    // ✅ Função que busca pelo CEP (agora DENTRO do listener)
    function searchMap() {
        if (!cepInput || !iframe) return; // Segurança

        const cep = cepInput.value.trim();
        if (cep === "") {
            alert("Por favor, insira um CEP.");
            return;
        }
        const query = `Igrejas perto do CEP ${cep}`;
        // URL corrigida com a sintaxe de template literal correta
        const mapURL = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
        
        iframe.src = mapURL;
    }

    // ✅ Função que carrega pela localização (agora DENTRO do listener)
    function loadMapWithLocation() {
        if (!iframe) return; // Segurança

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const query = `Igrejas perto de ${lat},${lng}`;
                    const mapURL = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
                    iframe.src = mapURL;
                },
                (error) => {
                    console.log("Erro ao obter localização, tente buscar por CEP. \n", error);
                }
            );
        } else {
            console.log("Geolocalização não suportada.");
        }
    }
    
    loadMapWithLocation();

    // Adiciona os eventos aos elementos
    if (searchButton && cepInput) {
        searchButton.addEventListener("click", searchMap);
        cepInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                searchMap();
            }
        });
    }     
         
            
});