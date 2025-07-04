const API_URL = "http://localhost:5001/chat";

// Send message to backend and get response from GPT
export default async function sendMessageToGPT(messageHistory) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ messages: messageHistory })
        });

        const data = await res.json();
        return data.response || "Something went wrong.";
    } catch (err) {
        console.error(err);
        return "Error connecting to GPT.";
    }
}
