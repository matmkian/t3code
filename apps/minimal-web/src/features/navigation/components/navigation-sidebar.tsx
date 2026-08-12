import { ChevronDown, FolderPlus, Gauge, Search, Settings, SquarePen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { ThreadNavigationItem } from "./thread-navigation-item";
import { activeThreads, settledThreadTitles } from "../navigation-fixtures";

const primaryActions = [
  { label: "New chat", icon: SquarePen },
  { label: "New project", icon: FolderPlus },
  { label: "Search", icon: Search },
] as const;

const secondaryActions = [
  { label: "Usage", icon: Gauge },
  { label: "Settings", icon: Settings },
] as const;

export function NavigationSidebar() {
  return (
    <Sidebar
      aria-label="Workspace navigation"
      className="border-r border-sidebar-border"
      collapsible="none"
      role="complementary"
    >
      <SidebarHeader className="gap-1 px-2 pb-1 pt-0">
        <div className="flex h-12 items-center px-2 text-sm font-semibold">T3 Code</div>
        <nav aria-label="Primary">
          <SidebarMenu>
            {primaryActions.map(({ icon: Icon, label }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton tooltip={label}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>
      </SidebarHeader>

      <SidebarContent className="py-3">
        <SidebarGroup className="py-0">
          <SidebarGroupLabel className="gap-1">
            <ChevronDown aria-hidden="true" />
            <span>Projects</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {activeThreads.map((thread) => (
                <ThreadNavigationItem key={thread.title} thread={thread} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-3.5 py-0">
          <SidebarGroupLabel className="gap-1">
            <ChevronDown aria-hidden="true" />
            <span>Settled</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settledThreadTitles.map((title) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton>
                    <span>{title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="mx-0" />
      <SidebarFooter>
        <nav aria-label="Secondary">
          <SidebarMenu>
            {secondaryActions.map(({ icon: Icon, label }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton tooltip={label}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>
      </SidebarFooter>
    </Sidebar>
  );
}
