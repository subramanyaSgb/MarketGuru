"use client";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const stats = [
  { value: 50, suffix: "+", label: "NSE/BSE Stocks" },
  { value: 10, suffix: "-Step", label: "AI Analysis" },
  { value: 100, suffix: " Yrs", label: "Trading Wisdom" },
  { value: 3, suffix: "", label: "Timeframe Signals" },
];

const features = [
  {
    title: "Real-time Market Data",
    desc: "Live prices from NSE/BSE with automatic fallback to multiple data sources. You always get the latest data.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Multi-Timeframe Signals",
    desc: "Get separate buy/sell signals for intraday, swing, and positional trading — all from a single analysis.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Beginner-Friendly",
    desc: "Every technical term is explained in simple language. Learn while you trade with our 'Did You Know?' insights.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

export default function TrustSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                <CountUp to={s.value} duration={2.5} separator="," />
                <span className="text-blue-600">{s.suffix}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Features</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Why MarketGuru?
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <SpotlightCard key={f.title} className="p-8 card-hover" spotlightColor="rgba(37, 99, 235, 0.08)">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
