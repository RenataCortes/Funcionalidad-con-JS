async function fetchCountries() {
    const countryContainer = document.getElementById("country-container");

    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();
        const limitedCountries = countries.slice(0, 250);

        renderCountries(limitedCountries);
    } catch (error) {
        console.error("Error al consumir la API: ", error);
    }
}

function renderCountries(countries) {
    const countryContainer = document.getElementById("country-container");
    if (!countryContainer) {
        console.error("Elemento con ID 'country-container' no se encontró");
        return;
    }
    countryContainer.innerHTML = "";

    countries.forEach((country) => {
        const countryCard = document.createElement("div");
        countryCard.classList.add("country-card");
        countryCard.innerHTML = `
              <img src="${country.flags.svg}" alt="${country.name.common}">
              <h3>${country.name.common}</h3>
              <p>${country.region}</p>
          `;
        countryCard.addEventListener("click", () => saveCountry(country));
        countryContainer.appendChild(countryCard);
    });
}

function saveCountry(country) {
    const selectedCountries = [country];
    localStorage.setItem("selectedCountries", JSON.stringify(selectedCountries));
    renderSelectedCountries();
}

function renderSelectedCountries() {
    const selectedCountryContainer = document.getElementById("selected-country-container");
    if (!selectedCountryContainer) {
        console.error("Elemento con ID 'selected-country-container' no se encontró");
        return;
    }
    selectedCountryContainer.innerHTML = "";

    const selectedCountries = JSON.parse(localStorage.getItem("selectedCountries")) || [];

    selectedCountries.forEach((country) => {
        const selectedCountryCard = document.createElement("div");
        selectedCountryCard.classList.add("country-card");
        selectedCountryCard.innerHTML = `
              <img src="${country.flags.svg}" alt="${country.name.common}">
              <h3>${country.name.common}</h3>
              <p>${country.region}</p>
          `;
        selectedCountryContainer.appendChild(selectedCountryCard);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCountries();
    renderSelectedCountries();
});
