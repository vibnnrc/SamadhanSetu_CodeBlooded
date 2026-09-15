- [x] Reposition the Made Traceable hero callout so it does not overlap key hero content.
- [x] Apply gentler, consistent corner radii to cards, panels, controls, and media frames.
- [x] Verify the desktop and mobile layouts after the refinement.
- [x] Identify every remaining sharp-cornered image frame and low-contrast text overlay.
- [x] Round image frames consistently and reinforce field-label and caption contrast.
- [x] Verify text visibility and image presentation on desktop and mobile.
- [x] Map the supplied report-classification implementation to the current data model and submission flow.
- [x] Adapt only the classification behaviour without altering rendered UI or unrelated features.
- [x] Verify classification outcomes and compare the rendered interface with the current version.
- [x] Add minimal visible classifier status and result feedback within the existing report form.
- [x] Verify the AI feedback treatment preserves the current page design on desktop and mobile.
- [x] Map the supplied multidisciplinary team customisation logic to the current University adoption flow.
- [x] Implement only the necessary team-selection controls and adoption data handling.
- [x] Verify customised team selection while preserving the existing interface on desktop and mobile.
- [x] Correct the right-column team-row overflow and align team metadata within the adoption card.
- [x] Verify the corrected team selector at desktop and mobile widths.
- [x] Separate the multidisciplinary heading from the team-count metadata in the narrow adoption card.
- [x] Verify the corrected team header without altering any other interface element.
- [x] Map all supplied export, evidence, facility, AI drafting, and AI moderation behaviours to the present data model and workflows.
- [x] Add secure backend procedures for AI proposal drafting, AI moderation summaries, and stored supporting evidence.
- [x] Add minimal supporting-evidence upload controls and problem-detail evidence badges.
- [x] Add CSV and JSON public-record exports to the Government dashboard.
- [x] Add University facility toggles with visible recommendation-score boosts.
- [x] Add in-context AI proposal drafting and AI queue-summary controls.
- [x] Verify the new workflows, downloads, evidence metadata, and responsive alignment without main-UI regressions.
- [x] Locate all referenced Manus-storage PNG assets and provide their usable paths.
- [x] Package every used PNG image into one downloadable archive.
- [x] Collect all generated PNG assets used by the site into a complete local handoff archive.
- [x] Identify and document the local image-reference issue affecting side-panel rendering.
- [x] Verify the local asset package and provide it to the user.

- [x] Confirm notification channels, recipient rules, and delivery timing for citizens, universities, and government.
- [x] Design and implement the new-problem notification event flow.
- [x] Add recipient-aware notification access and verify delivery behaviour.


- [x] Define the notification data model and apply the non-destructive database migration.
- [x] Add backend broadcast, authenticated retrieval, and mark-as-read procedures.
- [x] Add the in-app notification bell for all workspace views and trigger alerts on new problem submission.
- [x] Verify notification changes with TypeScript checks, production build, and unit tests.

## Notification implementation note
The active civic-field-manual demo keeps an immediate local/shared-storage notification mirror so the bell works in the preview even when a viewer is using the demo role switcher. Authenticated users are also persisted in the `notifications` table and can use the protected tRPC list/mark-as-read procedures; the public submission event broadcasts one record to every registered user.

- [x] Refactor the full-stack runtime into a Vercel-compatible Express function without changing existing routes or behavior.
- [x] Preserve SPA fallback, Manus storage routing, OAuth callback paths, tRPC API paths, and environment-variable contracts for Vercel.
- [x] Verify the local Vercel entrypoint, generated assets, API response, TypeScript build, and existing feature test suite.
- [ ] Run an authenticated Vercel preview deployment to verify the hosted runtime, OAuth callback, storage proxy, and production environment variables.

- [x] Fix Vercel-deployed image and generated asset loading without changing the established UI or 3D background.
