"use client";

import { useState } from "react";

export default function User() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const typewriterEffect = async (text: string) => {
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);

      setAnswer((prev) => prev + char);

      await delay(99);
    }
    setInput("");
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input) return;

    setIsLoading(true);
    setAnswer("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}",
          },
          body: JSON.stringify({ prompt: input }),
        }
      );

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();

      const fullText = data.answer || JSON.stringify(data);

      await typewriterEffect(fullText);
    } catch (error) {
      console.error(error);
      setAnswer("Error fetching data.");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 pt-5 w-screen flex flex-col items-center justify-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border border-blue-500 rounded-md"
        placeholder="Ask something..."
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        className="bg-blue-500 text-white rounded-md p-2 w-full mt-2 hover:bg-blue-600 disabled:bg-blue-300 transition"
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>

      <div className="w-screen text-center p-10">
        {answer && (
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 inline-block text-left min-w-50">
            {answer}
            {isLoading && <span className="animate-pulse">|</span>}
          </div>
        )}
      </div>
    </div>
  );
}
