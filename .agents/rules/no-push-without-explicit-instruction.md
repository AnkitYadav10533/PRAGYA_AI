# STRICT NO-PUSH RULE (USER MANDATE)

## Invariant:
**DO NOT PUSH ANYTHING TO GITHUB / REMOTE REPOSITORY UNTIL THE USER EXPLICITLY INSTRUCTS TO DO SO.**

1. **Strict Push Lock**:
   - Never execute `git push`, `git push origin <branch>`, or any upstream sync command automatically.
   - Any remote push is strictly prohibited unless the user provides a direct, explicit instruction (e.g. "push changes", "push to github", "git push").

2. **Allowed Operations**:
   - `git fetch origin` (to stay updated with teammates' remote pushes).
   - Local commits on feature branches or local testing.
   - Running `npm run lint` and `npm run build` locally.

3. **Requirement Before Any Push**:
   - The user must explicitly request the push.
   - Confirm branch name and commit status to the user before executing any push.
