"use client";
import { useState } from "react";
import { AIAnalysis } from "@/lib/types";

interface AIThinkingPanelProps {
  analysis: AIAnalysis | null;
  loading: boolean;
}

export default function AIThinkingPanel({ analysis, loading }: AIThinkingPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            AI Thinking
          </span>
          {loading && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && !analysis && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-blue-600 px-1">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Analyzing market data...</span>
              </div>
              {["Market Context", "Sector Health", "Trend Analysis", "Indicators"].map((label, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl animate-pulse">
                  <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 mt-1.5" />
                </div>
              ))}
            </div>
          )}

          {analysis && (
            <>
              {/* Step 1: Market Context */}
              <InsightBlock
                step={1}
                title="Market Context"
                content={analysis.market_context}
                color="blue"
              />

              {/* Step 2: Sector Health */}
              <InsightBlock
                step={2}
                title="Sector Health"
                content={analysis.sector_health}
                color="indigo"
              />

              {/* Step 3: Trend */}
              <InsightBlock
                step={3}
                title="Trend Analysis"
                content={analysis.trend}
                color="violet"
              />

              {/* Step 4: Key Levels */}
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-gray-100">
                  <StepBadge step={4} />
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Key Levels</h4>
                </div>
                <div className="grid grid-cols-2 gap-px bg-gray-100">
                  <div className="bg-white p-3">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Support</span>
                    <div className="mt-1 space-y-0.5">
                      {analysis.key_levels?.support?.map((s, i) => (
                        <div key={i} className="text-sm font-semibold text-gray-900">
                          ₹{s.toLocaleString("en-IN")}
                        </div>
                      )) || <span className="text-sm text-gray-400">—</span>}
                    </div>
                  </div>
                  <div className="bg-white p-3">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Resistance</span>
                    <div className="mt-1 space-y-0.5">
                      {analysis.key_levels?.resistance?.map((r, i) => (
                        <div key={i} className="text-sm font-semibold text-gray-900">
                          ₹{r.toLocaleString("en-IN")}
                        </div>
                      )) || <span className="text-sm text-gray-400">—</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5: Indicators */}
              <InsightBlock
                step={5}
                title="Technical Indicators"
                content={analysis.indicators_summary}
                color="cyan"
              />

              {/* Step 6: Candle Patterns */}
              <InsightBlock
                step={6}
                title="Candlestick Patterns"
                content={analysis.candle_patterns}
                color="teal"
              />

              {/* Expert Reasoning */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-b border-blue-100">
                  <div className="w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Expert Reasoning</h4>
                </div>
                <ul className="p-3 space-y-2.5">
                  {analysis.reasoning?.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                        {i + 1}
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Wisdom */}
              {analysis.wisdom && (
                <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-4">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl leading-none mt-0.5">💡</span>
                    <div>
                      <h4 className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Trading Wisdom</h4>
                      <p className="text-sm text-amber-900 italic leading-relaxed">&ldquo;{analysis.wisdom}&rdquo;</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Warning */}
              {analysis.warning && (
                <div className="rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-200/50 p-4">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl leading-none mt-0.5">⚠️</span>
                    <div>
                      <h4 className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">Warning</h4>
                      <p className="text-sm text-red-800 leading-relaxed">{analysis.warning}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Did You Know */}
              {analysis.did_you_know && (
                <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200/50 p-4">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl leading-none mt-0.5">📚</span>
                    <div>
                      <h4 className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mb-1">Did You Know?</h4>
                      <p className="text-sm text-violet-800 leading-relaxed">{analysis.did_you_know}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function StepBadge({ step }: { step: number }) {
  return (
    <span className="w-5 h-5 rounded-md bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-bold">
      {step}
    </span>
  );
}

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50/50", border: "border-blue-100", badge: "bg-blue-100 text-blue-600" },
  indigo: { bg: "bg-indigo-50/50", border: "border-indigo-100", badge: "bg-indigo-100 text-indigo-600" },
  violet: { bg: "bg-violet-50/50", border: "border-violet-100", badge: "bg-violet-100 text-violet-600" },
  cyan: { bg: "bg-cyan-50/50", border: "border-cyan-100", badge: "bg-cyan-100 text-cyan-600" },
  teal: { bg: "bg-teal-50/50", border: "border-teal-100", badge: "bg-teal-100 text-teal-600" },
};

function InsightBlock({ step, title, content, color }: { step: number; title: string; content: string; color: string }) {
  if (!content) return null;
  const c = colorMap[color] || colorMap.blue;
  return (
    <div className={`rounded-xl ${c.bg} border ${c.border} overflow-hidden`}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-inherit">
        <span className={`w-5 h-5 rounded-md ${c.badge} flex items-center justify-center text-[10px] font-bold`}>
          {step}
        </span>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h4>
      </div>
      <p className="px-3 py-2.5 text-sm text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}
