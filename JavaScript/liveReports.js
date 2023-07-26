const liveReports = document.querySelector("#live-reports");
liveReports.addEventListener("click", liveReportsPage);

async function getCoinsPrice(coin) {
  const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
  const response = await data.json();
  try {
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createArrayOfCoins() {
  const coins = getFromLocalStorageGraph();
  const arr = [];
  for (const coin of coins) {
    const coinPrice = await getCoinsPrice(coin.id);
    arr.push({
      x: [5],
      y: [coinPrice.market_data.current_price.usd],
      name: coinPrice.name,
    });
  }
  return arr;
}
async function liveReportsPage() {
  const container = document.querySelector(".row");
  container.innerHTML =
    '<div class="align-middle"><div id="chart" style="width: max-content;height: 500px;"></div></div>';
  const coinsData = await createArrayOfCoins();
  Plotly.newPlot("chart", coinsData, {
    xaxis: { range: [0, 100], title: "Updates every 5 seconds" },
    yaxis: { range: [0, 100000], title: "Price" },
    title: "coins price",
  });
}



// console.log(createArrayOfCoins());

// function getTimeNow() {
//   setInterval(() => {
//     const date = new Date();
//     let current_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//     console.log(current_time)
//   }, 5000);
// }

function getFromLocalStorageGraph() {
  const coins = localStorage.getItem("userCoins");
  return JSON.parse(coins);
}
