# 🤖 AI-Powered CRM Interaction Logger

An **AI-powered CRM system** that converts natural language interaction notes into structured CRM records for healthcare representatives.
The system uses **Groq LLM (Llama-3)** with a **FastAPI backend** and **React frontend** to automatically extract details like doctor name, meeting type, topics discussed, sentiment, and follow-up actions.

---

# 📌 Overview

Healthcare sales representatives often record interactions with doctors and medical staff.
These interactions include:

* Doctor meetings
* Product discussions
* Clinical trial conversations
* Follow-up visits
* Sample distribution

Traditionally, these details are entered **manually into CRM systems**, which is time-consuming.

This project demonstrates how **AI can automate CRM data entry** by extracting structured information from natural language.

Example:

Input message:

Met Dr Raj today at 3pm with nurse Ravi and discussed diabetes medicine follow up next week.

AI automatically extracts:

| Field            | Value             |
| ---------------- | ----------------- |
| HCP Name         | Dr Raj            |
| Interaction Type | Meeting           |
| Date             | Today             |
| Time             | 3 PM              |
| Attendees        | Nurse Ravi        |
| Topics           | Diabetes medicine |
| Sentiment        | Neutral           |
| Follow-up        | Next week         |

---

# 🚀 Features

### 🧠 AI Interaction Extraction

Uses **Groq LLM** to extract CRM fields from plain English.

### 🤖 AI Assistant Chat

Users describe interactions in a chat box and AI converts them into structured CRM data.

### 🎤 Voice Interaction Logging

Users can speak interaction notes and the system converts speech to text.

### 📝 Auto Form Filling

Extracted data automatically populates the CRM form.

### 💾 Interaction Storage

Interactions can be saved and retrieved from the backend.

### 📊 Interaction History Dashboard

Saved records are displayed in a CRM-style table.

### ⚡ Fast Backend

Built using **FastAPI** for high-performance APIs.

### 🎨 Modern Frontend

React UI with a CRM-style layout.

---

# 🏗️ Architecture

```
User Input (Text / Voice)
        │
        ▼
React Frontend
(Chat Assistant UI)
        │
        ▼
FastAPI Backend
(log-interaction API)
        │
        ▼
Groq LLM (Llama-3)
Extract structured fields
        │
        ▼
Return JSON to Frontend
        │
        ▼
Auto-populate CRM Form
        │
        ▼
Save Interaction
        │
        ▼
Interaction History API
```

---

# 🛠️ Tech Stack

## Frontend

* React (Vite)
* JavaScript
* CSS
* Fetch API

## Backend

* FastAPI
* Python
* Pydantic
* Uvicorn

## AI

* Groq API
* Llama-3 model

---

# 📂 Project Structure

```
ai-crm-interaction-logger
│
├── backend
│   └── main.py
│
├── frontend
│   ├── App.jsx
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/Ravin-Raj/ai-crm-interaction-logger.git
cd ai-crm-interaction-logger
```

---

# Backend Setup

Navigate to backend folder:

```
cd backend
```

Install dependencies:

```
pip install fastapi uvicorn python-dotenv groq
```

Create environment file:

```
.env
```

Add:

```
GROQ_API_KEY=your_groq_api_key
```

Run backend server:

```
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## POST /log-interaction

Extract CRM fields using AI.

Request:

```
{
 "text": "Met Dr Raj today at 3pm and discussed diabetes medicine"
}
```

Response:

```
{
 "hcp_name": "Dr Raj",
 "interaction_type": "meeting",
 "date": "2026-04-29",
 "time": "15:00",
 "attendees": "",
 "topics": "diabetes medicine",
 "sentiment": "neutral",
 "outcomes": "",
 "follow_up": ""
}
```

---

## POST /save-interaction

Save CRM interaction.

Request:

```
{
 "hcp_name": "Dr Raj",
 "interaction_type": "meeting",
 "date": "2026-04-29",
 "time": "15:00"
}
```

---

## GET /interactions

Returns all saved interactions.

Example response:

```
[
 {
  "hcp_name": "Dr Raj",
  "interaction_type": "meeting",
  "date": "2026-04-29",
  "topics": "diabetes medicine"
 }
]
```

---

# 📷 Screenshots

Add screenshots here after uploading images.

Example sections:

### CRM Interaction Form

![CRM Form Screenshot](screenshots/form.png)

### AI Assistant Chat

![AI Chat Screenshot](screenshots/chat.png)

### Interaction History Table

![History Screenshot](screenshots/history.png)

---

# 🎯 Use Case

Pharmaceutical companies require representatives to log:

* doctor visits
* product discussions
* treatment feedback
* follow-up actions

This AI system **automates the process**, reducing manual CRM entry.

---

# 🔮 Future Improvements

Possible enhancements:

* Database integration (PostgreSQL / MongoDB)
* Authentication system
* Interaction search and filters
* Dashboard analytics
* Cloud deployment
* Export reports (CSV / PDF)

---

# 👨‍💻 Author

**Ravin Raj**

GitHub:
https://github.com/Ravin-Raj
