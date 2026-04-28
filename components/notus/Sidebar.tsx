'use client';
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Settings, Table, Map, 
  Fingerprint, ClipboardList, Newspaper, UserCircle,
  Menu, X, Bell, User
} from "lucide-react";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();

  const activeClass = "text-blue-500 hover:text-blue-600";
  const inactiveClass = "text-slate-700 hover:text-slate-500";

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={16} />, href: "/admin" },
    { label: "Settings", icon: <Settings size={16} />, href: "/admin/settings" },
    { label: "Blog", icon: <Newspaper size={16} />, href: "/admin/blog" },
    { label: "Portfolio", icon: <Table size={16} />, href: "/admin/projects" },
  ];

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <Menu />
          </button>
          
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            href="/admin"
          >
            Nexus Control
          </Link>
          
          {/* User Mobile */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative mr-4">
              <Bell size={20} className="text-slate-500" />
            </li>
            <li className="inline-block relative">
              <User size={20} className="text-slate-500" />
            </li>
          </ul>
          
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded transition-all duration-300 " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    href="/admin"
                  >
                    Nexus Control
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <X />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Management
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="items-center">
                    <Link
                      className={
                        "text-xs uppercase py-3 font-bold block flex items-center gap-3 " +
                        (isActive ? activeClass : inactiveClass)
                      }
                      href={item.href}
                    >
                      <span className={isActive ? "text-blue-500" : "text-slate-300"}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              External Links
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block flex items-center gap-3"
                  href="/"
                >
                  <Newspaper size={16} className="text-slate-300" />
                  View Website
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
