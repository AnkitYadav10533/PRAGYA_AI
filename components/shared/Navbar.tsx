'use client';

import {
  Activity,
  ArrowRight,
  BarChart3,
  ChevronDown,
  Home,
  Languages,
  Lightbulb,
  PenLine,
  Rocket,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { getTranslation, Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  // Dynamic glass island effect on scroll
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
    {
      href: '/dashboard',
      label: lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard',
      icon: Home,
      bg: 'bg-slate-100 dark:bg-zinc-800',
      color: 'text-slate-700 dark:text-zinc-200',
    },
    {
      href: '/class',
      label: lang === 'hi' ? 'कक्षा ३-अ' : 'Class 3-A',
      icon: Users,
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
      color: 'text-indigo-600 dark:text-indigo-300',
    },
    {
      href: '/assess',
      label: lang === 'hi' ? 'आकलन' : 'Assess',
      icon: PenLine,
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      color: 'text-emerald-600 dark:text-emerald-300',
    },
    {
      href: '/diagnose',
      label: lang === 'hi' ? 'निदान व सत्यापन' : 'Diagnose & Verify',
      icon: Activity,
      bg: 'bg-purple-50 dark:bg-purple-950/60',
      color: 'text-purple-600 dark:text-purple-300',
    },
    {
      href: '/groups',
      label: lang === 'hi' ? 'समूह' : 'Groups',
      icon: Users,
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      color: 'text-amber-600 dark:text-amber-300',
    },
    {
      href: '/intervene',
      label: lang === 'hi' ? 'हस्तक्षेप' : 'Intervene',
      icon: Lightbulb,
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      color: 'text-rose-600 dark:text-rose-300',
    },
    {
      href: '/reassess',
      label: lang === 'hi' ? 'प्रगति' : 'Progress',
      icon: BarChart3,
      bg: 'bg-sky-50 dark:bg-sky-950/60',
      color: 'text-sky-600 dark:text-sky-300',
    },
  ];

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full max-w-[1440px] mx-auto px-2 sm:px-4 transition-all duration-300">
      <div
        className={cn(
          'relative rounded-[26px] sm:rounded-[34px] transition-all duration-300 px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 overflow-hidden border border-white/90 dark:border-zinc-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.07)] backdrop-blur-xl',
          isScrolled
            ? 'bg-gradient-to-r from-purple-100/90 via-white/95 to-amber-50/90 dark:from-zinc-900/95 dark:via-zinc-900/95 dark:to-zinc-900/95 scale-[0.99] py-1.5 sm:py-2 shadow-[0_10px_35px_rgba(31,38,135,0.12)]'
            : 'bg-gradient-to-r from-purple-100/80 via-white/90 to-amber-50/80 dark:from-zinc-900/90 dark:via-zinc-900/90 dark:to-zinc-900/90'
        )}
      >
        {/* Decorative Dotted Flight Trajectory Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 120 35 Q 260 5 440 25 T 820 20 T 1250 15"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
        </svg>

        {/* Floating Paper Airplane Accent */}
        <div className="absolute top-2 left-64 pointer-events-none hidden xl:block text-indigo-400/80">
          <svg className="w-5 h-5 -rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-6.054-2.685z" />
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute -left-10 -top-10 w-44 h-44 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-400/15 dark:bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* 1. LEFT: Brand Mascot Logo & Title */}
        <div className="relative z-10 flex items-center shrink-0">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            {/* Mascot Avatar Illustration */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl overflow-hidden drop-shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo_pragya.png"
                alt="PRAGYA Mascot"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Typography & Badge */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#172755] dark:text-zinc-50 flex items-center">
                  Pragy
                  <span className="relative inline-flex items-center justify-center text-amber-500">
                    A
                    <span className="absolute -top-1.5 text-amber-400 text-xs select-none">
                      ☀️
                    </span>
                  </span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e8edfc] text-[#3451b2] dark:bg-indigo-950/80 dark:text-indigo-300 border border-[#d2defc] dark:border-indigo-800/60 shadow-2xs">
                  {getTranslation(lang, 'fln_tag')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] font-bold text-slate-500 dark:text-zinc-400 tracking-tight leading-tight hidden xs:flex">
                <span className="text-amber-400 text-[9px]">✦</span>
                <span>{getTranslation(lang, 'brand_sub')}</span>
                <span className="text-amber-400 text-[9px]">✦</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 2. CENTER: Floating Capsule with Stacked Tabs & Active Gradient Pill */}
        <nav className="relative z-10 hidden xl:flex items-center bg-white/95 dark:bg-zinc-900/95 px-2.5 py-1.5 rounded-full border border-slate-200/60 dark:border-zinc-800 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const IconComponent = link.icon;

            if (isActive) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg shadow-indigo-500/35 font-bold text-xs sm:text-[13px] whitespace-nowrap transition-all scale-100 hover:scale-[1.02]"
                >
                  <Activity className="w-4 h-4 text-white animate-pulse" />
                  <span>{link.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center justify-center px-3 py-0.5 rounded-2xl hover:bg-slate-50/90 dark:hover:bg-zinc-800/60 transition-all cursor-pointer"
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs',
                    link.bg,
                    link.color
                  )}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white tracking-tight mt-0.5 whitespace-nowrap">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT: Language Selector, Golden Demo Action & Book Illustration Accent */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Bilingual Language Pill Button */}
          <button
            onClick={toggleLanguage}
            title="Toggle between English and हिन्दी"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border border-slate-200/90 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 shadow-xs transition-all cursor-pointer hover:border-slate-300"
          >
            <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Golden Demo CTA Action Button */}
          <Link href="/assess?studentId=s-01">
            <button className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-900 font-black text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-amber-400/35 hover:shadow-amber-400/50 flex items-center gap-1.5 sm:gap-2 border border-amber-300/90 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer whitespace-nowrap">
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-900 fill-slate-900/30" />
              <span>Launch Golden Demo</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
            </button>
          </Link>

          {/* Book with Leaves Decorative Accent */}
          <div className="relative hidden 2xl:flex items-center gap-1 pl-1 pointer-events-none select-none">
            <span className="text-xl">📖</span>
            <span className="text-emerald-500 text-xs font-bold">🌿</span>
            <span className="text-amber-400 text-[10px]">✦</span>
          </div>
        </div>
      </div>
    </header>
  );
}
