import SearchBar from "@/components/ui/SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your AI Trading Expert for the{" "}
          <span className="text-blue-600">Indian Stock Market</span>
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Get real-time buy &amp; sell signals powered by AI with 100 years of trading wisdom
        </p>
        <SearchBar size="lg" />
      </div>
    </section>
  );
}
