# Go Nerdy: Incremental Debugging Workflow

Use this command when a feature or bugfix has multiple failed attempts and needs a more systematic, micro-phase approach with logged acceptance criteria.

## When to Use

- After 2+ failed attempts at implementing a feature
- When value flow is unclear between layers
- When changes aren't producing expected results
- When multiple code locations must coordinate

## Workflow

**IMPORTANT: First enter plan mode to create a detailed plan before implementation.**

### Phase 1: Analysis

1. Enter plan mode
2. Identify all code locations involved
3. Map the data/value flow from input to output
4. Document the expected values at each layer

### Phase 2: Wire Up Entry Point

1. Add the parameter/UI control with minimal logic
2. Add console logging at the entry point
3. Verify the value reaches the first layer

**Acceptance criteria format:**

```
Expected log: [LAYER_NAME] paramName = <expected_value>
```

### Phase 3: Trace Through Layers

For each layer in the chain:

1. Add logging AFTER all transformations (not intermediate)
2. Apply the change to use the parameter
3. Run and verify against expected log output
4. Only proceed when log matches expectation

**Micro-phase template:**

```
// Phase 3a: first-file.ts
Expected log: [FIRST_FILE] result = <calculated_value>

// Phase 3b: second-file.ts
Expected log: [SECOND_FILE] result = <must_match_first_file>
```

### Phase 4: Verify Result

1. Confirm the output shows expected behavior
2. Test edge cases (min/max values, boundaries)
3. Verify no regressions in other scenarios

### Phase 5: Cleanup

1. Remove all debug logging
2. Run tests to verify no regressions
3. Document any learnings

## Key Principles

1. **Log AFTER transformations** - See final values, not intermediate
2. **One layer at a time** - Don't skip ahead
3. **Match formulas exactly** - When files calculate the same value
4. **Use constants for defaults** - Never hardcode inline
5. **Expected output first** - Write expectations BEFORE running

## Anti-patterns to Avoid

- Making multiple changes before verifying each one
- Logging at intermediate calculation points
- Skipping layers in the chain
- Removing logging before feature is confirmed working
- Assuming formulas match between files without verifying
