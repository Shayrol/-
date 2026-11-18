import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { message, prompt } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const answer = completion.choices[0].message?.content ?? "";

  return Response.json({
    answer,
  });
}
