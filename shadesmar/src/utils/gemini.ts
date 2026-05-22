/**
 * @fileoverview Utilities for interacting with the Gemini API
 * @module utils/gemini
 *
 * @description Provides functions to interact with the Gemini API, abstracting the process
 *              of fetching data and automatic redirects.
 * @exports sendMessage
 * @exports recommendActivities
 */

/**
 * @function sendMessage
 * @description Sends a message to the Gemini API and returns the generated response.
 *
 * @param {string} message - The message to send to the Gemini API for generating a response
 * @returns {Promise<string>} The generated response from the Gemini API
 */
export async function sendMessage(message: string) {
    const response = await fetch("/api/ai/generateMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            info: message,
        }),
    });

    const data = await response.json();
    return data.response;
}

/**
 * @function recommendActivities
 * @description Sends user info to the Gemini API and returns a recommended activity based on that info.
 * 
 * @param {string} info - The user info to send to the Gemini API
 * @returns {Promise<string>} The recommended activity from the Gemini API
 */
export async function recommendActivities(info: string) {
    const response = await fetch("/api/ai/generateMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            info: `
                You are a chatbot in our app, and your job is to recommend activities to the user. Here is a description:
                '''
                Our team is developing a web application called Shadesmar aimed towards residents of Vancouver that locates activities, community centres, and parks to encourage exploring the city while staying cool, using a gamified progression system to make it fun. 
                '''

                Using the info below, recommend an activity for this user. Here is the info:
                '''
                ${info}
                '''
                If that info is not useful, find out what the weather and temperature is like in Vancouver, and recommend some activity based on that.

                Don't break character, and don't give a long answer. Please keep it concise, one or two sentences maximum.
            `,
        }),
    });

    const data = await response.json();
    return data.response;
}
