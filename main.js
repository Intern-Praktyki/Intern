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
          el.parentElement.classList.toggle("active");
        });
      });
    })
    .catch(err => console.error("Błąd ładowania encyklopedii:", err));
});
