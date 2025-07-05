import React, { useState, useEffect, useRef } from "react";
import sendMessageToGPT from "./api";
import logo from "./images/mentisAILogo.png";

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
        <div style={{ 
            fontFamily: "Sogoe UI, sans-serif",
            display: "flex",
            flexDirection: "column",
            height: "97vh",
            maxWidth: "600px",
            margin: "auto",
            padding: "10px",
            boxSizing: "border-box"
        }}>
            <img
                src = {logo}
                alt = "MentisAILogo"
                style = {{ width: "150px", margin: "0 auto", display: "block" }}
            />

            {/* Message history box */}
            <div style={{ 
                flexGrow: 1,
                overflowY: "auto",
                padding: "10px",
                marginBottom: "10px"
            }}>
                {messages.map((msg, i) => (
                <div 
                    key = {i} 
                    style = {{ 
                        display: "flex",
                        justifyContent: msg.role === "user"? "flex-end" : "flex-start",
                        margin: "8px 0" 
                    }}
                >
                    <div style={{
                        backgroundColor: msg.role === "user"? "#B2E5FF" : "#F2F2F2",
                        padding: "10px 14px",
                        borderRadius: "16px",
                        maxWidth: "70%",
                        wordWrap: "break-word",
                    }}>
                        {msg.content}
                    </div>
                </div>
                ))}
            </div>

            {/* Input text box and send button */}
            <div style={{ 
                display: "flex",
                justifyContent: "center",
                gap: "10px"
            }}>
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{ width: "90%", padding: "10px", border: "2px solid #B2E5FF", borderRadius: "8px", outline: "none" }}
                />
                <button 
                    onClick={sendMessage} 
                    style={{ 
                        padding: "8px 12px",
                        borderRadius: "5px",
                        background: "#B2E5FF",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;