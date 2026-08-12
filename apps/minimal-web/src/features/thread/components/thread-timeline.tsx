import { ChevronRight } from "lucide-react";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Message, MessageContent } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { threadFixture } from "../thread-fixtures";

export function ThreadTimeline() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="min-h-0">
        <MessageScrollerViewport>
          <MessageScrollerContent className="mx-auto min-h-full w-full max-w-[800px] gap-6 px-8 pt-[42px] pb-[180px] max-[980px]:px-6">
            <MessageScrollerItem>
              <Message align="end">
                <MessageContent>
                  <Bubble align="end" variant="muted">
                    <BubbleContent className="max-w-[520px] rounded-xl bg-neutral-100 px-3 py-2.5 leading-5 text-neutral-800">
                      {threadFixture.userMessage}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageScrollerItem>

            <MessageScrollerItem>
              <Marker className="gap-[3px] text-xs font-medium" variant="border">
                <MarkerContent>{threadFixture.workDuration}</MarkerContent>
                <MarkerIcon>
                  <ChevronRight aria-hidden="true" className="size-[13px]" />
                </MarkerIcon>
              </Marker>
            </MessageScrollerItem>

            <MessageScrollerItem>
              <Message>
                <MessageContent className="gap-3.5 text-sm leading-[1.55] text-neutral-800">
                  <p className="m-0">
                    Oui, l’accès MCP Convex fonctionne. J’ai interrogé uniquement le déploiement de
                    développement <strong className="font-semibold">blissful-labrador-739</strong>,
                    en lecture seule.
                  </p>
                  <p className="m-0">Aperçu des données :</p>
                  <ul className="m-0 list-disc space-y-0.5 pl-[22px]">
                    {threadFixture.assistantFacts.map((fact) => (
                      <li className="pl-0.5" key={fact}>
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <p className="m-0">
                    Aucune mutation n’a été exécutée. Je peux maintenant examiner une table, une
                    recette ou un workflow précis si nécessaire.
                  </p>
                </MessageContent>
              </Message>
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
