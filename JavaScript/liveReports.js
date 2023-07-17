const liveReports = document.querySelector("#live-reports")
liveReports.addEventListener('click', liveReportsPage)

function liveReportsPage() {
    const container = document.querySelector('.row')
    container.innerHTML = "live-reports";
}

