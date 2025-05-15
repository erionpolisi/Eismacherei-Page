const scrollGalleryEl = document.getElementById('scrollGallery');
const scrollWrapper = scrollGalleryEl.parentElement;

const slideData = [
  { src: '../assets/img/Torten/torte1-img.jpg', title: 'Motivtorte' },
  { src: '../assets/img/Torten/torte2-img.jpg', title: 'Malakoff' },
  { src: '../assets/img/Torten/torte3-img.jpg', title: 'Motivtorte' },
  { src: '../assets/img/Torten/torte4-img.jpg', title: 'Motivtorte' },
  { src: '../assets/img/Torten/torte5-img.jpg', title: 'Schnitten' },
  { src: '../assets/img/Torten/torte6-img.jpg', title: 'Motivtorte' },
  { src: '../assets/img/Torten/torte7-img.jpg', title: 'Malakoff' },
  { src: '../assets/img/Torten/torte8-img.jpg', title: 'Esterhazy' },
  { src: '../assets/img/Torten/torte9-img.jpg', title: 'Motivtorte' },
  { src: '../assets/img/Torten/torte10-img.jpg', title: 'Mozarttorte' }

];

function createSlide({ src, title }) {
  const slide = document.createElement('div');
  slide.className = 'scroll-slide';
  slide.innerHTML = `
    <img src="${src}" alt="${title}">
    <div class="scroll-slide-title">${title}</div>
  `;
  return slide;
}

function appendSlides() {
  slideData.forEach(data => {
    scrollGalleryEl.appendChild(createSlide(data));
  });
}

// Initial zwei Sätze laden
appendSlides();
appendSlides();

// Nachladen am Ende
scrollWrapper.addEventListener('scroll', () => {
  const scrollLeft = scrollWrapper.scrollLeft;
  const totalWidth = scrollGalleryEl.scrollWidth;
  const visibleWidth = scrollWrapper.offsetWidth;

  if (scrollLeft + visibleWidth >= totalWidth - 500) {
    appendSlides();
  }
});

// Manuelles Scrollen
function manualScroll(dir) {
  scrollWrapper.scrollBy({
    left: dir * 320,
    behavior: 'smooth'
  });
}

// Auto-Scroll mit Hover-Pause
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

