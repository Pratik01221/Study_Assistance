# AI Study Assistant

A modern, ChatGPT-inspired AI study assistant built with React and Node.js. This application helps students with explanations, MCQs, code walkthroughs, and note summaries using Groq's AI models.

## ✨ Features

- 🤖 AI-powered study assistance
- 📝 Multiple choice question generation
- 💻 Code explanation and walkthroughs
- 📄 Note summarization
- 🌙 Dark/Light mode toggle
- 📱 Responsive design
- 🎨 Modern ChatGPT-inspired UI
- ⚡ Real-time chat interface

## 🏗️ Project Structure

### Backend (`/backend`)
```
backend/
├── config/
│   └── index.js              # Configuration and environment variables
├── controllers/
│   └── chatController.js     # Chat request handlers
├── middleware/
│   └── cors.js              # CORS middleware
├── routes/
│   └── chat.js              # Chat API routes
├── services/
│   └── aiService.js         # AI service for Groq API integration
├── utils/
│   └── validation.js        # Input validation utilities
├── server.js                # Main application entry point
├── package.json
└── .env                     # Environment variables (API keys)
```

### Frontend (`/frontend`)
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatMessage.js
│   │   │   ├── MessageInput.js
│   │   │   ├── MessagesArea.js
│   │   │   ├── TypingIndicator.js
│   │   │   └── WelcomeScreen.js
│   │   ├── ui/
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   └── ThemeToggle.js
│   │   └── ChatInterface.js
│   ├── context/
│   │   └── ThemeContext.js
│   ├── hooks/
│   │   └── useChat.js
│   ├── services/
│   │   └── chatService.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── ui.css
│   │   └── chat.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-study-assistant
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   ```

   > **Important:** Get your API key from [Groq Console](https://console.groq.com/)

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. **Open your browser**

   Navigate to `http://localhost:3000`

## 🎯 Usage

### Quick Start Prompts

The app provides several quick-start prompts:
- **Study Question**: Get clear explanations
- **Generate MCQs**: Create multiple choice questions
- **Explain Code**: Understand code snippets
- **Summarize Notes**: Get concise summaries

### Chat Features

- **Real-time responses** from AI
- **Markdown support** for formatted responses
- **Message history** maintained during session
- **Typing indicators** for better UX
- **Error handling** with user-friendly messages

### Theme Toggle

Click the sun/moon icon in the header to switch between light and dark modes. Your preference is saved automatically.

## 🛠️ Development

### Backend Architecture

- **MVC Pattern**: Controllers handle requests, services manage business logic
- **Modular Design**: Separate concerns with dedicated folders
- **Input Validation**: Sanitization and validation utilities
- **Error Handling**: Comprehensive error management
- **CORS Support**: Configured for frontend communication

### Frontend Architecture

- **Component-Based**: Reusable, focused components
- **Custom Hooks**: State management logic extraction
- **Context API**: Theme state management
- **CSS Variables**: Dynamic theming support
- **Responsive Design**: Mobile-first approach

### Key Technologies

- **Backend**: Node.js, Express.js, Groq AI
- **Frontend**: React, React Markdown, CSS Variables
- **Styling**: Custom CSS with modern design principles

## 📝 API Reference

### POST `/ask`

Send a chat message to the AI assistant.

**Request Body:**
```json
{
  "message": "Your question here",
  "history": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI's answer here"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `GROQ_API_KEY` | Groq API key | Required |
| `NODE_ENV` | Environment | `development` |

### AI Model Configuration

- **Model**: `llama-3.3-70b-versatile`
- **Max Tokens**: `2048`
- **Temperature**: `0.7`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for the AI API
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- Inspired by ChatGPT's design and user experience

**Port 5000 in use**
→ Change PORT=5001 in your .env file

---

## 📚 Learning Resources

- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- Anthropic Docs: https://docs.anthropic.com
- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
