import { useEffect, useState } from "react";
import { recommendActivities } from "../utils/gemini";
import { ShadesmarApi } from "../utils/shadesmar_api";

export function RecommendationChatbox() {
    const [suggestion, setSuggestion] = useState<string>("Thinking...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAutoPrompt = async () => {
            try {
                const result = await recommendActivities(
                    JSON.stringify(ShadesmarApi.apiFetch("/activites"))
                );
                setSuggestion(result);
            } catch (error) {
                console.log(error);
                setSuggestion(
                    "I couldn't think of anything right now. Try again later!"
                );
            } finally {
                setLoading(false);
            }
        };
        getAutoPrompt();
    }, []);

    return (
        <aside>
            {loading ? (
                <p className="animate-pulse">Loading...</p>
            ) : (
                <p>{suggestion}</p>
            )}
        </aside>
    );
}
