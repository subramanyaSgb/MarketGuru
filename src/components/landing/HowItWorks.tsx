"use client";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const steps = [
  {
    num: "01",
    title: "Search Any Stock",
    desc: "Type the name of any NSE or BSE listed stock. Our smart search finds it instantly.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
    spotlightColor: "rgba(37, 99, 235, 0.12)",
  },
  {
    num: "02",
    title: "AI Analyzes Live Data",
    desc: "Our AI expert runs a 10-step analysis on real-time price, volume, indicators, and market context.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "from-indigo-500 to-indigo-600",
    spotlightColor: "rgba(99, 102, 241, 0.12)",
  },
  {
    num: "03",
    title: "Get Clear Signals",
    desc: "Receive actionable buy/sell signals with entry price, stop loss, targets, and expert reasoning.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    color: "from-emerald-500 to-emerald-600",
    spotlightColor: "rgba(16, 185, 129, 0.12)",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-[#0b1121]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Simple Process</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">Three simple steps to get expert-level trading insights</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <SpotlightCard
              key={s.num}
              className="p-8 card-hover"
              spotlightColor={s.spotlightColor}
            >
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest">Step {s.num}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-2 mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
