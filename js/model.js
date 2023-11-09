export default class Model {

    async getSearchResults(location) {
        return await this.#fetchData(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
    }

    getGeographicData(item) {
        const geographicData = {
            latitude: item.latitude,
            longitude: item.longitude,
            locationName: item.name,
            country: item.country,
        }
        return geographicData;
    }

    async getWeatherData(object, temperatureUnit) {
        const data = await this.#fetchData(`https://api.open-meteo.com/v1/forecast?latitude=${object.latitude}&longitude=${object.longitude}&current=temperature_2m,is_day,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${temperatureUnit}`);
        const weatherData = {
            currentWeather: {
                currentTemperature: data.current.temperature_2m,
                weatherCode: data.current.weather_code,
                isDay: data.current.is_day,
            },
            dailyWeather: {
                day: [...data.daily.time],
                weatherCode: [...data.daily.weather_code],
                minTemperature: [...data.daily.temperature_2m_min],
                maxTemperature: [...data.daily.temperature_2m_max],
            },
            locationName: object.locationName,
            country: object.country,
            temperatureUnit: data.current_units.temperature_2m,
        }
        return weatherData;
    }

    async #fetchData(url) {
        const response = await fetch(url, { mode: 'cors' });
        return await response.json();
    }
}