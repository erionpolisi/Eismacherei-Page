document.addEventListener("DOMContentLoaded", async () => {
  // Alle Container finden, die Eis-Angebote anzeigen sollen
const containers = document.querySelectorAll(".angebot-container");

  containers.forEach(async (container) => {
    const id = container.id;
    const jsonUrl = `angebot-json/${id}.json`;

    try {
      const res = await fetch(jsonUrl);
      if (!res.ok) throw new Error(`Fehler beim Laden von ${jsonUrl}`);
      const eisDaten = await res.json();

      eisDaten.forEach(eis => {
        const div = document.createElement("div");
        div.className = "angebot-content";

        div.innerHTML = `
          <img src="${eis.image}" alt="${eis.title.toLowerCase()}" class="angebot">
          <h3 class="angebot-title">${eis.title}</h3>
          <button class="button angebot-button">
            <i class='bx bx-category angebot-icon'></i>
          </button>
        `;

        container.appendChild(div);
      });
    } catch (error) {
      console.error(`Fehler beim Laden der Eis-Daten für "${id}":`, error);
      alert("Fehler");
    }
  });
});