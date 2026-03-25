"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`w-full px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "glass shadow-sm" : "bg-transparent"
    }`}>
      <Link href="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-bold text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>MG</span>
        </div>
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          Market<span className="text-blue-600">Guru</span>
        </span>
      </Link>
      <div className="flex items-center gap-8">
        <a href="#how-it-works" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm font-medium transition-colors">
          How it Works
        </a>
        <Link href="/about" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm font-medium transition-colors">
          About
        </Link>
        <ThemeToggle />
        <a href="#hero-search" className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/25">
          Get Started
        </a>
      </div>
    </nav>
  );
}
