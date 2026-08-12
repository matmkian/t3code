import type { CSSProperties, ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function DesktopShell({
  navigation,
  content,
}: {
  readonly navigation: ReactNode;
  readonly content: ReactNode;
}) {
  return (
    <SidebarProvider
      className="size-full min-h-[640px] min-w-[900px] overflow-hidden"
      style={{ "--sidebar-width": "18rem" } as CSSProperties}
    >
      {navigation}
      <SidebarInset className="min-h-0 min-w-0 overflow-hidden">{content}</SidebarInset>
    </SidebarProvider>
  );
}
