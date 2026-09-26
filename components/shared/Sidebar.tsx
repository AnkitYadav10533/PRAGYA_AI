'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/assess', label: 'Assessments', icon: '📋' },
    { href: '/class', label: 'Students', icon: '👥' },
    { href: '/diagnose', label: 'Learning Gaps', icon: '🎯' },
    { href: '/intervene', label: 'Interventions', icon: '🛠' },
    { href: '/reassess', label: 'Reassessment', icon: '📈' },
  ];

  return (
    <>
      {/* Mobile Bar Toggle */}
      <div className="lg:hidden sticky top-0 z-50 bg-[#171C2C] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-amber-300 font-black text-base shadow-sm">
            💡
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white">PRAGYA</span>
            <span className="text-[10px] block leading-tight text-indigo-300 font-medium">FLN Learning Gap Agent</span>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Desktop / Collapsible Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-[#171C2C] text-slate-300 flex flex-col justify-between border-r border-slate-800/80 transition-transform duration-200 lg:translate-x-0 lg:static shrink-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/60">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center text-amber-300 text-xl font-bold shadow-md shadow-indigo-900/50 group-hover:scale-105 transition-transform">
              💡
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider text-white flex items-center gap-1.5">
                PRAGYA
              </h1>
              <p className="text-[11px] font-semibold text-indigo-300/90 leading-tight">
                FLN Learning Gap Agent
              </p>
            </div>
          </Link>
          <p className="text-[10px] text-slate-400 mt-2 font-medium italic">
            Don&apos;t just find the gap. Find the gap behind the gap.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">
            Main Menu
          </div>
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                )}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800/60">
            <Link
              href="/assess?studentId=s-01"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-md hover:brightness-110 transition-all"
            >
              <span>⭐</span>
              <span>Golden Demo (Aarav)</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section: Settings & Teacher Profile */}
        <div className="p-4 border-t border-slate-800/60 space-y-3 bg-[#131725]">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
            <span className="text-sm">⚙️</span>
            <span>Settings</span>
          </button>

          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
              👩‍🏫
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-100 truncate">Teacher</p>
              <p className="text-[10px] text-slate-400 truncate font-medium">Grade 3 • Section A</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
