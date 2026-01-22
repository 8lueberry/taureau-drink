# PRD: Drink Selection App

## Introduction

Build a lightweight web app that helps users pick cocktails they can make by selecting available alcohol ingredients. Users drag items between an ingredients list and a selected list; the app updates a cocktails list based on matching rules.

## Goals

- Let users quickly select available alcohol via drag-and-drop.
- Show cocktails that match the selected alcohol list (at least one match).
- Keep the UI simple and fast for a general audience.

## User Stories

### US-001: View ingredient list
**Description:** As a user, I want to see a list of common cocktail alcohol so that I can choose what I have available.

**Acceptance Criteria:**
- [ ] Ingredients list renders from a static seed dataset in the repo.
- [ ] List items show ingredient name clearly.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-002: Move ingredients to selected list
**Description:** As a user, I want to drag one or more ingredients into a selected list so that I can indicate what I have.

**Acceptance Criteria:**
- [ ] Dragging an ingredient from Ingredients adds it to Selected.
- [ ] An ingredient appears in only one list at a time.
- [ ] Dragging multiple ingredients in sequence works without page reload.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-003: Move ingredients back to ingredients list
**Description:** As a user, I want to remove items from Selected by dragging them back so that I can adjust my selection.

**Acceptance Criteria:**
- [ ] Dragging an item from Selected to Ingredients removes it from Selected.
- [ ] Ingredients list restores the item in a consistent order.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: Show matching cocktails
**Description:** As a user, I want to see cocktails that match my selected alcohol so that I know what I can make.

**Acceptance Criteria:**
- [ ] Cocktails list updates whenever Selected changes.
- [ ] A cocktail appears if it has at least one ingredient in Selected.
- [ ] Empty state message appears when no cocktails match.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Functional Requirements

- FR-1: The system must load ingredients and cocktails from a static seed list in the repo.
- FR-2: The system must render three lists: Ingredients, Selected, and Cocktails.
- FR-3: The system must allow drag-and-drop from Ingredients to Selected.
- FR-4: The system must allow drag-and-drop from Selected to Ingredients.
- FR-5: The system must recompute the Cocktails list whenever Selected changes.
- FR-6: The system must display cocktails that have at least one ingredient in Selected.
- FR-7: The system must show an empty state when no cocktails match.

## Non-Goals (Out of Scope)

- No user accounts or persistence across sessions.
- No advanced matching (percent match, required full recipe).
- No runtime scraping of Wikipedia.
- No cocktail preparation steps or instructions.

## Design Considerations

- Keep layout simple: three columns on desktop, stacked lists on mobile.
- Make drag targets obvious with clear list headers and spacing.

## Technical Considerations

- Use a static data file (e.g., JSON/TS module) for ingredients and cocktails.
- Data should be derived from the referenced Wikipedia list but stored locally.

## Success Metrics

- Users can move an ingredient between lists in under 2 seconds.
- Cocktails list updates within 200ms after selection change.

## Open Questions

- Should cocktails be sorted alphabetically or by match count?
- Should the Ingredients list be searchable in v1?
