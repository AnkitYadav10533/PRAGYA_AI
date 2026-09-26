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
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-4 px-6 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              <strong className="text-zinc-700 dark:text-zinc-300">PRAGYA</strong> — FLN Subtraction with Regrouping MVP • Deterministic Rule Engine
            </p>
            <p className="font-mono text-[11px] text-zinc-400">
              Demo Dataset: Class 3-A (30 Students) • LocalStorage Only
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
