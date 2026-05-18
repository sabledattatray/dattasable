'use client';
import React from 'react';

export default function AdminDashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-dashboard-container" style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      {children}
    </div>
  );
}
