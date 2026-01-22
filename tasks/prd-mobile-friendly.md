# PRD: Mobile-Friendly Drink Selection App

## Introduction

The current drink selection app relies exclusively on drag-and-drop interactions, which are not optimal for mobile devices. Touch screens don't support traditional drag-and-drop gestures well, making the app difficult to use on smartphones and tablets. This PRD outlines requirements to make the app fully functional and user-friendly on mobile devices while maintaining the existing desktop drag-and-drop experience.

## Goals

- Enable seamless ingredient selection on mobile devices without requiring drag-and-drop.
- Maintain existing drag-and-drop functionality on desktop for users who prefer it.
- Provide a consistent, intuitive user experience across all device types.
- Ensure the app is responsive and touch-friendly on mobile screens.

## User Stories

### US-005: Tap to select ingredients on mobile
**Description:** As a mobile user, I want to tap ingredients to add them to my selected list so that I can use the app without needing to drag items.

**Acceptance Criteria:**
- [ ] Tapping an ingredient in the Ingredients list adds it to the Selected list.
- [ ] Tapping an ingredient in the Selected list removes it and returns it to the Ingredients list.
- [ ] Visual feedback (e.g., highlight, animation) indicates when an ingredient is tapped.
- [ ] Interaction works on touch devices (iOS, Android).
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill with mobile viewport.

### US-006: Responsive layout for mobile screens
**Description:** As a mobile user, I want the app layout to adapt to my small screen so that I can see all sections clearly without horizontal scrolling.

**Acceptance Criteria:**
- [ ] Layout stacks vertically on mobile screens (< 768px width).
- [ ] All three sections (Ingredients, Selected, Cocktails) are fully visible and accessible.
- [ ] Text is readable without zooming (minimum 16px font size for body text).
- [ ] Touch targets are at least 44x44px for easy tapping.
- [ ] Spacing and padding are appropriate for mobile viewing.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill with mobile viewport.

### US-007: Dual interaction modes (tap and drag)
**Description:** As a user, I want the app to support both tap and drag interactions so that I can use whichever method is most convenient for my device.

**Acceptance Criteria:**
- [ ] Desktop users can continue using drag-and-drop as before.
- [ ] Mobile users can use tap/click to move ingredients.
- [ ] Both interaction methods work simultaneously without conflicts.
- [ ] The app detects the appropriate interaction method based on device capabilities or user preference.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill with both desktop and mobile viewports.

### US-008: Touch-friendly ingredient list
**Description:** As a mobile user, I want ingredient items to be easy to tap and visually distinct so that I can quickly select what I need.

**Acceptance Criteria:**
- [ ] Each ingredient item has sufficient padding for comfortable tapping.
- [ ] Items have clear visual boundaries (borders, backgrounds, or spacing).
- [ ] Active/hover states provide clear feedback on touch.
- [ ] Items are spaced appropriately to prevent accidental taps.
- [ ] Long ingredient names wrap or truncate gracefully.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill with mobile viewport.

### US-009: Mobile-optimized cocktail display
**Description:** As a mobile user, I want to see matching cocktails in a format that's easy to read and scroll through on my small screen.

**Acceptance Criteria:**
- [ ] Cocktail list is scrollable if it exceeds viewport height.
- [ ] Cocktail names and ingredients are clearly readable on mobile.
- [ ] Each cocktail item has appropriate spacing for touch interaction.
- [ ] Empty state message is visible and readable on mobile.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill with mobile viewport.

## Functional Requirements

- FR-8: The system must support tap/click interactions to move ingredients between lists in addition to drag-and-drop.
- FR-9: The system must detect touch-capable devices and optimize the UI accordingly.
- FR-10: The system must maintain drag-and-drop functionality on desktop devices.
- FR-11: The system must use a responsive layout that stacks vertically on screens narrower than 768px.
- FR-12: The system must ensure all interactive elements meet minimum touch target size (44x44px).
- FR-13: The system must provide visual feedback for all user interactions (tap, drag, hover).
- FR-14: The system must prevent accidental interactions through appropriate spacing and touch target sizing.

## Non-Goals (Out of Scope)

- No separate mobile app (web app only, responsive design).
- No gesture-based interactions beyond tap and drag (e.g., swipe to delete).
- No offline functionality or PWA features.
- No device-specific optimizations beyond responsive design.
- No changes to the core matching algorithm or data structure.

## Design Considerations

### Layout
- **Desktop (> 768px):** Maintain current two-column grid layout for Ingredients and Selected sections.
- **Mobile (< 768px):** Stack all sections vertically:
  - Ingredients section (full width)
  - Selected section (full width)
  - Cocktails section (full width)
- Use consistent spacing and padding across breakpoints.

### Interaction Methods
- **Desktop:** Primary interaction remains drag-and-drop, with tap/click as secondary option.
- **Mobile:** Primary interaction is tap/click, drag-and-drop disabled or optional.
- Consider using CSS media queries with `pointer: coarse` to detect touch devices.

### Visual Feedback
- Provide clear visual states for:
  - Default ingredient item appearance
  - Hover state (desktop)
  - Active/tap state (mobile)
  - Dragging state (desktop)
- Use subtle animations for state transitions (e.g., fade, slide) to enhance UX.

### Touch Targets
- Minimum 44x44px for all interactive elements (Apple HIG and Material Design guidelines).
- Increase padding in list items to meet touch target requirements.
- Ensure adequate spacing between items to prevent mis-taps.

## Technical Considerations

### Responsive Design
- Use Tailwind CSS responsive utilities (e.g., `md:` prefix) for breakpoint-specific styles.
- Test at common breakpoints: 320px, 375px, 414px (mobile), 768px (tablet), 1024px+ (desktop).

### Interaction Detection
- Consider using `@media (pointer: coarse)` to detect touch devices.
- Alternatively, use JavaScript to detect touch capability: `'ontouchstart' in window`.
- May need to conditionally enable/disable drag handlers based on device type.

### Event Handling
- Add `onClick` handlers to ingredient items for tap interactions.
- Ensure click events don't conflict with drag events.
- May need to prevent default drag behavior on mobile or use touch event handlers.

### Performance
- Ensure tap interactions are responsive (< 100ms feedback).
- Avoid layout shifts during interaction state changes.
- Test scrolling performance on mobile devices with long lists.

## Success Metrics

- Users can select an ingredient on mobile in under 1 second (tap interaction).
- Layout adapts correctly to screen sizes from 320px to 1920px width.
- Touch targets meet accessibility guidelines (minimum 44x44px).
- No horizontal scrolling required on mobile devices.
- App works on iOS Safari, Chrome Android, and other major mobile browsers.

## Open Questions

- Should drag-and-drop be completely disabled on mobile, or should it be optional?
- Should we add a visual indicator (icon) to show that items are tappable on mobile?
- Should we implement a "select all" or "clear all" button for mobile users?
- Should ingredient lists be collapsible/expandable on mobile to save screen space?
- Should we add haptic feedback on supported mobile devices for tap interactions?
