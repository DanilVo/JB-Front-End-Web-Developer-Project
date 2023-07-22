const about = document.querySelector("#about")
about.addEventListener('click', aboutPage)

function aboutPage() {
    const container = document.querySelector('.row')
    container.innerHTML = "about";
}
