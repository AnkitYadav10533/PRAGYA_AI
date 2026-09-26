'use client';

import Link from 'next/link';
import React from 'react';

export default function Home() {
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

  return (
    <div className="relative flex-1 w-full overflow-hidden py-12 px-4 sm:px-6">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-96 -left-32 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-96 -right-32 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto space-y-14">
        {/* Hero Section */}
        <div className="text-center space-y-5 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 dark:bg-zinc-800/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>✨ Harmony-First Hackathon MVP Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.1]">
            PRAGYA <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Classroom FLN Diagnostic Assistant
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Explainable foundational numeracy diagnosis for <strong>2-digit subtraction with regrouping</strong>. Empowers primary teachers with evidence-driven traces, human-in-the-loop verification, and targeted CPA remedial interventions.
          </p>

          {/* Primary CTA Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/assess?studentId=s-01"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2.5"
            >
              <span className="text-amber-300">⭐</span>
              <span>Launch Golden Demo Journey (Aarav Patel)</span>
              <span className="text-indigo-200">→</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold text-sm text-zinc-800 dark:text-zinc-200 shadow-xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
            >
              📊 View Class 3-A Dashboard
            </Link>
          </div>
        </div>

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
    </div>
  );
}

