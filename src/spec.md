# Specification

## Summary
**Goal:** Enable basic first-time user onboarding using Internet Identity only (no email).

**Planned changes:**
- Add a minimal first-time onboarding flow shown after a user signs in with Internet Identity.
- Store a simple “has completed onboarding” flag per user in the backend (single Motoko actor) so onboarding is only shown once.
- Provide a simple way for the user to complete/dismiss onboarding and proceed to the main app experience.

**User-visible outcome:** After signing in with Internet Identity, first-time users see a brief onboarding screen and can continue into the app; returning users go directly to the app without seeing onboarding again.
