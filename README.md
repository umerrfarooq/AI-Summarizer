# 🧠 AI Page Summarizer

A Chrome extension that summarizes any webpage using **Google Gemini AI** and lets you export summaries directly to **Notion**.

---

## ✨ Features

- 📄 **One-click summarization** — extract key insights from any webpage in seconds
- 🤖 **Powered by Gemini 2.0 Flash** — fast and accurate AI-generated bullet-point summaries
- 📝 **Export to Notion** — save summaries to your Notion database with the page title and URL
- 🔒 **Secure** — API keys stay in your local `.env` file, never committed to source control

---

## 🗂️ Project Structure

```
ai-summarizer/
├── backend/              # Flask API server
│   ├── app.py            # API routes (/summarize, /export-notion)
│   ├── requirements.txt  # Python dependencies
│   └── .env              # 🔒 API keys (not committed)
└── extension/            # Chrome Extension (Manifest V3)
    ├── manifest.json     # Extension config
    ├── popup.html        # Extension UI
    ├── popup.js          # Popup logic
    └── content.js        # Page content extractor
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Google Chrome
- A [Gemini API key](https://aistudio.google.com/app/apikey)
- A [Notion Integration](https://www.notion.so/my-integrations) + Database ID

---

### 1. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NOTION_API_KEY=your_notion_integration_secret_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

Start the server:

```bash
python app.py
```

The API will be running at `http://localhost:5000`.

---

### 2. Chrome Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `extension/` folder

The **AI Page Summarizer** icon will appear in your Chrome toolbar.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/summarize` | Summarizes webpage content using Gemini AI |
| `POST` | `/export-notion` | Exports a summary to your Notion database |

### `/summarize`
```json
// Request
{ "text": "page content...", "title": "Page Title" }

// Response
{ "summary": "• Key point 1\n• Key point 2\n..." }
```

### `/export-notion`
```json
// Request
{ "summary": "...", "title": "Page Title", "url": "https://..." }

// Response
{ "message": "✅ Exported to Notion successfully!" }
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| AI Model | Google Gemini 2.0 Flash |
| Backend | Python, Flask, Flask-CORS |
| Extension | Chrome MV3, Vanilla JS |
| Export | Notion API |
| Config | python-dotenv |

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google AI Studio API key |
| `NOTION_API_KEY` | Notion integration secret |
| `NOTION_DATABASE_ID` | Target Notion database ID |

> ⚠️ Never commit your `.env` file. It is already excluded via `.gitignore`.

---

## 📄 License

MIT License — feel free to use and modify.
