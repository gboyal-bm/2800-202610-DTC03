/**
 * @fileoverview Entrypoint for connecting to Google Gemini AI
 * @description Handles the connecting and sending of messages to the AI
 * 
 * @module gemini
 * @author Gustavo Rodriguez
 * @version 2026
 */

require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const key = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
});

async function sendMessage(message) {
    const aiInstance = ai;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    });
    console.log(response.text);
    return response.text;
}

module.exports = {
    sendMessage,
};
