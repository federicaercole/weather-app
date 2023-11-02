import Model from "./model.js";
import View from "./view.js"

function init() {
    let temperatureUnit = "celsius";

    const view = new View();
    const model = new Model();

}

init();

// const app = (function () {
//
//     async function getSearchResult(location) {
//         ui.loader.classList.remove("hidden");
//         try {
//             const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`, { mode: 'cors' });
//             const jsonData = await response.json();
//             const latitude = jsonData.results[0].latitude;
//             const longitude = jsonData.results[0].longitude;
//             const locationName = jsonData.results[0].name;
//             const country = jsonData.results[0].country;
//             getWeatherData(latitude, longitude, locationName, country);
//         } catch {
//             ui.showErrors();
//             ui.errorMsg.textContent = "The location doesn't exist or you typed it wrong. Retry";
//         } finally {
//             ui.loader.classList.add("hidden");
//         }
//     }

//     async function getWeatherData(latitude, longitude, locationName, country) {
//         ui.loader.classList.remove("hidden");
//         try {
//             const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`, { mode: 'cors' });
//             const jsonData = await response.json();
//             const currentTemperature = jsonData.current_weather.temperature;
//             const weatherCode = jsonData.current_weather.weathercode;
//             const time = Number(jsonData.current_weather.time.split('T')[1].split(":")[0]);
//             ui.printValues(currentTemperature, temperatureUnit, weatherCode, time, locationName, country);
//         }
//         catch {
//             ui.showErrors();
//             ui.errorMsg.textContent = "Weather is not available!"
//         } finally {
//             ui.loader.classList.add("hidden");
//         }
//     }

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

//     const input = document.querySelector('input[type="text"]');

//     input.addEventListener("keydown", event => {
//         if (event.key === "Enter") {
//             search(event);
//         }
//     })

//     const button = document.querySelector("button");
//     button.addEventListener("click", (event) => {
//         search(event);
//     });

//     function search(event) {
//         ui.resetErrors();
//         ui.weatherData.classList.add("hidden");
//         if (input.validity.valueMissing) {
//             ui.showErrors();
//             event.preventDefault();
//         } else {
//             getSearchResult(input.value);
//             input.value = "";
//         }
//     }

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