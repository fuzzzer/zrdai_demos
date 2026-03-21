import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { REAL_ESTATE_SYSTEM_PROMPT } from "./prompt";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in .env");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body as {
      message?: string;
      history?: { role: "user" | "assistant"; text: string }[];
    };

    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: [
        {
          role: "system",
          content: REAL_ESTATE_SYSTEM_PROMPT,
        },
        ...history.map((item) => ({
          role: item.role,
          content: item.text,
        })),
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: response.output_text || "უკაცრავად, პასუხი ვერ დამუშავდა.",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({
      error: "Failed to generate response.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});