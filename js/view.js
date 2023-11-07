
export default class View {

    nodes = {}

    constructor() {
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

    printWeather(object) {
        const { dailyWeather: { day }, locationName, country } = object;
        day.map((item, index) => this.#createDailyItem(object, index));
        this.#printCurrentWeatherValues(object);
        this.#printLocationName(locationName, country);
    }

    #printLocationName(locationName, country) {
        const title = this.#createElement("h2");
        const span = this.#createElement("span");
        title.textContent = `${locationName} - `;
        span.textContent = country;
        title.appendChild(span);
        return this.nodes.weatherData.prepend(title);
    }

    #printCurrentWeatherValues(object) {
        const { currentWeather: { currentTemperature, weatherCode, isDay }, temperatureUnit } = object;
        const todayForecastNode = this.#$("article");
        const weatherDataNode = todayForecastNode.querySelector(".data>div");
        const p = this.#createElement("p");
        p.classList.add("temperature");
        p.textContent = `${currentTemperature}${temperatureUnit}`;
        weatherDataNode.prepend(p);
        this.#changeWeatherClass(todayForecastNode, weatherCode, isDay);
    }

    #createDailyItem(object, index) {
        const { dailyWeather: { weatherCode, day, minTemperature, maxTemperature }, temperatureUnit } = object;
        const date = new Date(day[index]).toLocaleDateString(window.navigator.language, {
            weekday: "short",
            day: "numeric",
            month: "numeric"
        });
        const card = `<article>
        <p class="day">${date}</p>
        <div class="data">
            <div>
                <p class="weather"></p>
            </div>
        </div>
        <div class="minmax">
            <p class="temperature">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12.75 16.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V6.5a.75.75 0 0 1 1.5 0v9.69Z" aria-hidden="true" focusable="false"/></svg>
            Min: ${minTemperature[index]}${temperatureUnit}</p>
            <p class="temperature">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.53 10.53a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06l-2.72-2.72v9.69a.75.75 0 0 1-1.5 0V7.81l-2.72 2.72Z" aria-hidden="true" focusable="false"/></svg>
            Max: ${maxTemperature[index]}${temperatureUnit}</p>
        </div>
    </article>`;
        this.nodes.weatherData.innerHTML += card;
        const cardNode = this.#$(`.weather-data>article:nth-child(${index + 1})`);
        return this.#changeWeatherClass(cardNode, weatherCode[index]);
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

    #setUI(node) {
        const weatherDesc = node.querySelector(".data .weather");
        node.setAttribute("class", "");
        return function setTextandClasses(text, ...classes) {
            weatherDesc.textContent = text;
            classes.map(item => node.classList.add(item));
        }
    }

    #changeWeatherClass(node, weatherCode, isDay) {
        const setNodeUI = this.#setUI(node);
        switch (weatherCode) {
            case 0:
                setNodeUI("Clear sky", "clear");
                break;
            case 1:
                setNodeUI("Mainly clear", "clear");
                break;
            case 2:
            case 3:
                setNodeUI("Cloudy", "cloudy");
                break;
            case 45:
            case 48:
                setNodeUI("Fog", "fog", "dark-text");
                break;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
                setNodeUI("Drizzle", "light-rain");
                break;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                setNodeUI("Rain", "rain");
                break;
            case 71:
            case 73:
            case 75:
                setNodeUI("Snow fall", "snow", "dark-text");
                break;
            case 77:
                setNodeUI("Snow grains", "snow", "dark-text");
                break;
            case 80:
            case 81:
            case 82:
                setNodeUI("Rain shower", "rain");
                break;
            case 85:
            case 86:
                setNodeUI("Snow shower", "snow", "dark-text");
                break;
            case 95:
                setNodeUI("Thunderstorm", "thunderstorm");
                break;
            case 96:
            case 99:
                setNodeUI("Thunderstorm with hail", "thunderstorm");
                break;
        }
        if (isDay === 0) {
            node.classList.add("night");
        }
    }
}