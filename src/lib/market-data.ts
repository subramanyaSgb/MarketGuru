import { MarketDataResult } from "./types";

// In-memory cache
const cache: Map<string, { data: MarketDataResult; timestamp: number }> = new Map();

export async function getMarketData(symbol: string, timeframe: string = "5min"): Promise<MarketDataResult> {
  // Try server-side API (handles Yahoo Finance)
  try {
    const res = await fetch(`/api/market-data?symbol=${symbol}&tf=${timeframe}`);
    if (res.ok) {
      const data = await res.json();
      const result: MarketDataResult = { quote: data.quote, candles: data.candles, source: data.source || "yahoo" };
      cache.set(symbol, { data: result, timestamp: Date.now() });
      return result;
    }
  } catch {}

  // Fallback: cached data
  const cached = cache.get(symbol);
  if (cached) {
    return { ...cached.data, source: "cached" };
  }

  throw new Error("All market data sources unavailable");
}

export function isMarketOpen(): boolean {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const day = ist.getDay();

  if (day === 0 || day === 6) return false;
  const timeInMinutes = hours * 60 + minutes;
  return timeInMinutes >= 555 && timeInMinutes <= 930; // 9:15 AM to 3:30 PM
}
