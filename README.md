# FAI AVENIQ — Backend API Service

A dedicated, production-ready Express + TypeScript backend service for the FAI AVENIQ Educational AI Platform.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (or configure your keys):
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
ENABLE_WEB_RESEARCH=true
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build & Run Production Server
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### Health & Diagnostic
- `GET /health` — Service health check
- `GET /api/ai/health` — AI Engine & Gemini status

### AI Learning & Workspace
- `POST /api/ai/chat` — Core AI chat with multimodal attachment & knowledge library grounding
- `POST /api/ai/teacher` — Lesson planning, quiz generator, homework generator, pedagogy guides
- `POST /api/ai/student` — Step-by-step explainer, Socratic tutor, weakness diagnostic
- `POST /api/ai/research` — Academic literature research dossier generator
- `POST /api/ai/exam-prep` — Examination board mock papers, high-yield MCQ drills, numericals
- `POST /api/ai/title` — Conversation auto-title generator
- `POST /api/ai/parse-document` — PDF and document text extraction

### Knowledge Library Storage
- `GET /api/library?userId=...` — Retrieve saved library study documents
- `POST /api/library` — Save or update study documents permanently to disk
- `DELETE /api/library/:id?userId=...` — Delete a saved document
- `POST /api/library/search` — Semantic/keyword passage search across saved books
