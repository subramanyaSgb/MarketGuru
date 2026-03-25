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
    <div className="px-4 md:px-6 py-3 md:py-4 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 max-w-[1600px] mx-auto">
        {/* Name + Price row */}
        <div className="flex items-center justify-between md:justify-start md:gap-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                {quote.name}
              </h1>
              <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800 rounded-md text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400">
                {quote.symbol}
              </span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">{quote.exchange}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              ₹{quote.price?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-lg text-xs md:text-sm font-bold ${
              isPositive ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" : "bg-red-50 dark:bg-red-500/10 text-red-600"
            }`}>
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={isPositive ? "M4.5 19.5l15-15" : "M4.5 4.5l15 15"} />
              </svg>
              {Math.abs(quote.change).toFixed(2)} ({Math.abs(quote.changePercent).toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* OHLCV + Source row */}
        <div className="flex items-center justify-between gap-3">
          <div className="grid grid-cols-4 gap-3 md:gap-6 flex-1">
            <OHLCItem label="Open" value={`₹${quote.open?.toLocaleString("en-IN")}`} />
            <OHLCItem label="High" value={`₹${quote.high?.toLocaleString("en-IN")}`} color="text-emerald-600" />
            <OHLCItem label="Low" value={`₹${quote.low?.toLocaleString("en-IN")}`} color="text-red-600" />
            <OHLCItem label="Vol" value={formatVolume(quote.volume)} />
          </div>

          <div className="flex flex-col items-end gap-1">
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

function OHLCItem({ label, value, color = "text-gray-900 dark:text-gray-100" }: { label: string; value: string; color?: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">{label}</div>
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
