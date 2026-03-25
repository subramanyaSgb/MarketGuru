"use client";
import { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  Time,
  ColorType,
  CandlestickSeries,
} from "lightweight-charts";
import { CandleData } from "@/lib/types";

interface LiveChartProps {
  candles: CandleData[];
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
}

const TIMEFRAMES = ["1min", "5min", "15min", "1hr", "1D"];

export default function LiveChart({ candles, timeframe, onTimeframeChange }: LiveChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Check dark mode
    const isDark = document.documentElement.classList.contains('dark');

    const chartHeight = window.innerWidth < 640 ? 300 : 400;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: isDark ? "#111827" : "#FFFFFF" },
        textColor: isDark ? "#94a3b8" : "#64748B",
      },
      grid: {
        vertLines: { color: isDark ? "#1e293b" : "#F1F5F9" },
        horzLines: { color: isDark ? "#1e293b" : "#F1F5F9" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartHeight,
      crosshair: {
        mode: 0,
      },
      rightPriceScale: {
        borderColor: isDark ? "#334155" : "#E2E8F0",
      },
      timeScale: {
        borderColor: isDark ? "#334155" : "#E2E8F0",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#16A34A",
      downColor: "#DC2626",
      borderDownColor: "#DC2626",
      borderUpColor: "#16A34A",
      wickDownColor: "#DC2626",
      wickUpColor: "#16A34A",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (chartContainerRef.current) {
        const newHeight = window.innerWidth < 640 ? 300 : 400;
        chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: newHeight });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !candles.length) return;

    const chartData: CandlestickData[] = candles.map((c) => ({
      time: c.time as Time,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    seriesRef.current.setData(chartData);
    chartRef.current?.timeScale().fitContent();
  }, [candles]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Chart</span>
        </div>
        <div className="flex gap-1 bg-gray-50 dark:bg-slate-800 p-1 rounded-xl">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[11px] md:text-xs font-bold transition-all ${
                timeframe === tf
                  ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
}
