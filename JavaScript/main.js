const LIST_OF_COINS_LS_ID = "coin";
const SELECTED_COINS_LS_ID = "userCoins";
const URL_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";
window.addEventListener(
  "load",
  drawData(getFromLocalStorage(LIST_OF_COINS_LS_ID))
);

// async function getDataFromApi() {
//   try {
//     const response = await fetch(URL_API);
//     const data = await response.json();
//     setToLocalStorage(data, LIST_OF_COINS_LS_ID);
//     drawData(data);
//   } catch (err) {
//     drawData(getFromLocalStorage(LIST_OF_COINS_LS_ID));
//     // console.log(err);
//   }
// }

function drawData(data) {
  const cards = document.querySelector(".row");
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
      <div class="card" id="${data[i].id}">
        <h5 class="card-header">${data[i].symbol.toUpperCase()}</h5>
        <div class="card-body">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
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
input.addEventListener("keyup", () => displaySearchCoins(input.value));

function displaySearchCoins(coins) {
  const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
  const listOfCoins = coinsList.filter((coin) => {
    return coin.name.toLowerCase().includes(coins);
  });
  drawData(listOfCoins);
}

let favoriteCoinsArr = []

const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
checkBoxes.forEach((key) =>
  key.addEventListener("click", function () {
    const coinsList = getFromLocalStorage(LIST_OF_COINS_LS_ID);
    const checkedCoin = this.parentElement.parentElement.parentElement.id
    const getCoinFromLS = coinsList.find((item)=> item.id == checkedCoin)
    // favoriteCoinsArr.push(getCoinFromLS);
    console.log(favoriteCoinsArr);
    console.log(this.checked);
  })
);
