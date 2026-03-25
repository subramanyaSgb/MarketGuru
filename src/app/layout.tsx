import type { Metadata } from "next";
import ThemeProvider from "@/components/ui/ThemeProvider";
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
