import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-100 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">MG</span>
            </div>
            <span className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Market<span className="text-blue-600">Guru</span>
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#how-it-works" className="hover:text-gray-600 transition-colors">How it Works</a>
            <a href="#about" className="hover:text-gray-600 transition-colors">About</a>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 leading-relaxed max-w-3xl mx-auto text-center">
            MarketGuru is an AI-powered educational tool. It is NOT a SEBI-registered investment advisor.
            All analysis is for learning purposes only. Past performance does not guarantee future results.
            Always consult a certified financial advisor before investing.
          </p>
          <p className="mt-4 text-xs text-gray-300 text-center">&copy; {new Date().getFullYear()} MarketGuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
