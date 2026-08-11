import {
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CircleCheck,
  Clock3,
  FolderPlus,
  Gauge,
  GitBranch,
  PanelLeft,
  Search,
  Settings,
  SquarePen,
} from "lucide-react"

import claudeLogo from "@/assets/claude.svg"
import openAiLogo from "@/assets/openai.svg"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { TooltipProvider } from "@/components/ui/tooltip"

type Thread = {
  title: string
  branch?: string
  provider?: "claude" | "openai"
  state?: "done" | "running" | "waiting"
  duration?: string
  selected?: boolean
}

const activeThreads: Thread[] = [
  {
    title: "Refine Onboarding Recipe Import UI",
    branch: "main",
    provider: "claude",
    state: "done",
  },
  {
    title: "Enable EAS iOS Simulator Testing",
    branch: "t3code/enable-eas-ios-simulator",
    provider: "openai",
    state: "running",
    duration: "25s",
  },
  {
    title: "Implement HAK-6 Feature",
    branch: "t3code/implement-linear-hak-6",
    provider: "claude",
    state: "waiting",
    duration: "1d",
  },
  {
    title: "Refine Guest Import Tutorial",
    branch: "t3code/implement-hak-7",
    selected: true,
  },
]

const settledThreads = [
  "Rename Native App to Hako",
  "Fix Linear Access on VPS Agents",
  "Analyser la stack et prioriser les améliorations",
]

const facts = [
  "15 recettes, dont 7 générées par Hako",
  "82 ingrédients et 266 visuels",
  "15 sections, 61 étapes et 78 ingrédients de recettes",
  "1 période, 5 repas et 5 recettes planifiées",
  "43 ingrédients dans le panier",
  "6 workflows d’import, tous terminés",
  "3 recettes scrapées : Instagram, TikTok et YouTube",
  "125 événements d’utilisation de recettes",
  "26 exécutions de replay d’onboarding",
]

function ProviderLogo({ provider }: { provider: "claude" | "openai" }) {
  return (
    <img
      alt={provider === "claude" ? "Claude" : "OpenAI"}
      className="provider-logo"
      src={provider === "claude" ? claudeLogo : openAiLogo}
    />
  )
}

function ThreadItem({ thread }: { thread: Thread }) {
  return (
    <button className="thread" data-selected={thread.selected || undefined}>
      <span className="thread-topline">
        <span className="project-name">hocabas</span>
        <span className="thread-status">
          {thread.state === "done" ? (
            <span className="status-pill status-done">
              <Check /> Done
            </span>
          ) : null}
          {thread.state === "running" ? (
            <span className="status-pill status-running">
              <span className="pulse-dot" /> {thread.duration}
            </span>
          ) : null}
          {thread.state === "waiting" ? (
            <span className="status-duration">{thread.duration}</span>
          ) : null}
          {thread.provider ? <ProviderLogo provider={thread.provider} /> : null}
          {thread.selected ? (
            <span className="selected-actions">
              <Clock3 /> <CircleCheck />
            </span>
          ) : null}
        </span>
      </span>
      <span className="thread-title">{thread.title}</span>
      {thread.branch ? (
        <span className="thread-branch">
          <GitBranch /> <span>{thread.branch}</span>
        </span>
      ) : null}
    </button>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">T3 Code</div>
      <nav className="primary-nav" aria-label="Primary">
        <Button variant="ghost">
          <SquarePen /> New chat
        </Button>
        <Button variant="ghost">
          <FolderPlus /> New project
        </Button>
        <Button variant="ghost">
          <Search /> Search
        </Button>
      </nav>

      <div className="sidebar-scroll">
        <section>
          <button className="section-heading">
            <ChevronDown /> Projects
          </button>
          <div className="thread-list">
            {activeThreads.map((thread) => (
              <ThreadItem key={thread.title} thread={thread} />
            ))}
          </div>
        </section>

        <section className="settled-section">
          <button className="section-heading">
            <ChevronDown /> Settled
          </button>
          <div className="settled-list">
            {settledThreads.map((title) => (
              <button className="settled-thread" key={title}>
                <ChevronRight /> <span>{title}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <nav className="sidebar-footer" aria-label="Secondary">
        <Button variant="ghost">
          <Gauge /> Usage
        </Button>
        <Button variant="ghost">
          <Settings /> Settings
        </Button>
      </nav>
    </aside>
  )
}

function Composer() {
  return (
    <InputGroup className="composer">
      <InputGroupTextarea
        aria-label="Message"
        placeholder="Ask anything, @tag files/folders, $use skills, or / for commands"
      />
      <InputGroupAddon align="block-end" className="composer-toolbar">
        <div className="composer-selects">
          <InputGroupButton className="composer-select">
            GPT-5.6-Sol High <ChevronsUpDown />
          </InputGroupButton>
          <InputGroupButton className="composer-select">
            Full access <ChevronDown />
          </InputGroupButton>
        </div>
        <div className="composer-actions">
          <span className="context-ring" aria-label="Context remaining" />
          <InputGroupButton
            className="send-button"
            size="icon-sm"
            type="button"
            aria-label="Send message"
          >
            <ArrowUp />
          </InputGroupButton>
        </div>
      </InputGroupAddon>
    </InputGroup>
  )
}

function Conversation() {
  return (
    <section className="conversation">
      <header className="conversation-header">
        <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
          <PanelLeft />
        </Button>
        <span className="header-divider" />
        <div className="breadcrumb">
          <span>hocabas</span>
          <ChevronRight />
          <strong>Refine Onboarding Recipe Import UI</strong>
        </div>
      </header>

      <MessageScrollerProvider>
        <MessageScroller className="conversation-scroller">
          <MessageScrollerViewport>
            <MessageScrollerContent className="message-stack">
              <MessageScrollerItem>
                <Message align="end">
                  <MessageContent>
                    <Bubble variant="muted" align="end">
                      <BubbleContent className="user-bubble">
                        tu peux utiliser le mcp convex pour voir les data de mon
                        déploiement de dev ?
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>

              <MessageScrollerItem>
                <div className="work-marker">
                  Worked for 2m 41s <ChevronRight />
                </div>
              </MessageScrollerItem>

              <MessageScrollerItem>
                <Message>
                  <MessageContent className="assistant-copy">
                    <p>
                      Oui, l’accès MCP Convex fonctionne. J’ai interrogé
                      uniquement le déploiement de développement{" "}
                      <strong>blissful-labrador-739</strong>, en lecture seule.
                    </p>
                    <p>Aperçu des données :</p>
                    <ul>
                      {facts.map((fact) => (
                        <li key={fact}>{fact}</li>
                      ))}
                    </ul>
                    <p>
                      Aucune mutation n’a été exécutée. Je peux maintenant
                      examiner une table, une recette ou un workflow précis si
                      nécessaire.
                    </p>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>

      <div className="composer-wrap">
        <Composer />
      </div>
    </section>
  )
}

export function App() {
  return (
    <TooltipProvider>
      <main className="desktop-shell">
        <Sidebar />
        <Conversation />
      </main>
    </TooltipProvider>
  )
}

export default App
