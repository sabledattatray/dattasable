'use client';
import React from "react";
import Sidebar from "@/components/notus/Sidebar";
import AdminNavbar from "@/components/notus/AdminNavbar";
import HeaderStats from "@/components/notus/HeaderStats";

export default function AdminNotusLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          {/* Footer could go here */}
        </div>
      </div>
    </div>
  );
}
