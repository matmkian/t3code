import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";

import {
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar";
import { resolveSidebarState } from "./sidebarState";

function renderSidebarButton({
  className,
  isActive = false,
}: {
  className?: string;
  isActive?: boolean;
} = {}) {
  return renderToStaticMarkup(
    <SidebarProvider>
      <SidebarMenuButton className={className} isActive={isActive}>
        Projects
      </SidebarMenuButton>
    </SidebarProvider>,
  );
}

describe("sidebar primitives", () => {
  it("uses mobile sheet visibility for the shared responsive state", () => {
    expect(resolveSidebarState({ isMobile: true, open: true, openMobile: false })).toBe(
      "collapsed",
    );
    expect(resolveSidebarState({ isMobile: true, open: false, openMobile: true })).toBe("expanded");
    expect(resolveSidebarState({ isMobile: false, open: true, openMobile: false })).toBe(
      "expanded",
    );
  });

  it("exposes collapsed state for shared titlebar inset styling", () => {
    const html = renderToStaticMarkup(
      <SidebarProvider defaultOpen={false}>
        <div />
      </SidebarProvider>,
    );

    expect(html).toContain('data-sidebar-state="collapsed"');
  });

  it("keeps the sidebar trigger interactive inside Electron drag regions", () => {
    const html = renderToStaticMarkup(
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>,
    );

    expect(html).toContain("[-webkit-app-region:no-drag]");
    expect(html).toContain("size-[var(--workspace-titlebar-control-size)]!");
  });

  it("uses the stock base-mira menu button treatment", () => {
    const html = renderSidebarButton();

    expect(html).toContain('data-slot="sidebar-menu-button"');
    expect(html).toContain("h-8");
    expect(html).toContain("rounded-[calc(var(--radius-sm)+2px)]");
    expect(html).toContain("p-2");
    expect(html).toContain("gap-2");
    expect(html).toContain("text-xs");
    expect(html).toContain("ring-sidebar-ring");
    expect(html).toContain("hover:bg-sidebar-accent");
    expect(html).toContain("data-active:bg-sidebar-accent");
    expect(html).toContain("]:size-4");
    expect(html).toContain("]:shrink-0");
    expect(html).not.toContain("sidebar-row-hover");
    expect(html).not.toContain("sidebar-icon-color");
    expect(html).not.toContain("text-sidebar-muted-foreground/80");
  });

  it("uses the Figma section-label weight and color", () => {
    const html = renderToStaticMarkup(
      <SidebarProvider>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
      </SidebarProvider>,
    );

    expect(html).toContain("font-medium");
    expect(html).toContain("text-sidebar-foreground/70");
  });

  it("exposes active state through the stock data attribute", () => {
    const inactive = renderSidebarButton();
    const active = renderSidebarButton({ isActive: true });

    expect(inactive).not.toContain(' data-active=""');
    expect(active).toContain(' data-active=""');
  });

  it("preserves layout classes supplied by consumers", () => {
    const html = renderSidebarButton({ className: "cursor-grab" });

    expect(html).toContain("cursor-grab");
  });

  it("uses the stock menu action treatment", () => {
    const html = renderToStaticMarkup(
      <SidebarMenuAction aria-label="Create thread">
        <span>+</span>
      </SidebarMenuAction>,
    );

    expect(html).toContain('data-slot="sidebar-menu-action"');
    expect(html).toContain("rounded-[calc(var(--radius-sm)-2px)]");
    expect(html).toContain("hover:bg-sidebar-accent");
  });

  it("uses the stock submenu button treatment", () => {
    const html = renderToStaticMarkup(
      <SidebarMenuSubButton render={<button type="button" />}>Show more</SidebarMenuSubButton>,
    );

    expect(html).toContain('data-slot="sidebar-menu-sub-button"');
    expect(html).toContain("hover:bg-sidebar-accent");
    expect(html).toContain("data-active:bg-sidebar-accent");
  });
});
