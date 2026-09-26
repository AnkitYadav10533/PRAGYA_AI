<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PRAGYA — Harmony-First Build Architecture

```
                 PRAGYA
                   │
                   ▼
        ┌─────────────────────┐
        │  1. ASSESSMENT      │  🟦 ANKIT (Input Layer)
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  2. OCR + TRACE     │  🟨 ABHAY (Intelligence Layer)
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  3. DIAGNOSIS       │  🟨 ABHAY (Intelligence Layer)
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  4. TEACHER VERIFY  │  🟪 ABHINAV (Decision & Action Layer)
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  5. GROUP           │  🟪 ABHINAV (Decision & Action Layer)
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  6. INTERVENE       │  🟪 ABHINAV (Decision & Action Layer)
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  7. REASSESS        │  🟪 ABHINAV (Decision & Action Layer)
        └──────────┬──────────┘
                   │
                   ▼
              PROGRESS
```

---

## 1. Clear Layer Ownership

### 🟦 ANKIT — INPUT LAYER
- **Question**: *"What did the student submit?"*
- **Owns**: `app/class/`, `app/assess/`, `components/assessment/`
- **Produces**: `StudentResponse[]` (with `questionId`, `rawAnswer`, `studentAnswer`, `ocrConfidence`)
- **Rule**: Never independently decide the learning gap.

### 🟨 ABHAY — INTELLIGENCE LAYER
- **Question**: *"What does the student's response tell us?"*
- **Owns**: `lib/types.ts`, `lib/engine.ts`, `lib/mock.ts`, `lib/activities.ts`
- **Produces**: `Diagnosis` (with `skill`, `suggestedGap`, `evidence`, `checks`)
- **Pipeline**: OCR $\to$ Normalize $\to$ Validate $\to$ Trace $\to$ Error Signature $\to$ Diagnostic Checks $\to$ Suggested Gap.
- **Rule**: Never own presentation UI; provide pure, deterministic data functions.

### 🟪 ABHINAV — DECISION & ACTION LAYER
- **Question**: *"What should the teacher do next?"*
- **Owns**: `app/dashboard/`, `app/diagnose/`, `app/groups/`, `app/intervene/`, `app/reassess/`, `components/dashboard/`
- **Consumes**: `Diagnosis` from Abhay.
- **Produces**: Teacher decision (`accept` / `reject` / `change`), grouping, intervention, reassessment.

---

## 2. Shared Handshake Contracts (`lib/types.ts`)

```typescript
// Ankit produces:
type Response = {
  questionId: string;
  studentId?: string;
  rawAnswer?: string;
  studentAnswer: number | null;
  normalizedAnswer?: number | null;
  isCorrect: boolean;
  ocrConfidence?: number;
};

// Abhay produces (and Abhinav consumes):
type Diagnosis = {
  id: string;
  studentId: string;
  assessmentId: string;
  skill: "subtraction_with_regrouping";
  suggestedGap: "regrouping" | "place_value" | "subtraction_facts" | "none";
  finalGap?: string;
  evidence: EvidenceItem[];
  checks: DiagnosticCheck[];
  teacherDecision: TeacherDecision;
  finalVerdict: string;
};
```

---

## 3. Product Vocabulary & Terminology

Every agent and UI screen MUST use this exact terminology:

| Term | Definition |
| :--- | :--- |
| **Assessment** | Questions given to the student (fixed 5 items) |
| **Response** | Student's submitted answer |
| **OCR Result** | What OCR extracted from the response |
| **Validation** | Mathematical comparison against the fixed question |
| **Error Signature** | Specific mathematical response pattern (e.g. `borrowed_without_decrement`) |
| **Diagnosis** | Suggested learning gap based on evidence |
| **Verification** | Two verdict-bearing diagnostic checks validating the suggestion |
| **Teacher Decision** | Accept / Reject / Change |
| **Confirmed Gap** | Teacher-approved learning gap (`Regrouping`, `Place Value`, `Subtraction Facts`) |
| **Intervention** | Targeted remedial activity (CPA pedagogy) |
| **Reassessment** | Same-skill follow-up measurement |
| **Progress** | Before vs. after performance calculated from raw counts |

### Status Badges:
- `✓ Verified`
- `⚠ Needs review`
- `○ Not assessed`

### Primary Gap Vocabulary:
- **`Regrouping`** (Do NOT use "borrowing issue", "carry-over error", or "regrouping weakness")
- **`Place Value`**
- **`Subtraction Facts`**

---

## 4. Single Student Journey

The UI maintains persistent context:
```
Class 3-A › Aarav Patel › Assessment › Diagnosis › Intervention › Progress
```

---

## 5. Shared State Flow

All data persists in `localStorage`:
```
                  localStorage
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
     Assessment    Diagnosis     Progress
```

---

## 6. Shared GOLDEN DEMO

All three agents develop and verify against this exact demo story:

**Student**: Aarav Patel (`s-01`)
- **Q1**: `52 − 27` $\to$ `25` (✓ Correct, warm-up baseline)
- **Q2**: `71 − 38` $\to$ `33` (✓ Correct)
- **Q3**: `83 − 47` $\to$ `46` (✗ Demo Error: Borrowed without decrementing tens)
- **Q4**: `64 − 26` $\to$ `38` (✓ Correct)
- **Q5**: `92 − 57` $\to$ `45` (✗ Demo Error: Borrowed without decrementing tens)

**Diagnosis**:
- **Skill**: `subtraction_with_regrouping`
- **Suggested Gap**: `Regrouping`
- **Evidence**: Q3 (answered 46), Q5 (answered 45)
- **Checks**:
  - `[Verdict-bearing]` Check 1 (Regrouping Across Tens): ✗ Identified 2 instances of regrouping slips
  - `[Verdict-bearing]` Check 2 (Subtraction Execution After Regrouping): ✓ Facts in ones column accurate
  - `[Support Warm-up]` Check 3 (Warm-up Baseline): ✓ Non-verdict baseline (answered 25)

**Teacher Action**:
- **Teacher Decision**: `Accept`
- **Confirmed Gap**: `Regrouping`
- **Assigned Group**: `Group 1: Regrouping & Tens Adjustment`
- **Assigned Activity**: `Borrow & Build (Tens Decrement Focus)` (CPA pedagogy)
- **Reassessment**:
  - Baseline: 2/5 (40%) or 3/10 (30%)
  - Reassessment: 5/5 (100%) or 8/10 (80%)
  - Improvement: +60% or +50% (Calculated from raw counts, zero fake percentages)

---

## 7. Strict Git No-Push Rule

**MANDATORY USER INSTRUCTION:**
- **NEVER** run `git push`, `git push origin <branch>`, or push commits to GitHub unless the user explicitly commands to do so.
- All testing, building, and commits must remain local unless explicitly ordered otherwise.

