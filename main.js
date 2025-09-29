// === NEWSY ===
function fetchNewsy() {
  fetch("data/newsy.json")
    .then((res) => res.json())
    .then((news) => {
      const container = document.getElementById("news-container");
      if (!container) return;
      container.innerHTML = "";
      news.forEach((item) => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <h2>${item.title}</h2>
          <p><strong>Źródło:</strong> ${item.source} | <strong>Data:</strong> ${item.date}</p>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank">Źródło</a>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Błąd ładowania newsów:", err));
}

// === WYDARZENIA ===
const miesiacePL = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
let aktualnyMiesiac = new Date().getMonth();
let aktualnyRok = new Date().getFullYear();

function zmienMiesiac(delta) {
  aktualnyMiesiac += delta;
  if (aktualnyMiesiac > 11) { aktualnyMiesiac = 0; aktualnyRok++; }
  if (aktualnyMiesiac < 0) { aktualnyMiesiac = 11; aktualnyRok--; }
  fetchEvents();
}

function fetchEvents() {
  const container = document.getElementById("lista-wydarzen");
  const label = document.getElementById("miesiac-nazwa");
  if (!container || !label) return;
  label.textContent = `${miesiacePL[aktualnyMiesiac]} ${aktualnyRok}`;
  fetch("data/events.json")
    .then((res) => res.json())
    .then((events) => {
      container.innerHTML = "";
      events.filter(e => {
        const data = new Date(e.date);
        return data.getMonth() === aktualnyMiesiac && data.getFullYear() === aktualnyRok;
      }).forEach(e => {
        const box = document.createElement("div");
        box.className = "event-entry";
        box.innerHTML = `
          <h3>${e.date} – ${e.title}</h3>
          <p><strong>Miejsce:</strong> ${e.location}</p>
          <p>${e.description}</p>
          <a href="${e.link}" target="_blank">Zobacz</a>
        `;
        container.appendChild(box);
      });
    })
    .catch(err => console.error("Błąd ładowania wydarzeń:", err));
}

// === RAPORTY ===
function fetchReports() {
  const container = document.getElementById("raporty-container");
  if (!container) return;
  fetch("data/reports.json")
    .then(res => res.json())
    .then(reports => {
      container.innerHTML = "";
      reports.forEach(r => {
        const div = document.createElement("div");
        div.className = "report-entry";
        div.innerHTML = `
          <h3>${r.title}</h3>
          <p><strong>Źródło:</strong> ${r.source} | <strong>Data:</strong> ${r.date}</p>
          <p>${r.description}</p>
          <a href="${r.link}" target="_blank">Zobacz raport</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => console.error("Błąd ładowania raportów:", err));
}

// === WYMUSZENIE AKTUALIZACJI Z LOCALSTORAGE ===
function checkUpdateTime() {
  const zapis = localStorage.getItem("lastUpdate");
  if (!zapis) return;
  const lastUpdate = new Date(zapis);
  const todayAtFour = new Date();
  todayAtFour.setHours(4, 0, 0, 0);
  const now = new Date();

  if (now > todayAtFour && lastUpdate > todayAtFour) {
    console.log("🔄 Aktualizacja newsów/wydarzeń/raportów wymuszona przez panel admina");
    fetchNewsy();
    fetchEvents();
    fetchReports();
  }
}

// === START ===
document.addEventListener("DOMContentLoaded", () => {
  checkUpdateTime();
  fetchNewsy();
  fetchEvents();
  fetchReports();
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/encyclopedia.json")
    .then(res => res.json())
    .then(entries => {
      const container = document.getElementById("encyclopedia-demo-container");
      container.innerHTML = "";
      entries.forEach((e, i) => {
        const box = document.createElement("div");
        box.className = "entry";
        box.innerHTML = `
          <div class="entry-title" data-i="${i}">${e.termin}</div>
          <div class="entry-details">
            <p><strong>Kategoria:</strong> ${e.kategoria}</p>
            <p>${e.opis}</p>
            ${e.przyklady ? `<ul>${e.przyklady.map(p => `<li>${p}</li>`).join("")}</ul>` : ''}
            ${e.zrodlo ? `<a href="${e.zrodlo}" target="_blank">Więcej informacji</a>` : ''}
          </div>
        `;
        container.appendChild(box);
      });

      // Pozwala klikać w hasła
      Array.from(document.getElementsByClassName("entry-title")).forEach(el => {
        el.addEventListener("click", () => {
          const entry = el.parentElement;
          entry.classList.toggle("active");
        });
      });
    })
    .catch(err => console.error("Błąd ładowania encyklopedii:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/encyclopedia.json")
    .then(res => res.json())
    .then(entries => {
      const container = document.getElementById("encyclopedia-demo-container");
      container.innerHTML = "";
      entries.forEach(e => {
        const box = document.createElement("div");
        box.className = "entry";
        box.innerHTML = `
          <div class="entry-title">${e.termin}</div>
          <div class="entry-details">
            <p>${e.opis}</p>
            ${e.przyklady ? `<ul>${e.przyklady.map(p => `<li>${p}</li>`).join("")}</ul>` : ""}
            ${e.zrodlo ? `<a href="${e.zrodlo}" target="_blank">Więcej informacji</a>` : ""}
          </div>
        `;
        container.appendChild(box);
      });

      // Logika kliknięcia w hasło
      Array.from(document.getElementsByClassName("entry-title")).forEach(el => {
        el.addEventListener("click", () => {
          const entry = el.parentElement;
          entry.classList.toggle("active");
        });
      });
    })
    .catch(err => console.error("Błąd ładowania encyklopedii:", err));
});
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/encyclopedia.json")
    .then(res => res.json())
    .then(entries => {
      const container = document.getElementById("encyclopedia-demo-container");
      container.innerHTML = "";
      entries.forEach(e => {
        const box = document.createElement("div");
        box.className = "entry";
        box.innerHTML = `
          <div class="entry-title">${e.termin}</div>
          <div class="entry-details">
            <p>${e.opis}</p>
            ${e.przyklady ? `<ul>${e.przyklady.map(p => `<li>${p}</li>`).join("")}</ul>` : ""}
            ${e.zrodlo ? `<a href="${e.zrodlo}" target="_blank">Więcej informacji</a>` : ""}
          </div>
        `;
        container.appendChild(box);
      });

      Array.from(document.getElementsByClassName("entry-title")).forEach(el => {
        el.addEventListener("click", () => {
          const entry = el.parentElement;
          entry.classList.toggle("active");
        });
      });
    })
    .catch(err => console.error("Błąd ładowania encyklopedii:", err));
});

