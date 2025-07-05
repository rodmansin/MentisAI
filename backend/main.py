from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import openai
import os
from dotenv import load_dotenv

load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", supports_credentials=True)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    messages = data.get("messages", [])

    if not messages:
        return jsonify({ "error": "Empty conversation" }), 400

    # Send user message to OpenAI
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a kind, thoughtful, and emotionally intelligent AI therapist called MentisAI. "
                    "Your goal is to help the user reflect on their feelings and think more clearly. "
                    "Ask gentle, open-ended questions and guide the user toward clarity."
                )
            },
            *messages
        ]
    )
    
    ai_reply = response.choices[0].message.content
    #Send JSON response to frontend
    return jsonify({ "response": ai_reply })

if __name__ == "__main__":
    app.run(debug=True, port=5001)