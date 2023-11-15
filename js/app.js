import Model from "./model.js";
import View from "./view.js"

function init() {
    let temperatureUnit = "celsius";
    let currentLocation;
    let typingTimer;

    const view = new View();
    const model = new Model();

    view.unitSelectionHandler(toggleUnit);
    view.inputKeyHandler(handleInput);
    view.inputFocusHandler(() => {
        if (view.nodes.input.validity.valueMissing) {
            return renderLatestSearchData();
        } else {
            return view.toggleSuggestionBox(true);
        }
    });

    function handleInput(event) {
        clearTimeout(typingTimer);
        const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Escape", "Enter", "Tab", "shiftKey"];
        if (!keys.includes(event.key))
            if (view.nodes.input.validity.valueMissing) {
                return renderLatestSearchData();
            } else {
                typingTimer = setTimeout(APICall, 500);
            }
    }

    function renderLatestSearchData() {
        const records = model.createStorageRecordsArray();
        return showSuggestionBoxOptions(records);
    }

    async function APICall() {
        const searchData = await model.getSearchResults(view.nodes.input.value);
        const results = searchData.results;
        return showSuggestionBoxOptions(results);
    }

    function showSuggestionBoxOptions(data) {
        if (data) {
            const liElements = data.map((result) => {
                const li = view.renderResultOption(result, data, () => listElementHandler(result));
                return li;
            });
            view.toggleSuggestionBox(true);
            view.nodes.locations.innerHTML = "";
            view.nodes.locations.append(...liElements);
            view.locationsElements.list = liElements;
        }
    }

    function listElementHandler(result) {
        view.nodes.input.value = result.name;
        currentLocation = result;
        dataValidation();
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
            model.saveStorageData(currentLocation);
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