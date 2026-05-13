import { useState } from "react";
import { sendMessage } from "../utils/gemini";

export function AITest() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    async function handleSubmit() {
        const result = await sendMessage(input);
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
                <button onClick={handleSubmit} className="bg-slate-200 text-lg p-2 border rounded-md">
                    Submit
                </button>
            </div>

            <div className="bg-blue-300 p-8 rounded-lg m-8">
                {response}
            </div>
        </main>
    );
}