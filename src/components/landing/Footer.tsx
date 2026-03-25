export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl mx-auto">
          MarketGuru is an AI-powered educational tool. It is NOT a SEBI-registered investment advisor.
          All analysis is for learning purposes only. Past performance does not guarantee future results.
          Always consult a certified financial advisor before investing.
        </p>
        <p className="mt-4 text-xs text-gray-300">&copy; {new Date().getFullYear()} MarketGuru</p>
      </div>
    </footer>
  );
}
