# PRAGYA — Antigravity Development Constitution

## 1. PROJECT MISSION

PRAGYA is a 6-hour hackathon MVP for classroom FLN diagnosis.

The core workflow is:

Assess
→ Trace
→ Diagnose
→ Verify
→ Group
→ Intervene
→ Reassess

The goal is NOT to maximize the number of features.

The goal is to deliver one complete, reliable, explainable classroom workflow.

---

# 2. NON-NEGOTIABLE MVP

The following features MUST work before the project is considered complete:

1. Class/student profile
2. Short predefined FLN assessment
3. Manual response recording
4. Skill-level analysis
5. Visual class-level gap report
6. Remedial activity suggestions
7. Student diagnosis
8. Teacher verification
9. Remedial grouping
10. Reassessment
11. Before/after progress comparison
12. Public deployment

The primary assessment domain is:

2-digit subtraction with regrouping.

Do NOT expand the assessment domain during the 6-hour build.

---

# 3. SCOPE LOCK

The following features are OUT OF SCOPE for the 6-hour MVP:

- Voice-based assessment
- OCR
- PostgreSQL
- Firebase
- Supabase
- Authentication
- Multi-school management
- Mobile application
- Full FLN curriculum
- Multiple assessment domains
- Adaptive assessment
- Seven Indic languages
- Parent login system

Optional P1 features may be attempted ONLY after every P0 feature works:

- Hindi explanation/translation
- Printable assessment
- Parent report

P1 work must NEVER delay P0.

---

# 4. GOLDEN RULE

DO NOT break an existing working P0 feature to add a new feature.

A smaller working product is better than a larger broken product.

---

# 5. FILE OWNERSHIP

Three developers are working simultaneously.

## ABHAY — ENGINE

Abhay owns:

- lib/types.ts
- lib/engine.ts
- lib/mock.ts
- lib/activities.ts
- Diagnostic rules
- Error signatures
- Cause graph
- Seed data
- Grouping logic
- Progress calculations

Abhay must NOT modify another developer's UI unless explicitly agreed.

---

## ANKIT — ASSESSMENT

Ankit owns:

- app/class/
- app/assess/
- components/assessment/

Ankit is responsible for:

- Class selection
- Student selection
- Assessment UI
- Manual response recording
- Assessment submission
- Response persistence

Ankit must NOT modify the diagnostic engine.

---

## ABHINAV — TEACHER DASHBOARD

Abhinav owns:

- app/dashboard/
- app/diagnose/
- app/groups/
- app/intervene/
- app/reassess/
- components/dashboard/
- Components directly related to diagnosis/group/intervention UI

Abhinav is responsible for:

- Class dashboard
- Gap visualization
- Diagnosis display
- Teacher verification
- Grouping UI
- Intervention UI
- Reassessment UI
- Progress visualization

---

# 6. SHARED FILES

The following files are shared-sensitive:

- lib/types.ts
- package.json
- tsconfig.json
- next.config.*
- global styles
- shared UI components
- utility files

Do NOT modify these casually.

If a change affects another developer, communicate it first.

---

# 7. TYPES.TS FREEZE

lib/types.ts is the shared contract.

It MUST be created and reviewed before major feature development.

Once the team agrees on the data model:

DO NOT change it casually.

If a change is required:

1. Explain why.
2. Tell the other developers.
3. Make the smallest possible change.
4. Check all affected files.
5. Run the build.

Never silently change a shared type.

---

# 8. DIAGNOSTIC ENGINE RULE

The diagnosis engine MUST be deterministic.

The engine must use explicit rules.

DO NOT allow an LLM to independently decide:

- Student score
- Error type
- Learning gap
- Diagnostic verdict
- Reassessment result

The rule engine determines the evidence and diagnosis.

AI may ONLY assist with:

- Teacher-friendly explanations
- Hindi translation
- Activity wording
- Parent-friendly wording

AI must NEVER invent evidence.

---

# 9. RESPONSE → DIAGNOSIS FLOW

The correct architecture is:

Student responses
        ↓
Error signatures
        ↓
Diagnostic rules
        ↓
Diagnostic checks
        ↓
Suggested diagnosis
        ↓
Teacher verification
        ↓
Final diagnosis

Never:

Student response
        ↓
AI guess
        ↓
Diagnosis

---

# 10. ASSESSMENT RULE

The MVP contains exactly 5 predefined questions.

The questions focus on:

2-digit subtraction with regrouping.

Do not add unrelated questions during the hackathon.

The item bank must remain deterministic.

---

# 11. DEMO CASE

The primary demonstration includes:

83 − 47 = 46

Correct answer:

36

The response must be interpreted as a regrouping-related error according to the diagnostic rules.

IMPORTANT:

Do NOT explain 46 as:

"8 tens + 6 ones"

because that equals 86.

The explanation must accurately describe the student's mathematical error.

---

# 12. DIAGNOSTIC CHECK RULE

The Verify screen contains:

- 2 verdict-bearing diagnostic checks
- 1 warm-up/support question

The warm-up DOES NOT contribute to the diagnosis verdict.

Do NOT say:

"2 of 3 checks indicate regrouping."

Instead show the actual checks individually.

Example:

✓ Check 1
Evidence...

✓ Check 2
Evidence...

○ Warm-up
Support question — not used for verdict

---

# 13. TEACHER CONTROL

PRAGYA must never remove the teacher from the final decision.

Every suggested diagnosis must provide:

[ Accept ]

[ Reject ]

[ Change ]

The teacher's final decision becomes the stored diagnosis.

---

# 14. DATA INTEGRITY

Never hard-code results into UI components.

BAD:

const before = 3;
const after = 8;

GOOD:

const before = reassessment.beforeCorrect;
const after = reassessment.afterCorrect;

All displayed metrics must come from the underlying data.

---

# 15. NO FAKE PERCENTAGES

The engine stores actual counts.

Example:

3 / 10

8 / 10

If percentages are displayed:

30%
80%

The percentage MUST be calculated from the counts.

Never invent a percentage.

---

# 16. SEEDED DATA

The MVP uses deterministic seeded data.

The demo dataset should contain:

- 30 students
- Assessment responses
- Diagnostic results
- Teacher decisions
- Groups
- Intervention states
- Reassessment results

Do NOT use random data for the live demo.

The application must produce the same demo result every time.

---

# 17. DEMO DATA DISCLOSURE

Seeded data must be treated as demo data.

Do NOT claim it is real classroom data.

The UI/documentation should make it clear when appropriate that the dataset is seeded for demonstration.

---

# 18. LOCALSTORAGE ONLY

The 6-hour MVP uses localStorage.

DO NOT introduce:

- PostgreSQL
- Firebase
- Supabase
- Prisma
- External database

unless the entire team explicitly changes the architecture.

Do not spend hackathon time on database infrastructure.

---

# 19. NO BUSINESS LOGIC IN UI

React components should render state and call functions.

Do NOT put diagnosis rules directly inside components.

BAD:

if (answer === 46) {
    diagnosis = "regrouping";
}

GOOD:

const diagnosis = diagnoseStudent(responses);

All diagnostic logic belongs in:

lib/engine.ts

---

# 20. SINGLE SOURCE OF TRUTH

There must be exactly one source of truth for:

### Diagnosis
lib/engine.ts

### Data structures
lib/types.ts

### Seed data
lib/mock.ts

### Activities
lib/activities.ts

Do not duplicate the same logic in multiple components.

---

# 21. COMPONENT RULE

Components should be:

- Small
- Reusable
- Typed
- Easy to understand

Avoid giant 500+ line components.

If a component becomes too large, split it logically.

---

# 22. UI RULE

PRAGYA is teacher-facing.

Prioritize:

- Clarity
- Speed
- Readability
- Evidence
- Accessibility
- Minimal clicks

Avoid unnecessary:

- Animations
- Gradients everywhere
- Decorative dashboards
- AI chat gimmicks
- Excessive cards
- Complex navigation

The teacher should understand the screen within seconds.

---

# 23. ERROR HANDLING

Never allow a missing response or malformed state to crash the entire application.

Handle:

- Missing student
- Missing response
- Empty assessment
- Missing diagnosis
- Missing reassessment
- Empty groups

Use sensible empty states.

---

# 24. NO SILENT FALLBACKS

If something fails:

DO NOT silently create fake data.

Show a meaningful fallback or error.

Example:

"Assessment data unavailable. Please restart the assessment."

is better than silently inventing responses.

---

# 25. GIT RULES

Use feature branches.

Example:

abhay:
feature/abhay-engine

ankit:
feature/ankit-assessment

abhinav:
feature/abhinav-dashboard

Do NOT work directly on main.

---

# 26. COMMIT RULE

Use meaningful commits.

GOOD:

feat(engine): add regrouping detection

feat(assessment): add response recording

feat(dashboard): add class gap report

fix(reassessment): calculate progress from counts

BAD:

final

changes

update

stuff

done

---

# 27. COMMIT FREQUENCY

Commit meaningful working increments.

Target:

one meaningful commit every 30–60 minutes.

Do not wait until the final hour to commit everything.

---

# 28. BUILD CHECK

Before claiming a feature is complete:

Run:

npm run lint

and:

npm run build

Fix TypeScript errors before handing work to another developer.

---

# 29. NO DESTRUCTIVE GIT COMMANDS

Do NOT run destructive commands on shared work without explicit team approval.

Avoid:

git reset --hard

git checkout .

git clean -fd

unless the team explicitly agrees.

Never delete another developer's work to resolve a conflict.

---

# 30. MERGE RULE

Before merging:

1. Pull latest main.
2. Resolve conflicts carefully.
3. Run lint.
4. Run build.
5. Test the affected flow.
6. Then merge.

---

# 31. COMMUNICATION RULE

If you change something that another developer depends on, communicate it immediately.

Example:

[ENGINE UPDATE]

Changed:
Diagnosis type

Added:
teacherDecision

Impact:
Diagnosis UI must handle:

accepted
rejected
changed

---

# 32. SHARED CONTRACT CHANGE RULE

If you need to change:

- types
- API shape
- response structure
- diagnosis structure
- localStorage schema

STOP first.

Tell the other two developers.

Do not independently change the contract.

---

# 33. NO DUPLICATE FEATURES

Before implementing a feature:

Check whether another developer is already implementing it.

Never build:

- Two dashboards
- Two diagnosis engines
- Two response models
- Two grouping systems

There must be one implementation.

---

# 34. NO SCOPE CREEP

During the hackathon, any new feature must answer:

"Does this directly satisfy a P0 requirement?"

If NO:

Put it in the backlog.

Examples:

Voice → BACKLOG

OCR → BACKLOG

Dark mode → BACKLOG

Authentication → BACKLOG

Firebase → BACKLOG

Another FLN subject → BACKLOG

---

# 35. FEATURE FREEZE

At approximately 5 hours:

STOP adding features.

The remaining time is for:

- Integration
- Bug fixing
- Build verification
- Deployment
- Demo testing

---

# 36. DEPLOYMENT IS P0

A feature is NOT considered complete until it works on the deployed application.

Local success is insufficient.

Final testing must happen against the production URL.

---

# 37. FINAL DEMO FLOW

The deployed application must support:

Class
 ↓
Student
 ↓
5-question assessment
 ↓
Response recording
 ↓
Trace
 ↓
Diagnosis
 ↓
Verify
 ↓
Accept/Reject/Change
 ↓
Class gap report
 ↓
Group
 ↓
Intervention
 ↓
Reassessment
 ↓
Before/After progress

This is the primary judge demonstration.

---

# 38. DEFINITION OF DONE

A feature is DONE only when:

- Code exists
- UI works
- Data flows correctly
- No TypeScript errors
- No blocking console errors
- Lint passes
- Build passes
- Feature works with seeded data
- Feature works on deployed URL

"Almost working" is NOT done.

---

# 39. PRIORITY ORDER

When choosing what to work on:

P0 functionality
>
Integration
>
Bug fixing
>
Deployment
>
UI polish
>
P1 features

Never reverse this order.

---

# 40. FINAL RULE

When in doubt:

Choose the smallest implementation that preserves the complete PRAGYA story:

ASSESS
→ TRACE
→ DIAGNOSE
→ VERIFY
→ GROUP
→ INTERVENE
→ REASSESS

Do not optimize for feature count.

Optimize for a reliable end-to-end product.
