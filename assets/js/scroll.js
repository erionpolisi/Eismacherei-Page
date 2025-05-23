document.addEventListener("DOMContentLoaded", async () => {
  const overlay = document.createElement("div");
    overlay.className = "image-overlay";
    overlay.id = "imageOverlay";
    overlay.style.display = "none";

    const overlayImg = document.createElement("img");
    overlayImg.id = "overlayImage";
    overlayImg.alt = "Zoomed image";

    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);

    document.body.addEventListener("click", e => {
      const target = e.target;
      if (target.tagName === "IMG" && target.closest(".scroll-slide")) {
        overlayImg.src = target.src;
        overlay.style.display = "flex";
      } else if (overlay.style.display === "flex") {
        overlay.style.display = "none";
        overlayImg.src = "";
      }
    });
    
  const scrollGalleryEls = document.querySelectorAll(".scroll-gallery-inner");

  scrollGalleryEls.forEach(async scrollGalleryEl => {
    const id = scrollGalleryEl.id || "torten";
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
      appendSlides();
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

    const pointerEls = [scrollWrapper, ...scrollBtns];
    pointerEls.forEach(el => {
      el.addEventListener("pointerenter", () => isHovering = true);
      el.addEventListener("pointerleave", () => isHovering = false);
      el.addEventListener("touchstart", () => isHovering = true);
      el.addEventListener("touchend", () => isHovering = false);
    });

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      setInterval(() => {
        if (!isHovering) {
          scrollWrapper.scrollBy({ left: 1, behavior: "smooth" });
        }
      }, 30);
    }
  });
});
