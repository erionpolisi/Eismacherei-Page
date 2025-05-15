document.addEventListener("DOMContentLoaded", async () => {
  const scrollGalleryEls = document.querySelectorAll(".scroll-gallery-inner");

  scrollGalleryEls.forEach(async scrollGalleryEl => {
    const id = scrollGalleryEl.id || "torten"; // z. B. id="torten"
    const scrollWrapper = scrollGalleryEl.closest(".scroll-gallery");
    const jsonUrl = `angebot-json/${id}.json`;

    let slideData = [];

    async function fetchSlideData() {
      const res = await fetch(jsonUrl);
      if (!res.ok) throw new Error(`Fehler beim Laden von ${jsonUrl}`);
      return res.json();
    }

    function createSlide({ image, title }) {
      const slide = document.createElement("div");
      slide.className = "scroll-slide";
      slide.innerHTML = `
        <img src="${image}" alt="${title}">
        <div class="scroll-slide-title">${title}</div>
      `;
      return slide;
    }

    async function appendSlides() {
      if (slideData.length === 0) return;
      slideData.forEach(data => {
        scrollGalleryEl.appendChild(createSlide(data));
      });
    }

    try {
      slideData = await fetchSlideData();
      appendSlides();
      appendSlides(); // doppelt zum Start
    } catch (err) {
      console.error(`Fehler beim Laden der Galerie-Daten (${id}):`, err);
    }

    scrollWrapper.addEventListener("scroll", () => {
      const scrollLeft = scrollWrapper.scrollLeft;
      const totalWidth = scrollGalleryEl.scrollWidth;
      const visibleWidth = scrollWrapper.offsetWidth;

      if (scrollLeft + visibleWidth >= totalWidth - 500) {
        appendSlides();
      }
    });

    window.manualScroll = function (dir) {
      scrollWrapper.scrollBy({ left: dir * 320, behavior: "smooth" });
    };

    let isHovering = false;
    const scrollBtns = document.querySelectorAll(".scroll-btn");

    [scrollWrapper, ...scrollBtns].forEach(el => {
      el.addEventListener("mouseenter", () => isHovering = true);
      el.addEventListener("mouseleave", () => isHovering = false);
    });

    setInterval(() => {
      if (!isHovering) {
        scrollWrapper.scrollBy({ left: 1, behavior: "smooth" });
      }
    }, 30);
  });
});
