import { createFileRoute } from "@tanstack/react-router";

import { DesktopShell } from "@/components/layout/desktop-shell";
import { NavigationSidebar } from "@/features/navigation/components/navigation-sidebar";
import { ThreadView } from "@/features/thread/components/thread-view";

export const Route = createFileRoute("/")({ component: MinimalRendererRoute });

function MinimalRendererRoute() {
  return <DesktopShell navigation={<NavigationSidebar />} content={<ThreadView />} />;
}
