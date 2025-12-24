document.addEventListener('DOMContentLoaded', () => {

  let count = Number(localStorage.getItem('tasbihCount')) || 0;
  let lastIncrement = 0;

  const countEl = document.getElementById('count');
  const container = document.getElementById('counter-container');
  const resetBtn = document.getElementById('reset');

  function updateDisplay() {
    countEl.textContent = count;
    localStorage.setItem('tasbihCount', count);
  }

  container.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    lastIncrement = count;
    count++;
    updateDisplay();
  });

  resetBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lastIncrement = 0;
    count = 0;
    updateDisplay();
  });

  updateDisplay();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker failed:', err));
    });
  }

});
