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
    <div className="flex-1 w-full bg-gradient-to-b from-white via-zinc-50 to-indigo-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950/20 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <span>✨</span> Harmony-First Hackathon MVP Architecture
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            PRAGYA — Classroom FLN Diagnostic Assistant
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Explainable foundational numeracy diagnosis for <strong>2-digit subtraction with regrouping</strong>. Empowers primary teachers with evidence-driven traces, human-in-the-loop verification, and targeted CPA remedial interventions.
          </p>

          {/* Primary CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/assess?studentId=s-01"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>⭐</span>
              <span>Launch Golden Demo Journey (Aarav Patel)</span>
              <span>→</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 font-semibold text-sm text-zinc-800 dark:text-zinc-200 shadow-xs transition-colors"
            >
              📊 View Class 3-A Dashboard
            </Link>
          </div>
        </div>

        {/* Featured Golden Demo Card */}
        <div className="bg-white dark:bg-zinc-900 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Deterministic Demo Case (Roll 1: Aarav Patel)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              The Classic Regrouping Error: 83 − 47 = 46
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Student borrowed 10 into ones ($13 − 7 = 6$), but forgot to decrement the tens digit ($8 − 4 = 4$ instead of $7 − 4 = 3$). PRAGYA detects the slip mathematically, isolates 2 verdict-bearing checks, enables teacher verification, and coordinates remedial activity <em>Borrow & Build</em>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/assess?studentId=s-01"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center shadow-xs transition-all"
            >
              Step 1: Assess (46 on Q3)
            </Link>
            <Link
              href="/diagnose?studentId=s-01"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 text-xs font-bold text-center text-zinc-800 dark:text-zinc-200 shadow-xs transition-all"
            >
              Step 2: Verify Diagnosis
            </Link>
          </div>
        </div>

        {/* 7-Step Conveyor Belt Workflow */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              End-to-End Conveyor Belt
            </span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              The 7 Harmonized Steps of PRAGYA
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {steps.map((st) => (
              <Link
                key={st.num}
                href={st.href}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-700 rounded-2xl p-5 shadow-xs transition-all hover:scale-[1.01] flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {st.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                      {st.badge}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-2">
                    {st.title}
                  </h4>
                  <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 block mt-0.5">
                    {st.layer}
                  </span>

                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Explore Step</span>
                  <span>→</span>
                </div>
              </Link>
            ))}

            {/* Step 8 summary card */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-200 px-2 py-0.5 rounded bg-emerald-800/60 inline-block">
                  Outcome
                </span>
                <h4 className="font-bold text-lg mt-2">Measurable Progress</h4>
                <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                  Before vs After comparison calculated strictly from counts: 2/5 (40%) → 5/5 (100%) = +60% FLN improvement.
                </p>
              </div>

              <Link
                href="/reassess?studentId=s-01"
                className="mt-4 w-full py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs text-center shadow-xs hover:bg-emerald-50 transition-colors"
              >
                Inspect Reassessment
              </Link>
            </div>
          </div>
        </div>

        {/* Architectural Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-2xl">🛡</span>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Deterministic Rule Engine
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              No generative LLM guessing scores, verdicts, or evidence. All diagnostic checks are mathematically computed in pure functions.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-2xl">👩‍🏫</span>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Teacher in the Loop
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              PRAGYA provides evidence and suggestions; the teacher has ultimate authority to Accept, Reject, or Change the confirmed gap.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-2xl">🧱</span>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              CPA Remedial Pedagogy
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Targets the root misunderstanding using physical base-10 manipulatives (Concrete), place value charts (Representational), and standard subtraction (Abstract).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
