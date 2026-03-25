import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol");
  const tf = req.nextUrl.searchParams.get("tf") || "5min";
  if (!symbol) return NextResponse.json({ error: "Missing symbol" }, { status: 400 });

  const yahooSymbol = `${symbol}.NS`;
  const intervalMap: Record<string, string> = {
    "1min": "1m", "5min": "5m", "15min": "15m", "1hr": "1h", "1D": "1d",
  };
  const interval = intervalMap[tf] || "5m";
  const rangeMap: Record<string, string> = {
    "1m": "1d", "5m": "5d", "15m": "5d", "1h": "1mo", "1d": "6mo",
  };
  const range = rangeMap[interval] || "5d";

  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=${interval}&range=${range}`,
      { next: { revalidate: 5 } }
    );

    if (!res.ok) throw new Error("Yahoo Finance error");
    const data = await res.json();
    const result = data.chart?.result?.[0];
    if (!result) throw new Error("No data");

    const meta = result.meta;
    const timestamps = result.timestamp || [];
    const ohlc = result.indicators?.quote?.[0] || {};

    const quote = {
      symbol,
      name: meta.shortName || meta.symbol || symbol,
      exchange: meta.exchangeName || "NSE",
      price: meta.regularMarketPrice,
      change: +(meta.regularMarketPrice - (meta.previousClose || meta.regularMarketPrice)).toFixed(2),
      changePercent: meta.previousClose
        ? +(((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100).toFixed(2)
        : 0,
      open: meta.regularMarketOpen || 0,
      high: meta.regularMarketDayHigh || 0,
      low: meta.regularMarketDayLow || 0,
      volume: meta.regularMarketVolume || 0,
      timestamp: Date.now(),
    };

    const candles = timestamps
      .map((t: number, i: number) => ({
        time: t,
        open: ohlc.open?.[i],
        high: ohlc.high?.[i],
        low: ohlc.low?.[i],
        close: ohlc.close?.[i],
        volume: ohlc.volume?.[i],
      }))
      .filter((c: { open: number | null }) => c.open != null);

    return NextResponse.json({ quote, candles, source: "yahoo" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch market data", details: String(err) },
      { status: 500 }
    );
  }
}
