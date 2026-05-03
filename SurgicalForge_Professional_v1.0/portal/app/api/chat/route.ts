import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, fileName } = await req.json();

    // Neural Conversational Logic
    let reply = "";
    let query = null;
    const msg = message.toLowerCase();

    // --- AUTONOMOUS INTENT DETECTION (v1.9.7 + DEBUG TRACE) ---
    const isTotal = /total|sum|count|how many|volume|amount/i.test(msg);
    const isTarget = /record|row|transaction|sale|data|volume|result/i.test(msg);
    const isRisk = /risk|fraud|suspicious|anomaly/i.test(msg);
    const isTime = /time|slot|hourly|when|period/i.test(msg);

    if (isTotal && isTarget) {
      const isAgg = /amount|sale|volume|sum/i.test(msg);
      reply = `[v1.9.7] Calculating ${isAgg ? 'total volume' : 'record count'}... I am aggregating the primary metrics now.`;
      query = isAgg ? "SELECT SUM(Amount) as Total FROM data" : "SELECT COUNT(*) as Total FROM data";
    } else if (/top|ranking|best/i.test(msg) && /region|category|industry|type|area/i.test(msg)) {
      const dim = /region|area/i.test(msg) ? 'Region' : /category|type/i.test(msg) ? 'Category' : 'Industry';
      reply = `[v1.9.7] Slicing data by ${dim}... I am generating a ranking of the top performers.`;
      query = `SELECT ${dim}, COUNT(*) as Count, SUM(Amount) as Total_Volume FROM data GROUP BY 1 ORDER BY 3 DESC LIMIT 10`;
    } else if (isTime) {
      reply = "[v1.9.7] Analyzing temporal distribution... I am grouping transactions by time-slots.";
      query = "SELECT time_slot, COUNT(*) as Transactions FROM data GROUP BY 1 ORDER BY 1";
    } else if (isRisk) {
      reply = "[v1.9.7] Scanning for high-risk anomalies... I am extracting the top suspicious records.";
      query = "SELECT * FROM data ORDER BY Risk_Score DESC LIMIT 15";
    } else {
      reply = `[v1.9.7] Neural node active. (Debug: T=${isTotal}, D=${isTarget}). Try: 'Total rows' or 'How many records'.`;
    }

    return NextResponse.json({ reply, query });

  } catch (error) {
    return NextResponse.json({ reply: "Neural Link Interrupted." }, { status: 500 });
  }
}
