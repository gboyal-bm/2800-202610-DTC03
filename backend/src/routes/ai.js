/**
 * @fileoverview Routes for AI-related functionality
 * @module routes/ai
 *
 * @description Defines routes for AI-related functionality, such as generating responses based on user input.
 */

const express = require("express");
const router = express.Router();

const { sendMessage } = require("../services/gemini");

/**
 * @function generateMessage
 * @description Generates a response based on user input using the Gemini API.
 */
router.post("/generateMessage", async (req, res) => {
    try {
        const { info } = req.body;
        const result = await sendMessage(info);

        res.json({
            response: result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate response",
        });
    }
});

module.exports = router;
