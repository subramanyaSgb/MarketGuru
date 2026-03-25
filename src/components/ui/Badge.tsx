type Variant = "buy" | "sell" | "hold";

const styles: Record<Variant, string> = {
  buy: "bg-green-100 text-green-700 border-green-300",
  sell: "bg-red-100 text-red-700 border-red-300",
  hold: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export default function Badge({ variant, children, pulse }: { variant: Variant; children: React.ReactNode; pulse?: boolean }) {
  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${styles[variant]} ${pulse ? "animate-pulse" : ""}`}>
      {children}
    </span>
  );
}
