const scrollGalleryEl = document.getElementById('scrollGallery');
const scrollWrapper = scrollGalleryEl.parentElement;

async function fetchSlideData() {
  const res = await fetch("angebot-json/torten.json");
  if (!res.ok) throw new Error("Fehler beim Laden der torten.json");
  return res.json();
}

function createSlide({ image, title }) {
  const slide = document.createElement('div');
  slide.className = 'scroll-slide';
  slide.innerHTML = `
    <img src="${image}" alt="${title}">
    <div class="scroll-slide-title">${title}</div>
  `;
  return slide;
}

let tortenData = [];

async function appendSlides() {
  if (tortenData.length === 0) return;
  tortenData.forEach(data => {
    scrollGalleryEl.appendChild(createSlide(data));
  });
}

fetchSlideData()
  .then(data => {
    tortenData = data;
    appendSlides();
    appendSlides(); // doppelt laden
  })
  .catch(err => {
    console.error("Fehler beim Laden der Torten-Daten:", err);
  });

scrollWrapper.addEventListener('scroll', () => {
  const scrollLeft = scrollWrapper.scrollLeft;
  const totalWidth = scrollGalleryEl.scrollWidth;
  const visibleWidth = scrollWrapper.offsetWidth;

  if (scrollLeft + visibleWidth >= totalWidth - 500) {
    appendSlides();
  }
});

function manualScroll(dir) {
  scrollWrapper.scrollBy({
    left: dir * 320,
    behavior: 'smooth'
  });
}

let isHovering = false;
const scrollBtns = document.querySelectorAll('.scroll-btn');

[scrollWrapper, ...scrollBtns].forEach(el => {
  el.addEventListener('mouseenter', () => isHovering = true);
  el.addEventListener('mouseleave', () => isHovering = false);
});

setInterval(() => {
  if (!isHovering) {
    scrollWrapper.scrollBy({
      left: 1,
      behavior: 'smooth'
    });
  }
}, 30);
