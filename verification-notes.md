# Verification Notes

- The live University preview was opened on an unadopted Environment challenge.
- A second department row was added successfully; the desktop adoption card contained all four row controls without right-side overflow.
- A dedicated mobile viewport capture will verify the stacked team-row behavior below the `sm` breakpoint.
- The live University adoption card now places “Multidisciplinary team” above “3 students · 1 department”; the two labels no longer overlap at the narrow desktop-sidebar width.
- The existing report form retains its original structure, with the Supporting Evidence panel rendered below the unchanged reporting fields and without observed text overlap.
- The University facility checks were verified in the existing workspace; their control group was moved to a dedicated responsive row to preserve clean label spacing.
- Enabling the Innovation centre gives only category-relevant recommended challenges a visible +3 facility boost; unrelated active-project cards remain unchanged.
- The Government workspace displays CSV/JSON export controls and returns a one-sentence AI moderation gloss in the queue without disturbing queue alignment.
- The University challenge detail continues to retain the existing adoption workflow and team-selection layout after the additional feature integration.
- The University proposal form exposes Draft with AI and successfully fills a concrete title and summary using the selected report’s live title, description, and district.
- A supported PDF uploaded through Supporting Evidence successfully rendered as a Document entry with its filename and 1 KB size in the report form.
Local asset handoff: the site originally used relative /manus-storage/ URLs, which resolve on Manus hosting but fail on a plain localhost server. Home.tsx and LiquidCivicBackground.tsx now resolve those URLs to the published Manus asset origin when the hostname is localhost or 127.0.0.1. The complete local PNG archive includes PNG copies of every generated site image, including the liquid-metal study background.

