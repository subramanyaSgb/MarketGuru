"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import PriceBar from "@/components/stock/PriceBar";
import SignalCard from "@/components/stock/SignalCard";
import LiveChart from "@/components/stock/LiveChart";
import TimeframeCards from "@/components/stock/TimeframeCards";
import AIThinkingPanel from "@/components/ai/AIThinkingPanel";
import SearchBar from "@/components/ui/SearchBar";
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

  // Check market status
  useEffect(() => {
    setMarketOpen(isMarketOpen());
    const interval = setInterval(() => {
      setMarketOpen(isMarketOpen());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Initial load
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

  // Polling: price every 10s, AI every 60s
  useEffect(() => {
    priceIntervalRef.current = setInterval(() => {
      fetchMarketData();
    }, 10000);

    analysisIntervalRef.current = setInterval(() => {
      fetchAnalysis();
    }, 60000);

    return () => {
      if (priceIntervalRef.current) clearInterval(priceIntervalRef.current);
      if (analysisIntervalRef.current) clearInterval(analysisIntervalRef.current);
    };
  }, [fetchMarketData, fetchAnalysis]);

  if (loadingData && !quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading {symbol} data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <span className="text-lg font-bold text-blue-600">MarketGuru</span>
        <div className="flex-1 max-w-md">
          <SearchBar size="sm" />
        </div>
      </div>

      {/* Price bar */}
      {quote && <PriceBar quote={quote} source={source} marketOpen={marketOpen} />}

      {/* Error banner */}
      {error && (
        <div className="mx-4 mt-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-[1600px] mx-auto">
        {/* Left: Signal + Chart */}
        <div className="flex-1 lg:w-[70%] space-y-4">
          <SignalCard analysis={analysis} loading={loadingAI && !analysis} previousSignal={previousSignal} marketOpen={marketOpen} />
          <LiveChart candles={candles} timeframe={timeframe} onTimeframeChange={setTimeframe} />
          <TimeframeCards analysis={analysis} loading={loadingAI && !analysis} />
        </div>

        {/* Right: AI Panel */}
        <div className="lg:w-[30%]">
          <AIThinkingPanel analysis={analysis} loading={loadingAI && !analysis} />
        </div>
      </div>

      {/* Disclaimer bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 px-4 py-2 text-center">
        <p className="text-xs text-gray-400">
          AI-generated analysis for educational purposes only. Not investment advice.
        </p>
      </div>
    </div>
  );
}
