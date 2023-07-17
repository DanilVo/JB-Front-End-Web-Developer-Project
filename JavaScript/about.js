const about = document.querySelector("#about")
about.addEventListener('click', aboutPage)

function aboutPage() {
    const container = document.querySelector('.container')
    container.innerHTML = 'asd'
    console.log('about');
}