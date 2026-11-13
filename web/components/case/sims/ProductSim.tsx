"use client";

import { useSim, typeInto, stream, click } from "./useSim";
import { SimCursor, SimScale, Rich, Caret, Orb, useMedia } from "./SimParts";

/**
 * The hero simulation: Script's chat answering the tender question with sources, then opening a
 * citation. Content mirrors the product's own demo scenario (fictional "Ubumwe Development Bank";
 * every company and person is invented), so it shows a real question and a real cited answer.
 */
const QUESTION = "Why didn’t Akanyaru Tech Partners win the EDMAS tender, even though they had the highest technical score?";
const ANSWER =
  "Because of the **mandatory 5% domestic preference**. Akanyaru’s joint venture is only 40% Rwandan-owned, below the 51% threshold, so 5% was added to its price for comparison: RWF 815,000,000 became **RWF 855,750,000** [1][2]. That lowered its combined score to **89.73**, against **90.20** for Nyungwe Digital [1]. The Committee voted **3 to 1** for Nyungwe Digital; the ICT Director dissented and asked for her reasons to be recorded [3].";
const SOURCES: Record<number, { name: string; label: string; text: string; highlight: string }> = {
  1: {
    name: "UDB Tender Committee Evaluation Report.pdf",
    label: "Page 3 · §6.2 Domestic preference",
    text: "Bid B is not a domestic bid: the Rwandan partner holds 40% of the JV, below the 51% threshold confirmed in Addendum No. 1. As required by ITB 33.4, five percent was added to Bid B’s price for comparison only: RWF 815,000,000 × 1.05 = RWF 855,750,000. Without the margin, Bid B’s combined score would be 91.03, ahead of Bid A (90.20).",
    highlight: "As required by ITB 33.4, five percent was added to Bid B’s price for comparison only: RWF 815,000,000 × 1.05 = RWF 855,750,000.",
  },
  2: {
    name: "UDB Tender Document UDB-ICT-2025-014.pdf",
    label: "Page 4 · ITB 33.4 Domestic preference",
    text: "33.4 Domestic preference. For the purpose of comparison only, a margin of preference of five percent (5%) shall be applied to every bid that does not qualify as a domestic bid. A bid qualifies as domestic only if Rwandan citizens or Rwandan-owned entities hold at least fifty-one percent (51%) of its shares. The application of this margin is mandatory.",
    highlight: "The application of this margin is mandatory.",
  },
  3: {
    name: "UDB Tender Committee Evaluation Report.pdf",
    label: "Page 4 · §8 Decision",
    text: "8. Decision. The Committee resolved, by three (3) votes to one (1) (Grace Mukamana dissenting), to recommend the award of the contract to Nyungwe Digital Ltd for RWF 742,500,000, subject to the conditions below. Ms Mukamana asked that her dissent and its reasons be recorded in these minutes.",
    highlight: "by three (3) votes to one (1) (Grace Mukamana dissenting)",
  },
};
const STATUSES = ["Reading your library…", "Connecting the dots…", "Checking the sources…"];
const HISTORY = [
  { group: "Today", items: ["Amendment No. 1: new tender needed?", "September power cuts: force majeure?"] },
  { group: "Yesterday", items: ["Bid security rules", "Data residency for the OCR provider"] },
];

type S = {
  view: "welcome" | "chat";
  composer: string;
  status: string | null;
  streamed: string;
  done: boolean;
  drawer: number | null;
  cursor: { target: string | null; pressing: boolean };
};
const INITIAL: S = { view: "welcome", composer: "", status: null, streamed: "", done: false, drawer: null, cursor: { target: null, pressing: false } };

export function ProductSim() {
  const { hostRef, state } = useSim<S>(
    INITIAL,
    async (ctx) => {
      await ctx.sleep(900);
      await click(ctx, "composer");
      await typeInto(ctx, QUESTION, (t) => ({ composer: t }));
      await ctx.sleep(300);
      await click(ctx, "send", { view: "chat", composer: "", streamed: "" });
      for (const s of STATUSES) {
        ctx.set({ status: s });
        await ctx.sleep(1000);
      }
      ctx.set({ status: null });
      await stream(ctx, ANSWER, (t) => ({ streamed: t }));
      ctx.set({ done: true });
      await ctx.sleep(900);
      await click(ctx, "chip-1", { drawer: 1 }, 2600);
      await click(ctx, "chip-3", { drawer: 3 }, 3200);
      ctx.set({ cursor: { target: null, pressing: false } });
      await ctx.sleep(1200);
    },
    { view: "chat", streamed: ANSWER, done: true, drawer: 1 },
  );
  const src = state.drawer ? SOURCES[state.drawer] : null;
  const [before, after] = src ? src.text.split(src.highlight) : ["", ""];
  // Phones get a phone-shaped frame (no sidebar, the source opens as a sheet) instead of a 0.3× desktop.
  const compact = useMedia("(max-width: 719px)");

  return (
    <div ref={hostRef} className="sim sim-product" role="img" aria-label="Simulation: Script answering a procurement question with three cited sources, then opening a source">
      <SimScale width={compact ? 420 : 1200} height={compact ? 720 : 680}>
        <div className={`sim-frame ${compact ? "sim-frame-compact" : ""}`}>
          <div className="sim-browser">
            <span className="sim-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="sim-url">script.o2labbs.com/app/chat</span>
          </div>
          <div className="sim-app">
            <aside className="sim-side">
              <div className="sim-ws">
                <span className="sim-ws-mark">s</span>
                <span>
                  <span className="sim-ws-name">Ubumwe Development Bank</span>
                  <span className="sim-ws-sub">Workspace · 14 people</span>
                </span>
              </div>
              <nav className="sim-nav">
                {["Chat", "Library", "Meetings", "Connectors", "Workflows"].map((n, i) => (
                  <span key={n} className={i === 0 ? "sim-nav-on" : ""}>
                    {n}
                  </span>
                ))}
              </nav>
              {state.view === "chat" && (
                <div className="sim-hist">
                  <span className="sim-hist-group">Today</span>
                  <span className="sim-hist-item sim-hist-on">Why Nyungwe won the EDMAS tender</span>
                </div>
              )}
              {HISTORY.map((g) => (
                <div key={g.group} className="sim-hist">
                  <span className="sim-hist-group">{g.group}</span>
                  {g.items.map((it) => (
                    <span key={it} className="sim-hist-item">
                      {it}
                    </span>
                  ))}
                </div>
              ))}
            </aside>
            <main className="sim-main">
              {state.view === "welcome" ? (
                <div className="sim-welcome">
                  <img src="/media/projects/script/peter.png" alt="" width={54} height={64} className="sim-peter" />
                  <h3>What do you want to know?</h3>
                  <p>Ask across every document, meeting and tool this workspace can see.</p>
                  <div className="sim-cards">
                    {["Summarize this document", "Find key dates and numbers", "Extract action items"].map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="sim-thread">
                  <div className="sfig-bubble sfig-bubble-user">{QUESTION}</div>
                  <div className="sim-answer">
                    <Orb status={state.status} />
                    {state.streamed && (
                      <p className="sim-answer-text">
                        <Rich text={state.streamed} active={state.drawer} onChip="chip" />
                        {!state.done && <Caret />}
                      </p>
                    )}
                    {state.done && (
                      <div className="sfig-sources">
                        {[1, 2, 3].map((n) => (
                          <span key={n} className={`sfig-source ${state.drawer === n ? "sfig-source-active" : ""}`}>
                            {n} · {SOURCES[n].name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="sim-composer" data-sim-target="composer">
                <span className={state.composer ? "sim-composer-text" : "sim-composer-ph"}>
                  {state.composer || "Ask anything, or @mention a document"}
                  {state.view === "welcome" && state.composer && <Caret />}
                </span>
                <span className="sim-send" data-sim-target="send" aria-hidden="true">
                  ↑
                </span>
              </div>
            </main>
            <aside className={`sim-drawer ${src ? "sim-drawer-open" : ""}`} aria-hidden="true">
              {src && (
                <>
                  <div className="sfig-drawer-head">
                    <span className="sfig-drawer-title">{src.name}</span>
                    <span className="sfig-drawer-page">{src.label}</span>
                  </div>
                  <p className="sfig-passage">
                    {before}
                    <mark>{src.highlight}</mark>
                    {after}
                  </p>
                  <div className="sfig-drawer-foot">Opened from citation {state.drawer} · the passage the answer rests on</div>
                </>
              )}
            </aside>
          </div>
          <SimCursor host={hostRef} target={state.cursor.target} pressing={state.cursor.pressing} layoutKey={state} />
        </div>
      </SimScale>
    </div>
  );
}
