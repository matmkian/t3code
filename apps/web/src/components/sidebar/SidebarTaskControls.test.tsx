import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentProps, ReactNode } from "react";
import { describe, expect, it, vi } from "vite-plus/test";

import { Menu, MenuTrigger } from "../ui/menu";
import { SidebarProvider } from "../ui/sidebar";
import { SidebarFooterNavigation } from "./SidebarChrome";
import {
  SidebarProjectFilterButton,
  SidebarThreadEnvironmentIcon,
  SidebarTaskPrimaryControls,
} from "./SidebarTaskControls";

function renderWithSidebar(children: ReactNode): string {
  return renderToStaticMarkup(<SidebarProvider>{children}</SidebarProvider>);
}

function renderPrimaryControls(
  overrides: Partial<ComponentProps<typeof SidebarTaskPrimaryControls>> = {},
): string {
  return renderWithSidebar(
    <SidebarTaskPrimaryControls
      canStartTask
      newTaskActive={false}
      projectScopeLabel="t3code"
      projectScopeActive
      projectFilterControl={<button type="button">Filter</button>}
      searchOpen={false}
      searchQuery=""
      searchInputRef={{ current: null }}
      searchTriggerRef={{ current: null }}
      searchResultCount={0}
      activeSearchResultIndex={0}
      onNewTask={vi.fn()}
      onNewProject={vi.fn()}
      onOpenSearch={vi.fn()}
      onCloseSearch={vi.fn()}
      onSearchQueryChange={vi.fn()}
      onSearchKeyDown={vi.fn()}
      {...overrides}
    />,
  );
}

describe("default sidebar task controls", () => {
  it("replaces the Search row with an inline task search", () => {
    const closed = renderPrimaryControls();

    expect(closed).toContain(">Search</span>");
    expect(closed).not.toContain('role="combobox"');

    const open = renderPrimaryControls({
      searchOpen: true,
      searchQuery: "sidebar",
      searchResultCount: 2,
      activeSearchResultIndex: 1,
    });

    expect(open).not.toContain(">Search</span>");
    expect(open).toContain('role="combobox"');
    expect(open).toContain('aria-label="Search tasks"');
    expect(open).toContain('aria-label="Close task search"');
    expect(open).toContain('aria-activedescendant="sidebar-thread-search-result-1"');
  });

  it("does not reference a search result that is no longer rendered", () => {
    const html = renderPrimaryControls({
      searchOpen: true,
      searchQuery: "sidebar",
      searchResultCount: 1,
      activeSearchResultIndex: 2,
    });

    expect(html).not.toContain("aria-activedescendant");
  });

  it("keeps primary actions visible and communicates an active project scope", () => {
    const html = renderPrimaryControls();

    expect(html).toContain("New chat");
    expect(html).toContain("New project");
    expect(html).toContain(">Search</span>");
    expect(html.indexOf(">New project</span>")).toBeLessThan(html.indexOf(">Search</span>"));
    expect(html).toContain("t3code");
    expect(html).toContain('data-project-scope-active="true"');
    expect(html).toContain("Filter");
  });

  it("uses the native sidebar active state for an open draft", () => {
    const html = renderPrimaryControls({ newTaskActive: true });

    expect(html).toMatch(/data-active="true"[^>]*>.*?<span>New chat<\/span>/);
  });

  it("forwards menu semantics through the project filter button", () => {
    const html = renderWithSidebar(
      <Menu>
        <MenuTrigger
          render={<SidebarProjectFilterButton active={false} label="Filter tasks by project" />}
        />
      </Menu>,
    );

    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('data-slot="menu-trigger"');
  });

  it("keeps Usage reachable above Settings", () => {
    const html = renderWithSidebar(
      <SidebarFooterNavigation
        isUsageActive
        isSettingsActive={false}
        onUsage={vi.fn()}
        onSettings={vi.fn()}
      />,
    );

    expect(html).toContain("Usage");
    expect(html).toContain("Settings");
    expect(html.indexOf("Usage")).toBeLessThan(html.indexOf("Settings"));
    expect(html).toMatch(/data-active="true"[^>]*>.*?<span>Usage<\/span>/);
    expect(html).toMatch(/data-active="false"[^>]*>.*?<span>Settings<\/span>/);
  });

  it("distinguishes local and remote thread environments", () => {
    const local = renderWithSidebar(<SidebarThreadEnvironmentIcon isRemote={false} />);
    const remote = renderWithSidebar(<SidebarThreadEnvironmentIcon isRemote />);

    expect(local).toContain('aria-label="Local environment"');
    expect(local).not.toContain('aria-label="Remote environment"');
    expect(remote).toContain('aria-label="Remote environment"');
    expect(remote).not.toContain('aria-label="Local environment"');
  });
});
