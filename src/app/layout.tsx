import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarketGuru — AI Trading Expert for Indian Stock Market",
  description: "Get real-time buy & sell signals powered by AI with 100 years of trading wisdom. Analyze NSE/BSE stocks with expert-level insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
