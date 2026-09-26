# PRAGYA — FOLDER STRUCTURE & FILE OWNERSHIP RULES

## 1. SINGLE SOURCE OF TRUTH

The repository folder structure defined below is the ONLY approved structure for the PRAGYA MVP.

Agents MUST NOT:
- Create arbitrary new top-level folders.
- Rename existing folders.
- Move files between ownership areas.
- Duplicate folders for similar functionality.
- Create alternative implementations of the same module.
- Introduce a new architectural pattern without team approval.

If a new folder appears necessary, STOP and inform the team before creating it.

---

# 2. APPROVED ROOT STRUCTURE

The repository MUST follow:

PRAGYA_AI/
│
├── app/
│   ├── class/
│   ├── assess/
│   ├── dashboard/
│   ├── diagnose/
│   ├── groups/
│   ├── intervene/
│   └── reassess/
│
├── components/
│   ├── assessment/
│   ├── dashboard/
│   ├── diagnosis/
│   ├── groups/
│   ├── intervention/
│   └── shared/
│
├── lib/
│   ├── engine.ts
│   ├── types.ts
│   ├── mock.ts
│   ├── activities.ts
│   └── utils.ts
│
├── public/
│
├── AGENTS.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.*
└── other standard Next.js configuration files

DO NOT create additional top-level application folders unless the team explicitly approves them.

---

# 3. APP FOLDER RULE

The `app/` directory contains ROUTES and PAGE-LEVEL WORKFLOWS.

Each product workflow gets exactly ONE route folder.

Approved routes:

/class
/assess
/dashboard
/diagnose
/groups
/intervene
/reassess

DO NOT create:

/pages
/screens
/views
/modules
/features
/routes

unless the entire architecture is explicitly changed by the team.

---

# 4. ROUTE OWNERSHIP

## Ankit owns:

app/class/
app/assess/

These folders contain:

- Class selection
- Student selection
- Assessment
- Response recording
- Assessment submission

Ankit MUST NOT place diagnosis, grouping, or intervention pages here.

---

## Abhinav owns:

app/dashboard/
app/diagnose/
app/groups/
app/intervene/
app/reassess/

These folders contain:

- Teacher dashboard
- Diagnosis display
- Teacher verification
- Group management
- Intervention
- Reassessment
- Progress comparison

Abhinav MUST NOT move assessment pages into these folders.

---

## Abhay owns the logic layer:

Abhay primarily owns:

lib/

Abhay should NOT place engine logic inside `app/`.

---

# 5. COMPONENTS RULE

The `components/` directory contains reusable UI components.

Approved structure:

components/
├── assessment/
├── dashboard/
├── diagnosis/
├── groups/
├── intervention/
└── shared/

---

## assessment/

ONLY assessment-related reusable components.

Examples:

AssessmentQuestion.tsx
AnswerInput.tsx
AssessmentProgress.tsx
StudentSelector.tsx

Owner: Ankit

---

## dashboard/

ONLY dashboard-related components.

Examples:

GapChart.tsx
ClassSummary.tsx
StudentSummary.tsx
SkillCard.tsx

Owner: Abhinav

---

## diagnosis/

ONLY diagnosis-related components.

Examples:

DiagnosticChecks.tsx
DiagnosisCard.tsx
EvidenceList.tsx
TeacherDecision.tsx

Owner: Abhinav

---

## groups/

ONLY remedial-group components.

Examples:

GroupCard.tsx
StudentGroupList.tsx
GroupSummary.tsx

Owner: Abhinav

---

## intervention/

ONLY intervention/activity UI.

Examples:

ActivityCard.tsx
ActivityStep.tsx
InterventionSummary.tsx

Owner: Abhinav

---

## shared/

Only genuinely reusable components belong here.

Examples:

Button
Modal
EmptyState
LoadingState
PageHeader

DO NOT put feature-specific components in `shared/`.

---

# 6. LIB FOLDER RULE

`lib/` contains APPLICATION LOGIC and DATA, not page UI.

Approved files:

lib/
├── types.ts
├── engine.ts
├── mock.ts
├── activities.ts
└── utils.ts

---

## types.ts

Contains the shared data contract.

Examples:

Student
Class
Assessment
AssessmentItem
Response
DiagnosticCheck
Diagnosis
RemedialGroup
Activity
Reassessment

THIS FILE IS FROZEN AFTER TEAM APPROVAL.

---

## engine.ts

Contains:

- Response analysis
- Error signatures
- Diagnostic rules
- Verification logic
- Grouping logic
- Progress calculations

DO NOT put React code here.

DO NOT put JSX here.

DO NOT put UI logic here.

---

## mock.ts

Contains deterministic seeded demo data.

DO NOT put UI components here.

DO NOT create mock data inside page components.

---

## activities.ts

Contains remedial activity definitions.

---

## utils.ts

Contains only genuinely generic utility functions.

DO NOT turn `utils.ts` into a dumping ground.

---

# 7. NO DUPLICATE LOGIC

There must be exactly ONE implementation of each core operation.

Diagnosis:

lib/engine.ts

Seed data:

lib/mock.ts

Data types:

lib/types.ts

Activities:

lib/activities.ts

If a component needs diagnosis:

IMPORT the engine.

DO NOT recreate the diagnosis logic.

---

# 8. NO FEATURE FOLDERS WITHOUT APPROVAL

Agents MUST NOT create folders such as:

lib/diagnosis/
lib/assessment/
lib/ai/
lib/services/
lib/api/
lib/database/
lib/hooks/
lib/store/
lib/models/

unless the team explicitly agrees that the architecture requires them.

For the 6-hour MVP:

KEEP THE ARCHITECTURE SMALL.

---

# 9. AI CODE LOCATION

AI is NOT a core diagnosis engine.

If an AI integration is eventually required, it must be discussed before adding:

lib/ai/
app/api/
services/

Do not create an AI architecture just because the project description mentions AI.

The deterministic diagnostic engine remains the source of truth.

---

# 10. NO DATABASE FOLDERS

The MVP uses localStorage.

DO NOT create:

database/
db/
prisma/
models/
repositories/

Do not add Firebase/Supabase/PostgreSQL architecture.

---

# 11. NO API FOLDERS UNLESS REQUIRED

The MVP does not require a custom backend.

DO NOT create:

api/
services/
controllers/
routes/

just for architectural appearance.

If a real API becomes necessary, discuss it with the team first.

---

# 12. PUBLIC FOLDER

`public/` is for static assets only.

Examples:

public/
├── logo.svg
├── icons/
└── images/

DO NOT put:

- TypeScript
- React components
- JSON application data
- Engine logic
- Seed data

inside `public/`.

---

# 13. FILE NAMING

Use:

- PascalCase for React components.
- camelCase for TypeScript utility files.
- lowercase route folders.

Examples:

GOOD:

components/diagnosis/DiagnosisCard.tsx
components/assessment/AssessmentQuestion.tsx
lib/engine.ts
lib/mock.ts

BAD:

components/diagnosis/diagnosiscard.tsx
components/Diagnosis/
lib/Engine.ts
lib/MockDataEverything.ts

---

# 14. ONE RESPONSIBILITY PER FILE

Avoid giant files.

A file should have one clear responsibility.

BAD:

dashboard.tsx
containing:

- dashboard
- diagnosis
- grouping
- intervention
- reassessment
- data generation

GOOD:

DashboardSummary.tsx
DiagnosisCard.tsx
GroupCard.tsx
ActivityCard.tsx

---

# 15. BEFORE CREATING A FILE

Every agent MUST ask:

1. Does this functionality already exist?
2. Can I use an existing file?
3. Does this file belong to my ownership area?
4. Does the approved structure already provide a suitable location?
5. Am I creating duplicate functionality?

If the answer to #3 is NO:

DO NOT create/edit the file without team approval.

---

# 16. BEFORE CREATING A FOLDER

A new folder requires TEAM APPROVAL.

The agent must report:

NEW FOLDER REQUEST

Folder:
<path>

Reason:
<why it is necessary>

Existing alternatives considered:
<files/folders>

Why they are insufficient:
<reason>

Impact:
<what changes>

Do not create the folder until approved.

---

# 17. MOVING FILES

Agents MUST NOT move files between folders during active development without notifying the owner.

Example:

Do NOT silently move:

app/diagnose/
→
components/diagnosis/

The two have different purposes:

app/ = routes/pages
components/ = reusable UI

---

# 18. ROUTE VS COMPONENT RULE

If it has a URL:

PUT IT IN:

app/

If it is reusable UI:

PUT IT IN:

components/

If it is application logic:

PUT IT IN:

lib/

Example:

/diagnose
→ app/diagnose/page.tsx

DiagnosticChecks
→ components/diagnosis/DiagnosticChecks.tsx

diagnoseStudent()
→ lib/engine.ts

---

# 19. DATA VS UI RULE

Data belongs in:

lib/

UI belongs in:

components/

Routes belong in:

app/

Static assets belong in:

public/

Never mix these responsibilities.

---

# 20. SHARED COMPONENT RULE

Before creating a new component, search `components/shared/`.

If an existing component solves the problem:

REUSE IT.

Do not create:

Button2.tsx
NewButton.tsx
CustomButton.tsx

just because an existing component is slightly inconvenient.

---

# 21. CLEANUP RULE

Do not leave:

- duplicate files
- temporary files
- backup files
- `.old` files
- `.backup` files
- test pages
- unused components
- unused folders

Examples that MUST NOT remain:

page-old.tsx
engine-backup.ts
DashboardTest.tsx
temp/
new/
final-final/

---

# 22. AGENT SAFETY RULE

Before editing:

CHECK:

git status

Understand which files are already modified.

DO NOT overwrite another developer's uncommitted work.

If another developer is editing the same file:

STOP.

Inform the team.

---

# 23. ARCHITECTURE CHANGE RULE

Any change involving:

- Moving folders
- Renaming routes
- Adding top-level folders
- Changing ownership
- Changing data architecture
- Adding a database
- Adding an API layer
- Changing the state-management architecture

requires team agreement.

No single agent may make such changes independently.

---

# 24. FINAL STRUCTURE CHECK

Before feature freeze, the repository MUST approximately look like:

PRAGYA_AI/
│
├── app/
│   ├── class/
│   ├── assess/
│   ├── dashboard/
│   ├── diagnose/
│   ├── groups/
│   ├── intervene/
│   └── reassess/
│
├── components/
│   ├── assessment/
│   ├── dashboard/
│   ├── diagnosis/
│   ├── groups/
│   ├── intervention/
│   └── shared/
│
├── lib/
│   ├── types.ts
│   ├── engine.ts
│   ├── mock.ts
│   ├── activities.ts
│   └── utils.ts
│
├── public/
│
├── AGENTS.md
├── README.md
├── package.json
└── tsconfig.json

Minor Next.js configuration files are allowed.

No unnecessary architectural folders are allowed.

---

# 25. FINAL RULE

THE FOLDER STRUCTURE IS PART OF THE ARCHITECTURE.

Do not change it merely because a different structure feels cleaner.

During the 6-hour hackathon:

STABILITY > REFACTORING

SHARED CONTRACT > INDIVIDUAL PREFERENCE

REUSE > DUPLICATION

P0 > NEW FEATURES

WORKING PRODUCT > PERFECT ARCHITECTURE
