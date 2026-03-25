export interface StockQuote {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketDataResult {
  quote: StockQuote;
  candles: CandleData[];
  source: "groww" | "yahoo" | "google" | "cached";
}

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

export interface AIAnalysis {
  market_context: string;
  sector_health: string;
  trend: string;
  key_levels: { support: number[]; resistance: number[] };
  candle_patterns: string;
  indicators_summary: string;
  risk_score: number;
  risk_label: string;
  multi_timeframe: {
    intraday: { signal: string; note: string };
    swing: { signal: string; note: string };
    positional: { signal: string; note: string };
  };
  recommendation: {
    signal: "BUY" | "SELL" | "HOLD";
    entry_price: number | null;
    timeframe: string;
    stop_loss: number | null;
    targets: number[];
    confidence: number;
    risk_reward: string;
  };
  reasoning: string[];
  wisdom: string;
  warning: string;
  did_you_know: string;
}
