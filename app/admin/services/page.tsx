'use client';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Edit2, Trash2, CheckCircle, Clock } from 'lucide-react';

const services = [
  { id: 1, title: 'Dashboard Development', price: '₹15,000', status: 'Active', orders: 12 },
  { id: 2, title: 'Data Analytics Consulting', price: '₹25,000', status: 'Active', orders: 8 },
  { id: 3, title: 'Automation Solutions', price: '₹20,000', status: 'Active', orders: 5 },
];

export default function AdminServices() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Service Catalog</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage your professional offerings and pricing</p>
        </div>
        <button className="bg-slate-950 hover:bg-slate-850 text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors w-full sm:w-auto text-center border-none cursor-pointer">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-850">
                <Briefcase size={20} />
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all border-none bg-none cursor-pointer"><Edit2 size={15} /></button>
                <button className="p-2 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all border-none bg-none cursor-pointer"><Trash2 size={15} /></button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <div className="text-2xl font-black text-slate-950 mb-6">{s.price}</div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {s.status}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <Clock size={13} />
                <span>{s.orders} deployments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
