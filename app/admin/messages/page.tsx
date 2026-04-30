'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Trash2, Mail, MailOpen, Clock, User,
  CheckCircle, ChevronLeft, ChevronRight, Filter, X
} from 'lucide-react';

const initialMessages = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', subject: 'Dashboard Development', message: "Hi Datta, we're looking to build a sales KPI tracker for our Q3 launch. Your portfolio looks impressive. Are you available for a discovery call next week?", date: '2 hours ago', read: false },
  { id: 2, name: 'Mike Ross', email: 'mike@startup.io', subject: 'Data Analytics Consulting', message: "Hey! Need help optimizing our SQL queries and building some basic reports in Power BI. We're a team of 10. What are your rates?", date: '5 hours ago', read: true },
  { id: 3, name: 'Priya Verma', email: 'priya@retail.in', subject: 'Automation Solutions', message: "Our HR team is drowning in manual Excel work. We need someone to automate our payroll reports using Python. Can you help?", date: 'Yesterday', read: true },
  { id: 4, name: 'Alex Chen', email: 'alex@finance.hk', subject: 'Other', message: "Found your blog post on SQL window functions very helpful! Would love to connect on LinkedIn.", date: '2 days ago', read: true },
];

export default function MessagesInbox() {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<typeof initialMessages[0] | null>(null);
  const [search, setSearch] = useState('');

  const filtered = messages.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', height: 'calc(100vh - 200px)' }}>
      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search inbox..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.25rem',
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: '10px', color: '#0f172a', fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelected(msg)}
              style={{
                padding: '1.25rem',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
                background: selected?.id === msg.id ? '#f1f5f9' : 'transparent',
                position: 'relative',
                transition: 'background 0.2s'
              }}
            >
              {!msg.read && (
                <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: msg.read ? 600 : 800, fontSize: '0.875rem', color: '#0f172a' }}>{msg.name}</span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{msg.date}</span>
              </div>
              <div style={{ fontSize: '14px', color: msg.read ? '#64748b' : '#0f172a', fontWeight: msg.read ? 500 : 700, marginBottom: '0.25rem' }}>{msg.subject}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex gap-3 items-center">
                  <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontWeight: 600, fontSize: '14px' }}>
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>{selected.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{selected.email}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button style={{ background: 'rgba(201, 243, 29, 0.05)', border: '1px solid rgba(201, 243, 29, 0.2)', color: 'var(--accent)', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  <button style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Reply Message</button>
                </div>
              </div>

              <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
                <div className="flex items-center gap-2 mb-6" style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>
                  <Clock size={14} /> Received on {selected.date}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-0.01em' }}>{selected.subject}</h3>
                <div style={{ lineHeight: 1.8, color: '#334155', background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #f1f5f9', fontSize: '1rem' }}>
                  {selected.message}
                </div>
              </div>

              <div style={{ padding: '1.25rem 2.5rem', borderTop: '1px solid #f1f5f9', background: '#f8fafc' }}>
                <div style={{ color: '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                  <CheckCircle size={14} style={{ color: '#22c55e' }} /> This inquiry is tracked in your CRM
                </div>
              </div>
            </motion.div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Mail size={32} style={{ opacity: 0.5 }} />
              </div>
              <p style={{ fontWeight: 600 }}>Select a lead inquiry to view details</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
