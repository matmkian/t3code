import { describe, expect, it } from "vite-plus/test";

import { resolveRendererTarget } from "./renderer-target.ts";

describe("resolveRendererTarget", () => {
  it("selects the full renderer when no target is configured", () => {
    expect(resolveRendererTarget({})).toEqual({
      name: "full",
      workspacePackage: "@t3tools/web",
      distDirectory: "apps/web/dist",
    });
  });

  it("selects the full renderer when requested explicitly", () => {
    expect(resolveRendererTarget({ T3CODE_RENDERER: "full" })).toEqual({
      name: "full",
      workspacePackage: "@t3tools/web",
      distDirectory: "apps/web/dist",
    });
  });

  it("selects the minimal renderer when requested", () => {
    expect(resolveRendererTarget({ T3CODE_RENDERER: "minimal" })).toEqual({
      name: "minimal",
      workspacePackage: "@t3tools/minimal-web",
      distDirectory: "apps/minimal-web/dist",
    });
  });

  it.each(["", "Full", " full ", "compact"])(
    "rejects configured renderer %j instead of falling back",
    (configuredRenderer) => {
      expect(() => resolveRendererTarget({ T3CODE_RENDERER: configuredRenderer })).toThrowError(
        new RangeError(
          `Unsupported T3CODE_RENDERER "${configuredRenderer}". Expected "full" or "minimal".`,
        ),
      );
    },
  );
});
