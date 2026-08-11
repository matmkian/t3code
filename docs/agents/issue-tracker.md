# Issue Tracker

Linear is the source of truth for specifications and implementation issues in this repository.

## Default routing

- Workspace: Personal (`matmkian`)
- Team: T3 Code (`T3C`)
- Team ID: `3f42a8db-151a-4afc-b9dc-9c37fb63fb89`
- Current program: Minimal desktop UI
- Project ID: `17e3539e-05a7-4e65-998e-a81a06704e63`

Repository-wide T3 Code work defaults to the T3 Code team. Work belonging to the current program also targets the Minimal desktop UI project.

An explicitly named team, project, or issue overrides these defaults. Work belonging to another repository or team is outside this mapping.

## Artifacts

- Specifications and program-level decisions belong in Linear project documents.
- Implementation work belongs in Linear issues.
- Issues should explicitly identify their team, project, and applicable milestone.
- Dependencies use Linear's `blocks` and `blockedBy` relationships.
- Work should generally proceed from blockers to dependents.
- Project and milestone associations should be preserved when issues are updated.
- Automation should use stable Linear IDs; prose may use human-readable names.
