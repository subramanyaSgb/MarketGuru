import { NextRequest, NextResponse } from "next/server";

const POPULAR_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", exchange: "NSE" },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd", exchange: "NSE" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", exchange: "NSE" },
  { symbol: "INFY", name: "Infosys Ltd", exchange: "NSE" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", exchange: "NSE" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", exchange: "NSE" },
  { symbol: "ITC", name: "ITC Ltd", exchange: "NSE" },
  { symbol: "SBIN", name: "State Bank of India", exchange: "NSE" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", exchange: "NSE" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd", exchange: "NSE" },
  { symbol: "LT", name: "Larsen & Toubro Ltd", exchange: "NSE" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd", exchange: "NSE" },
  { symbol: "WIPRO", name: "Wipro Ltd", exchange: "NSE" },
  { symbol: "ADANIENT", name: "Adani Enterprises Ltd", exchange: "NSE" },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd", exchange: "NSE" },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd", exchange: "NSE" },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", exchange: "NSE" },
  { symbol: "TITAN", name: "Titan Company Ltd", exchange: "NSE" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", exchange: "NSE" },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd", exchange: "NSE" },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd", exchange: "NSE" },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd", exchange: "NSE" },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd", exchange: "NSE" },
  { symbol: "NTPC", name: "NTPC Ltd", exchange: "NSE" },
  { symbol: "POWERGRID", name: "Power Grid Corporation of India Ltd", exchange: "NSE" },
  { symbol: "ONGC", name: "Oil and Natural Gas Corporation Ltd", exchange: "NSE" },
  { symbol: "COALINDIA", name: "Coal India Ltd", exchange: "NSE" },
  { symbol: "JSWSTEEL", name: "JSW Steel Ltd", exchange: "NSE" },
  { symbol: "TECHM", name: "Tech Mahindra Ltd", exchange: "NSE" },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories Ltd", exchange: "NSE" },
  { symbol: "CIPLA", name: "Cipla Ltd", exchange: "NSE" },
  { symbol: "HEROMOTOCO", name: "Hero MotoCorp Ltd", exchange: "NSE" },
  { symbol: "EICHERMOT", name: "Eicher Motors Ltd", exchange: "NSE" },
  { symbol: "DIVISLAB", name: "Divi's Laboratories Ltd", exchange: "NSE" },
  { symbol: "APOLLOHOSP", name: "Apollo Hospitals Enterprise Ltd", exchange: "NSE" },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto Ltd", exchange: "NSE" },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd", exchange: "NSE" },
  { symbol: "BRITANNIA", name: "Britannia Industries Ltd", exchange: "NSE" },
  { symbol: "GRASIM", name: "Grasim Industries Ltd", exchange: "NSE" },
  { symbol: "NESTLEIND", name: "Nestle India Ltd", exchange: "NSE" },
  { symbol: "SBILIFE", name: "SBI Life Insurance Company Ltd", exchange: "NSE" },
  { symbol: "HDFCLIFE", name: "HDFC Life Insurance Company Ltd", exchange: "NSE" },
  { symbol: "TATACONSUM", name: "Tata Consumer Products Ltd", exchange: "NSE" },
  { symbol: "INDUSINDBK", name: "IndusInd Bank Ltd", exchange: "NSE" },
  { symbol: "ADANIPORTS", name: "Adani Ports and SEZ Ltd", exchange: "NSE" },
  { symbol: "M&M", name: "Mahindra & Mahindra Ltd", exchange: "NSE" },
  { symbol: "BPCL", name: "Bharat Petroleum Corporation Ltd", exchange: "NSE" },
  { symbol: "HINDALCO", name: "Hindalco Industries Ltd", exchange: "NSE" },
  { symbol: "VEDL", name: "Vedanta Ltd", exchange: "NSE" },
  { symbol: "ZOMATO", name: "Zomato Ltd", exchange: "NSE" },
];

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase() || "";
  if (q.length < 2) return NextResponse.json({ results: [] });

  const results = POPULAR_STOCKS.filter(
    (s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  ).slice(0, 8);

  return NextResponse.json({ results });
}
