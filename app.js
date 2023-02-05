const app = (function () {
    let temperatureUnit = "celsius";

    async function getSearchResult(location) {
        ui.loader.classList.remove("hidden");
        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`, { mode: 'cors' });
            const jsonData = await response.json();
            const latitude = jsonData.results[0].latitude;
            const longitude = jsonData.results[0].longitude;
            const locationName = jsonData.results[0].name;
            const country = jsonData.results[0].country;
            getWeatherData(latitude, longitude, locationName, country);
        } catch {
            ui.showErrors();
            ui.errorMsg.textContent = "The location doesn't exist or you typed it wrong. Please retry.";
        } finally {
            ui.loader.classList.add("hidden");
        }
    }

    async function getWeatherData(latitude, longitude, locationName, country) {
        ui.loader.classList.remove("hidden");
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`, { mode: 'cors' });
            const jsonData = await response.json();
            const currentTemperature = jsonData.current_weather.temperature;
            const weatherCode = jsonData.current_weather.weathercode;
            const time = Number(jsonData.current_weather.time.split('T')[1].split(":")[0]);
            ui.printValues(currentTemperature, temperatureUnit, weatherCode, time, locationName, country);
        }
        catch {
            ui.showErrors();
            ui.errorMsg.textContent = "Weather is not available!"
        } finally {
            ui.loader.classList.add("hidden");
        }
    }

    const unitSelection = [...document.querySelectorAll('input[type="radio"]')];

    unitSelection.map(item => item.addEventListener("click", event => {
        resetRadioButtons();
        event.target.checked = true;
        temperatureUnit = event.target.value;
        if (temperatureUnit === "fahrenheit") {
            const CToFDegrees = convertToFahrenheit(Number(ui.temperature.textContent.split("°")[0]));
            ui.printTemperature(CToFDegrees, "fahrenheit");
        } else {
            const FToCDegrees = convertToCelsius(Number(ui.temperature.textContent.split("°")[0]));
            ui.printTemperature(FToCDegrees, "celsius");
        }
    }));

    const input = document.querySelector('input[type="text"]');

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            search(event);
        }
    })

    const button = document.querySelector("button");
    button.addEventListener("click", (event) => {
        search(event);
    });

    function search(event) {
        ui.resetErrors();
        ui.weatherData.classList.add("hidden");
        if (input.validity.valueMissing) {
            ui.showErrors();
            event.preventDefault();
        } else {
            getSearchResult(input.value);
            input.value = "";
        }
    }

    return { unitSelection, temperatureUnit, input, getWeatherData };
})();

const ui = (function () {
    const body = document.querySelector("body");
    const temperature = document.querySelector(".temperature");
    const weather = document.querySelector(".weather");
    const errorMsg = document.querySelector(".error");
    const weatherData = document.querySelector(".weather-data")
    const loader = document.querySelector(".loader");

    function printTemperature(degree, temperatureUnit) {
        let unitSymbol;
        temperatureUnit === "celsius" ? unitSymbol = "°C" : unitSymbol = "°F";
        temperature.textContent = degree + unitSymbol;
    }

    function printValues(temperature, temperatureUnit, weatherCode, time, locationName, country) {
        const h2 = document.querySelector("h2");
        h2.textContent = `${locationName}, ${country} `;
        printTemperature(temperature, temperatureUnit);
        switchWeatherClass(weatherCode);
        switchTimeClass(time);
        weatherData.classList.remove("hidden");
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

    return { printValues, printTemperature, showErrors, resetErrors, errorMsg, temperature, weatherData, loader }
})();

function resetRadioButtons() {
    app.unitSelection.forEach(item => item.checked = false);
}

const convertToCelsius = function (degree) {
    let conversion = ((degree - 32) * (5 / 9));
    return parseFloat(conversion.toFixed(1));
};

const convertToFahrenheit = function (degree) {
    let conversion = (degree * (9 / 5) + 32);
    return parseFloat(conversion.toFixed(1));
};

resetRadioButtons();
app.unitSelection[0].checked = true;

        // weatherData.appendChild(h2);

        // const dataDiv = document.createElement("div");
        // const paraTemp = document.createElement("p");
        // paraTemp.classList.add("temperature");
        // const paraWeather = document.createElement("p");
        // paraTemp.classList.add("weather");

        // weatherData.appendChild(dataDiv);
        // dataDiv.appendChild(paraTemp);
        // dataDiv.appendChild(paraWeather);
