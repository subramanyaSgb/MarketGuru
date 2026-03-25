"use client";
import { useState, useEffect } from "react";

export default function DisclaimerModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem("mg-disclaimer-ack");
    if (!acknowledged) setShow(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mg-disclaimer-ack", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm md:max-w-lg w-full mx-4 p-5 md:p-8 shadow-2xl ring-1 ring-gray-200 dark:ring-slate-700 bg-gradient-to-b from-white to-gray-50/80 dark:from-slate-900 dark:to-slate-800/80">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Before You Begin</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Please acknowledge the following to continue:</p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">1</span>
            <span className="text-gray-700 dark:text-gray-300">I understand MarketGuru provides AI-generated educational analysis</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">2</span>
            <span className="text-gray-700 dark:text-gray-300">I will not treat signals as guaranteed financial advice</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">3</span>
            <span className="text-gray-700 dark:text-gray-300">I am responsible for my own trading decisions</span>
          </li>
        </ul>
        <button
          onClick={handleAccept}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25"
        >
          I Understand, Continue
        </button>
      </div>
    </div>
  );
}
