# Minimal T3 Code Desktop — Program Charter

## North star

Create a focused macOS T3 Code desktop client for working with Codex and Claude across local and remote environments. Preserve T3 Code's existing backend capabilities behind a substantially smaller, calmer interface.

## Product surface

The final application supports:

- Environments, projects, and thread navigation
- Active and settled threads
- Chat timeline and prompt composer
- Codex and Claude provider and model selection
- Streaming, interruption, approvals, and user questions
- Thread and Git worktree creation
- SSH and Tailscale remote environments
- Existing threads hosted on a remote VPS

## Architecture constraints

- Add `apps/minimal-web`; keep `apps/web` intact.
- Reuse `apps/server`, `apps/desktop`, shared packages, provider adapters, authentication, pairing, persistence, and orchestration.
- Keep orchestration and provider behavior out of the renderer.
- Use the existing Electron shell with a selectable renderer.
- Isolate development data from installed and production T3 Code data.
- Preserve the MIT license and existing copyright notice.

## UI direction

- Develop the UI against realistic fixture data before functional wiring.
- Use a fresh shadcn project with the Nova style and Lucide icons.
- Prefer stock shadcn components and variants.
- Use a two-column desktop layout:
  - Left: environments, projects, and threads
  - Main: thread header, timeline, and composer
- Optimize for compact macOS desktop use, clarity, and low rendering overhead.

## Excluded surface

The minimal client omits:

- Browser and preview features
- Diff viewer
- Files panel
- Terminal UI
- Agents panel
- The entire right sidebar
- T3 Connect
- Clerk and Cloudflare relay
- Cursor, Grok, and OpenCode

Keep these exclusions explicit when evaluating dependencies from `apps/web`.

## Delivery principles

- Work one independently reviewable batch at a time.
- Resolve only decisions required by the current batch; record later questions as deferred.
- Approve the visual direction before adding functional complexity.
- Prefer a small renderer-selection seam over desktop duplication.
- Keep `apps/web` buildable throughout.
- Commit, push, or open a pull request only with explicit authorization.

## Batches

1. Static UI prototype with realistic fixtures
2. `apps/minimal-web` scaffold and renderer-selection seam
3. Minimal Electron development command
4. Read-only client-runtime connection
5. Live projects, threads, and timeline
6. Composer, streaming, and interruption
7. Approvals and user-input questions
8. Thread and worktree creation
9. SSH and Tailscale environments
10. Compatibility, isolation, and final verification

## Current batch

Batch 1 is visual only. It answers:

> What should the minimal T3 Code desktop experience look and feel like?

Use realistic fixtures while leaving runtime connections, Electron integration, persistence, orchestration, SSH, and real provider operations for later batches.

## Program completion

The program is complete when the minimal Electron application can safely connect to local or SSH/Tailscale environments, operate existing Codex and Claude threads, and pass focused build, typecheck, and launch verification without changing `apps/web` behavior or using production data.
