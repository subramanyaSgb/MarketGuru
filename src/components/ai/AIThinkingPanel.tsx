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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-900">
          AI Thinking
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                Analyzing market data...
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          {!loading && analysis && (
            <>
              <InsightBlock
                title="Market Context"
                content={analysis.market_context}
                icon="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
              />

              <InsightBlock
                title="Sector Health"
                content={analysis.sector_health}
                icon="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z"
              />

              <InsightBlock
                title="Trend Analysis"
                content={analysis.trend}
                icon="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22"
              />

              <div className="bg-gray-50 rounded-xl p-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Key Levels</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Support:</span>
                    <div className="font-medium text-green-600">
                      {analysis.key_levels?.support?.map((s) => `₹${s.toLocaleString("en-IN")}`).join(", ") || "—"}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Resistance:</span>
                    <div className="font-medium text-red-600">
                      {analysis.key_levels?.resistance?.map((r) => `₹${r.toLocaleString("en-IN")}`).join(", ") || "—"}
                    </div>
                  </div>
                </div>
              </div>

              <InsightBlock
                title="Technical Indicators"
                content={analysis.indicators_summary}
                icon="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />

              <InsightBlock
                title="Candlestick Patterns"
                content={analysis.candle_patterns}
                icon="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />

              <div className="bg-blue-50 rounded-xl p-3">
                <h4 className="text-xs font-semibold text-blue-400 uppercase mb-2">Expert Reasoning</h4>
                <ul className="space-y-2">
                  {analysis.reasoning?.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.wisdom && (
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                  <h4 className="text-xs font-semibold text-amber-500 uppercase mb-1">Trading Wisdom</h4>
                  <p className="text-sm text-amber-800 italic">&ldquo;{analysis.wisdom}&rdquo;</p>
                </div>
              )}

              {analysis.warning && (
                <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                  <h4 className="text-xs font-semibold text-red-400 uppercase mb-1">Warning</h4>
                  <p className="text-sm text-red-700">{analysis.warning}</p>
                </div>
              )}

              {analysis.did_you_know && (
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                  <h4 className="text-xs font-semibold text-purple-400 uppercase mb-1">Did You Know?</h4>
                  <p className="text-sm text-purple-700">{analysis.did_you_know}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function InsightBlock({ title, content, icon }: { title: string; content: string; icon: string }) {
  if (!content) return null;
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        <h4 className="text-xs font-semibold text-gray-400 uppercase">{title}</h4>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}
