//App
let temperatureUnit = "celsius";

async function getWeatherData() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=44.39&longitude=7.55&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);
        printValues(jsonData);
    } catch (error) {
        errorMsg.classList.remove("hidden");
        errorMsg.textContents = "Ooops, something went wrong!";
    }
}

const unitSelection = [...document.querySelectorAll('input[type="radio"]')];

unitSelection.map(item => item.addEventListener("click", event => {
    resetRadioButtons();
    event.target.checked = true;
    temperatureUnit = event.target.value;
    getWeatherData();
}));

const button = document.querySelector("button");
button.addEventListener("click", getWeatherData);

//UI
const body = document.querySelector("body");
const errorMsg = document.querySelector(".error");
const temperature = document.querySelector(".temperature");
const weather = document.querySelector(".weather");

function printValues(json) {
    const unitSymbol = temperatureUnit === "celsius" ? "°C" : "°F";
    temperature.textContent = `${json.current_weather.temperature}${unitSymbol}`;
    const weatherCode = json.current_weather.weathercode;
    const time = Number(json.current_weather.time.split('T')[1].split(":")[0]);
    switchWeatherConditions(weatherCode);
    switchTimeConditions(time);
}

function switchWeatherConditions(weatherCode) {
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


//Helper functions
function resetRadioButtons() {
    unitSelection.forEach(item => item.checked = false);
}

//funzione da rivedere
function switchTimeConditions(time) {
    if (time >= 18 && time <= 23 || time >= 0 && time <= 6) {
        body.classList.add("night");
    }
}

//Start
resetRadioButtons();
unitSelection[0].checked = true;