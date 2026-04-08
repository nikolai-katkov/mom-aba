_[Русский](./developmental-milestones-assessment.ru.md)_

---

# Developmental Milestones Assessment

Related stories: [Epic 01 -- Assessment Foundation](../roadmap/01-assessment-foundation/_epic.md)
Related files: _None yet -- will be updated as implementation proceeds._

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

1. **Low entry barrier** -- start immediately, no setup required.
2. **Progressive disclosure** -- short explanation by default, full detail on demand ("Read more").
3. **Simple decisions** -- Yes/No only at the assessment level.
4. **Visual support** -- illustrations required for every assessment criterion.
5. **Just-in-time learning** -- training surfaces only after assessment failure.
6. **Minimal cognitive load** -- learning through action, not instruction.

## Assessment Metadata

- **Title:** Developmental Milestones Assessment
- **Level:** I
- **Age Range:** 0--18 months

Additional levels (II, III) are planned and will cover later developmental ranges.

## Scoring Types

Each criterion specifies one of four evaluation methods:

| Code | Description              | Input Method         |
| ---- | ------------------------ | -------------------- |
| TCT  | Formal testing           | Direct test          |
| NAB  | Observation              | Observation mode     |
| KOM  | Combination (test + obs) | Mixed                |
| NOV  | Time-limited observation | Timer-based (60 min) |

> **Open question:** The VB-MAPP standard uses a half-point scoring scale (0, 0.5, 1) per criterion. The original assessment document specifies 1--4 scoring. The MVP spec uses binary Yes/No. See [PM Questions: Scoring Model](pm-questions-scoring-model.en.md) for the full analysis and questions to resolve with the PM.

## Level I Sections

Level I currently includes MAND and TACT sections. Additional sections (Listener Responding, Visual Perceptual, etc.) will be added.

---

### Section 1: MAND (Requesting)

**Question:** Does the child use words, gestures, or cards to request desired items or activities?

#### Criteria

**1. Uses 2 words, gestures, or 2 PECS cards**

- Conditions: prompts allowed (echoic, imitation, non-physical)
- Examples: cookie, book
- Type: KOM

**2. Makes 4 different requests independently**

- Conditions: no prompts; excludes "What do you want?"; object may be visible
- Examples: musical toy, spring toy, ball
- Type: KOM

**3. Generalizes 6 mand responses**

- Conditions: with 2 people, in 2 environments, for 2 types of reinforcement
- Examples: asks mom and dad; at home and outside; different items
- Type: KOM

**4. Spontaneously makes 5 requests**

- Conditions: no verbal prompts; object may be visible; time constraint: 60 minutes
- Type: NOV

**5. Has 10 independent mand responses**

- Conditions: no prompts; excludes "What do you want?"
- Examples: apple, swing, car, juice
- Type: KOM

---

### Section 2: TACT (Labeling)

**Question:** Can the child label people, objects, body parts, or pictures?

#### Criteria

**1. Labels 2 objects**

- Examples: people, animals, characters, favorite items
- Type: TCT

**2. Labels 4 objects**

- Examples: people, animals, characters
- Type: TCT

**3. Labels 6 non-reinforcing objects**

- Examples: shoe, hat, spoon, car, mug, bed
- Type: TCT

**4. Spontaneously labels 2 objects**

- Conditions: no prompts; 60-minute observation
- Type: NOV

**5. Labels 10 objects**

- Examples: household items, people, body parts, pictures
- Type: TCT

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

1. **Sections list** -- MAND (active) + TACT (placeholder/coming soon). Entry point of the app.
2. **Section introduction** -- explains the skill category (video slot, short explanation, collapsible full explanation). Controls: "Start" / "Skip".
3. **Criteria list** -- 5 level cards showing progression through the section. Each card: simplified title, short description, status, optional progress.
4. **Criterion assessment** -- binary Yes/No question with illustration and context. "Yes" marks complete; "No" navigates to training.
5. **Training** -- video slot, step-by-step short guide, collapsible full guide. Controls: "Retry" / "Back".

All screens include a **language switcher** (RU/EN) in the page header, allowing parents to toggle the interface language at any time. Language preference is persisted across sessions.

### Criterion States

- Not started
- In progress
- Completed

### Section States

- Progress: X/5
- Status: Not started / In progress / Completed

### Assessment Loop

Assessment > (if No) Training > Reassessment -- repeats until "Yes" or parent navigates away.

## MVP Scope

### Included

- MAND section (5 criteria)
- Full assessment + training loop
- Progress tracking
- Static image placeholders for video/illustration slots
- Bilingual UI (Russian default, English) with language switcher on all pages

### Excluded

- TACT (shown as "coming soon" placeholder)
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

_Last updated: 2026-04-08_
