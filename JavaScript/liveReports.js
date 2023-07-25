const liveReports = document.querySelector("#live-reports");
liveReports.addEventListener("click", liveReportsPage);

function liveReportsPage() {
  const container = document.querySelector(".row");
  container.innerHTML =
    '<div class="align-middle"><div id="chart" style="width: max-content;height500px;"></div></div>';
  const TESTER = document.getElementById("chart");
  let x = [10, 20, 30, 40, 50];
  let y = [1, 2, 4, 8, 16];
  Plotly.newPlot(
    TESTER,
    [
      { x: x, y: y, name: "bitcoin" },
      { x: [1, 2, 3, 4, 5], y: [3, 4, 5, 8, 16], name: "ethereum" },
    ],
    {
      xaxis: { range: [0, 160], title: "Updates every 5 seconds" },
      yaxis: { range: [5, 16], title: "Price" },
      title: "coins price",
    }
  );
  //   getCoinsPrice('bitcoin')
  getTimeNow()
}

async function getCoinsPrice(coin) {
  const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
  const resp = await data.json();
  try {
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
}

function getTimeNow() {
  setInterval(() => {
    const date = new Date();
    let current_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(current_time)
  }, 5000);
}
