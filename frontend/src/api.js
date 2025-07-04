const API_URL = "http://localhost:5001/chat";

// Send message to backend and get response from GPT
export default async function sendMessageToGPT(message) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        return data.response || "Something went wrong.";
    } catch (err) {
        console.error(err);
        return "Error connecting to GPT.";
    }
}
