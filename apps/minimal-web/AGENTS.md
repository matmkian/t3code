# Minimal renderer guidance

Read `README.md` for scope and `UPSTREAM.md` before porting existing UI.

## Architecture

- Routes compose feature modules and shared layout components.
- Feature modules own their fixtures and components. Features communicate through route or layout composition rather than importing one another.
- Reusable generated primitives live in `src/components/ui`; screen-specific styling stays in feature components.
- Use the app-local `@/*` alias across modules and relative imports within one module.
- Import concrete files directly. This app has no barrel exports.

## Upstream reuse

- Copy UI from `apps/web` or external templates into this app, then maintain the copy independently.
- Record every substantive copied or adapted implementation in `UPSTREAM.md` at the source commit.
- Shared domain packages such as `@t3tools/contracts`, `@t3tools/client-runtime`, and `@t3tools/shared` remain valid dependencies when a feature needs them.

## Naming and tooling

- Use kebab-case file and folder names, PascalCase component exports, and `use-*` hook names.
- Let TanStack Router own `src/routeTree.gen.ts`; commit the generated tree and do not edit it.
- Add or update shadcn primitives through the shadcn CLI. Treat the generated files as local primitive snapshots and customize them only for behavior that applies to every use.
