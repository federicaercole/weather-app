
// let latitude = 41.89;
// let longitude = 12.51;
// let locationName = "Rome";
// let country = "Italy";

let temperatureUnit = "celsius";

async function getSearchResults(location) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`, { mode: 'cors' });
        const jsonData = await response.json();
        const latitude = jsonData.results[0].latitude;
        const longitude = jsonData.results[0].longitude;
        const locationName = jsonData.results[0].name;
        const country = jsonData.results[0].country;
        if (latitude !== undefined) {
            getWeatherData(latitude, longitude, locationName, country);
        }
    } catch {
        showErrors();
    }
}

async function getWeatherData(latitude, longitude, locationName, country) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);
        printValues(jsonData, locationName, country);
    } catch {
        showErrors();
    }
}

function showErrors() {
    errorMsg.classList.remove("hidden");
    if (input.validity.valueMissing) {
        errorMsg.textContent = "Please write a valid location.";
    } else {
        errorMsg.textContent = "Ooops, something went wrong!";
    }
}

function resetErrors() {
    errorMsg.classList.add("hidden");
    errorMsg.textContent = "";
}

const unitSelection = [...document.querySelectorAll('input[type="radio"]')];

unitSelection.map(item => item.addEventListener("click", event => {
    resetRadioButtons();
    event.target.checked = true;
    temperatureUnit = event.target.value;
    getWeatherData(latitude, longitude, locationName, country);
}));

const input = document.querySelector('input[type="text"]');

const button = document.querySelector("button");
button.addEventListener("click", event => {
    resetErrors();
    getSearchResults(input.value);
    if (input.validity.valueMissing) {
        showErrors(event);
        event.preventDefault();
    } else {

        input.value = "";
    }
});

const body = document.querySelector("body");
const temperature = document.querySelector(".temperature");
const weather = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");

function printValues(json, locationName, country) {
    const h2 = document.querySelector("h2");
    h2.textContent = `${locationName}, ${country}`;
    const unitSymbol = temperatureUnit === "celsius" ? "°C" : "°F";
    temperature.textContent = `${json.current_weather.temperature}${unitSymbol}`;
    const weatherCode = json.current_weather.weathercode;
    const time = Number(json.current_weather.time.split('T')[1].split(":")[0]);
    switchWeatherClass(weatherCode);
    switchTimeClass(time);
}

function switchWeatherClass(weatherCode) {
    switch (weatherCode) {
        case 0:
            weather.textContent = "Clear sky";
            body.setAttribute("class", "clear")
            break;
        case 1:
            weather.textContent = "Mainly clear";
            body.setAttribute("class", "clear");
            break;
        case 2:
        case 3:
            weather.textContent = "Cloudy";
            body.setAttribute("class", "cloudy");
            break;
        case 45:
        case 48:
            weather.textContent = "Fog";
            body.setAttribute("class", "fog");
            break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            weather.textContent = "Drizzle";
            body.setAttribute("class", "light-rain");
            break;
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            weather.textContent = "Rain";
            body.setAttribute("class", "rain");
            break;
        case 71:
        case 73:
        case 75:
            weather.textContent = "Snow fall";
            body.setAttribute("class", "snow");
            break;
        case 77:
            weather.textContent = "Snow grains";
            body.setAttribute("class", "snow");
            break;
        case 80:
        case 81:
        case 82:
            weather.textContent = "Rain shower";
            body.setAttribute("class", "rain");
            break;
        case 85:
        case 86:
            weather.textContent = "Snow shower";
            body.setAttribute("class", "snow");
            break;
        case 95:
            weather.textContent = "Thunderstorm";
            body.setAttribute("class", "thunderstorm");
            break;
        case 96:
        case 99:
            weather.textContent = "Thunderstorm with hail";
            body.setAttribute("class", "thunderstorm");
            break;
    }
}

function switchTimeClass(time) {
    if (time >= 18 && time <= 23 || time >= 0 && time <= 6) {
        body.classList.add("night");
    }
}

function resetRadioButtons() {
    unitSelection.forEach(item => item.checked = false);
}

resetRadioButtons();
unitSelection[0].checked = true;
