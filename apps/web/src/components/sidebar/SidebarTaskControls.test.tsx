import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vite-plus/test";

import { Menu, MenuTrigger } from "../ui/menu";
import { SidebarProvider } from "../ui/sidebar";
import { SidebarFooterNavigation } from "./SidebarChrome";
import {
  SidebarProjectFilterButton,
  SidebarTaskHeaderContent,
  SidebarTaskPrimaryControls,
} from "./SidebarTaskControls";

function renderWithSidebar(children: React.ReactNode): string {
  return renderToStaticMarkup(<SidebarProvider>{children}</SidebarProvider>);
}

describe("default sidebar task controls", () => {
  it("switches the branded header to an inline task search", () => {
    const closed = renderWithSidebar(
      <SidebarTaskHeaderContent
        brand={<span>T3 Code</span>}
        searchOpen={false}
        searchQuery=""
        searchInputRef={{ current: null }}
        searchResultCount={0}
        activeSearchResultIndex={0}
        onOpenSearch={vi.fn()}
        onCloseSearch={vi.fn()}
        onSearchQueryChange={vi.fn()}
        onSearchKeyDown={vi.fn()}
      />,
    );

    expect(closed).toContain("T3 Code");
    expect(closed).toContain('aria-label="Search tasks"');
    expect(closed).not.toContain('role="combobox"');

    const open = renderWithSidebar(
      <SidebarTaskHeaderContent
        brand={<span>T3 Code</span>}
        searchOpen
        searchQuery="sidebar"
        searchInputRef={{ current: null }}
        searchResultCount={2}
        activeSearchResultIndex={1}
        onOpenSearch={vi.fn()}
        onCloseSearch={vi.fn()}
        onSearchQueryChange={vi.fn()}
        onSearchKeyDown={vi.fn()}
      />,
    );

    expect(open).not.toContain("T3 Code");
    expect(open).toContain('role="combobox"');
    expect(open).toContain('aria-label="Search tasks"');
    expect(open).toContain('aria-label="Close task search"');
    expect(open).toContain('aria-activedescendant="sidebar-thread-search-result-1"');
  });

  it("does not reference a search result that is no longer rendered", () => {
    const html = renderWithSidebar(
      <SidebarTaskHeaderContent
        brand={<span>T3 Code</span>}
        searchOpen
        searchQuery="sidebar"
        searchInputRef={{ current: null }}
        searchResultCount={1}
        activeSearchResultIndex={2}
        onOpenSearch={vi.fn()}
        onCloseSearch={vi.fn()}
        onSearchQueryChange={vi.fn()}
        onSearchKeyDown={vi.fn()}
      />,
    );

    expect(html).not.toContain("aria-activedescendant");
  });

  it("keeps primary actions visible and communicates an active project scope", () => {
    const html = renderWithSidebar(
      <SidebarTaskPrimaryControls
        canStartTask
        projectScopeLabel="t3code"
        projectScopeActive
        projectFilterControl={<button type="button">Filter</button>}
        onNewTask={vi.fn()}
        onNewProject={vi.fn()}
      />,
    );

    expect(html).toContain("New chat");
    expect(html).toContain("New project");
    expect(html).toContain("t3code");
    expect(html).toContain('data-project-scope-active="true"');
    expect(html).toContain("Filter");
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
      <SidebarFooterNavigation onUsage={vi.fn()} onSettings={vi.fn()} />,
    );

    expect(html).toContain("Usage");
    expect(html).toContain("Settings");
    expect(html.indexOf("Usage")).toBeLessThan(html.indexOf("Settings"));
  });
});
