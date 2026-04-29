from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from groq import Groq
from dotenv import load_dotenv
from datetime import datetime
import json
import re

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# -----------------------------
# Models
# -----------------------------

class Message(BaseModel):
    text: str


class Interaction(BaseModel):
    hcp_name: str | None = None
    interaction_type: str | None = None
    date: str | None = None
    time: str | None = None
    attendees: str | None = None
    topics: str | None = None
    sentiment: str | None = None
    outcomes: str | None = None
    follow_up: str | None = None


# -----------------------------
# Temporary storage for interactions
# -----------------------------

interactions = []


# -----------------------------
# AI Extraction Endpoint
# -----------------------------

@app.post("/log-interaction")
def log_interaction(msg: Message):

    today = datetime.now().strftime("%Y-%m-%d")

    prompt = f"""
Extract CRM interaction details from the message.

Return ONLY JSON.

Fields:
hcp_name
interaction_type
date
time
attendees
topics
sentiment
outcomes
follow_up

Rules:
If message says "today", use date {today}.
Detect interaction type like meeting, call, visit.
If sentiment missing return neutral.

Message:
{msg.text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    content = response.choices[0].message.content

    # Extract JSON safely
    match = re.search(r"\{.*\}", content, re.DOTALL)

    if match:
        try:
            data = json.loads(match.group())
        except:
            data = {}
    else:
        data = {}

    # Fix lists → strings
    topics = data.get("topics", "")
    if isinstance(topics, list):
        topics = ", ".join(topics)

    attendees = data.get("attendees", "")
    if isinstance(attendees, list):
        attendees = ", ".join(attendees)

    outcomes = data.get("outcomes", "")
    if isinstance(outcomes, list):
        outcomes = ", ".join(outcomes)

    follow_up = data.get("follow_up", "")
    if isinstance(follow_up, list):
        follow_up = ", ".join(follow_up)

    return {
        "hcp_name": data.get("hcp_name", ""),
        "interaction_type": data.get("interaction_type", ""),
        "date": data.get("date", ""),
        "time": data.get("time", ""),
        "attendees": attendees,
        "topics": topics,
        "sentiment": data.get("sentiment", "neutral"),
        "outcomes": outcomes,
        "follow_up": follow_up
    }


# -----------------------------
# Save Interaction
# -----------------------------

@app.post("/save-interaction")
def save_interaction(interaction: Interaction):

    interactions.append(interaction)

    print("Saved Interaction:", interaction)

    return {
        "message": "Interaction saved successfully"
    }


# -----------------------------
# Get All Saved Interactions
# -----------------------------

@app.get("/interactions")
def get_interactions():
    return interactions