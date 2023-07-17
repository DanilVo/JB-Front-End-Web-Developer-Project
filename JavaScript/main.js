const LIST_OF_COINS_LS_ID = "coin";
const SELECTED_COINS_LS_ID = "userCoins";
const PRICE_OF_COINS = "coinsPrices";
const URL_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";

document
  .getElementById("home-page")
  .addEventListener(
    "click",
    getDataFromApi
  );

window.addEventListener("load", getDataFromApi());

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
        '<h1 style="background-color: yellow">some thing went wrong</h1>';
    }
    console.log(err);
  }
}

function onToggleChange(element) {
  //add element as argument to follow input
  const userCoins = getFromLocalStorage(SELECTED_COINS_LS_ID);
  const userCheckBoxes = document.querySelectorAll(".user-selected");
  console.log(userCoins.length);
  if (userCoins.length === 5) {
    userCheckBoxes.forEach((item) => {
      item.setAttribute("data-bs-toggle", "modal");
      item.setAttribute("data-bs-target", "#exampleModal");
    });
  } else if (userCoins.length <= 4) {
    userCheckBoxes.forEach((item) => {
      if (item.hasAttribute("data-bs-toggle")) {
        console.log(userCoins.length);
        // item.checked = false; // not suppose to be here
        item.removeAttribute("data-bs-toggle");
        item.removeAttribute("data-bs-target");
      }
    });
  }
  if (userCoins.length > 5) {
    element.checked = false;
    // this.disabled = true;
    userCoins.splice(userCoins.length - 1, 1);
    setToLocalStorage(userCoins, SELECTED_COINS_LS_ID);
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
            } user-selected" type="checkbox" role="switch" id="flexSwitchCheckDefault" oninput=onToggleChange(this)>
          </div>
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text"><img src="${
              data[i].image
            }" style="width: 35px"></p>
            <a class="btn btn-primary " data-bs-toggle="collapse" href="#collapseExample${i}"
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
      } else {
        this.classList.add("user-selected");
        const indexOfRemovedCoin = userCoins.findIndex(
          (item) => item.id == checkedCoin
        );
        userCoins.splice(indexOfRemovedCoin, 1);
        setToLocalStorage(userCoins, SELECTED_COINS_LS_ID);
      }
    })
  );
}
// move api request to outer function

async function getCoinsPriceAndSetToLS() {
  //getCoinsPriceAndSetToLS
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/`);
    const data = await response.json();
    // let priceObj = [];
    // for (const coin of data) {
    //   priceObj.push({
    //     name: coin.name,
    //     usd: coin.market_data.current_price.usd,
    //     euro: coin.market_data.current_price.eur,
    //     ils: coin.market_data.current_price.ils,
    //   });
    // }
    // console.log(priceObj);
    // setToLocalStorage(priceObj, PRICE_OF_COINS);
    return data;
    // showCurrencyPrice(priceObj, id);
    // spinner.setAttribute("hidden", "");
  } catch (error) {
    console.log(error);
  }
}

 async function getCurrencyPrice(obj, id) {
  if (getFromLocalStorage(PRICE_OF_COINS)) {
  } else {

    const data = await getCoinsPriceAndSetToLS()
    console.log(data);
  }
  // const spinner = document.querySelector(`#spinner${id}`);
  // if (getFromLocalStorage(PRICE_OF_COINS)) {
  //   showCurrencyPrice(getFromLocalStorage(PRICE_OF_COINS));
  // } else {
  //   spinner.removeAttribute("hidden");
    // try {
    //   const response = await fetch(`https://api.coingecko.com/api/v3/coins/`);
    //   const data = await response.json();
    //   let priceObj = [];
    //   for (const coin of data) {
    //     priceObj.push({
    //       name: coin.name,
    //       usd: coin.market_data.current_price.usd,
    //       euro: coin.market_data.current_price.eur,
    //       ils: coin.market_data.current_price.ils,
    //     });
    //   }
    //   // console.log(priceObj);
    //   setToLocalStorage(priceObj, PRICE_OF_COINS);
    //   console.log(priceObj);
    //   // showCurrencyPrice(priceObj, id);
    //   spinner.setAttribute("hidden", "");
    // } catch (error) {
    //   console.log(error);
    // }
//   }
}

// function showCurrencyPrice(data, id) {
//   const coin = document.querySelector(`.price-info${id}`);
//   console.log(data);
//   const html = `
//   $: ${data.usd}
//   <br>
//   €: ${data.euro}
//   <br>
//   ₪: ${data.ils}
//   `;
//   coin.innerHTML = html;
// }

function setToLocalStorage(data, id) {
  localStorage.removeItem(id);
  localStorage.setItem(id, JSON.stringify(data));
}

function getFromLocalStorage(id) {
  const coins = localStorage.getItem(id);
  return JSON.parse(coins);
}

const input = document.querySelector(".form-control");
input.addEventListener("input", () =>
  displaySearchCoins(input.value.toLowerCase())
);

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
