import { AIAnalysis } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface TimeframeCardsProps {
  analysis: AIAnalysis | null;
  loading: boolean;
}

const timeframeConfig = {
  intraday: {
    label: "Intraday",
    desc: "Same day trade",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  swing: {
    label: "Swing",
    desc: "2-5 days hold",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  positional: {
    label: "Positional",
    desc: "1-3 months hold",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
};

const signalColors: Record<string, { bg: string; iconBg: string }> = {
  BUY: { bg: "signal-buy", iconBg: "bg-emerald-100 text-emerald-600" },
  SELL: { bg: "signal-sell", iconBg: "bg-red-100 text-red-600" },
  HOLD: { bg: "signal-hold", iconBg: "bg-amber-100 text-amber-600" },
};

export default function TimeframeCards({ analysis, loading }: TimeframeCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!analysis?.multi_timeframe) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {(Object.entries(analysis.multi_timeframe) as [keyof typeof timeframeConfig, { signal: string; note: string }][]).map(
        ([tf, data]) => {
          const config = timeframeConfig[tf];
          const colors = signalColors[data.signal] || signalColors.HOLD;
          const variant = data.signal === "BUY" ? "buy" : data.signal === "SELL" ? "sell" : "hold";

          return (
            <div
              key={tf}
              className={`p-5 rounded-2xl ${colors.bg} transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      {config.label}
                    </h3>
                    <span className="text-xs text-gray-500">{config.desc}</span>
                  </div>
                </div>
                <Badge variant={variant} size="sm">{data.signal}</Badge>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{data.note}</p>
            </div>
          );
        }
      )}
    </div>
  );
}
