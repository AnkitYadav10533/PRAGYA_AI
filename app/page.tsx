'use client';

import {
  ArrowRight,
  Lightbulb,
  Play,
  Rocket,
  ScanSearch,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Home() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const steps = [
    {
      num: 1,
      title: 'Assessment',
      layer: '🟦 Ankit (Input)',
      desc: 'Fixed 5-item subtraction assessment with manual or simulated OCR input.',
      href: '/assess?studentId=s-01',
      badge: 'Capture',
    },
    {
      num: 2,
      title: 'OCR & Trace',
      layer: '🟨 Abhay (Intelligence)',
      desc: 'Decomposes student responses into mathematical error signatures.',
      href: '/diagnose?studentId=s-01',
      badge: 'Analyze',
    },
    {
      num: 3,
      title: 'Diagnosis',
      layer: '🟨 Abhay (Intelligence)',
      desc: 'Two verdict-bearing checks + one warm-up baseline check isolate the gap.',
      href: '/diagnose?studentId=s-01',
      badge: 'Suggest',
    },
    {
      num: 4,
      title: 'Teacher Verify',
      layer: '🟪 Abhinav (Action)',
      desc: 'Teacher exercises ultimate agency: [ Accept ] [ Reject ] [ Change ].',
      href: '/diagnose?studentId=s-01',
      badge: 'Decide',
    },
    {
      num: 5,
      title: 'Group',
      layer: '🟪 Abhinav (Action)',
      desc: 'Students grouped deterministically around confirmed learning gaps.',
      href: '/groups',
      badge: 'Cluster',
    },
    {
      num: 6,
      title: 'Intervene',
      layer: '🟪 Abhinav (Action)',
      desc: 'Concrete-Representational-Abstract (CPA) manipulative activities.',
      href: '/intervene?studentId=s-01',
      badge: 'Remediate',
    },
    {
      num: 7,
      title: 'Reassess',
      layer: '🟪 Abhinav (Action)',
      desc: 'Same-skill measurement with raw before/after counts (+60% net growth).',
      href: '/reassess?studentId=s-01',
      badge: 'Measure',
    },
  ];

  const featureCards = [
    {
      title: 'Diagnose Learning Gaps',
      icon: ScanSearch,
      bg: 'bg-purple-100/90 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300',
      href: '/diagnose?studentId=s-01',
    },
    {
      title: 'Personalized Interventions',
      icon: Users,
      bg: 'bg-blue-100/90 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300',
      href: '/intervene?studentId=s-01',
    },
    {
      title: 'Track Progress',
      icon: TrendingUp,
      bg: 'bg-emerald-100/90 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300',
      href: '/reassess?studentId=s-01',
    },
    {
      title: 'Actionable Insights',
      icon: Lightbulb,
      bg: 'bg-amber-100/90 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300',
      href: '/dashboard',
    },
  ];

  return (
    <div className="relative flex-1 w-full overflow-hidden pb-16 px-3 sm:px-6">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-amber-200/20 via-indigo-300/15 to-purple-300/20 blur-3xl rounded-full" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* ======================================================== */}
        {/* HERO SECTION MATCHING REFERENCE DESIGN                    */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/95 via-indigo-50/20 to-amber-50/30 dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-zinc-950/90 shadow-[0_16px_50px_rgba(31,38,135,0.06)] backdrop-blur-xl p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4 relative z-10">
            {/* 1. LEFT COLUMN: Cheerful Girl at Math Desk */}
            <div className="hidden lg:flex lg:col-span-3 justify-center items-end relative">
              <div className="relative w-full max-w-[320px] rounded-3xl overflow-hidden drop-shadow-md hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/hero-girl.png"
                  alt="Student writing math in notebook"
                  width={340}
                  height={380}
                  className="w-full h-auto object-contain rounded-3xl"
                  priority
                />
              </div>
            </div>

            {/* 2. CENTER COLUMN: Core Branding, 4 Feature Cards, & CTAs */}
            <div className="lg:col-span-6 flex flex-col items-center text-center space-y-5 px-1 sm:px-2">
              {/* Top Sub-Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-amber-50/90 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/90 dark:border-amber-800/60 shadow-2xs">
                <span className="text-amber-500">✨</span>
                <span>AI-Powered FLN Diagnostic Assistant</span>
              </div>

              {/* Main Typography Header */}
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#162a5b] dark:text-zinc-50 flex items-center justify-center gap-2">
                  <span>PRAGYA</span>
                  <span className="relative inline-flex items-center text-amber-500">
                    Ai
                    <span className="absolute -top-3 -right-2 text-amber-400 text-sm select-none">
                      ☀️
                    </span>
                  </span>
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-[#1e293b] dark:text-zinc-200">
                  Foundations for a Brighter Tomorrow
                </h2>
              </div>

              {/* Explanatory Lead Paragraph */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium">
                AI-powered, evidence-driven FLN diagnostics that help teachers understand, support, and strengthen every child&apos;s learning journey in Mathematics.
              </p>

              {/* 4 Frosted Glass Feature Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full pt-1">
                {featureCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={card.title}
                      href={card.href}
                      className="group bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 border border-slate-200/70 dark:border-zinc-700/70 rounded-2xl p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.bg} transition-transform group-hover:scale-110 shadow-2xs`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-zinc-200 leading-tight">
                        {card.title}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 w-full">
                <Link
                  href="/assess?studentId=s-01"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-105 active:scale-100 flex items-center gap-2 border border-white/20 whitespace-nowrap"
                >
                  <Rocket className="w-4 h-4 fill-white/20" />
                  <span>Launch Classroom Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className="px-5 py-3.5 rounded-full bg-white/95 dark:bg-zinc-800/95 hover:bg-white dark:hover:bg-zinc-800 border border-slate-200/90 dark:border-zinc-700/90 text-slate-800 dark:text-zinc-200 font-extrabold text-xs sm:text-sm shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 cursor-pointer hover:border-slate-300"
                >
                  <Play className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Bottom Trust & Audience Row */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-zinc-800/80 flex items-center justify-center gap-4 sm:gap-6 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-amber-500">👥</span> For Teachers
                </span>
                <span className="text-slate-300 dark:text-zinc-700">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-indigo-500">🏫</span> For Schools
                </span>
                <span className="text-slate-300 dark:text-zinc-700">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-rose-500">❤️</span> For Every Child
                </span>
              </div>
            </div>

            {/* 3. RIGHT COLUMN: Friendly Robot with Progress Chart */}
            <div className="hidden lg:flex lg:col-span-3 justify-center items-end relative">
              <div className="relative w-full max-w-[320px] rounded-3xl overflow-hidden drop-shadow-md hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/hero-robot.png"
                  alt="Friendly AI Robot reading progress report"
                  width={340}
                  height={380}
                  className="w-full h-auto object-contain rounded-3xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Golden Demo Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/70 dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/70 rounded-3xl p-6 sm:p-9 shadow-md backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-600 text-white shadow-2xs">
                  Golden Demo Trace
                </span>
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                  Roll 1: Aarav Patel • Class 3-A
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                The Classic Regrouping Error: 83 − 47 = 46
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Student borrowed 10 into ones ($13 − 7 = 6$), but forgot to decrement the tens digit ($8 − 4 = 4$ instead of $7 − 4 = 3$). PRAGYA detects the slip mathematically, isolates 2 verdict-bearing checks, enables teacher verification, and coordinates remedial activity <em>Borrow & Build</em>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/assess?studentId=s-01"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold text-center shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
              >
                Step 1: Assess (46 on Q3)
              </Link>
              <Link
                href="/diagnose?studentId=s-01"
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:border-indigo-500 text-xs sm:text-sm font-bold text-center text-zinc-800 dark:text-zinc-200 shadow-2xs transition-all hover:scale-[1.02]"
              >
                Step 2: Verify Diagnosis →
              </Link>
            </div>
          </div>
        </div>

        {/* 7-Step Conveyor Belt Workflow */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              End-to-End Pipeline
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
              The 7 Harmonized Steps of PRAGYA
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              Every step connects with verified contracts and persists state across the entire classroom journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {steps.map((st) => (
              <Link
                key={st.num}
                href={st.href}
                className="glass-card hover:border-indigo-400 dark:hover:border-indigo-500 rounded-2xl p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                      {st.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
                      {st.badge}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100 mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {st.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mt-0.5">
                    {st.layer}
                  </span>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Step</span>
                  <span>→</span>
                </div>
              </Link>
            ))}

            {/* Step 8 outcome card */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-lg shadow-emerald-700/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-200 px-2.5 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-500/30 inline-block">
                  Verified Outcome
                </span>
                <h4 className="font-black text-xl mt-3">Measurable Progress</h4>
                <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                  Before vs After comparison calculated strictly from counts: <strong>2/5 (40%) → 5/5 (100%) = +60%</strong> FLN improvement.
                </p>
              </div>

              <Link
                href="/reassess?studentId=s-01"
                className="mt-4 w-full py-2.5 rounded-xl bg-white text-emerald-800 font-extrabold text-xs text-center shadow-xs hover:bg-emerald-50 transition-colors"
              >
                Inspect Reassessment →
              </Link>
            </div>
          </div>
        </div>

        {/* Architectural Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="glass-card rounded-2xl p-6 shadow-xs space-y-2.5 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
            <span className="text-3xl">🛡</span>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              Deterministic Rule Engine
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              No generative LLM guessing scores, verdicts, or evidence. All diagnostic checks are mathematically computed in pure functions.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-xs space-y-2.5 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
            <span className="text-3xl">👩‍🏫</span>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              Teacher in the Loop
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              PRAGYA provides evidence and suggestions; the teacher has ultimate authority to Accept, Reject, or Change the confirmed gap.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-xs space-y-2.5 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
            <span className="text-3xl">🧱</span>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              CPA Remedial Pedagogy
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Targets the root misunderstanding using physical base-10 manipulatives (Concrete), place value charts (Representational), and standard subtraction (Abstract).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Video / Product Tour Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRAGYA 60-Second Video Tour</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-zinc-50">
                How PRAGYA Works in Real Classrooms
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                Experience the 7-step evidence-driven FLN diagnostic conveyor belt in action.
              </p>
            </div>

            {/* Video Mockup Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 flex flex-col items-center justify-center p-6 text-center text-white space-y-3 shadow-inner">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/40 animate-pulse">
                <Play className="w-7 h-7 text-white fill-white ml-0.5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold">Interactive Live Demonstration Ready</p>
                <p className="text-xs text-indigo-200/80 font-mono">
                  Roll 1: Aarav Patel · 83 − 47 = 46 (Borrow Without Decrement)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                Ready to evaluate live?
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/assess?studentId=s-01"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 text-center whitespace-nowrap"
                >
                  Launch Golden Demo Journey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

