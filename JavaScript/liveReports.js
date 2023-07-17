const liveReports = document.querySelector("#live-reports")
liveReports.addEventListener('click', liveReportsPage)

function liveReportsPage() {
    const container = document.querySelector('.container')
    container.innerHTML = 'asd'
    console.log('live-reports');
}