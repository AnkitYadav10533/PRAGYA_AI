'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/shared/Button';
import { getTranslation, Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('pragya_lang') as Language;
    if (saved === 'hi' || saved === 'en') {
      setLang(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang: Language = lang === 'en' ? 'hi' : 'en';
    setLang(nextLang);
    localStorage.setItem('pragya_lang', nextLang);
    window.dispatchEvent(new Event('language_changed'));
  };

  const navLinks = [
    { href: '/dashboard', label: lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: '📊' },
    { href: '/class', label: lang === 'hi' ? 'कक्षा ३-अ' : 'Class 3-A', icon: '🏫' },
    { href: '/assess', label: lang === 'hi' ? 'आकलन' : 'Assess', icon: '📝' },
    { href: '/diagnose', label: lang === 'hi' ? 'निदान व सत्यापन' : 'Diagnose & Verify', icon: '🔍' },
    { href: '/groups', label: lang === 'hi' ? 'समूह' : 'Groups', icon: '👥' },
    { href: '/intervene', label: lang === 'hi' ? 'हस्तक्षेप' : 'Intervene', icon: '🛠' },
    { href: '/reassess', label: lang === 'hi' ? 'प्रगति' : 'Progress', icon: '📈' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              प्र
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                PRAGYA
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {getTranslation(lang, 'fln_tag')}
                </span>
              </span>
              <p className="text-[11px] text-zinc-500 leading-none hidden sm:block">
                {getTranslation(lang, 'brand_sub')}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60',
                  isActive &&
                    'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-semibold'
                )}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Language Toggle & Golden Demo */}
        <div className="flex items-center gap-2">
          {/* Bilingual Toggle Button */}
          <button
            onClick={toggleLanguage}
            title="Toggle between English and हिन्दी"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-200"
          >
            <span>🌐</span>
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          <Link href="/assess?studentId=s-01">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <span>⭐</span>
              <span className="hidden sm:inline">Golden Demo</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
