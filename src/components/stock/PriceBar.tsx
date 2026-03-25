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
    <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-white border-b border-gray-100 gap-4">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{quote.name}</h1>
          <span className="text-sm text-gray-400">{quote.symbol} &middot; {quote.exchange}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ₹{quote.price?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span className={`text-lg font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "▲" : "▼"} {Math.abs(quote.change).toFixed(2)} ({Math.abs(quote.changePercent).toFixed(2)}%)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div><span className="text-gray-400">Open</span><br /><span className="font-medium">₹{quote.open?.toLocaleString("en-IN")}</span></div>
          <div><span className="text-gray-400">High</span><br /><span className="font-medium text-green-600">₹{quote.high?.toLocaleString("en-IN")}</span></div>
          <div><span className="text-gray-400">Low</span><br /><span className="font-medium text-red-600">₹{quote.low?.toLocaleString("en-IN")}</span></div>
          <div><span className="text-gray-400">Volume</span><br /><span className="font-medium">{quote.volume?.toLocaleString("en-IN")}</span></div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SourceBadge source={source} />
          {!marketOpen && (
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              Market Closed — AMO Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
