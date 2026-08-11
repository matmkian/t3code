import {
  FolderPlusIcon,
  ListFilterIcon,
  MonitorIcon,
  SearchIcon,
  ServerIcon,
  SquarePenIcon,
  XIcon,
} from "lucide-react";
import {
  memo,
  type ChangeEventHandler,
  type ComponentProps,
  type KeyboardEventHandler,
  type ReactNode,
  type RefObject,
} from "react";

import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export const SidebarThreadEnvironmentIcon = memo(function SidebarThreadEnvironmentIcon({
  isRemote,
}: {
  isRemote: boolean;
}) {
  const Icon = isRemote ? ServerIcon : MonitorIcon;
  const label = isRemote ? "Remote environment" : "Local environment";

  return (
    <Icon
      role="img"
      aria-label={label}
      className="size-3 shrink-0 text-sidebar-muted-foreground/70"
    />
  );
});

export const SidebarTaskPrimaryControls = memo(function SidebarTaskPrimaryControls(props: {
  canStartTask: boolean;
  newTaskActive: boolean;
  projectScopeLabel: string;
  projectScopeActive: boolean;
  projectFilterControl: ReactNode;
  newTaskTitle?: string;
  searchOpen: boolean;
  searchQuery: string;
  searchInputRef: RefObject<HTMLInputElement | null>;
  searchTriggerRef: RefObject<HTMLButtonElement | null>;
  searchResultCount: number;
  activeSearchResultIndex: number;
  onNewTask: () => void;
  onNewProject: () => void;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  onSearchQueryChange: ChangeEventHandler<HTMLInputElement>;
  onSearchKeyDown: KeyboardEventHandler<HTMLInputElement>;
}) {
  const searchResultsVisible = props.searchQuery.trim().length > 0 && props.searchResultCount > 0;
  const activeSearchResultExists =
    props.activeSearchResultIndex >= 0 && props.activeSearchResultIndex < props.searchResultCount;

  return (
    <>
      <SidebarGroup className="relative z-[1] py-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              isActive={props.newTaskActive}
              disabled={!props.canStartTask}
              title={props.newTaskTitle}
              onClick={props.onNewTask}
            >
              <SquarePenIcon aria-hidden />
              <span>New chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton type="button" onClick={props.onNewProject}>
              <FolderPlusIcon aria-hidden />
              <span>New project</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {props.searchOpen ? (
              <div className="flex h-8 min-w-0 items-center gap-[var(--sidebar-control-gap)] rounded-[var(--control-radius)] bg-sidebar-control-surface px-[var(--sidebar-row-content-inset)] text-sidebar-foreground ring-1 ring-sidebar-border/70 focus-within:ring-2 focus-within:ring-ring">
                <SearchIcon aria-hidden className="size-4 shrink-0 text-sidebar-muted-foreground" />
                <Input
                  ref={props.searchInputRef}
                  nativeInput
                  unstyled
                  type="search"
                  value={props.searchQuery}
                  onChange={props.onSearchQueryChange}
                  onKeyDown={props.onSearchKeyDown}
                  placeholder="Search tasks"
                  aria-label="Search tasks"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={searchResultsVisible}
                  aria-controls={searchResultsVisible ? "sidebar-thread-search-results" : undefined}
                  aria-activedescendant={
                    searchResultsVisible && activeSearchResultExists
                      ? `sidebar-thread-search-result-${props.activeSearchResultIndex}`
                      : undefined
                  }
                  className="min-w-0 flex-1 [&_[data-slot=input]]:h-auto [&_[data-slot=input]]:p-0 [&_[data-slot=input]]:leading-normal [&_[data-slot=input]]:text-sm [&_[data-slot=input]]:font-normal [&_[data-slot=input]]:text-sidebar-foreground [&_[data-slot=input]]:placeholder:text-sidebar-muted-foreground"
                />
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="shrink-0 border-transparent"
                  aria-label="Close task search"
                  onClick={props.onCloseSearch}
                >
                  <XIcon aria-hidden />
                </Button>
              </div>
            ) : (
              <SidebarMenuButton
                ref={props.searchTriggerRef}
                type="button"
                aria-expanded={false}
                onClick={props.onOpenSearch}
              >
                <SearchIcon aria-hidden />
                <span>Search</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="relative z-[1] gap-1 pb-0">
        <SidebarGroupLabel
          className="justify-between pe-1 opacity-70"
          data-project-scope-active={props.projectScopeActive}
        >
          <span className="min-w-0 flex-1 truncate">{props.projectScopeLabel}</span>
          {props.projectFilterControl}
        </SidebarGroupLabel>
      </SidebarGroup>
    </>
  );
});

export function SidebarProjectFilterButton(
  props: { active: boolean; label: string } & Omit<ComponentProps<typeof Button>, "children">,
) {
  const { active, className, label, ...buttonProps } = props;
  return (
    <Button
      {...buttonProps}
      type="button"
      size="icon-xs"
      variant="ghost"
      data-active={active}
      aria-label={label}
      className={cn(
        "border-transparent data-[active=true]:bg-sidebar-control-surface data-[active=true]:text-sidebar-foreground",
        className,
      )}
    >
      <ListFilterIcon aria-hidden />
    </Button>
  );
}
