# 🧠 StudyMind AI — Personal Study Assistant

A full-stack AI study assistant built with **React.js** (frontend) + **Node.js/Express** (backend) + **Anthropic Claude API**.

---

## 📁 Project Structure

```
ai-study-assistant/
│
├── backend/                   ← Node.js server
│   ├── server.js              ← Main Express server (API logic)
│   ├── package.json           ← Backend dependencies
│   ├── .env.example           ← Template for your API key (copy to .env)
│   └── .env                   ← YOUR API key (never commit this!)
│
└── frontend/                  ← React app
    ├── public/
    │   └── index.html         ← HTML shell
    ├── src/
    │   ├── index.js           ← React entry point
    │   ├── index.css          ← Global styles + CSS variables
    │   ├── App.js             ← Root React component
    │   ├── api.js             ← API communication helper
    │   └── components/
    │       ├── StudyAssistant.js   ← Main chat UI component
    │       └── StudyAssistant.css  ← Chat UI styles
    └── package.json           ← Frontend dependencies
```

---

## 🚀 Setup Instructions (Step by Step)

### Prerequisites
Make sure you have these installed:
- **Node.js** (v16 or higher) — https://nodejs.org
- **npm** (comes with Node.js)
- An **Anthropic API key** — https://console.anthropic.com

---

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Navigate to **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)
5. Keep it safe — you'll use it in Step 3

---

### Step 2: Install Backend Dependencies

Open a terminal in the project folder:

```bash
# Navigate to backend folder
cd ai-study-assistant/backend

# Install all required packages
npm install
```

This installs:
- `express` — Web server framework
- `cors` — Allows React to call our server
- `dotenv` — Loads secrets from .env file
- `@anthropic-ai/sdk` — Official Claude AI client
- `nodemon` — Auto-restarts server when you save changes

---

### Step 3: Configure Your API Key

```bash
# In the backend folder, copy the example env file
cp .env.example .env
```

Now open `.env` in any text editor and replace the placeholder:

```
ANTHROPIC_API_KEY=sk-ant-YOUR_ACTUAL_KEY_HERE
PORT=5000
```

⚠️ **IMPORTANT**: Never commit the `.env` file to GitHub!
   Add it to your `.gitignore` file.

---

### Step 4: Install Frontend Dependencies

Open a **new terminal** (keep the first one for the backend):

```bash
# Navigate to frontend folder
cd ai-study-assistant/frontend

# Install React and all required packages
npm install
```

This installs:
- `react` + `react-dom` — Core React library
- `react-scripts` — Build tools (Create React App)
- `react-markdown` — Renders AI responses as formatted text
- `remark-gfm` — GitHub-flavored markdown support

---

### Step 5: Start the Backend Server

In your **backend terminal**:

```bash
# Start with auto-reload (development)
npm run dev

# OR start normally (production)
npm start
```

You should see:
```
🚀 ====================================
   AI Study Assistant Backend
   Running on http://localhost:5000
======================================
✅ Anthropic API key loaded successfully
```

---

### Step 6: Start the React Frontend

In your **frontend terminal**:

```bash
npm start
```

React will automatically open http://localhost:3000 in your browser.

---

### ✅ It's Running!

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Test**: http://localhost:5000/ (should show status message)

---

## 🎯 Features

| Feature | How to Use |
|---------|------------|
| **Study Questions** | Type any question about any subject |
| **Generate MCQs** | "Generate 5 MCQs about photosynthesis" |
| **Explain Code** | Paste code + "Explain this code" |
| **Summarize Notes** | Paste notes + "Summarize these notes" |
| **Chat History** | Conversation is remembered during the session |

---

## 🔧 How It Works (For Learning)

```
User types question in React
        ↓
React sends POST request to /ask
        ↓
Express server receives request
        ↓
Server calls Anthropic Claude API
        ↓
Claude generates a response
        ↓
Server sends response back to React
        ↓
React displays formatted response
```

---

## 🐛 Troubleshooting

**"Cannot connect to backend"**
→ Make sure the backend is running on port 5000
→ Check that `"proxy": "http://localhost:5000"` is in frontend/package.json

**"Invalid API key"**
→ Double-check your API key in backend/.env
→ Make sure there are no extra spaces

**"Module not found"**
→ Run `npm install` again in the folder with the error

**Port 5000 in use**
→ Change PORT=5001 in your .env file

---

## 📚 Learning Resources

- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- Anthropic Docs: https://docs.anthropic.com
- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
