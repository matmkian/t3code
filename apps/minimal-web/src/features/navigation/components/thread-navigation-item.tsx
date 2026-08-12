import {
  CircleCheck,
  Clock,
  FolderGit2,
  GitBranch,
  LoaderCircle,
  Monitor,
  Server,
} from "lucide-react";

import claudeLogo from "@/assets/claude.svg";
import openAiLogo from "@/assets/openai.svg";
import { Badge } from "@/components/ui/badge";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import type { NavigationThread } from "../navigation-fixtures";

function ProviderBadge({ provider }: { readonly provider: "claude" | "openai" }) {
  const providerName = provider === "claude" ? "Claude" : "OpenAI";

  return (
    <Badge aria-label={providerName} variant="outline">
      <img
        alt=""
        className="size-3 object-contain"
        src={provider === "claude" ? claudeLogo : openAiLogo}
      />
    </Badge>
  );
}

function ThreadState({ thread }: { readonly thread: NavigationThread }) {
  if (thread.state === "done") {
    return (
      <Badge className="border-green-200 bg-green-50 text-green-700" variant="outline">
        <CircleCheck aria-hidden="true" data-icon="inline-start" />
        Done
      </Badge>
    );
  }

  if (thread.state === "running") {
    return (
      <Badge className="border-blue-200 bg-blue-50 text-blue-700" variant="outline">
        <LoaderCircle aria-hidden="true" data-icon="inline-start" />
        {thread.duration}
      </Badge>
    );
  }

  if (thread.state === "waiting") {
    return (
      <Badge variant="outline">
        <Clock aria-hidden="true" data-icon="inline-start" />
        {thread.duration}
      </Badge>
    );
  }

  return null;
}

export function ThreadNavigationItem({ thread }: { readonly thread: NavigationThread }) {
  const ProjectIcon = thread.environment === "local" ? Monitor : Server;
  const WorkspaceIcon = thread.workspace === "worktree" ? FolderGit2 : GitBranch;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        aria-current={thread.selected ? "page" : undefined}
        className="h-auto flex-col items-stretch gap-1 rounded-[10px] p-2 [&_svg]:size-3"
        isActive={thread.selected}
        type="button"
      >
        <span className="flex h-5 w-full items-center justify-between">
          <span className="flex min-w-0 flex-1 items-center gap-[5px] overflow-hidden text-muted-foreground">
            <ProjectIcon aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-xs font-normal leading-4">
              {thread.project}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <ThreadState thread={thread} />
            {thread.provider ? <ProviderBadge provider={thread.provider} /> : null}
          </span>
        </span>
        <span className="w-full truncate text-sm leading-5">{thread.title}</span>
        {thread.branch ? (
          <span className="flex min-w-0 items-center gap-[5px] text-xs font-normal leading-4 text-muted-foreground">
            <WorkspaceIcon aria-hidden="true" />
            <span className="truncate">{thread.branch}</span>
          </span>
        ) : null}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
