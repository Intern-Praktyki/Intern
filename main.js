document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do ładowania encyklopedii
  function loadEncyclopedia() {
    fetch("data/encyclopedia.json")
      .then(res => res.json())
      .then(entries => {
        const container = document.getElementById("encyclopedia-demo-container");
        if (!container) return;
        container.innerHTML = "";
        entries.forEach(e => {
          const box = document.createElement("div");
          box.className = "entry";
          box.innerHTML = `
            <div class="entry-title">${e.termin}</div>
            <div class="entry-details">
              <p>${e.opis}</p>
              ${e.przyklady ? `<ul>${e.przyklady.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
              ${e.zrodlo ? `<a href="${e.zrodlo}" target="_blank">Więcej informacji</a>` : ''}
            </div>
          `;
          container.appendChild(box);
        });

        // Obsługa kliknięć na nagłówki
        Array.from(document.getElementsByClassName("entry-title")).forEach(el => {
          el.addEventListener("click", () => {
            el.parentElement.classList.toggle("active");
          });
        });
      })
      .catch(err => console.error("Błąd ładowania encyklopedii:", err));
  }

  // Wywołanie funkcji w momencie załadowania strony
  loadEncyclopedia();

  // Inne funkcje fetchNewsy(), fetchEvents(), fetchReports() – powinny być tu też wywoływane tylko raz
  fetchNewsy();
  fetchEvents();
  fetchReports();

  // Funkcja wymuszania aktualizacji, jeśli jest w twoim kodzie
  checkUpdateTime();
});
