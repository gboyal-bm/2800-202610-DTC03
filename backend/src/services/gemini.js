require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const key = process.env.GEMINI_API_KEY;
let ai = null;

async function getAI() {
    if (!ai) {
        const { GoogleGenAI } = await import("@google/genai");

        ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_KEY,
        });
    }

    return ai;
}

async function sendMessage(message) {
    const aiInstance = await getAI();
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
