import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Sales Pipeline Velocity Dashboard | Revenue Analytics",
  description: "Advanced B2B sales pipeline analytics and forecasting dashboard. Track deal movement and optimize conversion rates.",
  openGraph: {
    title: "Sales Pipeline Velocity | Revenue Analytics",
    description: "Interactive B2B sales pipeline infrastructure. Real-time deal tracking and quarterly forecasting.",
    images: ["/images/dashboards/sales_pipeline_preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Pipeline Velocity | Revenue Analytics",
    images: ["/images/dashboards/sales_pipeline_preview.png"],
  },
};

export default function SalesPipelineDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-['Exo_2'] flex flex-col">
      <Navbar />
      
      <div className="boxed-wrapper !max-w-[1440px] !mt-24 !mx-auto !min-h-screen border-none shadow-none bg-transparent flex flex-col w-full p-4 md:p-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-green-600 rounded-xl flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(201,243,29,0.2)]">📈</div>
              <div>
                <div className="font-['Rajdhani'] text-3xl font-bold tracking-[2px] text-[var(--text)]">SALES<span className="text-[var(--accent)]">PIPELINE</span></div>
                <div className="text-[11px] text-[var(--muted)] tracking-[2px] -mt-1 uppercase font-medium">B2B Revenue Analytics & Forecasting</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-[var(--accent)] font-medium text-xs">
                 <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse shadow-[0_0_6px_var(--accent)]"></div>
                 LIVE DATA
               </div>
            </div>
          </div>
        </header>

        {/* The Dashboard iframe cleanly embedded as a content block */}
        <div className="w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[var(--surface)]">
          <iframe
            src="/Dashboard/sales_pipeline_dashboard.html"
            className="w-full"
            style={{ height: '1100px', border: 'none', display: 'block' }}
            title="Sales Pipeline Dashboard"
            allowFullScreen
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
