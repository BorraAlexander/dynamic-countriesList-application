let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let resultCountries = document.getElementById("resultCountries");

let searchInputvalue = "";
let countriesList = [];

function createAndAppendCountry(country) {
    let {
        flag,
        name,
        population
    } = country;

    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountries.appendChild(countryEl);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryFlagEl.src = flag;
    countryEl.appendChild(countryFlagEl);

    let countryDetailsEl = document.createElement("div");
    countryDetailsEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryDetailsEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.classList.add("country-name");
    countryNameEl.textContent = name;
    countryDetailsEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.classList.add("country-population");
    countryPopulationEl.textContent = population;
    countryDetailsEl.appendChild(countryPopulationEl);

}

function displaySearchedCountries() {
    resultCountries.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputvalue)) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {
    let url = 'https://apis.ccbp.in/countries-data';
    let options = {
        method: "GET"
    };
    spinner.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none");
            //console.log(jsonData);
            countriesList = jsonData;
            displaySearchedCountries();
        });
}
getCountries();

function onChangeSearchInputFunction(Event) {
    searchInputvalue = Event.target.value;
    displaySearchedCountries();
}

searchInput.addEventListener("keyup", onChangeSearchInputFunction);