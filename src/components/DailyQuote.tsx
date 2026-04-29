"use client";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { QUOTES } from "../lib/quotes";

export default function DailyQuote() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(random);
  }, []);

  return (
    <div className="flex w-full items-center max-h-28 justify-start px-8 bg-mood-great/20 border border-mood-great/70 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <Quote
        className="w-12 h-12 text-mood-great shrink-0"
        fill="currentColor"
      />
      <div className="p-4">
        <p className="font-play text-primary text-xl">"{quote.text}"</p>
        <p className="font-play text-primary/50 text-md mt-1">
          — {quote.author}
        </p>
      </div>
    </div>
  );
}
