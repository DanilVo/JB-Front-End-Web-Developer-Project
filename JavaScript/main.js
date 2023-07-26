const LIST_OF_COINS_LS_ID = 'coin';
const SELECTED_COINS_LS_ID = 'userCoins';
const PRICE_OF_COINS = 'coinsPrices';
const URL_API =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1';

document.getElementById('home-page').addEventListener('click', getDataFromApi);

window.addEventListener('load', getDataFromApi);
async function getDataFromApi() {
  try {
    const response = await fetch(URL_API);
    const data = await response.json();
    setToLocalStorage(data, LIST_OF_COINS_LS_ID);
    drawData(data);
  } catch (err) {
    if (getFromLocalStorage(LIST_OF_COINS_LS_ID).length > 0) {
      drawData(getFromLocalStorage(LIST_OF_COINS_LS_ID));
    } else {
      cards.innerHTML =
        '<h1 style="background-color: yellow">Some thing went wrong:(</h1>';
    }
    console.log(`${err}, please try again later.`);
  }
}

function onToggleChange(element) {
  const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID);
  const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
  const userCheckBoxes = document.querySelectorAll('.user-selected');
  if (userCoins.length === 5) {
    userCheckBoxes.forEach((item) => {
      item.setAttribute('data-bs-toggle', 'modal');
      item.setAttribute('data-bs-target', '#exampleModal');
    });
  } else if (userCoins.length <= 4) {
    userCheckBoxes.forEach((item) => {
      if (item.hasAttribute('data-bs-toggle')) {
        item.removeAttribute('data-bs-toggle');
        item.removeAttribute('data-bs-target');
      }
    });
  }
  if (userCoins.length > 5) {
    element.checked = false;
    userCoins.splice(userCoins.length - 1, 1);
    setToLocalStorage(userCoins, SELECTED_COINS_LS_ID);
    const findCoinFromLS = coinsList.find(
      (item) => item.id === element.parentElement.parentElement.parentElement.id
    );
    clearCoin(JSON.stringify(findCoinFromLS));
  }
}

function clearCoin(element) {
  const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID);
  const cards = document.querySelector('#selectedCoins');
  cards.innerHTML = htmlTemplate(userCoins);
  placeCoinsInModal(element);
}

function placeCoinsInModal(element) {
  const cards = document.querySelectorAll('#selectedCoins > #responsiveLayout');
  cards.forEach((card) => {
    const cardInput = card.querySelector('input');
    cardInput.checked = true;
    cardInput.setAttribute('oninput', `replaceCoin(this,${element})`);
    card.className = 'col-xl-5 mb-3';
    card.childNodes[1].childNodes[3].childNodes[7].remove();
    cardInput.setAttribute('data-bs-dismiss', 'modal');
  });
}

function replaceCoin(item, element) {
  const checkedCoin = item.parentElement.parentElement.parentElement.id;
  const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
  const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID) || [];
  const findCoinFromLS = coinsList.find((item) => item.id == checkedCoin);
  const indexOfRemovedCoin = userCoins.findIndex(
    (item) => item.id == checkedCoin
  );
  userCoins.splice(indexOfRemovedCoin, 1, element);
  const coinThatReplaced = document.querySelector(`.${findCoinFromLS.symbol}`);
  coinThatReplaced.checked = false;
  coinThatReplaced.classList.add('user-selected');
  coinThatReplaced.setAttribute('data-bs-target', '#exampleModal');
  coinThatReplaced.setAttribute('data-bs-toggle', 'modal');

  const coinToReplace = document.querySelector(`.${element.symbol}`);
  coinToReplace.checked = true;
  coinToReplace.classList.remove('user-selected');
  coinToReplace.removeAttribute('data-bs-target');
  coinToReplace.removeAttribute('data-bs-toggle');

  setToLocalStorage(userCoins, SELECTED_COINS_LS_ID);
}

function htmlTemplate(data) {
  let html = '';
  for (let i = 0; i < data.length; i++) {
    html += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3" id="responsiveLayout">
      <div class="card" id="${data[i].id}">
        <h5 class="card-header">${data[i].symbol.toUpperCase()} <img src="${
          data[i].image
        }" style="width: 35px"></h5>
        <div class="card-body ">
          <div class="form-check-reverse form-switch">
            <input class="form-check-input ${
              data[i].symbol
            } user-selected" type="checkbox" role="switch" id="flexSwitchCheckDefault" oninput=onToggleChange(this)>
          </div>
            <h6 class="card-title text-wrap">${data[i].name}</h6>
            <p class="card-text"></p>
              <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample${i}"
               role="button" aria-expanded="false" aria-controls="collapseExample"
                onclick="getCurrencyPrice(this,${i})">Show Info
                  <div class="spinner-border ms-auto" id="spinner${i}" role="status" aria-hidden="true" hidden></div>              
              </a>
              <div class="collapse" id="collapseExample${i}">
                <div class="card card-body price-info${i}">
                  
                </div>
              </div>
            </div>
        </div>
      </div>`;
  }
  return html;
}

function drawData(data) {
  const cards = document.querySelector('.row');
  if (data.length === 0) {
    cards.innerHTML = 'Please enter valid name of coin';
  } else {
    cards.innerHTML = htmlTemplate(data);
  }
  const checkBoxes = document.querySelectorAll('#flexSwitchCheckDefault');
  const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID);
  if (userCoins) {
    checkBoxes.forEach((box) => {
      const iterator = userCoins.values();
      for (const value of iterator) {
        if (box.classList.contains(value.symbol)) {
          box.checked = true;
          box.classList.remove('user-selected');
        }
      }
    });
  }
  triggerModalOnFiveItems();

  checkBoxes.forEach((key) =>
    key.addEventListener('click', function () {
      const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
      const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID) || [];
      const checkedCoin = this.parentElement.parentElement.parentElement.id;
      if (this.checked) {
        if (userCoins.length < 5) {
          this.classList.remove('user-selected');
        }
        const findCoinFromLS = coinsList.find((item) => item.id == checkedCoin);
        setToLocalStorage([...userCoins, findCoinFromLS], SELECTED_COINS_LS_ID);
      } else {
        this.classList.add('user-selected');
        const indexOfRemovedCoin = userCoins.findIndex(
          (item) => item.id === checkedCoin
        );
        userCoins.splice(indexOfRemovedCoin, 1);
        setToLocalStorage(userCoins, SELECTED_COINS_LS_ID);
      }
    })
  );
}

function triggerModalOnFiveItems() {
  const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID) || [];
  const userCheckBoxes = document.querySelectorAll('.user-selected');
  if (userCoins.length === 5) {
    userCheckBoxes.forEach((item) => {
      item.setAttribute('data-bs-toggle', 'modal');
      item.setAttribute('data-bs-target', '#exampleModal');
    });
  }
}

// Price information of coin
async function getCurrencyPrice(obj, id) {
  const spinner = document.querySelector(`#spinner${id}`);
  const coinPrice = getFromSessionStorage(PRICE_OF_COINS) || [];
  const coinId = obj.parentElement.parentElement.id;
  let dateNow = new Date().getTime();
  if (
    coinPrice.find(
      (coin) =>
        coin.name.toLowerCase() === coinId && dateNow - coin.timeAssigned < 5000
    )
  ) {
    showCurrencyPrice(
      coinPrice.find((coin) => coin.name.toLowerCase() === coinId),
      id
    );
  } else {
    if (document.querySelector('a[aria-expanded="false"]')) {
      spinner.removeAttribute('hidden');
    }
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await response.json();
      const priceObj = {
        name: data.id,
        usd: data.market_data.current_price.usd,
        euro: data.market_data.current_price.eur,
        ils: data.market_data.current_price.ils,
        timeAssigned: new Date().getTime(),
      };
      if (!coinPrice.some((coin) => coin.name === priceObj.name)) {
        setToSessionStorage([...coinPrice, priceObj], PRICE_OF_COINS);
      } else {
        const indexOfPreviousData = coinPrice.findIndex(
          (item) => coinId === item.name
        );
        coinPrice.splice(indexOfPreviousData, 1);
        setToSessionStorage([...coinPrice, priceObj], PRICE_OF_COINS);
      }
      showCurrencyPrice(priceObj, id);
      spinner.setAttribute('hidden', '');
    } catch (err) {
      console.log(err);
    }
  }
}

function showCurrencyPrice(priceObj, id) {
  const coin = document.querySelector(`.price-info${id}`);
  const html = `
  $: ${priceObj.usd}
  <br>
  €: ${priceObj.euro}
  <br>
  ₪: ${priceObj.ils}
  `;
  coin.innerHTML = html;
}

// Storage functions
function setToLocalStorage(data, id) {
  localStorage.removeItem(id);
  localStorage.setItem(id, JSON.stringify(data));
}

function getFromLocalStorage(id) {
  const coins = localStorage.getItem(id);
  return JSON.parse(coins);
}

function setToSessionStorage(data, id) {
  sessionStorage.removeItem(id);
  sessionStorage.setItem(id, JSON.stringify(data));
}

function getFromSessionStorage(id) {
  const coins = sessionStorage.getItem(id);
  return JSON.parse(coins);
}

const input = document.querySelector('.form-control');
input.addEventListener('input', () =>
  displaySearchCoins(input.value.toLowerCase())
);

// Input filter function
function displaySearchCoins(coins) {
  const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
  const listOfCoins = coinsList.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(coins) ||
      coin.symbol.toLowerCase().includes(coins)
    );
  });
  drawData(listOfCoins);
}
