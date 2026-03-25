import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MarketGuru
      </Link>
      <div className="flex items-center gap-6">
        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          How it Works
        </a>
        <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          About
        </a>
      </div>
    </nav>
  );
}
