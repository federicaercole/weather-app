import Model from "./model.js";
import View from "./view.js"

function init() {
    let temperatureUnit = "celsius";

    const view = new View();
    const model = new Model();

    view.searchResultHandler(search);
    view.unitSelectionHandler(toggleUnit);

    async function search(event) {
        event.preventDefault();
        view.setErrorMsgClass("add");
        view.nodes.weatherData.innerHTML = "";
        if (view.nodes.input.validity.valueMissing) {
            return view.setErrorMsgClass("remove")("Write a location");
        } else {
            return await tryToGetData();
        }
    }

    function toggleUnit(event) {
        temperatureUnit = event.target.value;
        const degrees = Number(view.nodes.temperature.textContent.split("°")[0]);
        const unitConversion = convertUnit(degrees);
        return view.printTemperature(unitConversion, temperatureUnit);
    }

    function convertUnit(degrees) {
        const conversion = temperatureUnit === "celsius" ? ((degrees - 32) * (5 / 9)) : (degrees * (9 / 5) + 32);
        return parseFloat(conversion.toFixed(1));
    }

    async function tryToGetData() {
        let geographicData;
        let data;

        view.nodes.loader.classList.remove("hidden");

        try {
            geographicData = await model.getSearchResult(view.nodes.input.value);
            data = await model.getWeatherData(geographicData, temperatureUnit);
            return view.printWeather(data);
        } catch {
            const error = view.setErrorMsgClass("remove");
            if (!geographicData) {
                return error("The location doesn't exist or you typed it wrong. Retry");
            } else {
                return error("Weather is not available!");
            }
        } finally {
            view.nodes.loader.classList.add("hidden");
        }
    }
}

init();