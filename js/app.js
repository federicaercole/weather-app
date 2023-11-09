import Model from "./model.js";
import View from "./view.js"

function init() {
    let temperatureUnit = "celsius";
    let currentLocation;
    let typingTimer;

    const view = new View();
    const model = new Model();

    view.unitSelectionHandler(toggleUnit);
    view.inputHandler(handleInput);

    function handleInput() {
        clearTimeout(typingTimer);
        if (view.nodes.input.validity.valueMissing) {
            view.nodes.locations.innerHTML = "";
            view.toggleSuggestionBox(false);
        } else {
            typingTimer = setTimeout(APICall, 500);
        }
    }

    async function APICall() {
        const searchData = await model.getSearchResults(view.nodes.input.value);
        const results = searchData.results;

        if (results) {
            view.toggleSuggestionBox(true);
            const liElements = results.map((result) => {
                const li = view.createResultOption(result, results);
                li.addEventListener("mousedown", () => {
                    view.nodes.input.value = result.name;
                    currentLocation = result;
                    dataValidation();
                });
                return li;
            });
            view.nodes.locations.innerHTML = "";
            view.nodes.locations.append(...liElements);
        }
    }

    function toggleUnit(event) {
        temperatureUnit = event.target.value;
        return dataValidation();
    }

    function dataValidation() {
        view.resetUI();
        if (!currentLocation) {
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
            geographicData = model.getGeographicData(currentLocation);
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