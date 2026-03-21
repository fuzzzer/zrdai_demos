import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log("API KEY FOUND:", !!process.env.OPENAI_API_KEY);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const formattedConversation = (messages || [])
      .map((m) => `${m.role === "user" ? "მომხმარებელი" : "ასისტენტი"}: ${m.text}`)
      .join("\n");

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "შენ ხარ თბილი და პროფესიონალური ასისტენტი სტომატოლოგიური კლინიკისთვის. უპასუხე ქართულად. დაეხმარე მომხმარებელს ჩაწერაში, სამუშაო საათებში, სერვისებში და ზოგად ინფორმაციაში. არ გასცე სამედიცინო დიაგნოზი.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: formattedConversation,
            },
          ],
        },
      ],
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    res.status(500).json({
      reply: "სერვერზე შეცდომა მოხდა. გადაამოწმე terminal.",
    });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});