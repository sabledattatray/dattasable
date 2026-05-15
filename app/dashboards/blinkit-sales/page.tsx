import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Blinkit Sales Dashboard | Quick Commerce Analytics",
  description: "Comprehensive Blinkit sales performance and quick commerce analytics dashboard. Explore live interactive data by Datta Sable.",
  openGraph: {
    title: "Blinkit Sales Dashboard | Quick Commerce Analytics",
    description: "Interactive quick commerce analytics infrastructure. Real-time sales velocity and conversion tracking.",
    images: ["/images/dashboards/blinkit_sales_dashboard.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blinkit Sales Dashboard | Quick Commerce Analytics",
    images: ["/images/dashboards/blinkit_sales_dashboard.png"],
  },
};

export default function BlinkitSalesDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-['Exo_2'] flex flex-col">
      <Navbar />
      
      <div className="boxed-wrapper !max-w-[1440px] !mt-24 !mx-auto !min-h-screen border-none shadow-none bg-transparent flex flex-col w-full p-4 md:p-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent2)] to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">🛒</div>
              <div>
                <div className="font-['Rajdhani'] text-3xl font-bold tracking-[2px] text-[var(--text)]">BLINKIT<span className="text-[var(--accent2)]">SALES</span></div>
                <div className="text-[11px] text-[var(--muted)] tracking-[2px] -mt-1 uppercase font-medium">Quick Commerce Analytics Infrastructure</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[#00ff88] font-medium text-xs">
                 <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_6px_#00ff88]"></div>
                 LIVE PREVIEW
               </div>
            </div>
          </div>
        </header>

        {/* The Dashboard iframe cleanly embedded as a content block */}
        <div className="w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[var(--surface)]">
          <iframe
            src="/Dashboard/blinkit-dashboard.html"
            className="w-full"
            style={{ height: '1200px', border: 'none', display: 'block' }}
            title="Blinkit Sales Dashboard"
            allowFullScreen
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
