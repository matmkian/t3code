import { ThreadComposer } from "./thread-composer";
import { ThreadHeader } from "./thread-header";
import { ThreadTimeline } from "./thread-timeline";

export function ThreadView() {
  return (
    <section
      aria-label="Conversation"
      className="relative grid size-full min-h-0 min-w-0 grid-rows-[48px_minmax(0,1fr)] bg-background"
    >
      <ThreadHeader />
      <ThreadTimeline />
      <ThreadComposer />
    </section>
  );
}
