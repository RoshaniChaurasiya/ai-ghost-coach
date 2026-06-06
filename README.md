# 🏆 Ghost Coach

An AI-powered sports technique coaching assistant that analyzes physical stances to deliver structured, personalized biomechanical feedback.

Users can upload an image of their sports stance and receive high-fidelity coaching insights powered by **Google Gemini 2.5 Flash Vision**.

Built as a frontend engineering assignment using React + Vite, LESS styling, and client-side persistence (LocalStorage).

---

## 🌟 Core Features

### 1. Player Profile Context
* Saves profile information securely in `LocalStorage`.
* Tracks Full Name, Selected Sport, Position/Role, and Experience Level.
* Tailors all AI-generated suggestions specifically to the player's experience level.

### 2. AI Technique Analysis
* Accepts file uploads (JPEG/PNG, max 5MB).
* Delivers a structured coaching report containing an Overall Score (1-10), Strengths, Areas to Improve, a Priority Fix, a concrete Drill Suggestion, and the AI's Confidence Level.

### 3. Session History
* Keeps a persistent log of all past uploads and evaluation reports.
* Displays clear session cards with interactive image thumbnails, historical dates, and scores.

### 4. Context-Aware AI Chat
* Interactive chat box allowing players to ask follow-up questions.
* Maintains full context memory of the player profile and the specific session feedback.

### 5. Progress Tracking Chart (Bonus Feature)
* Uses `Recharts` to visualize evaluation scores across consecutive coaching sessions.
* Fully dynamic theme tokens ensuring perfect tracking visibility in both Light and Dark modes.

---

## 🎯 Prompt Engineering & Edge Cases

* **Dynamic Tailoring:** System prompts map the active user traits (`user.sport`, `user.level`) directly into the LLM context to ensure relevant feedback generation.
* **Format Control:** Forces the Gemini engine to output strictly structured JSON text to guarantee clean app UI rendering.
* **Image Guardrails:** Explicitly detects sport mismatches (e.g., uploading a cricket stance while a badminton profile is selected), prompts the user to submit a relevant photo, and safely resets metrics to avoid crash failures.

---

## ⚙️ Quick Start Installation

Set up your local development environment in under 5 minutes:

### 1. Clone & Navigate
```bash
git clone <your-repository-url>
cd ghost-coach