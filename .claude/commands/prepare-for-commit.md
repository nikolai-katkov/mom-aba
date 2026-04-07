# Prepare for Commit

Run this command before committing to ensure code quality and documentation consistency.

## Checklist

1. **Lint & Format**
   - Run `npm run lint` - fix any errors
   - Run `npx prettier --write "src/**/*.ts" "tests/**/*.ts"`

2. **Tests**
   - Run `npm test -- --run` - all must pass
   - Run `npm run build` - must succeed

3. **Documentation Consistency**
   - Update story status in docs/roadmap/README.md
   - Check `[ ]` boxes for completed acceptance criteria
   - Update "Files Modified/Created" lists in story docs
   - Add implementation notes if approach differs from plan
   - Inject additional requests to the relevant stories. If story not found, create it and insert it into the most logical part of the roadmap.

4. **Code Review**
   - Search for traces of old/deprecated systems
   - Check for unused imports and dead code
   - Verify test levels (unit vs E2E) are appropriate

5. **Recent Changes Review**
   - Run `git diff HEAD` to review uncommitted changes
   - Run `git log -3` to check context of recent commits
   - Ensure documentation matches implementation
