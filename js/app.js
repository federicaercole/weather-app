import Model from "./model.js";
import View from "./view.js"

function init() {
    let temperatureUnit = "celsius";

    const view = new View();
    const model = new Model();

    async function search(event) {
        event.preventDefault();
        view.setErrorMsgClass("add");
        view.nodes.weatherData.classList.add("hidden");
        if (view.nodes.input.validity.valueMissing) {
            return view.setErrorMsgClass("remove")("Write a location");
        } else {
            return await tryToGetData();
        }
    }

    view.searchResultHandler(search);

    async function tryToGetData() {
        let geographicData;
        let data;

        view.nodes.loader.classList.remove("hidden");

        try {
            geographicData = await model.getSearchResult(view.nodes.input.value);
            data = await model.getWeatherData(geographicData, temperatureUnit);
            return view.printValues(data);
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

// const app = (function () {
//
//     const unitSelection = [...document.querySelectorAll('input[type="radio"]')];
//     unitSelection.map(item => item.addEventListener("click", event => {
//         temperatureUnit = event.target.value;
//         if (temperatureUnit === "fahrenheit") {
//             const CToFDegrees = convertToFahrenheit(Number(ui.temperature.textContent.split("°")[0]));
//             ui.printTemperature(CToFDegrees, "fahrenheit");
//         } else {
//             const FToCDegrees = convertToCelsius(Number(ui.temperature.textContent.split("°")[0]));
//             ui.printTemperature(FToCDegrees, "celsius");
//         }
//     }));

//     return { unitSelection, temperatureUnit, input, getWeatherData };
// })();

// const convertToCelsius = function (degree) {
//     let conversion = ((degree - 32) * (5 / 9));
//     return parseFloat(conversion.toFixed(1));
// };

// const convertToFahrenheit = function (degree) {
//     let conversion = (degree * (9 / 5) + 32);
//     return parseFloat(conversion.toFixed(1));
// };

// app.unitSelection[0].checked = true;