export type NavigationThread = {
  readonly project: string;
  readonly environment: "local" | "remote";
  readonly title: string;
  readonly branch?: string;
  readonly workspace?: "checkout" | "worktree";
  readonly provider?: "claude" | "openai";
  readonly state?: "done" | "running" | "waiting";
  readonly duration?: string;
  readonly selected?: boolean;
};

export const activeThreads: ReadonlyArray<NavigationThread> = [
  {
    project: "hocabas",
    environment: "local",
    title: "Refine Onboarding Recipe Import UI",
    branch: "main",
    workspace: "checkout",
    provider: "claude",
    state: "done",
    selected: true,
  },
  {
    project: "hocabas",
    environment: "local",
    title: "Enable EAS iOS Simulator Testing",
    branch: "t3code/enable-eas-ios-simulator",
    workspace: "checkout",
    provider: "openai",
    state: "running",
    duration: "25s",
  },
  {
    project: "hocabas",
    environment: "remote",
    title: "Implement HAK-6 Feature",
    branch: "t3code/implement-linear-hak-6",
    workspace: "worktree",
    provider: "claude",
    state: "waiting",
    duration: "1d",
  },
  {
    project: "hocabas",
    environment: "remote",
    title: "Refine Guest Import Tutorial",
    branch: "t3code/implement-hak-7",
    workspace: "worktree",
  },
];

export const settledThreadTitles = [
  "Rename Native App to Hako",
  "Fix Linear Access on VPS Agents",
  "Analyser la stack et prioriser les améliorations",
] as const;
