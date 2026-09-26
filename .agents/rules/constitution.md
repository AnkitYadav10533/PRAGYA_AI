# PRAGYA — Antigravity Development Constitution

## Core Mandates & Invariants
- **Domain**: 2-digit subtraction with regrouping. No other domains.
- **Workflow**: Assess → Trace → Diagnose → Verify → Group → Intervene → Reassess.
- **Contract Freeze**: `lib/types.ts` is the shared contract. Changes must be justified and communicated.
- **Diagnostic Engine**: Deterministic rules in `lib/engine.ts`. No AI hallucinating verdicts or scores.
- **Storage**: `localStorage` only.
- **Seeded Data**: 30 deterministic students in `lib/mock.ts`.
- **Teacher Verification**: Accept / Reject / Change options for every diagnosis.
- **Demo Case**: `83 - 47 = 46` (correct 36). Error: borrowed 10 into ones (13 - 7 = 6) but forgot to decrement tens (8 - 4 = 4).
- **Verify Screen**: 2 verdict-bearing diagnostic checks + 1 warm-up/support question.
- **Data Integrity**: Counts first (e.g. 3/10), calculate percentages, no hardcoded metrics in UI.
- **Ownership**:
  - Abhay: `lib/types.ts`, `lib/engine.ts`, `lib/mock.ts`, `lib/activities.ts`.
  - Ankit: `app/class/`, `app/assess/`, `components/assessment/`.
  - Abhinav: `app/dashboard/`, `app/diagnose/`, `app/groups/`, `app/intervene/`, `app/reassess/`, `components/dashboard/`.
