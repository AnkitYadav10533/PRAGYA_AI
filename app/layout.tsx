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
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md py-4 px-6 text-center text-xs text-zinc-500">
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
      </body>
    </html>
  );
}
