document.addEventListener("DOMContentLoaded", async () => {
  const containers = document.querySelectorAll(".angebot-container");

  containers.forEach(async (container) => {
    const id = container.id;
    const mode = document.querySelector(".section-title")?.textContent.toLowerCase();
    const isVeganOnly = mode.includes("vegan");

    const jsonUrl = `angebot-json/${id}.json`;

    try {
      const res = await fetch(jsonUrl);
      if (!res.ok) throw new Error(`Fehler beim Laden von ${jsonUrl}`);
      let eisDaten = await res.json();

      if (isVeganOnly) {
        eisDaten = eisDaten.filter(eis => eis.vegan);
      }

      eisDaten.forEach(eis => {
        const div = document.createElement("div");
        div.className = "angebot-content";
        div.style.backgroundColor = eis.color;

        div.innerHTML = `
          <div class="flip-inner">
            <div class="front">
              <img src="${eis.image}" alt="${eis.alt}" class="angebot-img">
              <h3 class="angebot-title">${eis.title}</h3>
            </div>
            <div class="back">
              <p class="angebot-subtitle">${eis.description}</p>
            </div>
          </div>
        `;

        // Flip-Effekt beim Klick
        div.addEventListener("click", () => {
          div.classList.toggle("flipped");
        });

        container.appendChild(div);
      });
    } catch (error) {
      console.error(`Fehler beim Laden der Eis-Daten für "${id}":`, error);
      alert("Fehler");
    }
  });
});
