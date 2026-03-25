type Source = "groww" | "yahoo" | "google" | "cached";

const config: Record<Source, { label: string; color: string }> = {
  groww: { label: "LIVE \u2014 Groww", color: "bg-green-100 text-green-700" },
  yahoo: { label: "LIVE \u2014 Yahoo Finance", color: "bg-yellow-100 text-yellow-700" },
  google: { label: "LIVE \u2014 Google Finance", color: "bg-yellow-100 text-yellow-700" },
  cached: { label: "DELAYED \u2014 Cached", color: "bg-red-100 text-red-700" },
};

export default function SourceBadge({ source, cacheAge }: { source: Source; cacheAge?: string }) {
  const { label, color } = config[source];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${source === "cached" ? "bg-red-500" : source === "groww" ? "bg-green-500" : "bg-yellow-500"}`} />
      {label}{cacheAge ? ` (${cacheAge})` : ""}
    </span>
  );
}
