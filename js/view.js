
export default class View {

    nodes = {}

    constructor() {
        this.nodes.body = this.#$("body");
        this.nodes.temperature = this.#$(".temperature");
        this.nodes.weather = this.#$(".weather");
        this.nodes.weatherData = this.#$(".weather-data");
        this.nodes.errorMsg = this.#$(".error");
        this.nodes.loader = this.#$(".loader");
        this.nodes.input = this.#$('input[type="text"]');
        this.nodes.form = this.#$("form");
        this.nodes.unitSelection = [...this.#$$('input[type="radio"]')];
    }

    #$ = document.querySelector.bind(document);
    #$$ = document.querySelectorAll.bind(document);
    #createElement = document.createElement.bind(document);

    printValues(object) {
        const { currentTemperature, temperatureUnit, weatherCode, time, locationName, country } = object;
        const title = this.#$("h2");
        const span = this.#createElement("span");
        title.textContent = `${locationName} - `;
        span.textContent = country;
        title.appendChild(span);
        this.printTemperature(currentTemperature, temperatureUnit);
        this.#changeWeatherClass(weatherCode, time);
        this.nodes.weatherData.classList.remove("hidden");
    }

    printTemperature(degree, temperatureUnit) {
        const span = this.#createElement("span");
        this.nodes.temperature.textContent = `${degree}°`;
        span.textContent = temperatureUnit === "celsius" ? "C" : "F";
        this.nodes.temperature.appendChild(span);
    }

    searchResultHandler(handler) {
        return this.nodes.form.addEventListener("submit", handler);
    }

    unitSelectionHandler(handler) {
        return this.nodes.unitSelection.map(item => item.addEventListener("click", handler));
    }

    setErrorMsgClass(action) {
        this.nodes.errorMsg.classList[action]("hidden");

        const setErrorMsgText = (error) => {
            this.nodes.errorMsg.textContent = error;
        };

        return setErrorMsgText;
    }

    #setUI(text, ...classes) {
        this.nodes.weather.textContent = text;
        this.nodes.body.setAttribute("class", "");
        classes.map(item => this.nodes.body.classList.add(item));
    }

    #changeWeatherClass(weatherCode, time) {
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
        if (time >= 18 && time <= 23 || time >= 0 && time <= 6) {
            this.nodes.body.classList.add("night");
        }
    }
}