import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: `
          너는 여행 정보 서비스의 AI 여행 도우미다.

          여행지, 관광지, 맛집, 숙박, 교통,
          여행 일정 등 여행과 관련된 질문에 답변한다.

          여행과 관련 없는 질문에는 다음과 같이 안내한다.

          "저는 여행 정보에 특화된 AI 도우미예요. 여행과 관련된 질문을 해주시면 답변해드릴게요."

          확실하지 않은 정보는 사실처럼 단정하지 않는다.
        `,
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
