export interface RendererTarget {
  readonly name: "full" | "minimal";
  readonly workspacePackage: "@t3tools/web" | "@t3tools/minimal-web";
  readonly distDirectory: "apps/web/dist" | "apps/minimal-web/dist";
}

export function resolveRendererTarget(environment: {
  readonly T3CODE_RENDERER?: string | undefined;
}): RendererTarget {
  const configuredRenderer = environment.T3CODE_RENDERER;

  if (configuredRenderer === "minimal") {
    return {
      name: "minimal",
      workspacePackage: "@t3tools/minimal-web",
      distDirectory: "apps/minimal-web/dist",
    };
  }

  if (configuredRenderer === undefined || configuredRenderer === "full") {
    return {
      name: "full",
      workspacePackage: "@t3tools/web",
      distDirectory: "apps/web/dist",
    };
  }

  throw new RangeError(
    `Unsupported T3CODE_RENDERER "${configuredRenderer}". Expected "full" or "minimal".`,
  );
}
