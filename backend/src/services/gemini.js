const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const key = process.env.GEMINI_API_KEY;
let ai = null;

async function getAI() {
    if (!ai) {
        ai = new GoogleGenAI({
            apiKey: key,
        });
    }

    return ai;
}

async function sendMessage(message) {
    const aiInstance = await getAI();
    console.log(aiInstance);

    const response = await aiInstance.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    });
    console.log(response.text);
    return response.text;
}

module.exports = {
    sendMessage,
};
