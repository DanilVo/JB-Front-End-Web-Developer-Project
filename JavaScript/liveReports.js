// import Plotly from "plotly.js-dist-min";

const liveReports = document.querySelector("#live-reports");
liveReports.addEventListener("click", liveReportsPage);

const arr = [];
let chart;

async function liveReportsPage() {
  const container = document.querySelector(".row");
  container.innerHTML =
    '<div id="chartContainer" style="height: 300px; width: 100%;"></div>';
  await createArrayOfCoins();
  chart = new CanvasJS.Chart("chartContainer", {
    zoomEnabled: true,
    title: {
      text: "Price change of coins",
    },
    axisX: {
      title: "chart updates every 5 secs",
    },
    axisY: {
      prefix: "$",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 22,
      fontColor: "dimGrey",
      itemclick: toggleDataSeries,
    },
    data: arr,
  });
  chart.render();
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
  setInterval(updateData, 5000);
}

async function getCoinsPrice(coin) {
  const loadingSpinner = document.getElementById("graphLoading");
  try {
    if (!arr.length) {
      loadingSpinner.classList.replace("d-none", "d-flex");
    }
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
    const response = await data.json();
    loadingSpinner.classList.replace("d-flex", "d-none");
    return response;
  } catch (err) {
    console.error(err);
  }
}

async function createArrayOfCoins() {
  const coins = getFromLocalStorageGraph();
  const now = Date.now();
  for (const coin of coins) {
    try {
      const coinPrice = await getCoinsPrice(coin.id);

      arr.push({
        type: "line",
        xValueType: "dateTime",
        showInLegend: true,
        name: coinPrice.id,
        dataPoints: [{ x: now, y: coinPrice.market_data.current_price.usd }],
      });
    } catch (err) {
      console.error(err);
    }
  }
}

function updateData() {
  const now = Date.now();
  arr.forEach(async (dataCoin) => {
    let coin = await getCoinsPrice(dataCoin.name);
    dataCoin.dataPoints.push({
      x: now,
      y: coin.market_data.current_price.usd,
    });
  });
  chart.render();
}

function getFromLocalStorageGraph() {
  const coins = localStorage.getItem("userCoins");
  return JSON.parse(coins);
}
