import dotenv from "dotenv";
dotenv.config();

// https://api.openweathermap.org/data/2.5/weather?units=metric&lat={lat}&lon={lon}&appid={API key}

const API_KEY: string | undefined = process.env.OPENWEATHER_KEY;
const BASE_URL: string = "https://api.openweathermap.org/data/2.5/weather?units=metric";
