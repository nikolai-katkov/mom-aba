_[Русский](./README.ru.md)_

---

# Roadmap

Development status and story sequence for Mom ABA.

## Status Dashboard

| #     | Epic / Story                                                                                    | Status | Summary                                                                         |
| ----- | ----------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| 01    | **[Assessment Platform](01-assessment-foundation/_epic.en.md)**                                 | Done   | Core assessment flow: screens, state, loop                                      |
| 01-01 | [Assessment data model](01-assessment-foundation/01-01-assessment-data-model.en.md)             | Done   | TS interfaces, seed data, training model                                        |
| 01-02 | [Sections list screen](01-assessment-foundation/01-02-sections-list-screen.en.md)               | Done   | Entry point: Mand active, Tact placeholder                                      |
| 01-03 | [Section introduction screen](01-assessment-foundation/01-03-section-introduction-screen.en.md) | Done   | Progressive disclosure: explain before assess                                   |
| 01-04 | [Criteria list screen](01-assessment-foundation/01-04-criteria-list-screen.en.md)               | Done   | 5 level cards with status and progress                                          |
| 01-05 | [Criterion assessment screen](01-assessment-foundation/01-05-criterion-assessment-screen.en.md) | Done   | Binary Yes/No with illustration                                                 |
| 01-06 | [Training screen](01-assessment-foundation/01-06-training-screen.en.md)                         | Done   | Guidance after "No": steps, guide, retry                                        |
| 01-07 | [Assessment loop and state](01-assessment-foundation/01-07-assessment-loop-and-state.en.md)     | Done   | State persistence, assess-train-reassess loop                                   |
| 02    | **[Mand Content](02-mand-content/_epic.en.md)**                                                 | Done   | Mand criteria, introduction, training content                                   |
| 03    | **Internationalization (i18n)**                                                                 | Done   | Russian (default) + English, language switcher, translation infrastructure      |
| 04    | **Multi-Theme Design System**                                                                   | Done   | 3 themes (Warm/Soft/Editorial) + dark mode, layout diversity, icons, animations |
| 05    | **[Tact Section](05-tact-section/_epic.en.md)**                                                 | Done   | Tact content, vocabulary system, personal dictionary, placeholder sections      |
| 05-02 | [Enable Tact section](05-tact-section/05-02-enable-tact-section.en.md)                          | Done   | Activate Tact, fix subtitle, remove "coming soon"                               |
| 05-03 | [Tact training content](05-tact-section/05-03-tact-training-content.en.md)                      | Done   | 5 per-criterion training guides (EN + RU)                                       |
| 05-04 | [Vocabulary system](05-tact-section/05-04-vocabulary-system.en.md)                              | Done   | 27 categories x 3 difficulty levels                                             |
| 05-05 | [Placeholder sections](05-tact-section/05-05-placeholder-sections.en.md)                        | Done   | 7 future VB-MAPP Level I sections                                               |
| 05-06 | [Knowledge docs update](05-tact-section/05-06-knowledge-docs-update.en.md)                      | Done   | Tact methodology, vocabulary docs, MVP scope                                    |
| 05-07 | [Tests](05-tact-section/05-07-tests.en.md)                                                      | Done   | Unit + E2E for Tact, vocabulary, placeholders                                   |
| 05-08 | [Dictionary data model](05-tact-section/05-08-dictionary-data-model.en.md)                      | Done   | Types, state, storage, criterion-category mapping                               |
| 05-09 | [Onboarding page](05-tact-section/05-09-onboarding-page.en.md)                                  | Done   | App-level gate: beginner/intermediate/advanced                                  |
| 05-10 | [Dictionary provider](05-tact-section/05-10-dictionary-provider.en.md)                          | Done   | Context, hook, inclusion, mastery, practice words                               |
| 05-11 | [Dictionary categories page](05-tact-section/05-11-dictionary-categories-page.en.md)            | Done   | /dictionary route, 27-category grid                                             |
| 05-12 | [Dictionary category detail page](05-tact-section/05-12-dictionary-category-detail-page.en.md)  | Done   | /dictionary/:categoryId, word toggle, mastery dots                              |
| 05-13 | [Tabs UI component](05-tact-section/05-13-tabs-component.en.md)                                 | Done   | Generic tab bar for design system                                               |
| 05-14 | [Training page integration](05-tact-section/05-14-training-page-integration.en.md)              | Done   | Practice words section from personal dictionary                                 |
| 05-15 | [i18n dictionary strings](05-tact-section/05-15-i18n-dictionary-strings.en.md)                  | Done   | Dictionary/onboarding UI strings + vocabulary translations                      |
| 05-16 | [Dictionary tests](05-tact-section/05-16-dictionary-tests.en.md)                                | Done   | Unit tests for dictionary model, hook, vocabulary data                          |
