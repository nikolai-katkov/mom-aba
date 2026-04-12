_[Русский](./README.ru.md)_

---

# Roadmap

Development status and story sequence for Mom ABA.

## Status Dashboard

| #     | Epic / Story                                                                                    | Status      | Summary                                                                         |
| ----- | ----------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| 01    | **[Assessment Platform](01-assessment-foundation/_epic.en.md)**                                 | Done        | Core assessment flow: screens, state, loop                                      |
| 01-01 | [Assessment data model](01-assessment-foundation/01-01-assessment-data-model.en.md)             | Done        | TS interfaces, seed data, training model                                        |
| 01-02 | [Sections list screen](01-assessment-foundation/01-02-sections-list-screen.en.md)               | Done        | Entry point: Mand active, Tact placeholder                                      |
| 01-03 | [Section introduction screen](01-assessment-foundation/01-03-section-introduction-screen.en.md) | Done        | Progressive disclosure: explain before assess                                   |
| 01-04 | [Criteria list screen](01-assessment-foundation/01-04-criteria-list-screen.en.md)               | Done        | 5 level cards with status and progress                                          |
| 01-05 | [Criterion assessment screen](01-assessment-foundation/01-05-criterion-assessment-screen.en.md) | Done        | Binary Yes/No with illustration                                                 |
| 01-06 | [Training screen](01-assessment-foundation/01-06-training-screen.en.md)                         | Done        | Guidance after "No": steps, guide, retry                                        |
| 01-07 | [Assessment loop and state](01-assessment-foundation/01-07-assessment-loop-and-state.en.md)     | Done        | State persistence, assess-train-reassess loop                                   |
| 02    | **[Mand Content](02-mand-content/_epic.en.md)**                                                 | Done        | Mand criteria, introduction, training content                                   |
| 03    | **Internationalization (i18n)**                                                                 | Done        | Russian (default) + English, language switcher, translation infrastructure      |
| 04    | **Multi-Theme Design System**                                                                   | Done        | 3 themes (Warm/Soft/Editorial) + dark mode, layout diversity, icons, animations |
| 05    | **[Tact Section](05-tact-section/_epic.en.md)**                                                 | In Progress | Tact content, vocabulary system, placeholder sections                           |
| 05-02 | [Enable Tact section](05-tact-section/05-02-enable-tact-section.en.md)                          | Pending     | Activate Tact, fix subtitle, remove "coming soon"                               |
| 05-03 | [Tact training content](05-tact-section/05-03-tact-training-content.en.md)                      | Pending     | 5 per-criterion training guides (EN + RU)                                       |
| 05-04 | [Vocabulary system](05-tact-section/05-04-vocabulary-system.en.md)                              | Pending     | 27 categories x 3 difficulty levels                                             |
| 05-05 | [Placeholder sections](05-tact-section/05-05-placeholder-sections.en.md)                        | Pending     | 7 future VB-MAPP Level I sections                                               |
| 05-06 | [Knowledge docs update](05-tact-section/05-06-knowledge-docs-update.en.md)                      | Pending     | Tact methodology, vocabulary docs, MVP scope                                    |
| 05-07 | [Tests](05-tact-section/05-07-tests.en.md)                                                      | Pending     | Unit + E2E for Tact, vocabulary, placeholders                                   |
