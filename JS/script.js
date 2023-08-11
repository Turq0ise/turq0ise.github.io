var repoNames = []
var repoLanguagesKeys = []
var repoLanguagesValues = []
var languageUrls = []

async function fetchGithub() {
    const fetchData = await fetch("https://api.github.com/users/turq0ise/repos?")
    const fetchJson = await fetchData.json()

    for(let i = 0; i < fetchJson.length; i++) {
        if(fetchJson[i].name == "TimeWorkshopV2" || fetchJson[i].name == "rSlashWallpaper" || fetchJson[i].name == "GroupFivePortfolio" || fetchJson[i].name == "PitiksRedesign") {
            repoNames.push(fetchJson[i].name)
            languageUrls.push(fetchJson[i].languages_url)
        }
    }

    for(let i = 0; i < languageUrls.length; i++) {
        var response = await fetch(languageUrls[i])
        var languages = await response.json()
        repoLanguagesKeys.push(Object.keys(languages))
        repoLanguagesValues.push(Object.values(languages))
    }

    showLanguages()
}

function showLanguages() {
    for(let i = 0; i < repoNames.length; i++) {
        var target = document.getElementById(repoNames[i])
        for(let x = 0; x < repoLanguagesKeys[i].length; x++) {
            let total = 0
            for(let y = 0; y < repoLanguagesValues[i].length; y++) {
                total += repoLanguagesValues[i][y]
            }

            target.innerHTML += `<li>${repoLanguagesKeys[i][x]}: <span>${round(repoLanguagesValues[i][x]/total*100, 1)}%</span>`
        }
    }
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const header = document.getElementById("header")
const getFullSizeNav = document.getElementById("full-size-nav")
const marginTopValue = `${header.clientHeight + 2}px`

function fullSizeNav() {
    if (getFullSizeNav.style.display == "none") {
        getFullSizeNav.style.display = "flex"
        document.body.style.overflow = "hidden"
    } else if (getFullSizeNav.style.display == "flex") {
        getFullSizeNav.style.display = "none"
        document.body.style.overflow = "auto"
    }
}

function fullSizeNavMargin() {
    if(window.innerWidth > 1280) {
        return
    } else {
        getFullSizeNav.style.marginTop = marginTopValue
    }
}

window.addEventListener("resize", () => {
    fullSizeNavMargin()
})

const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const form = e.target
    var data = new FormData(form)

    fetch(form.action, {
        method: form.method,
        body: data
    }).then(
        alert("Submitted")
    )
})