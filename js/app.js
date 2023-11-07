import Model from "./model.js";
import View from "./view.js"

function init() {
    let temperatureUnit = "celsius";

    const view = new View();
    const model = new Model();

    view.searchResultHandler(search);
    view.unitSelectionHandler(toggleUnit);

    function search(event) {
        event.preventDefault();
        return dataValidation();
    }

    function toggleUnit(event) {
        temperatureUnit = event.target.value;
        return dataValidation();
    }

    function dataValidation() {
        view.setErrorMsgClass("add");
        view.nodes.weatherData.innerHTML = "";
        if (view.nodes.input.validity.valueMissing) {
            return view.setErrorMsgClass("remove")("Write a location");
        } else {
            return tryToGetData();
        }
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