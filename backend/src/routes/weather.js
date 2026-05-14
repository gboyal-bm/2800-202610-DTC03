const express = require("express");
const { getCurrent } = require("../services/openweather");
const router = express.Router();

router.get("/getCurrentWeather", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const weatherData = await getCurrent(lat, lon);
        res.json(weatherData);
    } catch (error) {
        console.error("Weather Route Error:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

module.exports = router;
