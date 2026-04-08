_[Русский](./pm-questions-scoring-model.ru.md)_

---

# PM Questions: Scoring Model

Related stories: [Epic 01 -- Assessment Foundation](../roadmap/01-assessment-foundation/_epic.md)
Related files: _None yet._

---

## Context

We have three conflicting signals about how to score individual criteria in the Developmental Milestones Assessment. This document provides full context so you can frame the right question for the PM.

## The Three Models

### 1. VB-MAPP Standard Convention

The VB-MAPP (Verbal Behavior Milestones Assessment and Placement Program) by Dr. Mark Sundberg uses a **half-point scale per milestone**:

| Score | Meaning                                  |
| ----- | ---------------------------------------- |
| 0     | Skill not present                        |
| 0.5   | Skill emerging or partially demonstrated |
| 1     | Skill fully demonstrated / mastered      |

Each milestone within a level contributes 0, 0.5, or 1 to the level total. A level (e.g., Level 1) has 170 milestones across all skill areas, so the maximum score is 170. This granularity allows clinicians to track partial progress and distinguish between "never observed" and "sometimes observed."

### 2. Original Assessment Document (provided by domain expert)

States: "Each criterion is scored 1--4. Section total is calculated."

This suggests a **4-point Likert-like scale**, likely mapping to mastery levels such as:

| Score | Possible Meaning             |
| ----- | ---------------------------- |
| 1     | Not demonstrated             |
| 2     | Emerging with prompts        |
| 3     | Demonstrated with support    |
| 4     | Fully independent / mastered |

This is a departure from the standard VB-MAPP scoring but offers more granularity than the half-point scale for individual criteria.

### 3. MVP Technical Spec

States: binary **Yes/No** assessment per criterion.

| Answer | Meaning                                      |
| ------ | -------------------------------------------- |
| Yes    | Skill demonstrated -- mark complete, move on |
| No     | Skill not demonstrated -- go to training     |

This is the simplest model. It aligns with the UX principle of "simple decisions" and minimizes cognitive load for parents.

## Considerations

### Arguments for Binary (Yes/No)

- Lowest cognitive load for parents (non-clinicians)
- Clear next action: Yes = done, No = train
- Eliminates subjective interpretation of intermediate scores
- Fastest to implement
- Aligns with the "learning through action" principle

### Arguments for 3-point (VB-MAPP style: 0/0.5/1)

- Industry standard -- compatible with clinical reporting
- Captures "emerging" skills, which is critical for tracking progress over time
- A child scoring 0.5 across many criteria looks very different from one scoring 0 -- binary loses this signal
- Clinicians or therapists reviewing the data would expect this format

### Arguments for 4-point Scale

- Most granular tracking of progress
- Distinguishes between prompt-dependent and independent performance
- Aligns with the original domain expert's specification
- Requires more explanation for parents to score reliably

### Hybrid Possibility

- Use **binary (Yes/No) as the parent-facing input** for MVP
- Map internally: Yes = 1, No = 0
- Later introduce 0.5 ("Sometimes / Emerging") as a third option
- This preserves the simple UX now while leaving room for VB-MAPP compatibility

## Questions to Ask the PM

1. **Who is the primary audience for assessment results?** Parents only, or will clinicians/therapists also review the data? If clinicians need compatibility with VB-MAPP reporting, binary may not be sufficient.

2. **How important is tracking partial progress?** A child who can "sometimes" request items (emerging skill) versus one who never does -- does the app need to distinguish these? If so, binary loses critical signal.

3. **Is the 1--4 scale from the original document a firm requirement from the domain expert, or was it illustrative?** Understanding whether this was a deliberate clinical choice or a rough sketch matters.

4. **Would a phased approach work?** Binary for MVP launch, with a planned upgrade to 3-point (0/0.5/1) in a near-term iteration. This keeps MVP simple while acknowledging the assessment needs nuance.

5. **Should the data model support richer scoring from day one, even if the UI only exposes Yes/No?** This would prevent a data migration later.

## Recommendation (Engineering Perspective)

Design the data model to store a numeric score (0, 0.5, 1) regardless of what the UI exposes. For MVP, the UI presents Yes/No, which maps to 1/0 internally. This gives us:

- Simple parent experience now
- No data migration when adding the "emerging" option later
- VB-MAPP compatibility path without rework

---

_Last updated: 2026-04-08_
