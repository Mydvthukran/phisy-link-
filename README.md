# PhishGuard AI — Multimodal Phishing & Scam Detector

> **AI-powered cybersecurity platform that analyzes suspicious URLs, messages, QR codes, and screenshots to detect phishing/scams and explain why the content is risky.**

## Project Overview

PhishGuard AI is a cybersecurity-focused web platform and lightweight browser extension designed to help users identify phishing links, scam messages, suspicious QR codes, and fraudulent screenshots.

Instead of relying on a single blacklist or a single AI model, the system uses a **hybrid multimodal approach**:

- **URL analysis** for suspicious domain and URL patterns
- **LLM-based text analysis** using a local Ollama model
- **OCR and QR analysis** for screenshots and QR codes
- **Rule-based security heuristics**
- **Risk fusion engine** to produce one explainable risk score
- **Actionable recommendations** instead of silently blocking the user

The project is intentionally designed as a **hackathon MVP**. No custom model training is required for the core system.

---

# 1. Team Ownership & Responsibility

| Role / Module | Owner | Support | How the Owner Executes the Work Efficiently |
|---|---|---|---|
| **Team Lead, Security Logic & Fullstack(mostly frontend)** | **Manish** | Kamran | Define the architecture and API contract first. Build the main React dashboard and URL-analysis workflow. Own the security heuristics, risk-level design, final integration, code reviews, and demo readiness. Keep the system simple and prevent scope creep. |
| **AI/LLM + Fullstack(mostly Backend)** | **Kushagra** | Nishith | Build the FastAPI service and connect it to Ollama. Create a structured prompt that forces the LLM to return classification, confidence, indicators, and recommendation in JSON. Keep AI calls directly to Ollama through backend services so the frontend never talks directly to Ollama. |
| **Computer Vision, OCR & QR** | **Nishith** | Rohit | Build one reusable image-analysis pipeline: image upload → QR detection → URL extraction → OCR → extracted text/URLs → backend analysis. Handle unsupported images and failed OCR gracefully. Keep CV processing independent from the main risk engine. |
| **Frontend & Scan History** | **Kamran** | Manish | Build reusable React components for scanner forms, result cards, risk indicators, history, loading states, and error handling. Integrate APIs through one frontend service layer instead of placing fetch calls everywhere. |
| **AI Validation & Security Visualization** | **Rohit** | Kushagra | Improve Ollama prompts, validate structured AI responses, create test examples for phishing/scam categories, and build visual analytics such as risk charts and indicator breakdowns. Compare AI output against expected results and flag inconsistent responses. |
| **Data, QA, Testing & Documentation** | **Devangna** | Manish | Prepare legitimate and suspicious test cases, organize sample data, build a test matrix, verify API responses, record false positives/false negatives, and maintain project documentation/PPT content. Do not spend the whole project only on slides; QA is an engineering responsibility. |

### Ownership Rule

Every major module has:

- **One clear owner**
- **One support person**
- **A defined interface**
- **A working integration target**

Do not allow multiple people to rewrite the same module independently.

---

# 2. File structure(close)
```text
phishguard-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── text.py
│   │   │   ├── url.py
│   │   │   ├── image.py
│   │   │   └── qr.py
│   │   ├── services/
│   │   │   ├── ollama_service.py
│   │   │   ├── url_service.py
│   │   │   ├── ocr_service.py
│   │   │   ├── qr_service.py
│   │   │   └── risk_engine.py
│   │   ├── schemas/
│   │   └── utils/
│   └── requirements.txt
│
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   └── service-worker.js
│
├── datasets/
│   ├── samples/
│   └── test-cases/
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── demo.md
│
├── README.md
└── .gitignore
```


---

# 3. Core Goal

The MVP should demonstrate this complete flow:

```text
User Input
   │
   ├── URL
   ├── Text / Message
   └── Image / QR Screenshot
             │
             ▼
        Analysis Layer
             │
      ┌──────┼─────────┐
      ▼      ▼         ▼
    URL     Ollama    OCR / QR
 Analysis   LLM       Analysis
      │      │         │
      └──────┼─────────┘
             ▼
        Risk Engine
             │
             ▼
     Risk Score + Reasons
             │
             ▼
      User Recommendation
      















