from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from notion_client import Client
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)  # Allows Chrome extension to reach the server

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
notion = Client(auth=os.getenv("NOTION_API_KEY"))
MODEL = "gemini-2.0-flash"

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    text = data.get("text", "")
    title = data.get("title", "Untitled")

    prompt = f"""Summarize the following webpage content in 3-5 concise bullet points.
Focus on key insights, main arguments, and important facts.

Page Title: {title}
Content:
{text}

Return a clean, readable summary."""

    response = client.models.generate_content(model=MODEL, contents=prompt)
    return jsonify({"summary": response.text})

@app.route("/export-notion", methods=["POST"])
def export_notion():
    data = request.json
    summary = data.get("summary", "")
    title = data.get("title", "Untitled")
    url = data.get("url", "")

    notion.pages.create(
        parent={"database_id": os.getenv("NOTION_DATABASE_ID")},
        properties={
            "Name": {"title": [{"text": {"content": title}}]},
            "URL": {"url": url},
        },
        children=[{
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [{"type": "text", "text": {"content": summary}}]
            }
        }]
    )
    return jsonify({"message": "✅ Exported to Notion successfully!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)