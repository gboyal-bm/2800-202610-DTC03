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
