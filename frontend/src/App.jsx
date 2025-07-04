import React, { useState } from "react";
import sendMessageToGPT from "./api";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        
        setInput("");

        const response = await sendMessageToGPT(updatedMessages);
        const aiMsg = { role: "assistant", content: response };
        setMessages((prev) => [...prev, aiMsg]);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>MentisAI</h2>

            <div style={{ minHeight: "300px", marginBottom: "10px" }}>
                {messages.map((msg, i) => (
                <div key={i} style={{ margin: "5px 0" }}>
                    <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
                </div>
                ))}
            </div>

            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..."
                style={{ width: "80%", padding: "8px" }}
            />

            <button onClick={sendMessage} style={{ padding: "8px 12px" }}>Send</button>
        </div>
    );
}

export default App;