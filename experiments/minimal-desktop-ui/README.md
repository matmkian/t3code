# Minimal desktop UI — Batch 1 prototype

> PROTOTYPE — throwaway visual implementation. This is not the production web renderer.

This standalone Vite app implements the supplied Figma frame as a static React prototype while keeping `apps/web` untouched.

## Source of truth

- Figma file: `T3Code`
- Frame: `T3 Code / Main / Desktop / Light`
- Node: `33461:2009`

## Run

From the repository root:

```bash
pnpm --dir experiments/minimal-desktop-ui dev
```

If the server is already running on the VPS at port 5173, keep using the existing SSH tunnel and refresh `http://localhost:5173` locally.

## What is represented

- Fixed 288px navigation sidebar and flexible conversation surface
- Active, completed, waiting, selected, and settled thread treatments
- Exact provider logos exported from Figma; interface glyphs use matching Lucide icons
- User message, assistant work marker, assistant response, and fixed bottom composer
- Deterministic, in-memory fixture content with no backend, authentication, persistence, or Electron dependency

## Component boundary

The prototype uses the generated shadcn Base Nova Button, Input Group, Message Scroller, Message, Bubble, and Tooltip primitives. Small semantic structures handle the thread hierarchy and status treatments because those are product-specific rather than generic component-library concepts.

The stock Input Group needed prototype-local sizing for the 108px, 18px-radius composer. The stock Bubble needed a local neutral surface treatment to match the Figma user message. No shared or production component was changed.

## Still needed from Figma

The supplied frame defines the primary conversation state. Approval-request and user-question states from the original handoff are intentionally not invented; matching Figma node links are needed before those fixtures can be implemented faithfully.

## Deferred

- Interactive navigation, composer submission, model/access menus, and status controls
- Approval, interruption, and questionnaire mechanics
- Electron titlebar and drag regions
- Real connection, remote environment, persistence, authentication, and pairing behavior
