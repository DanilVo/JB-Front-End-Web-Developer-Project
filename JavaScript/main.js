window.addEventListener('load', sortData());


async function getDataFromApi() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
  const data = await response.json();
  setToLocalStorage(data);
}

function sortData() {
  const cards = document.querySelector('.cards');
  const data = getFromLocalStorage() || [];
  let html = '';
  for (let i = 0; i < 1; i++) {
    html += `
    <div class="card">
    <h5 class="card-header">Featured</h5>
    <div class="card-body">
      <h5 class="card-title">${data}</h5>
      <p class="card-text">${data[i].symbol}</p>
      <a href="#" class="btn btn-primary">${data[i].name}</a>
    </div>
  </div>`;
  }
  cards.innerHTML = html;
}

function setToLocalStorage(data) {
  localStorage.removeItem('coins');
  localStorage.setItem('coin', JSON.stringify(data));
}

function getFromLocalStorage() {
  const coins = localStorage.getItem('coin');
  return coins;
}
