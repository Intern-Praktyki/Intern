function fetchAktualnosciOncePerDay() {
  const lastLoad = localStorage.getItem("lastNewsLoad");
  const now = new Date();
  const todayAtFour = new Date();
  todayAtFour.setHours(4, 0, 0, 0);

  if (!lastLoad || new Date(lastLoad).toDateString() !== now.toDateString() || (now > todayAtFour && new Date(lastLoad) < todayAtFour)) {
    fetchAktualnosci();
    localStorage.setItem("lastNewsLoad", now.toISOString());
  } else {
    console.log("Aktualności już załadowane dziś.");
  }
}

function fetchAktualnosci() {
  fetch("data/newsy.json")
    .then(res => res.json())
    .then(news => {
      const container = document.getElementById("news-container");
      container.innerHTML = "";
      news.forEach(item => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <h2>${item.title}</h2>
          <p><strong>Źródło:</strong> ${item.source} | <strong>Data:</strong> ${item.date}</p>
          ${item.description ? `<p>${item.description}</p>` : ""}
          <a href="${item.link}" target="_blank">Czytaj więcej</a>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error("Błąd podczas ładowania aktualności:", error));
}

fetchAktualnosciOncePerDay();
