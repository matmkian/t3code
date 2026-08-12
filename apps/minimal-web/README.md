# Minimal renderer

`apps/minimal-web` is the focused T3 Code renderer. It is an independently owned React application built on TanStack Router and shadcn Base Nova; the existing `apps/web` application remains the full renderer and the default build target.

Batch 2 presents one deterministic desktop conversation fixture. It has no client runtime, server connection, authentication, persistence, streaming, or live composer behavior.

## Commands

Run the renderer by itself:

```bash
pnpm --filter @t3tools/minimal-web dev
```

Build or typecheck it:

```bash
pnpm --filter @t3tools/minimal-web build
pnpm --filter @t3tools/minimal-web typecheck
```

Build the server with this renderer in its fixed client slot:

```bash
T3CODE_RENDERER=minimal vp run --filter t3 build
```

Omitting `T3CODE_RENDERER`, or setting it to `full`, keeps `apps/web` as the target. A dedicated minimal Electron development command is deferred to Batch 3.

## Structure

- `src/routes` composes the application surface.
- `src/features/navigation` owns the project and thread rail.
- `src/features/thread` owns the conversation header, timeline, and composer.
- `src/components/layout` owns renderer-level layout.
- `src/components/ui` contains locally generated shadcn primitives.
- `src/assets` contains renderer-owned copies of visual assets.

See [UPSTREAM.md](./UPSTREAM.md) before copying or refreshing existing UI.
