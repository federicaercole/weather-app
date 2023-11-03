export default class Model {

    async getSearchResult(location) {
        const data = await this.#fetchData(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
        const geographicData = {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            locationName: data.results[0].name,
            country: data.results[0].country,
        }
        return geographicData;
    }

    async getWeatherData(object) {
        const data = await this.#fetchData(`https://api.open-meteo.com/v1/forecast?latitude=${object.latitude}&longitude=${object.longitude}&current_weather=true&timezone=auto`);
        const weatherData = {
            currentTemperature: data.current_weather.temperature,
            weatherCode: data.current_weather.weathercode,
            time: Number(data.current_weather.time.split('T')[1].split(":")[0]),
            locationName: object.locationName,
            country: object.country,
        }
        return weatherData;
    }

    async #fetchData(url) {
        const response = await fetch(url, { mode: 'cors' });
        return await response.json();
    }
}