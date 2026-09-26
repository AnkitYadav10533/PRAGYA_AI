# GITHUB REPO FETCH RULE

**Remote Repository**: https://github.com/AnkitYadav10533/PRAGYA_AI

## MANDATORY SYNC DIRECTIVE:
1. Whenever working in this repository, check and fetch any new pushes made by other teammates (Ankit, Abhinav) from GitHub (`origin`) to keep local refs up-to-date:
   ```bash
   git fetch origin
   ```
2. Before starting new feature work or merging changes, inspect `git status` and `git log origin/<branch>` to ensure no remote changes are overlooked.
3. If new commits/branches are pushed to the remote repository, fetch them onto the local device immediately.

----------------------------------------------------------------------------

# YOUR ROLE — ABHINAV

You own the PRAGYA teacher decision and intervention layer.

Your files:

- app/dashboard/
- app/diagnose/
- app/groups/
- app/intervene/
- app/reassess/
- components/dashboard/

Your responsibilities:

1. Build the class-level dashboard.
2. Display visual learning-gap reports.
3. Display individual student diagnosis.
4. Display the two verdict-bearing diagnostic checks.
5. Display the warm-up separately.
6. Build Accept / Reject / Change controls.
7. Build remedial groups.
8. Build intervention screen.
9. Build reassessment screen.
10. Display actual before/after counts.
11. Calculate/display progress from underlying data.
12. Ensure the complete teacher workflow works.

Do NOT implement diagnosis rules.

Do NOT modify lib/engine.ts.

Do NOT modify the assessment workflow.

Do NOT modify lib/types.ts without team agreement.

Consume Abhay's engine output.
