# Samadhan Setu Redesign — Design Direction

## Research Notes

The redesign borrows **principles**, rather than visual assets or layouts, from established public-service experiences. GOV.UK’s design system presents a compact, task-first hierarchy and treats accessible reusable components and patterns as the foundation of a service journey.[1] NYC 311 puts the primary citizen intent—reporting a problem, looking up a request, or finding a topic—in the first visual decision space, with utility search kept in the header.[2] Samadhan Setu will use these lessons by making reporting and tracking clear, retaining discovery and role controls, and keeping the rich 3D surface as an atmospheric layer rather than a distraction from public tasks.

| Reference | Pattern retained as inspiration | Samadhan Setu translation |
|---|---|---|
| GOV.UK Design System | Clear service navigation, considered component patterns, visible focus treatment | A disciplined utility header, contextual task controls, practical form grouping, and strong keyboard states |
| NYC 311 | Search in the utility layer; urgent citizen actions established immediately in the hero | A compact header search, a primary “Report a problem” action, and task cards that preserve access to browse and progress tracking |

## Three Candidate Directions

### 1. Civic Field Manual

**Very Brief Intro:** A calm, editorial public-service experience that feels like an expertly maintained community operations manual. It makes the rich liquid-metal scene feel like an active civic surface beneath carefully composed service tools.

**Probability:** 0.07

### 2. Jan Shakti Atlas

**Very Brief Intro:** A geographic, map-led civic platform inspired by survey archives and public works diagrams, with regional wayfinding and a more documentary tone. The 3D field becomes an abstract terrain layer.

**Probability:** 0.03

### 3. Coalition Ledger

**Very Brief Intro:** A dark, institutional collaboration workspace where problems, university teams, and funders appear as connected evidence cards. The experience prioritises partner coordination and status transparency.

**Probability:** 0.09

## Chosen Direction: Civic Field Manual

### Design Movement

**Contemporary civic editorialism**: the restraint, typographic authority, and service-first clarity of a well-designed public institution combined with the tactility of field notes and infrastructure drawings.

### Core Principles

1. **Action before ornament:** the first choices always support reporting, finding, or tracking an issue.
2. **Evidence is visible:** location, status, activity, and participation are presented as readable field signals rather than decoration.
3. **Atmosphere stays subordinate:** the interactive liquid-metal canvas remains fixed and fully operational, but purposeful translucent layers preserve task focus.
4. **One platform, several roles:** role-specific actions are grouped naturally and never require users to decode a dashboard-first interface.

### Color Philosophy

The civic foreground uses mineral white, warm graphite, muted forest, and oxidised brass. These practical, earthy tones retain the authority and trust of a public institution, while allowing the silver-green 3D field to read as an active shared surface. **Oxidised brass (`#B97829`)** is reserved for priority signals, focus rings, and limited high-value calls to action so the primary action remains unmistakable.

### Layout Paradigm

The site is organised as a **service rail over a living surface**. A slim utility bar provides identity, search, and role access; an offset primary-action rail holds the most common next steps. Content steps down through uneven, document-like panels rather than one centralised grid, creating a practical field-journal rhythm. On mobile, the rail compresses into a clear stacked task tray while preserving all controls.

### Signature Elements

1. A brass **Civic Compass** marker: a small directional glyph used for active navigation, section eyebrows, and status pivots.
2. **Field labels**: restrained monospaced metadata strips that attach context to cards, forms, charts, and action groups.
3. **Routed pathways**: thin, curved connector lines around hero task cards and collaboration components that suggest citizen-to-university-to-industry flow.

### Interaction Philosophy

Interactions should read like confident service tools: direct clicks produce immediate state changes, filters show their effect quickly, and contextual controls appear next to the data they change. Hovering exposes a subtle raised-material response; task cards guide users to the next decision without turning the page into a game. The background preserves its existing pointer-motion folds and press ripples without competing with foreground interactions.

### Animation

Motion is limited to short, deliberate transitions: panels lift by 2–4px on hover, navigation highlights glide under the active item, utility drawers arrive at 200–250ms, and section content fades upward by 10px at a 40ms stagger. The canvas animation remains unchanged. All foreground movement respects `prefers-reduced-motion`, leaving state clarity intact without nonessential motion.

### Typography System

**Fraunces** remains the expressive display face for public-impact statements and key headings; **IBM Plex Sans** carries forms, navigation, tables, and dense data with high legibility; **IBM Plex Mono** supports field labels, IDs, counts, and analytical context. Editorial headings use medium rather than oversized bold weight; controls are compact, explicit, and sentence-case.

### Brand Essence

**Samadhan Setu is Jharkhand’s shared civic workbench, routing community evidence to the people who can turn it into action.**

**Personality:** grounded, capable, transparent.

### Brand Voice

Headlines are concrete and outcome-led. CTAs use verbs that describe what will happen next; microcopy explains why a detail is being requested. It avoids startup promises, bureaucratic jargon, and empty institutional welcome messages.

> “Turn a local issue into a visible public task.”

> “See who is working on it, what changed, and what happens next.”

### Wordmark & Logo

The mark is a **three-point bridge compass**: three civic nodes linked by a slight arch, suggesting citizens, institutions, and industry meeting at one shared surface. The wordmark uses Fraunces with deliberate tracking and an integrated bridge bar, not a default system font.

### Signature Brand Color

**Oxidised Brass — `#B97829`**

## Non-Negotiable Preservation List

The redesign must retain every existing functional flow: seeded problem data; shared/local persistence with safe fallback; role switching; home, browse, submit, detail, dashboard, and about views; filtering and sorting; search; upvoting; comments; adoption; proposals; industry support; lifecycle updates; government moderation and outcome selection; category suggestion and similar-report detection; photo preview; charts; reset data; responsive navigation; keyboard focus; and the fixed interactive `LiquidCivicBackground` canvas including cursor surface movement and press ripples.

## References

[1]: https://design-system.service.gov.uk/ "GOV.UK Design System"
[2]: https://portal.311.nyc.gov/ "NYC 311"
