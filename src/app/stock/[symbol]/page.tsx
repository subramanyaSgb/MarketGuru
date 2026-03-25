"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import PriceBar from "@/components/stock/PriceBar";
import SignalCard from "@/components/stock/SignalCard";
import LiveChart from "@/components/stock/LiveChart";
import TimeframeCards from "@/components/stock/TimeframeCards";
import AIThinkingPanel from "@/components/ai/AIThinkingPanel";
import SearchBar from "@/components/ui/SearchBar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { StockQuote, CandleData, AIAnalysis } from "@/lib/types";
import { isMarketOpen } from "@/lib/market-data";

export default function StockPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = (params.symbol as string)?.toUpperCase();

  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [source, setSource] = useState<"groww" | "yahoo" | "google" | "cached">("yahoo");
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [previousSignal, setPreviousSignal] = useState<string | undefined>();
  const [timeframe, setTimeframe] = useState("5min");
  const [loadingData, setLoadingData] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketOpen, setMarketOpen] = useState(true);

  const priceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const analysisIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMarketData = useCallback(async (tf?: string) => {
    try {
      const res = await fetch(`/api/market-data?symbol=${symbol}&tf=${tf || timeframe}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setQuote(data.quote);
      setCandles(data.candles || []);
      setSource(data.source || "yahoo");
      setError(null);
      return data;
    } catch {
      setError("Failed to fetch market data. Retrying...");
      return null;
    }
  }, [symbol, timeframe]);

  const fetchAnalysis = useCallback(async (quoteData?: StockQuote, candleData?: CandleData[]) => {
    const q = quoteData || quote;
    if (!q) return;
    setLoadingAI(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          quote: q,
          candles: candleData || candles,
        }),
      });
      if (!res.ok) throw new Error("AI analysis failed");
      const data = await res.json();
      setAnalysis((prev) => {
        if (prev) setPreviousSignal(prev.recommendation?.signal);
        return data;
      });
    } catch (err) {
      console.error("AI error:", err);
    }
    setLoadingAI(false);
  }, [symbol, quote, candles]);

  useEffect(() => {
    setMarketOpen(isMarketOpen());
    const interval = setInterval(() => setMarketOpen(isMarketOpen()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      setLoadingData(true);
      setAnalysis(null);
      setPreviousSignal(undefined);
      const data = await fetchMarketData();
      if (data && !cancelled) {
        setLoadingData(false);
        fetchAnalysis(data.quote, data.candles);
      } else if (!cancelled) {
        setLoadingData(false);
      }
    }
    init();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, timeframe]);

  useEffect(() => {
    priceIntervalRef.current = setInterval(() => fetchMarketData(), 10000);
    analysisIntervalRef.current = setInterval(() => fetchAnalysis(), 60000);
    return () => {
      if (priceIntervalRef.current) clearInterval(priceIntervalRef.current);
      if (analysisIntervalRef.current) clearInterval(analysisIntervalRef.current);
    };
  }, [fetchMarketData, fetchAnalysis]);

  if (loadingData && !quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 animate-pulse" />
            <div className="absolute inset-[3px] rounded-xl bg-white flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>MG</span>
            </div>
          </div>
          <p className="text-gray-500 font-medium">Loading {symbol}...</p>
          <div className="mt-3 flex justify-center gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-[#0b1121] dark:via-[#0f172a] dark:to-[#0b1121]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-violet-100/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20" />
      </div>

      {/* Top navigation bar */}
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">MG</span>
            </div>
            <span className="text-base font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Market<span className="text-blue-600">Guru</span>
            </span>
          </div>
          <div className="flex-1 max-w-sm ml-4">
            <SearchBar size="sm" />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Price bar */}
      {quote && <PriceBar quote={quote} source={source} marketOpen={marketOpen} />}

      {/* Error banner */}
      {error && (
        <div className="max-w-[1600px] mx-auto px-4 mt-4">
          <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-5 p-5 max-w-[1600px] mx-auto pb-16">
        {/* Left: Signal + Chart + Timeframe */}
        <div className="flex-1 lg:w-[70%] space-y-5">
          <SignalCard analysis={analysis} loading={loadingAI && !analysis} previousSignal={previousSignal} marketOpen={marketOpen} />
          <LiveChart candles={candles} timeframe={timeframe} onTimeframeChange={setTimeframe} />

          {/* Timeframe section header */}
          {analysis?.multi_timeframe && (
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Timeframe Analysis
              </h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          )}
          <TimeframeCards analysis={analysis} loading={loadingAI && !analysis} />
        </div>

        {/* Right: AI Panel */}
        <div className="lg:w-[30%] lg:sticky lg:top-16 lg:self-start" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
          <AIThinkingPanel analysis={analysis} loading={loadingAI && !analysis} />
        </div>
      </div>

      {/* Disclaimer bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-t border-gray-200/50 px-4 py-2 text-center">
        <p className="text-[11px] text-gray-400 font-medium">
          AI-generated analysis for educational purposes only. Not investment advice. MarketGuru is not SEBI registered.
        </p>
      </div>
    </div>
  );
}
