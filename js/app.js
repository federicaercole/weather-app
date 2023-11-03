import Model from "./model.js";
import View from "./view.js"

function init() {
    let temperatureUnit = "celsius";

    const view = new View();
    const model = new Model();

    async function search(event) {
        event.preventDefault();
        // ui.resetErrors();
        // ui.weatherData.classList.add("hidden");
        if (view.nodes.input.validity.valueMissing) {
            // ui.showErrors();
        } else {
            await tryToGetData();
        }
    }

    view.searchResultHandler(search);

    async function tryToGetData() {
        view.nodes.loader.classList.remove("hidden");
        try {
            const geographicData = await model.getSearchResult(view.nodes.input.value);
            const data = await model.getWeatherData(geographicData);
            view.printValues(data);
        } catch (err) {
            console.log(err)
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