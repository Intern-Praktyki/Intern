document.addEventListener('DOMContentLoaded', () => {
  let activeIndex = null;
  let entriesData = [];

  function showDescription(index) {
    const display = document.getElementById('encyclopedia-description');
    if (index === null || entriesData.length === 0) {
      display.innerHTML = '';
      display.style.display = 'none';
      return;
    }
    const e = entriesData[index];
    display.innerHTML = `
      <div class="encyclopedia-full-desc">
        <h2>${e.termin}</h2>
        <p>${e.opis}</p>
        ${e.przyklady ? `<ul>${e.przyklady.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
        ${e.zrodlo ? `<a href="${e.zrodlo}" target="_blank">Więcej informacji</a>` : ''}
        <button id="close-desc" class="close-desc-btn">Zamknij</button>
      </div>
    `;
    display.style.display = 'block';
    document.getElementById('close-desc').onclick = () => {
      showDescription(null);
      activeIndex = null;
      refreshButtons();
    };
  }

  function refreshButtons() {
    document.querySelectorAll('.entry-title').forEach((btn, i) => {
      if (i === activeIndex) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  fetch('data/encyclopedia.json')
    .then(res => res.json())
    .then(entries => {
      entriesData = entries;
      const grid = document.getElementById('encyclopedia-demo-container');
      grid.innerHTML = '';
      entries.forEach((e, i) => {
        const btn = document.createElement('div');
        btn.className = 'entry-title';
        btn.textContent = e.termin;
        btn.onclick = () => {
          if (activeIndex === i) {
            showDescription(null);
            activeIndex = null;
          } else {
            activeIndex = i;
            showDescription(i);
          }
          refreshButtons();
        };
        grid.appendChild(btn);
      });
    });
});
// ==== KOD DO DODANIA NA KOŃCU ISTNIEJĄCEGO main.js ====

// Ładowanie newsów (tylko na stronie index.html)
document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.getElementById('news-container');
  
  // Sprawdź czy jesteśmy na stronie newsów
  if (!newsContainer) return;
  
  fetch('data/newsy.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    if (!data || data.length === 0) { // zmienione z !data.newsy
      newsContainer.innerHTML = '<p class="no-data">Brak newsów do wyświetlenia.</p>';
      return;
    }

    newsContainer.innerHTML = data.map(news => `
      <article class="news-item">
        <h2>${news.title}</h2>
        <div class="meta">
          <span class="date">${news.date}</span>
          ${news.source ? `<span class="category">${news.source}</span>` : ''}
        </div>
        <p>${news.description}</p>
        ${news.link ? `<a href="${news.link}" target="_blank" class="read-more">Czytaj więcej →</a>` : ''}
      </article>
    `).join('');
  })
  .catch(error => {
    console.error('Błąd ładowania newsów:', error);
    newsContainer.innerHTML = `
      <div class="error">
        <p>⚠️ Nie udało się załadować newsów.</p>
        <p>Sprawdź czy plik <code>data/newsy.json</code> istnieje.</p>
        <p class="error-details">Błąd: ${error.message}</p>
      </div>
    `;
  });
