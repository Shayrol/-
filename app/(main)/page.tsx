"use client";

import { useState } from "react";
import AiTravelHero from "./components/ai-travel-hero";
import AiTravelFeatures from "./components/ai-travel-features";
import PopularTravel from "./components/popular-travel";

export default function Home() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setAnswer(data.answer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center w-full">
      <AiTravelHero />
      <AiTravelFeatures />
      <PopularTravel />

      {/* <div className="mb-6 min-h-40 rounded-lg border p-4">
        {loading ? (
          <p>답변을 생성하고 있어요...</p>
        ) : (
          <p className="whitespace-pre-wrap">{answer}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="여행에 대해 질문해보세요."
          className="flex-1 rounded-lg border px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          질문
        </button>
      </form> */}
    </main>
  );
}
