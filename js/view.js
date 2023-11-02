
export default class View {

    nodes = {}

    constructor() {
        this.nodes.body = this.#$("body");
        this.nodes.temperature = this.#$(".temperature");
        this.nodes.weather = this.#$(".weather");
        this.nodes.weatherData = this.#$(".weather-data");
        this.nodes.errorMsg = this.#$(".error");
        this.nodes.loader = this.#$(".loader");
    }

    #$ = document.querySelector.bind(document);
    #createElement = document.createElement.bind(document);

    printValues(object) {
        const { temperature, temperatureUnit, weatherCode, time, locationName, country } = object;
        const title = this.#$("h2");
        const span = this.#createElement("span");
        title.textContent = `${locationName} - `;
        span.textContent = country;
        h2.appendChild(span);
        // printTemperature(temperature, temperatureUnit);
        this.#switchWeatherClass(weatherCode);
        // switchTimeClass(time);
        this.nodes.weatherData.classList.remove("hidden");
    }

    // function printTemperature(degree, temperatureUnit) {
    //     let unitSymbol;
    //     const span = document.createElement("span");
    //     temperatureUnit === "celsius" ? unitSymbol = "C" : unitSymbol = "F";
    //     temperature.textContent = `${degree}°`;
    //     span.textContent = unitSymbol;
    //     temperature.appendChild(span);
    // }

    #setUI(text, ...classes) {
        this.nodes.weather.textContent = text;
        this.nodes.body.setAttribute("class", "");
        classes.map(item => this.nodes.body.classList.add(item));
    }

    #switchWeatherClass(weatherCode) {
        switch (weatherCode) {
            case 0:
                this.#setUI("Clear sky", "clear");
                break;
            case 1:
                this.#setUI("Mainly clear", "clear");
                break;
            case 2:
            case 3:
                this.#setUI("Cloudy", "cloudy");
                break;
            case 45:
            case 48:
                this.#setUI("Fog", "fog", "dark-text");
                break;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
                this.#setUI("Drizzle", "light-rain");
                break;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                this.#setUI("Rain", "rain");
                break;
            case 71:
            case 73:
            case 75:
                this.#setUI("Snow fall", "snow", "dark-text");
                break;
            case 77:
                this.#setUI("Snow grains", "snow", "dark-text");
                break;
            case 80:
            case 81:
            case 82:
                this.#setUI("Rain shower", "rain");
                break;
            case 85:
            case 86:
                this.#setUI("Snow shower", "snow");
                break;
            case 95:
                this.#setUI("Thunderstorm", "thunderstorm");
                break;
            case 96:
            case 99:
                this.#setUI("Thunderstorm with hail", "thunderstorm");
                break;
        }
    }
}

// function switchTimeClass(time) {
//     if (time >= 18 && time <= 23 || time >= 0 && time <= 6) {
//         body.classList.add("night");
//     }
// }

// function showErrors() {
//     errorMsg.classList.remove("hidden");
//     if (app.input.validity.valueMissing) {
//         errorMsg.textContent = "Write a location";
//     }
// }

// function resetErrors() {
//     errorMsg.classList.add("hidden");
//     errorMsg.textContent = "";
// }