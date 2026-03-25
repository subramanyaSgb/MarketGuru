const features = [
  { label: "Real-time NSE/BSE Data", desc: "Live market data with automatic fallback sources" },
  { label: "AI-Powered Analysis", desc: "10-step expert analysis with multi-timeframe signals" },
  { label: "Beginner-Friendly", desc: "Every term explained in simple language" },
];

export default function TrustSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why MarketGuru?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.label} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.label}</h3>
              <p className="text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
