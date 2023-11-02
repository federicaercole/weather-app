const ui = (function () {
    const body = document.querySelector("body");
    const temperature = document.querySelector(".temperature");
    const weather = document.querySelector(".weather");
    const errorMsg = document.querySelector(".error");
    const weatherData = document.querySelector(".weather-data")
    const loader = document.querySelector(".loader");

    function printTemperature(degree, temperatureUnit) {
        let unitSymbol;
        const span = document.createElement("span");
        temperatureUnit === "celsius" ? unitSymbol = "C" : unitSymbol = "F";
        temperature.textContent = `${degree}°`;
        span.textContent = unitSymbol;
        temperature.appendChild(span);
    }

    function printValues(temperature, temperatureUnit, weatherCode, time, locationName, country) {
        const h2 = document.querySelector("h2");
        const span = document.createElement("span");
        h2.textContent = `${locationName} - `;
        span.textContent = country;
        h2.appendChild(span);
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
            errorMsg.textContent = "Write a location";
        }
    }

    function resetErrors() {
        errorMsg.classList.add("hidden");
        errorMsg.textContent = "";
    }

    return { printValues, printTemperature, showErrors, resetErrors, errorMsg, temperature, weatherData, loader }
})();