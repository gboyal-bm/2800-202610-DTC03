/**
 * @fileoverview Service for interacting with Google Gemini AI
 * @module services/gemini
 *
 * @description Provides functions for sending messages to the Google Gemini AI and receiving responses.
 */

const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const key = process.env.GEMINI_API_KEY;

let ai = null;

/**
 * @function getAI
 *
 * @description Initializes and returns the GoogleGenAI singleton object.
 * @returns {GoogleGenAI} The AI singleton object
 */
async function getAI() {
    if (!ai) {
        try {
            ai = new GoogleGenAI({
                apiKey: key,
            });
        } catch (error) {
            console.error("Failed to initialize GoogleGenAI:", error);
        }
    }

    return ai;
}

/**
 * @function sendMessage
 *
 * @description Sends a message to the Gemini AI and returns the response.
 * @param {string} message - The message to send to the Gemini AI
 * @returns {string} The response from the Gemini AI
 */
async function sendMessage(message) {
    const aiInstance = await getAI();
    if (process.env.NODE_ENV === "development") {
        console.log("Gemini AI instance initialized:", aiInstance);
    }

    const response = await aiInstance.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    });
    if (process.env.NODE_ENV === "development") {
        console.log("Gemini AI response:", response.text);
    }
    return response.text;
}

module.exports = {
    sendMessage,
};
