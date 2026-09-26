import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Navbar } from '@/components/shared/Navbar';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PRAGYA — Classroom FLN Subtraction Diagnostic Assistant',
  description:
    'Evidence-driven 2-digit subtraction with regrouping diagnostic workflow for primary teachers: Assess, Trace, Diagnose, Verify, Group, Intervene, Reassess.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-zinc-900 dark:text-zinc-100 font-sans relative">
        {/* Hardware-accelerated fixed background with uniform, even white transparent mask */}
        <div className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform-gpu will-change-transform"
            style={{ backgroundImage: "url('/bg-classroom.jpg')" }}
          />
          {/* Even white transparent mask covering the entire background evenly */}
          <div className="absolute inset-0 bg-white/50 dark:bg-zinc-950/90" />
        </div>

        <div className="relative z-10 min-h-full flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 py-4 px-6 text-center text-xs text-zinc-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">PRAGYA</span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-zinc-600 dark:text-zinc-400">Classroom FLN Subtraction Diagnostic MVP</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Deterministic Engine
                </span>
              </div>
              <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                Demo Dataset: Class 3-A (30 Students) · LocalStorage Only · Zero Fake Percentages
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
