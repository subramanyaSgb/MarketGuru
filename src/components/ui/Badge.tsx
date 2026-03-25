type Variant = "buy" | "sell" | "hold";

const styles: Record<Variant, string> = {
  buy: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20",
  sell: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20",
  hold: "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20",
};

export default function Badge({ variant, children, pulse, size = "md" }: { variant: Variant; children: React.ReactNode; pulse?: boolean; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "px-2.5 py-0.5 text-xs" : size === "lg" ? "px-6 py-2.5 text-lg" : "px-4 py-1.5 text-sm";
  return (
    <span className={`inline-flex items-center rounded-lg font-bold ${sizeClass} ${styles[variant]} ${pulse ? "animate-signal-pulse" : ""}`}>
      {children}
    </span>
  );
}
