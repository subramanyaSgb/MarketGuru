type Source = "groww" | "yahoo" | "google" | "cached";

const config: Record<Source, { label: string; dot: string; bg: string }> = {
  groww: { label: "LIVE \u2014 Groww", dot: "bg-emerald-400", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  yahoo: { label: "LIVE \u2014 Yahoo", dot: "bg-amber-400", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  google: { label: "LIVE \u2014 Google", dot: "bg-amber-400", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  cached: { label: "DELAYED \u2014 Cached", dot: "bg-red-400", bg: "bg-red-50 text-red-700 border-red-200" },
};

export default function SourceBadge({ source, cacheAge }: { source: Source; cacheAge?: string }) {
  const { label, dot, bg } = config[source];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${dot} ${source !== "cached" ? "animate-pulse" : ""}`} />
      {label}{cacheAge ? ` (${cacheAge})` : ""}
    </span>
  );
}
