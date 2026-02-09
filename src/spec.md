# Specification

## Summary
**Goal:** Prepare CryptoLaunch Sentinel for production publishing by removing mock data paths, moving provider access and secrets to the backend, and ensuring the UI accurately reflects live readiness.

**Planned changes:**
- Replace the Discover feed’s primary mock data path with a backend-mediated projects fetch; when live data isn’t available, show a clear user-friendly message instead of substituting demo projects.
- Add backend admin-only methods to set/update external provider API keys/secrets, store them in canister state, and run all secret-required HTTP calls in the backend while returning only sanitized data.
- Update Settings > Data Providers to fetch provider statuses at runtime from the backend and present clear states (active, needs configuration, unavailable/error) using non-technical English text.
- Remove email from user profiles end-to-end (backend data model and frontend profile UI), including any email-related prompts or messaging.
- Finalize publish-facing metadata by setting an app-appropriate document title and meta description for “CryptoLaunch Sentinel” and removing placeholder/template metadata.

**User-visible outcome:** The published app shows real (or clearly unavailable) Discover data fetched via the backend, Settings accurately reports provider readiness, profiles have no email fields, and the app’s page title/description reflect CryptoLaunch Sentinel.
