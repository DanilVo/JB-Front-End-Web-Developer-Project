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
  const removedDuplicatesArr = arr.filter(coin => arrayOfCoins.some(penny => coin.name === penny.symbol))
  // console.log(arr);
  // console.log(arrayOfCoins);
  // console.log(removedDuplicatesArr);
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
    data: removedDuplicatesArr,
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

async function getCoinsPrice() {
  const loadingSpinner = document.getElementById("graphLoading");
  const coins = getFromLocalStorageGraph()
  let coinsUrlTemplate = ``
  for (const coin of coins) {
    coinsUrlTemplate += `${coin.symbol},`
  }
  if (!arr.length) {
    loadingSpinner.classList.replace("d-none", "d-flex");
  }
  try {
    const data2 = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsUrlTemplate}&tsyms=USD`);
    const response2 = await data2.json();
    loadingSpinner.classList.replace("d-flex", "d-none");
    return response2;
  } catch (err) {
    console.error(err);
  }
}

async function createArrayOfCoins() {
  const coins = getFromLocalStorageGraph();
  const now = Date.now();
  if (coins && coins.length) {
    try {
      const coinPrice = await getCoinsPrice();
      for (const key in coinPrice) {
        const index = arr.findIndex((object) => object.name === key.toLocaleLowerCase());
        if (index === -1) {
          arr.push({
            type: "line",
            xValueType: "dateTime",
            showInLegend: true,
            name: key.toLocaleLowerCase(),
            dataPoints: [
              { x: now, y: coinPrice[key].USD },
            ],
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    document.querySelector(".img-fluid").classList.replace("d-none", "d-flex");
  }
}

async function updateData() {
  const now = Date.now();
  let coin = await getCoinsPrice();
  const arrayOfCoins = getFromLocalStorageGraph();
  // const removedDuplicatesArr = arr.filter(coin => arrayOfCoins.some(penny => coin.name === penny.symbol))
  console.log(arrayOfCoins);
  for (let i = 0; i < arrayOfCoins.length; i++) {
    arr[i].dataPoints.push({ x: now, y: Object.values(coin)[i].USD });
  }
  chart.render();
}

function getFromLocalStorageGraph() {
  const coins = localStorage.getItem("userCoins");
  return JSON.parse(coins);
}
