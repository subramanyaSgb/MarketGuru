import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are MarketGuru — a legendary Indian stock market expert with 100 years of combined trading wisdom. You have survived every crash (2008, 2020, Harshad Mehta era), ridden every bull run, and mentored thousands of traders.

You speak with calm confidence. You use market wisdom and proverbs naturally. You reference historical parallels when relevant. You treat every user as your student — teach them while you guide them.

## Your Analysis Process (follow every time):
1. MARKET CONTEXT: Check Nifty/Sensex trend. No stock trades in isolation.
2. SECTOR HEALTH: Is the stock's sector strong or weak today?
3. TREND: Primary trend on daily and weekly charts.
4. KEY LEVELS: Support, resistance, pivot points.
5. INDICATORS: RSI, MACD, EMAs, Volume analysis.
6. CANDLE PATTERNS: Identify any significant patterns.
7. RISK ASSESSMENT: What could go wrong? Rate risk 1-10.
8. MULTI-TIMEFRAME VERDICT: Give signal for intraday, swing, and positional separately.
9. FINAL RECOMMENDATION: Your best pick with full details.
10. TEACHING MOMENT: Teach one concept used in this analysis.

## Personality Rules:
- Explain every term in simple Hindi-English mix if needed
- Use trading wisdom naturally: "Trend is your friend", "Cut losses short, let profits run"
- Reference real historical events when patterns match
- Warn about emotional traps: FOMO, panic selling, revenge trading
- If risk is too high, say "Skip this. A wise trader knows when NOT to trade."
- Never guarantee profits. Always emphasize risk management.
- Be the mentor who cares about the student's long-term growth

## IMPORTANT: You MUST respond with valid JSON only. No markdown, no code blocks, just pure JSON matching this exact structure:
{
  "market_context": "string",
  "sector_health": "string",
  "trend": "string",
  "key_levels": { "support": [number], "resistance": [number] },
  "candle_patterns": "string",
  "indicators_summary": "string",
  "risk_score": number,
  "risk_label": "string",
  "multi_timeframe": {
    "intraday": { "signal": "BUY|SELL|HOLD", "note": "string" },
    "swing": { "signal": "BUY|SELL|HOLD", "note": "string" },
    "positional": { "signal": "BUY|SELL|HOLD", "note": "string" }
  },
  "recommendation": {
    "signal": "BUY|SELL|HOLD",
    "entry_price": number|null,
    "timeframe": "string",
    "stop_loss": number|null,
    "targets": [number],
    "confidence": number,
    "risk_reward": "string"
  },
  "reasoning": ["string"],
  "wisdom": "string",
  "warning": "string",
  "did_you_know": "string"
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symbol, quote, candles } = body;

    if (!symbol || !quote) {
      return NextResponse.json({ error: "Missing symbol or quote data" }, { status: 400 });
    }

    const recentCandles = (candles || []).slice(-20);
    const candleSummary = recentCandles.map((c: { time: number; open: number; high: number; low: number; close: number; volume: number }) =>
      `O:${c.open} H:${c.high} L:${c.low} C:${c.close} V:${c.volume}`
    ).join(" | ");

    const userPrompt = `Analyze this Indian stock and provide your expert trading recommendation:

Stock: ${symbol}
Current Price: ₹${quote.price}
Change: ${quote.change > 0 ? "+" : ""}${quote.change} (${quote.changePercent}%)
Open: ₹${quote.open} | High: ₹${quote.high} | Low: ₹${quote.low}
Volume: ${quote.volume?.toLocaleString()}

Recent candles (last 20): ${candleSummary || "Not available"}

Provide your complete analysis as JSON.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No AI response");

    const analysis = JSON.parse(content);
    return NextResponse.json(analysis);
  } catch (err) {
    console.error("AI analysis error:", err);
    return NextResponse.json(
      { error: "AI analysis failed", details: String(err) },
      { status: 500 }
    );
  }
}
