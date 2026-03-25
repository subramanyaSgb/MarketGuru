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
      <div className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 dark:via-slate-800/50 to-transparent animate-[shimmer_2s_infinite]" />
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded-lg w-1/3" />
            <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded-lg w-2/3" />
            <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded-lg w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const { recommendation: rec, risk_score, risk_label } = analysis;
  const signal = rec.signal;
  const signalChanged = previousSignal && previousSignal !== signal;

  const signalGradient = signal === "BUY"
    ? "from-emerald-500/8 via-emerald-500/3 to-transparent border-emerald-200/60"
    : signal === "SELL"
    ? "from-red-500/8 via-red-500/3 to-transparent border-red-200/60"
    : "from-amber-500/8 via-amber-500/3 to-transparent border-amber-200/60";

  const variant = signal === "BUY" ? "buy" : signal === "SELL" ? "sell" : "hold";

  // Confidence ring color
  const confidenceColor = rec.confidence >= 70 ? "text-emerald-500" : rec.confidence >= 40 ? "text-amber-500" : "text-red-500";
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (rec.confidence / 100) * circumference;

  return (
    <div className={`relative rounded-2xl bg-gradient-to-br ${signalGradient} border overflow-hidden ${signalChanged ? "animate-signal-pulse" : ""}`}>
      {/* AMO Banner */}
      {!marketOpen && (
        <div className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 flex items-center gap-2.5">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-white">
            AMO — Place this order now, executes when market opens at 9:15 AM
          </span>
        </div>
      )}

      {signalChanged && (
        <div className="mx-5 mt-4 px-3 py-1.5 bg-blue-500/10 border border-blue-200 rounded-lg inline-flex items-center gap-2 text-sm text-blue-700 font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Signal changed: <span className="line-through opacity-50">{previousSignal}</span> → <span className="font-bold">{signal}</span>
        </div>
      )}

      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Signal Badge + Confidence Ring + Risk */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative flex-shrink-0">
              <svg className="w-16 h-16 md:w-20 md:h-20 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-100 dark:text-slate-700" />
                <circle cx="32" cy="32" r="28" fill="none" strokeWidth="3" strokeLinecap="round"
                  className={confidenceColor}
                  style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Badge variant={variant} size="sm">{signal}</Badge>
              </div>
            </div>

            {/* Confidence + Risk */}
            <div className="flex-shrink-0">
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                {rec.confidence}<span className="text-base md:text-lg text-gray-400 dark:text-gray-500 font-medium">%</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Confidence</div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`w-1.5 h-3 rounded-full ${i < risk_score ? (risk_score <= 3 ? "bg-emerald-400" : risk_score <= 6 ? "bg-amber-400" : "bg-red-400") : "bg-gray-200 dark:bg-slate-700"}`} />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{risk_label}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-16 bg-gray-200/80 dark:bg-slate-700 hidden md:block" />
          <div className="h-px w-full bg-gray-200/80 dark:bg-slate-700 md:hidden" />

          {/* Trade Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-3 flex-1">
            <TradeDetail
              label="Entry Price"
              value={rec.entry_price ? `₹${rec.entry_price.toLocaleString("en-IN")}` : "At Market"}
            />
            <TradeDetail
              label="Time Frame"
              value={rec.timeframe || "—"}
            />
            <TradeDetail
              label="Stop Loss"
              value={rec.stop_loss ? `₹${rec.stop_loss.toLocaleString("en-IN")}` : "—"}
              valueClass="text-red-600"
            />
            <TradeDetail
              label="Targets"
              value={rec.targets?.length
                ? rec.targets.map((t, i) => `T${i + 1}: ₹${t.toLocaleString("en-IN")}`).join("  ")
                : "—"}
              valueClass="text-emerald-600"
            />
          </div>
        </div>

        {/* Risk-Reward */}
        {rec.risk_reward && (
          <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-slate-700 flex items-center gap-2 text-sm">
            <span className="text-gray-400 dark:text-gray-500">Risk-Reward</span>
            <span className="font-bold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{rec.risk_reward}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TradeDetail({ label, value, valueClass = "text-gray-900 dark:text-gray-100" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div>
      <div className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-0.5">{label}</div>
      <div className={`text-sm font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}
