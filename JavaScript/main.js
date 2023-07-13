const LIST_OF_COINS_LS_ID = "coin";
const SELECTED_COINS_LS_ID = "userCoins";
const URL_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";
window.addEventListener("load", getDataFromApi());

async function getDataFromApi() {
  try {
    const response = await fetch(URL_API);
    const data = await response.json();
    setToLocalStorage(data, LIST_OF_COINS_LS_ID);
    drawData(data);
  } catch (err) {
    drawData(getFromLocalStorage(LIST_OF_COINS_LS_ID));
    console.log(err);
  }
}

function drawData(data) {
  const cards = document.querySelector(".row");
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
      <div class="card" id="${data[i].id}">
        <h5 class="card-header">${data[i].symbol.toUpperCase()}</h5>
        <div class="card-body">
          <div class="form-check-reverse form-switch">
            <input class="form-check-input ${
              data[i].symbol
            } user-selected" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          </div>
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text"></p>
            <a href="javascript:void(0)" class="btn btn-primary">Show Info</a>
        </div>
      </div>
    </div>`;
  }
  if (data.length === 0) {
    cards.innerHTML = "Please enter valid name of coin";
  } else {
    cards.innerHTML = html;
  }
  const checkBoxes = document.querySelectorAll("#flexSwitchCheckDefault");
  const favoriteCoins = getFromLocalStorage(SELECTED_COINS_LS_ID);
  if (favoriteCoins) {
    checkBoxes.forEach((box) => {
      const iterator = favoriteCoins.values();
      for (const value of iterator) {
        if (box.classList.contains(value.symbol)) {
          box.checked = true;
          box.classList.remove('user-selected')
        }
      }
    });
  }

  checkBoxes.forEach((key) =>
    key.addEventListener("click", function () {
      const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
      const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID) || [];
      const checkedCoin = this.parentElement.parentElement.parentElement.id;
      if (this.checked) {
        this.classList.remove("user-selected");
        const findCoinFromLS = coinsList.find((item) => item.id == checkedCoin);
        setToLocalStorage([...userCoins, findCoinFromLS], SELECTED_COINS_LS_ID);
        countUserCoins();
      } else {
        const indexOfRemovedCoin = userCoins.findIndex(
          (item) => item.id == checkedCoin
        );
        userCoins.splice(indexOfRemovedCoin, 1);
        setToLocalStorage(userCoins, SELECTED_COINS_LS_ID);
      }
    })
  );
}

function setToLocalStorage(data, id) {
  localStorage.removeItem(id);
  localStorage.setItem(id, JSON.stringify(data));
}

function getFromLocalStorage(id) {
  const coins = localStorage.getItem(id);
  return JSON.parse(coins);
}

const input = document.querySelector(".form-control");
input.addEventListener("input", () => displaySearchCoins(input.value));

function displaySearchCoins(coins) {
  const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
  const listOfCoins = coinsList.filter((coin) => {
    return coin.name.toLowerCase().includes(coins);
  });
  drawData(listOfCoins);
}

function countUserCoins() {
  let checkBoxes = document.querySelectorAll(".user-selected");
  console.log(checkBoxes.length);
  const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID);
  checkBoxes.forEach((box) => {
    box.addEventListener("input", function () {
      if (userCoins.length === 5) {
        checkBoxes.forEach((item) => {
          item.setAttribute("data-bs-toggle", "modal");
          item.setAttribute("data-bs-target", "#exampleModal");
        });
      }
      if (userCoins.length > 0 && userCoins.length < 5) {
        checkBoxes.forEach((item) => {
          this.disabled = false;
          item.removeAttribute("data-bs-toggle", "modal");
          item.removeAttribute("data-bs-target", "#exampleModal");
        });
      }
      // if (userCoins.length < 5) {
      // }

      if (userCoins.length === 6) {
        // this.checked = false
        // this.disabled = true;
        userCoins.splice(userCoins.length - 1, 1);
        setToLocalStorage(userCoins, SELECTED_COINS_LS_ID);
      }
    });
  });
}
