# Domain Documentation

Before exploring or changing the system:

- Read the root `CONTEXT.md` when it exists.
- Read relevant decisions under `docs/adr/`.

If these documents do not exist yet, proceed without creating placeholders. Use the domain-modeling skill when domain knowledge or an architectural decision needs to be recorded.

## Layout

```text
/
├── CONTEXT.md
└── docs/
    └── adr/
```

`CONTEXT.md` defines the shared domain vocabulary, boundaries, invariants, and major system relationships.

`docs/adr/` records durable architectural decisions that affect the system as a whole.

Use terminology from these documents consistently in code, documentation, specifications, and issues. Flag proposed work that conflicts with an accepted ADR before implementation.
