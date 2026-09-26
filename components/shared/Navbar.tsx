'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/class', label: 'Class 3-A', icon: '🏫' },
    { href: '/assess', label: 'Assess', icon: '📝' },
    { href: '/diagnose', label: 'Diagnose & Verify', icon: '🔍' },
    { href: '/groups', label: 'Groups', icon: '👥' },
    { href: '/intervene', label: 'Intervene', icon: '🛠' },
    { href: '/reassess', label: 'Progress', icon: '📈' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/30 transition-all duration-200">
              प्र
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                PRAGYA
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 dark:from-indigo-950/80 dark:to-violet-950/80 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs">
                  FLN MVP
                </span>
              </span>
              <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-none hidden sm:block">
                Subtraction Diagnostic Assistant
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/60 dark:bg-zinc-900/60 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5',
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/50 dark:hover:bg-zinc-800/40'
                )}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Golden Demo Quick Action */}
        <div className="flex items-center gap-2">
          <Link href="/assess?studentId=s-01">
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="text-amber-300">⭐</span>
              <span className="hidden sm:inline">Launch</span> Golden Demo
            </Button>
          </Link>
        </div>
      </div>
    </header>

  );
}
