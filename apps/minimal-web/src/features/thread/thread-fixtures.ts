export const threadFixture = {
  projectName: "hocabas",
  title: "Refine Onboarding Recipe Import UI",
  workDuration: "Worked for 2m 41s",
  userMessage: "tu peux utiliser le mcp convex pour voir les data de mon déploiement de dev ?",
  assistantFacts: [
    "15 recettes, dont 7 générées par Hako",
    "82 ingrédients et 266 visuels",
    "15 sections, 61 étapes et 78 ingrédients de recettes",
    "1 période, 5 repas et 5 recettes planifiées",
    "43 ingrédients dans le panier",
    "6 workflows d’import, tous terminés",
    "3 recettes scrapées : Instagram, TikTok et YouTube",
    "125 événements d’utilisation de recettes",
    "26 exécutions de replay d’onboarding",
  ],
  composer: {
    placeholder: "Ask anything, @tag files/folders, $use skills, or / for commands",
    model: "gpt-5.6-sol-high",
    modelOptions: [
      { value: "gpt-5.6-sol-high", name: "GPT-5.6-Sol", effort: "High" },
      { value: "gpt-5.6-sol-medium", name: "GPT-5.6-Sol", effort: "Medium" },
      { value: "gpt-5.6-terra-medium", name: "GPT-5.6-Terra", effort: "Medium" },
    ],
    access: "full-access",
    accessOptions: [
      { value: "full-access", label: "Full access" },
      { value: "workspace-access", label: "Workspace access" },
      { value: "read-only", label: "Read only" },
    ],
  },
} as const;
