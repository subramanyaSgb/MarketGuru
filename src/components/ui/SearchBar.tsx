"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

export default function SearchBar({ size = "lg" }: { size?: "sm" | "lg" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch { setResults([]); }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (symbol: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/stock/${symbol}`);
  };

  const inputClass = size === "lg"
    ? "w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg rounded-2xl border-2 border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 dark:text-gray-100 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none shadow-lg dark:placeholder-gray-500"
    : "w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 dark:text-gray-100 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none dark:placeholder-gray-500";

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search any stock... (e.g., Reliance, TCS, Infosys)"
        className={inputClass}
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-slate-700 z-50 max-h-80 overflow-y-auto">
          {results.map((r) => (
            <button
              key={r.symbol}
              onClick={() => handleSelect(r.symbol)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-500/10 flex justify-between items-center border-b border-gray-50 dark:border-slate-800 last:border-0"
            >
              <div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{r.symbol}</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">{r.name}</span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 dark:bg-slate-800 dark:text-gray-500 px-2 py-1 rounded">{r.exchange}</span>
            </button>
          ))}
        </div>
      )}
      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full mt-2 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-slate-700 z-50 p-4 text-gray-500 dark:text-gray-400 text-center">
          No stocks found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
