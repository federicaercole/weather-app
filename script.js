const temperature = document.querySelector(".temperature");
const weather = document.querySelector(".weather");

//fahrenheit
async function getWeatherData() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=44.39&longitude=7.55&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);
        printValues(jsonData);
    } catch (error) {
        console.log("Nothing found");
    }
}

getWeatherData();

function printValues(json) {
    // const temperatureUnit =
    temperature.textContent = json.current_weather.temperature;
    const weatherCode = json.current_weather.weathercode;
    switchWeatherConditions(weatherCode);
}

function switchWeatherConditions(weatherCode) {
    switch (weatherCode) {
        case 0:
            weather.textContent = "Clear sky";
            break;
        case 1:
            weather.textContent = "Mainly clear";
            break;
        case 2:
            weather.textContent = "Partly cloudy";
            break;
        case 3:
            weather.textContent = "Overcast";
            break;
        case 45:
            weather.textContent = "Fog";
            break;
        case 48:
            weather.textContent = "Depositing rime fog";
            break;
        case 51:
            weather.textContent = "Light intensity drizzle";
            break;
        case 53:
            weather.textContent = "Moderate intensity rizzle";
            break;
        case 55:
            weather.textContent = "Dense intensity drizzle";
            break;
        case 56:
            weather.textContent = "Light intensity freezing drizzle";
            break;
        case 57:
            weather.textContent = "Dense intensity freezing drizzle";
            break;
        case 61:
            weather.textContent = "Slight intensity rain";
            break;
        case 63:
            weather.textContent = "Moderate intensity rain";
            break;
        case 65:
            weather.textContent = "Heavy intensity rain";
            break;
        case 61:
            weather.textContent = "Light intensity freezing rain";
            break;
        case 67:
            weather.textContent = "Heavy intensity freezing rain";
            break;
        case 71:
            weather.textContent = "Slight intensity snow fall";
            break;
        case 73:
            weather.textContent = "Moderate intensity snow fall";
            break;
        case 75:
            weather.textContent = "Heavy intensity snow fall";
            break;
        case 77:
            weather.textContent = "Snow grains";
            break;
        case 80:
            weather.textContent = "Slight rain shower";
            break;
        case 81:
            weather.textContent = "Moderate rain shower";
            break;
        case 82:
            weather.textContent = "Violent rain shower";
            break;
        case 85:
            weather.textContent = "Slight snow shower";
            break;
        case 86:
            weather.textContent = "Heavy snow shower";
            break;
        case 95:
            weather.textContent = "Thunderstorm";
            break;
        case 96:
            weather.textContent = "Thunderstorm with slight hail";
            break;
        case 99:
            weather.textContent = "Thunderstorm with heavy hail";
            break;
    }
}



//City
//temperature
//toggle per C o F
//weathercode (per cambiare l'immagine di sfondo)