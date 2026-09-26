'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // JS Scroll listener for dynamic glassmorphism island effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="sticky top-3 sm:top-4 z-50 w-full max-w-7xl mx-auto px-3 sm:px-6 transition-all duration-300">
      <div
        className={cn(
          'relative rounded-2xl sm:rounded-3xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 overflow-hidden',
          isScrolled
            ? 'glass-floating-island-scrolled scale-[0.99] py-2 sm:py-2.5'
            : 'glass-floating-island'
        )}
      >
        {/* Top Glass Specular Glare Line */}
        <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/30 to-transparent pointer-events-none" />

        {/* Ambient Glow Blob */}
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Logo & Name */}
        <div className="relative z-10 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300 border border-white/40">
              प्र
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                PRAGYA
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100/90 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs">
                  FLN MVP
                </span>
              </span>
              <p className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400 leading-none hidden md:block">
                Subtraction Diagnostic Assistant
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="relative z-10 hidden lg:flex items-center gap-1 bg-white/60 dark:bg-zinc-900/60 p-1.5 rounded-2xl border border-white/60 dark:border-zinc-800/80 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 relative',
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-white/80 dark:hover:bg-zinc-800/60'
                )}
              >
                <span className="text-xs">{link.icon}</span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Golden Demo Quick Action */}
        <div className="relative z-10 flex items-center gap-2">
          <Link href="/assess?studentId=s-01">
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-200 text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 border border-white/30"
            >
              <span className="text-amber-300 animate-pulse">⭐</span>
              <span className="hidden sm:inline">Launch</span> Golden Demo
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
