var getCards = document.getElementById("cards")
var getHeader = document.getElementById("header")
var repoOwner, repoOwnerAvatar
var repoNames = []
var repoDescription = []
var repoLanguagesKeys = []
var repoLanguagesValues = []
var languageUrls = []

async function fetchRepo() {
    var fetchJson = await fetch("https://api.github.com/users/Turq0ise/repos?")
    var fetchRepoData = await fetchJson.json()

    for(i = 0; i < fetchRepoData.length; i++) {
        repoNames.push(fetchRepoData[i].name)
        repoDescription.push(fetchRepoData[i].description)
        languageUrls.push(fetchRepoData[i].languages_url)
    }

    for(i = 0; i < languageUrls.length; i++) {
        var response = await fetch(languageUrls[i])
        var languages = await response.json()
        repoLanguagesKeys.push(Object.keys(languages))
        repoLanguagesValues.push(Object.values(languages))
    }

    repoOwner = fetchRepoData[0].owner.login
    repoOwnerAvatar = fetchRepoData[0].owner.avatar_url

    printFunction()
}
fetchRepo()

function printFunction() {
    getHeader.innerHTML += `<div id="header-avatar"><img src="${repoOwnerAvatar}"></div><div id="header-title"><div id="main-text"><h1>${repoOwner}</h1><p>Github Repositories:</p></div></div>`
    for(i = 0; i < repoNames.length; i++) { 
        getCards.innerHTML += `<div class="repo-cards" id="repo-card-${i}"></div>`
        document.getElementById(`repo-card-${i}`).innerHTML += `<div class="card-sides" id="left"><a href="https://github.com/Turq0ise/${repoNames[i]}"><h1>${repoNames[i]}</h1></a><p>${repoDescription[i]}</p></div>`
        document.getElementById(`repo-card-${i}`).innerHTML += `<div class="card-sides" id="right"><h1>Languages:</h1><div id="language-list-${i}"></li></div><a href="https://turq0ise.github.io/${repoNames[i]}/"><button>Visit Webpage</button></a></div>`
        for(x = 0; x < repoLanguagesKeys[i].length; x++) {
            var total = 0
            for(y = 0; y < repoLanguagesValues[i].length; y++) {
                total += repoLanguagesValues[i][y]
            }
            document.getElementById(`language-list-${i}`).innerHTML += `<li>${repoLanguagesKeys[i][x]}: <span>${round(repoLanguagesValues[i][x]/total*100, 1)}%</span>`
        }
    }
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}