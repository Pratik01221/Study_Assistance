require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

const SYSTEM_PROMPT = `You are an expert AI Study Assistant. Help students with:
1. Study Questions — clear explanations
2. MCQ Generation — proper format with answers
3. Code Explanation — simple terms
4. Note Summarization — key points
Always be friendly, use emojis, format with markdown.`;

app.get("/", (req, res) => {
  res.json({ status: "Groq Backend is running!" });
});

app.post("/ask", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty!" });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      })),
      { role: "user", content: message.trim() },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq Error:", data);
      return res.status(response.status).json({ error: data.error?.message || "Groq API error" });
    }

    const aiResponse = data.choices[0].message.content;
    console.log(`Response ready (${aiResponse.length} chars)`);

    res.json({ success: true, response: aiResponse });

  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Groq API Key loaded:", !!process.env.GROQ_API_KEY);
});