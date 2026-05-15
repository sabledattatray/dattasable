import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SurgicalAIDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-['Exo_2'] flex flex-col">
      <Navbar />
      
      <div className="boxed-wrapper !max-w-[1440px] !mt-24 !mx-auto !min-h-screen border-none shadow-none bg-transparent flex flex-col w-full p-4 md:p-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6ee7ff] to-[#7c5cff] rounded-xl flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(110,231,255,0.2)]">⚡</div>
              <div>
                <div className="font-['Rajdhani'] text-3xl font-bold tracking-[2px] text-[var(--text)]">SURGICAL<span className="text-[#6ee7ff]">AI</span></div>
                <div className="text-[11px] text-[var(--muted)] tracking-[2px] -mt-1 uppercase font-medium">Enterprise Workflow Intelligence Workspace</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-[#3df7b8]/10 border border-[#3df7b8]/20 rounded-full text-[#3df7b8] font-medium text-xs">
                 <div className="w-1.5 h-1.5 bg-[#3df7b8] rounded-full animate-pulse shadow-[0_0_6px_#3df7b8]"></div>
                 SYSTEM STABLE
               </div>
            </div>
          </div>
        </header>

        {/* The Dashboard iframe cleanly embedded as a content block */}
        <div className="w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[var(--surface)]">
          <iframe
            src="/Dashboard/surgical-ai-workspace.html"
            className="w-full"
            style={{ height: '1100px', border: 'none', display: 'block' }}
            title="Surgical AI Workspace Dashboard"
            allowFullScreen
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
