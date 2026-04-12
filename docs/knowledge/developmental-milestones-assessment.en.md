_[Русский](./developmental-milestones-assessment.ru.md)_

---

# Developmental Milestones Assessment

Related stories: [Epic 01 - Assessment Foundation](../roadmap/01-assessment-foundation/_epic.en.md), [Epic 05 - Tact Section](../roadmap/05-tact-section/_epic.en.md)
Related files: `src/types/assessment.ts`, `src/i18n/translations/sections.ts`, `src/i18n/translations/introduction.ts`, `src/i18n/translations/training.ts`

---

## Overview

A hierarchical developmental assessment system for evaluating early childhood skills. The assessment measures development across structured behavioral categories using contextual evaluation methods grounded in ABA verbal operant methodology.

**Structure:** Assessment > Levels > Sections > Criteria > Scores

## Core Flow

The application follows this cycle:

**Learn > Assess > (if needed) Train > Reassess**

- **Learn:** Parent reads/watches an introduction explaining the skill category before assessing.
- **Assess:** Binary determination (Yes/No) of whether the child demonstrates the skill.
- **Train:** If "No," the parent receives guidance on how to develop the skill.
- **Reassess:** After training, the parent retries the assessment.

## UX Principles

1. **Low entry barrier** - start immediately, no setup required.
2. **Progressive disclosure** - short explanation by default, full detail on demand ("Read more").
3. **Simple decisions** - Yes/No only at the assessment level.
4. **Visual support** - illustrations required for every assessment criterion.
5. **Just-in-time learning** - training surfaces only after assessment failure.
6. **Minimal cognitive load** - learning through action, not instruction.

## Assessment Metadata

- **Title:** Developmental Milestones Assessment
- **Level:** I
- **Age Range:** 0--18 months

Additional levels (II, III) are planned and will cover later developmental ranges.

## Scoring Types

Each criterion specifies one of four evaluation methods:

| Code             | Description              | Input Method         |
| ---------------- | ------------------------ | -------------------- |
| TestTrial        | Formal testing           | Direct test          |
| FreeOperant      | Observation              | Observation mode     |
| CombinedTrial    | Combination (test + obs) | Mixed                |
| TimedObservation | Time-limited observation | Timer-based (60 min) |

> **Open question:** The VB-MAPP standard uses a half-point scoring scale (0, 0.5, 1) per criterion. The original assessment document specifies 1--4 scoring. The MVP spec uses binary Yes/No. See [PM Questions: Scoring Model](pm-questions-scoring-model.en.md) for the full analysis and questions to resolve with the PM.

## Level I Sections

Level I currently includes 9 sections: Mand and Tact (active), plus 7 planned: Listener Responding, Visual Perceptual Skills & Matching-to-Sample, Independent Play, Social Behaviour & Social Play, Motor Imitation, Echoic, and Spontaneous Vocal Behaviour.

---

### Section 1: Mand (Requesting)

**Question:** Does the child use words, gestures, or cards to request desired items or activities?

#### Criteria

**1. Uses 2 words, gestures, or 2 PECS cards**

- Conditions: prompts allowed (echoic, imitation, non-physical)
- Examples: cookie, book
- Type: CombinedTrial

**2. Makes 4 different requests independently**

- Conditions: no prompts; excludes "What do you want?"; object may be visible
- Examples: musical toy, spring toy, ball
- Type: CombinedTrial

**3. Generalizes 6 mand responses**

- Conditions: with 2 people, in 2 environments, for 2 types of reinforcement
- Examples: asks mom and dad; at home and outside; different items
- Type: CombinedTrial

**4. Spontaneously makes 5 requests**

- Conditions: no verbal prompts; object may be visible; time constraint: 60 minutes
- Type: TimedObservation

**5. Has 10 independent mand responses**

- Conditions: no prompts; excludes "What do you want?"
- Examples: apple, swing, car, juice
- Type: CombinedTrial

---

### Section 2: Tact (Labeling)

**Question:** Can the child label people, objects, body parts, or pictures?

#### Criteria

**1. Labels 2 objects**

- Examples: people, animals, characters, favorite items
- Type: TestTrial

**2. Labels 4 objects**

- Examples: people, animals, characters
- Type: TestTrial

**3. Labels 6 non-reinforcing objects**

- Examples: shoe, hat, spoon, car, mug, bed
- Type: TestTrial

**4. Spontaneously labels 2 objects**

- Conditions: no prompts; 60-minute observation
- Type: TimedObservation

**5. Labels 10 objects**

- Examples: household items, people, body parts, pictures
- Type: TestTrial

---

### Training: Tact

#### Teaching Nouns

1. Present real objects and picture cards simultaneously.
2. Ask "What's this?" (Sd: visual stimulus).
3. Token reinforcement schedule: 1 token for a single-word tact response, 2 tokens for a carrier phrase response ("This is + [word]").
4. Mastery criterion: correct response on cold probe across 3 consecutive sessions (days).
5. Once mastered with real objects, transfer stimulus control to picture cards only, then probe generalization to novel exemplars.

#### Teaching Verbs

1. Begin with action picture cards (static depictions of actions).
2. Transfer to labeling real actions performed by the therapist or peer (live modeling).
3. Progress to phrase building: subject + verb ("Dog runs"), then subject + verb + object ("Boy throws ball").

#### Distraction Method Protocol

Used to establish tact responses under conditions of competing stimuli:

1. Present the target stimulus (Sd) and obtain a correct tact response.
2. Deliver token + verbal praise (Sr+).
3. Introduce a brief distractor task (e.g., motor imitation, receptive instruction).
4. Re-present the original stimulus and probe for the tact response.
5. Mastery criterion: 3 correct tact responses following distractor trials within a single session.

#### Vocabulary Building System

Structured across 27 semantic categories: toys, food, clothing, furniture, transport, animals, body parts, household items, kitchenware, hygiene items, nature, weather, colors, shapes, numbers, letters, professions, musical instruments, tools, sports, buildings, emotions, family members, fabrics, school supplies, insects, dinosaurs.

Difficulty levels per category:

- **Simple** - high-frequency, early-acquired vocabulary (e.g., "ball," "dog," "shoe")
- **Medium** - moderate-frequency items requiring finer discrimination (e.g., "elbow," "trumpet," "hammer")
- **Complex** - low-frequency or multi-syllabic items (e.g., "stethoscope," "triceratops," "xylophone")

---

## Development Model

The system measures development across three dimensions:

### 1. Independence

- With prompts
- Without prompts
- Spontaneous

### 2. Generalization

- Single context
- Multiple people
- Multiple environments

### 3. Repertoire Size

- 2 > 4 > 6 > 10 items

Criteria within each section increase in complexity, form a developmental gradient, and are interdependent.

## App Mapping (UX Model)

### MVP Screens

1. **Sections list** - Mand + Tact (active), 7 sections (placeholder/coming soon). Entry point of the app.
2. **Section introduction** - explains the skill category (video slot, short explanation, collapsible full explanation). Controls: "Start" / "Skip".
3. **Criteria list** - 5 level cards showing progression through the section. Each card: simplified title, short description, status, optional progress.
4. **Criterion assessment** - binary Yes/No question with illustration and context. "Yes" marks complete; "No" navigates to training.
5. **Training** - video slot, step-by-step short guide, collapsible full guide. Controls: "Retry" / "Back".

All screens include a **language switcher** (RU/EN) in the page header, allowing parents to toggle the interface language at any time. Language preference is persisted across sessions.

### Criterion States

- Not started
- In progress
- Completed

### Section States

- Progress: X/5
- Status: Not started / In progress / Completed

### Assessment Loop

Assessment > (if No) Training > Reassessment - repeats until "Yes" or parent navigates away.

## MVP Scope

### Included

- Mand section (5 criteria)
- Tact section (5 criteria)
- Full assessment + training loop
- Progress tracking
- Static image placeholders for video/illustration slots
- Bilingual UI (Russian default, English) with language switcher on all pages

### Excluded

- Analytics
- Adaptive flows
- Real video content

## Product Principles

### 1. Not a checklist

This is a structured behavioral assessment tool, not a simple checklist. The hierarchical structure and scoring dimensions are essential to its validity.

### 2. Context is mandatory

Conditions and evaluation type cannot be removed from the assessment flow. They are validity constraints that ensure reliable scoring.

### 3. User guidance required

Without proper guidance, assessment results risk high subjectivity and low reliability. The app must guide parents through the evaluation process.

### 4. No dead ends

Every screen must offer a clear next step. The system always provides a path forward.

---

_Last updated: 2026-04-11_
