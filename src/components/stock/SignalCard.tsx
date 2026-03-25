import { AIAnalysis } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface SignalCardProps {
  analysis: AIAnalysis | null;
  loading: boolean;
  previousSignal?: string;
  marketOpen: boolean;
}

export default function SignalCard({ analysis, loading, previousSignal, marketOpen }: SignalCardProps) {
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-24 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const { recommendation: rec, risk_score, risk_label, multi_timeframe: mtf } = analysis;
  const signal = rec.signal;
  const variant = signal === "BUY" ? "buy" : signal === "SELL" ? "sell" : "hold";
  const signalChanged = previousSignal && previousSignal !== signal;

  return (
    <div className={`p-6 rounded-2xl shadow-sm ${signalChanged ? "ring-2 ring-blue-400 animate-pulse" : ""} signal-${variant}`}>
      {/* AMO Banner */}
      {!marketOpen && (
        <div className="mb-4 px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-orange-700">
            AMO (After Market Order) — Place this order now, it will execute when market opens at 9:15 AM
          </span>
        </div>
      )}

      {signalChanged && (
        <div className="mb-3 text-sm text-blue-600 font-medium">
          Signal changed! <span className="line-through text-gray-400">{previousSignal}</span> → {signal}
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-6">
        {/* Main Signal */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Badge variant={variant} pulse={!!signalChanged} size="lg">
              {signal}
            </Badge>
            {!marketOpen && (
              <span className="text-xs font-bold text-orange-600">AMO</span>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-400">Confidence</div>
            <div className="text-lg font-bold text-gray-900">{rec.confidence}%</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Entry Price</span>
            <div className="font-semibold text-gray-900">
              {rec.entry_price ? `₹${rec.entry_price.toLocaleString("en-IN")}` : "—"}
            </div>
          </div>
          <div>
            <span className="text-gray-400">Time Frame</span>
            <div className="font-semibold text-gray-900">{rec.timeframe || "—"}</div>
          </div>
          <div>
            <span className="text-gray-400">Stop Loss</span>
            <div className="font-semibold text-red-600">
              {rec.stop_loss ? `₹${rec.stop_loss.toLocaleString("en-IN")}` : "—"}
            </div>
          </div>
          <div>
            <span className="text-gray-400">Targets</span>
            <div className="font-semibold text-green-600">
              {rec.targets?.length
                ? rec.targets.map((t, i) => `T${i + 1}: ₹${t.toLocaleString("en-IN")}`).join(" / ")
                : "—"}
            </div>
          </div>
          <div>
            <span className="text-gray-400">Risk</span>
            <div className="font-semibold text-gray-900">{risk_score}/10 — {risk_label}</div>
          </div>
        </div>
      </div>

      {/* Multi-timeframe */}
      {mtf && (
        <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-4 text-sm">
          {Object.entries(mtf).map(([tf, data]) => {
            const v = data.signal === "BUY" ? "buy" : data.signal === "SELL" ? "sell" : "hold";
            return (
              <div key={tf} className="flex items-center gap-2">
                <span className="text-gray-400 capitalize">{tf}:</span>
                <Badge variant={v as "buy" | "sell" | "hold"}>{data.signal}</Badge>
                <span className="text-gray-500 text-xs">{data.note}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Risk-Reward */}
      {rec.risk_reward && (
        <div className="mt-3 text-sm text-gray-500">
          Risk-Reward Ratio: <span className="font-semibold text-gray-900">{rec.risk_reward}</span>
        </div>
      )}
    </div>
  );
}
