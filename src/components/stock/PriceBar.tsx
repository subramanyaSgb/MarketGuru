import { StockQuote } from "@/lib/types";
import SourceBadge from "@/components/ui/SourceBadge";

interface PriceBarProps {
  quote: StockQuote;
  source: "groww" | "yahoo" | "google" | "cached";
  marketOpen: boolean;
}

export default function PriceBar({ quote, source, marketOpen }: PriceBarProps) {
  const isPositive = quote.change >= 0;

  return (
    <div className="px-6 py-4 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-[1600px] mx-auto">
        {/* Left: Name + Price */}
        <div className="flex items-center gap-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                {quote.name}
              </h1>
              <span className="px-2 py-0.5 bg-gray-100 rounded-md text-xs font-semibold text-gray-500">
                {quote.symbol}
              </span>
            </div>
            <span className="text-xs text-gray-400">{quote.exchange}</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              ₹{quote.price?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold ${
              isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={isPositive ? "M4.5 19.5l15-15" : "M4.5 4.5l15 15"} />
              </svg>
              {Math.abs(quote.change).toFixed(2)} ({Math.abs(quote.changePercent).toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Right: OHLCV + Source */}
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <OHLCItem label="Open" value={`₹${quote.open?.toLocaleString("en-IN")}`} />
            <OHLCItem label="High" value={`₹${quote.high?.toLocaleString("en-IN")}`} color="text-emerald-600" />
            <OHLCItem label="Low" value={`₹${quote.low?.toLocaleString("en-IN")}`} color="text-red-600" />
            <OHLCItem label="Vol" value={formatVolume(quote.volume)} />
          </div>

          <div className="w-px h-10 bg-gray-200" />

          <div className="flex flex-col items-end gap-1.5">
            <SourceBadge source={source} />
            {!marketOpen && (
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                Market Closed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OHLCItem({ label, value, color = "text-gray-900" }: { label: string; value: string; color?: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{label}</div>
      <div className={`text-sm font-bold ${color} mt-0.5`}>{value}</div>
    </div>
  );
}

function formatVolume(vol: number): string {
  if (!vol) return "0";
  if (vol >= 10000000) return `${(vol / 10000000).toFixed(1)}Cr`;
  if (vol >= 100000) return `${(vol / 100000).toFixed(1)}L`;
  if (vol >= 1000) return `${(vol / 1000).toFixed(1)}K`;
  return vol.toLocaleString("en-IN");
}
