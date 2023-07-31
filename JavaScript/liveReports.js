const liveReports = document.querySelector("#live-reports");
liveReports.addEventListener("click", liveReportsPage);

let chart;
const arr = [];

async function liveReportsPage() {
  document.querySelector(".form-control").value = "";
  const container = document.querySelector(".row");
  container.innerHTML =
    '<div id="chartContainer" style="height: 300px; width: 100%;"></div>';
  await createArrayOfCoins();
  const arrayOfCoins = getFromLocalStorageGraph();
  let fixedArr = arr.filter((o1) =>
    arrayOfCoins.some((o2) => o1.name === o2.id)
  );
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
    data: fixedArr,
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
  if (!arr.length) {
    loadingSpinner.classList.replace("d-none", "d-flex");
  }
  try {
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
  if (coins && coins.length) {
    for (const coin of coins) {
      try {
        const coinPrice = await getCoinsPrice(coin.id);
        const index = arr.findIndex((object) => object.name === coinPrice.id);
        if (index === -1) {
          arr.push({
            type: "line",
            xValueType: "dateTime",
            showInLegend: true,
            name: coinPrice.id,
            dataPoints: [
              { x: now, y: coinPrice.market_data.current_price.usd },
            ],
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    document.querySelector(".img-fluid").classList.replace("d-none", "d-flex");
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
