# Spawn Worktree

Create a sibling git worktree for parallel Claude Code work.

**Argument:** `$ARGUMENTS` (worktree name, e.g. `my-feature`)

## Steps

1. **Validate** the argument is provided and is a valid directory name (no spaces, no slashes).

2. **Create the worktree** as a sibling directory next to the current repo root:

   ```
   git worktree add ../neuron-$ARGUMENTS -b $ARGUMENTS
   ```

   The branch name matches the worktree name. If the branch already exists, use `git worktree add ../neuron-$ARGUMENTS $ARGUMENTS` instead (without `-b`).

3. **Copy local Claude settings** (untracked files that git worktree won't carry over):

   ```
   cp .claude/settings.local.json ../neuron-$ARGUMENTS/.claude/settings.local.json
   ```

4. **Symlink node_modules** from root to avoid a full install:

   ```
   ln -s "$(pwd)/node_modules" ../neuron-$ARGUMENTS/node_modules
   ```

5. **Print summary** with the path and a ready-to-copy command:

   ```
   Worktree ready: ../neuron-$ARGUMENTS (branch: $ARGUMENTS)

   cd ../neuron-$ARGUMENTS && claude
   ```

## Error Handling

- If no argument is provided, print usage: `/spawn-worktree <name>`
- If the directory already exists, abort with a message
- If `git worktree add` fails, show the error and abort
