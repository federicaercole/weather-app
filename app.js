//converti unità di misure tu!
//non mi piace lasciare printvalue dentro la funzione...
const app = (function () {
    let temperatureUnit = "celsius";

    async function getSearchResults(location) {
        let data = {};
        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`, { mode: 'cors' });
            const jsonData = await response.json();
            data.latitude = jsonData.results[0].latitude;
            data.longitude = jsonData.results[0].longitude;
            data.locationName = jsonData.results[0].name;
            data.country = jsonData.results[0].country;
            return data;
        } catch {
            ui.showErrors();
            ui.errorMsg.textContent = "The location doesn't exist or you typed it wrong. Please retry.";
        }
    }

    async function getWeatherData(latitude, longitude, locationName, country) {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`, { mode: 'cors' });
            const jsonData = await response.json();
            ui.printValues(jsonData, locationName, country);
        }
        catch {
            ui.showErrors();
            ui.errorMsg.textContent = "Weather is not available!"
        }
    }

    const unitSelection = [...document.querySelectorAll('input[type="radio"]')];

    unitSelection.map(item => item.addEventListener("click", event => {
        resetRadioButtons();
        event.target.checked = true;
        temperatureUnit = event.target.value;
        getWeatherData(data.latitude, data.longitude, data.locationName, data.country);
    }));

    const input = document.querySelector('input[type="text"]');

    const button = document.querySelector("button");
    button.addEventListener("click", event => {
        ui.resetErrors();
        if (input.validity.valueMissing) {
            ui.showErrors();
            event.preventDefault();
        } else {
            getSearchResults(input.value).then(result => getWeatherData(result.latitude, result.longitude, result.locationName, result.country));
            input.value = "";
        }
    });

    return { unitSelection, temperatureUnit, input };
})();

const ui = (function () {
    const body = document.querySelector("body");
    const temperature = document.querySelector(".temperature");
    const weather = document.querySelector(".weather");
    const errorMsg = document.querySelector(".error");

    function printValues(json, locationName, country) {
        const h2 = document.querySelector("h2");
        h2.textContent = `${locationName}, ${country}`;
        const unitSymbol = app.temperatureUnit === "celsius" ? "°C" : "°F";
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
                body.classList.add("dark-text");
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
                body.classList.add("dark-text");
                break;
            case 77:
                weather.textContent = "Snow grains";
                body.setAttribute("class", "snow");
                body.classList.add("dark-text");
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

    function showErrors() {
        errorMsg.classList.remove("hidden");
        if (app.input.validity.valueMissing) {
            errorMsg.textContent = "Please write a location.";
        }
    }

    function resetErrors() {
        errorMsg.classList.add("hidden");
        errorMsg.textContent = "";
    }

    return { printValues, showErrors, resetErrors, errorMsg }
})();

function resetRadioButtons() {
    app.unitSelection.forEach(item => item.checked = false);
}

resetRadioButtons();
app.unitSelection[0].checked = true;