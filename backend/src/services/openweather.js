/**
 * @fileoverview Entrypoint for connecting to the Openweather API
 * @description Handles retrieving info on a location
 * 
 * @module openweather
 * @author Gustavo Rodriguez
 * @version 2026
 */

require("dotenv").config();

/**
 * @fileoverview Functions for interacting with the weather API
 * @module openweather
 *
 * @description Provides functions to interact with the OpenWeather API to get
 *              weather and heat data.
 * @exports getCurrent
 * @exports getCurrentTempInCelsius
 *
 * @author Gustavo Rodriguez
 */

// https://api.openweathermap.org/data/2.5/weather?units=metric&lat={lat}&lon={lon}&appid={API key}

const API_KEY = process.env.OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

/**
 * Returns a JSON with {@link https://openweathermap.org/api/current?collection=current_forecast#cade2a7e39b5b8 current weather information} from the latitude and longitude
 *
 * @param {number} lat The latitude coordinate
 * @param {number} lon The longitude coordinate
 * @returns {json} A JSON with the {@link https://openweathermap.org/api/current?collection=current_forecast#cade2a7e39b5b8 current weather information}
 */
async function getCurrent(lat, lon) {
    const response = await fetch(
        `${BASE_URL}&lat=${lat}&lon=&${lon}&appid=${API_KEY}`
    );
    if (!response.ok) {
        throw new Error("Weather Network Response Was Not Ok");
    }

    return await response.json();
}

module.exports = {
    getCurrent
}
