import dotenv from "dotenv";
dotenv.config();

// https://api.openweathermap.org/data/2.5/weather?units=metric&lat={lat}&lon={lon}&appid={API key}

const API_KEY: string | undefined = process.env.OPENWEATHER_KEY;
const BASE_URL: string = "https://api.openweathermap.org/data/2.5/weather?units=metric";

/**
 * Returns a JSON with {@link https://openweathermap.org/api/current?collection=current_forecast#cade2a7e39b5b8 current weather information} from the latitude and longitude
 * 
 * @param {number} lat The latitude coordinate
 * @param {number} lon The longitude coordinate
 * @returns {json} A JSON with the {@link https://openweathermap.org/api/current?collection=current_forecast#cade2a7e39b5b8 current weather information}
 */
async function getCurrent(lat: number, lon: number) {
    const response = await fetch(`${BASE_URL}&lat=${lat}&lon=&{lon}&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Weather Network Response Was Not Ok");
    }

    return await response.json();
}

/**
 * Returns the current temperature in celsius
 * 
 * @param {number} lat The latitude coordinate
 * @param {number} lon The longitude coordinate
 * @returns The current temperature in Celsius
 */
async function getCurrentTempInCelsius(lat: number, lon: number) {
    const data = await getCurrent(lat, lon);
    return data.main.temp;
}