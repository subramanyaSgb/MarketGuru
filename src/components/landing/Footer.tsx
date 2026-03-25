import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">MG</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Market<span className="text-blue-600">Guru</span>
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400 dark:text-gray-500">
            <a href="#how-it-works" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">How it Works</a>
            <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">About</Link>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-slate-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed max-w-3xl mx-auto text-center">
            MarketGuru is an AI-powered educational tool. It is NOT a SEBI-registered investment advisor.
            All analysis is for learning purposes only. Past performance does not guarantee future results.
            Always consult a certified financial advisor before investing.
          </p>
          <p className="mt-4 text-xs text-gray-300 dark:text-gray-600 text-center">&copy; {new Date().getFullYear()} MarketGuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
