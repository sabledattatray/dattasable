'use client';
import { motion } from 'framer-motion';
import { Users, Star, MessageSquare, CheckCircle, XCircle, Search } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Product Manager', company: 'TechCorp', content: 'Datta is a master of Tableau. Our reports are now 10x faster.', status: 'Approved', rating: 5 },
  { id: 2, name: 'Mike Ross', role: 'Founder', company: 'Startup.io', content: 'The automation solutions Datta built saved us 20 hours a week.', status: 'Pending', rating: 5 },
];

export default function AdminTestimonials() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Client Testimonials</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Review and approve client feedback for your portfolio</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search feedback..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 transition-colors shadow-sm placeholder-slate-400 font-medium" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex justify-between items-start mb-5">
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={15} fill="currentColor" stroke="currentColor" />)}
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                t.status === 'Approved' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                  : 'bg-blue-50 text-blue-700 border border-blue-100'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'Approved' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                {t.status}
              </span>
            </div>
            <p className="text-slate-600 font-medium italic text-[14px] leading-relaxed mb-6 flex-1">
              "{t.content}"
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-bold text-sm select-none shadow-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-400 font-semibold">{t.role} @ {t.company}</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all border-none flex items-center justify-center cursor-pointer" title="Approve"><CheckCircle size={16} /></button>
                <button className="w-9 h-9 rounded-lg bg-red-50 text-red-650 hover:bg-red-150 transition-all border-none flex items-center justify-center cursor-pointer" title="Decline"><XCircle size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
