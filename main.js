document.addEventListener('DOMContentLoaded', () => {
  let activeIndex = null;
  let entriesData = [];

  // Funkcja do wyświetlania opisu wybranego wpisu
  function showDescription(index) {
    const display = document.getElementById('encyclopedia-description');
    if (!display) return;

    if (index === null || entriesData.length === 0) {
      display.innerHTML = '';
      display.style.display = 'none';
      return;
    }

    const entry = entriesData[index];

    display.innerHTML = `
      <div class="encyclopedia-full-desc">
        <h2>${entry.termin}</h2>
        <p>${entry.opis}</p>
        ${entry.przyklady ? `<ul>${entry.przyklady.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
        ${entry.zrodlo ? `<p><a href="${entry.zrodlo}" target="_blank" rel="noopener noreferrer">Więcej informacji</a></p>` : ''}
        <button id="close-desc" class="close-desc-btn">Zamknij</button>
      </div>`;

    display.style.display = 'block';

    const closeBtn = document.getElementById('close-desc');
    if (closeBtn) {
      closeBtn.onclick = () => {
        showDescription(null);
        activeIndex = null;
        refreshButtons();
      };
    }
  }

  // Funkcja aktualizująca styl aktywnego przycisku
  function refreshButtons() {
    const buttons = document.querySelectorAll('.entry-title');
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === activeIndex);
    });
  }

  // Ładowanie i wyświetlanie encyklopedii, jeśli kontener jest dostępny
  const encyclopediaContainer = document.getElementById('encyclopedia-demo-container');
  if (encyclopediaContainer) {
    fetch('data/encyclopedia.json')
      .then(response => {
        if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);
        return response.json();
      })
      .then(data => {
        entriesData = data;
        encyclopediaContainer.innerHTML = '';
        data.forEach((entry, idx) => {
          const btn = document.createElement('div');
          btn.className = 'entry-title';
          btn.textContent = entry.termin;
          btn.onclick = () => {
            if (activeIndex === idx) {
              showDescription(null);
              activeIndex = null;
            } else {
              activeIndex = idx;
              showDescription(idx);
            }
            refreshButtons();
          };
          encyclopediaContainer.appendChild(btn);
        });
      })
      .catch(error => {
        console.error('Błąd podczas ładowania encyklopedii:', error);
        encyclopediaContainer.innerHTML = '<p class="error">Nie udało się załadować encyklopedii.</p>';
      });
  }

  // Ładowanie i wyświetlanie newsów, jeśli kontener jest dostępny
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    fetch('data/newsy.json')
      .then(response => {
        if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);
        return response.json();
      })
      .then(newsData => {
        if (!Array.isArray(newsData) || newsData.length === 0) {
          newsContainer.innerHTML = '<p class="no-data">Brak newsów do wyświetlenia.</p>';
          return;
        }
        newsContainer.innerHTML = newsData.map(news => 
          `<article class="news-item">
             <h2>${news.title}</h2>
             <div class="meta">
               <span class="date">${news.date}</span>
               ${news.source ? `<span class="category">${news.source}</span>` : ''}
             </div>
             <p>${news.description}</p>
             ${news.link ? `<a href="${news.link}" target="_blank" rel="noopener noreferrer" class="read-more">Czytaj więcej</a>` : ''}
           </article>`
        ).join('');
      })
      .catch(error => {
        console.error('Błąd podczas ładowania newsów:', error);
        newsContainer.innerHTML = `
          <div class="error">
            <p>⚠️ Nie udało się załadować newsów.</p>
            <p>Sprawdź, czy plik <code>data/newsy.json</code> istnieje.</p>
            <p class="error-details">${error.message}</p>
          </div>`;
      });
  }
});
