import { useState } from "react";
import { recommendActivities, sendMessage } from "../utils/gemini";

export function AITest() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    async function submitMessage() {
        const result = await sendMessage(input);
        setResponse(result ?? "No response");
    }

    async function submitInfo() {
        const result = await recommendActivities(input);
        setResponse(result ?? "No response");
    }

    return (
        <main className="h-[80vh] max-w-5xl mx-auto mt-12">
            <div className="flex justify-center">
                <h1 className="text-4xl font-bold">AI Test</h1>
            </div>

            <div className="flex flex-col items-center gap-4 p-8">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type prompt..."
                    className="p-4 border-2 rounded-lg w-full"
                />
                <div className="flex flex-row gap-4">
                    <button
                        onClick={submitMessage}
                        className="bg-slate-200 text-lg p-2 border rounded-md"
                    >
                        Send Message
                    </button>
                    <button
                        onClick={submitInfo}
                        className="bg-slate-200 text-lg p-2 border rounded-md"
                    >
                        Recommend Activity
                    </button>
                </div>
            </div>

            <div className="bg-blue-300 p-8 rounded-lg m-8">{response}</div>
        </main>
    );
}
