// Tasbih Counter logic
let count = Number(localStorage.getItem('tasbihCount')) || 0;
let lastIncrement = 0;

const countEl = document.getElementById('count');
const container = document.getElementById('counter-container');
const undoBtn = document.getElementById('undo');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
  countEl.textContent = count;
  localStorage.setItem('tasbihCount', count);
}

// Increment counter when tapping anywhere on container
container.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') return; // ignore button clicks
  lastIncrement = count;
  count++;
  updateDisplay();
});

// Undo
undoBtn.addEventListener('click', () => {
  count = lastIncrement;
  updateDisplay();
});

// Reset
resetBtn.addEventListener('click', () => {
  lastIncrement = 0;
  count = 0;
  updateDisplay();
});

// Initial display
updateDisplay();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service.worker.js');
  });
}

