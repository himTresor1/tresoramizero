"use client";

import { useSim, typeInto, stream, click } from "./useSim";
import { SimCursor, Rich, Caret, Orb } from "./SimParts";

/* ─── Not found: Script refuses to guess ─────────────────────────────────────── */

type NF = { composer: string; status: string | null; streamed: string; done: boolean; notFound: boolean; cursor: { target: string | null; pressing: boolean } };
const NF0: NF = { composer: "", status: null, streamed: "", done: false, notFound: false, cursor: { target: null, pressing: false } };
const NF_Q = "What unit price did we agree for the Rusizi road-sensor contract?";
const NF_A = "I couldn’t find a unit price for the Rusizi contract in your library. The signed contract and the two amendments list a total of RWF 1.2 billion but no per-unit rate. [not found]";

export function NotFoundSim() {
  const { hostRef, state } = useSim<NF>(
    NF0,
    async (ctx) => {
      await ctx.sleep(600);
      await typeInto(ctx, NF_Q, (t) => ({ composer: t }));
      await ctx.sleep(300);
      await click(ctx, "send", { composer: "" });
      for (const s of ["Reading your library…", "Checking the contract…"]) {
        ctx.set({ status: s });
        await ctx.sleep(1000);
      }
      ctx.set({ status: null });
      await stream(ctx, NF_A.replace(" [not found]", ""), (t) => ({ streamed: t }));
      ctx.set({ done: true, notFound: true });
      await ctx.sleep(3500);
    },
    { streamed: NF_A.replace(" [not found]", ""), done: true, notFound: true },
  );
  return (
    <div ref={hostRef} className="sim sim-small" role="img" aria-label="Simulation: Script answering that a figure is not in the library instead of guessing">
      <div className="sim-mini-thread">
        {(state.streamed || state.status) && <div className="sfig-bubble sfig-bubble-user">{NF_Q}</div>}
        {(state.status || state.streamed) && (
          <div className="sim-answer">
            <Orb status={state.status} />
            {state.streamed && (
              <p className="sim-answer-text">
                {state.streamed}
                {!state.done && <Caret />}
              </p>
            )}
            {state.notFound && (
              <div className="sim-notfound">
                <span className="sim-notfound-badge">Not in your sources</span>
                <span>Nothing was invented. Ask Finance, or add the price list to the Library.</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="sim-composer">
        <span className={state.composer ? "sim-composer-text" : "sim-composer-ph"}>
          {state.composer || "Ask anything"}
          {state.composer && <Caret />}
        </span>
        <span className="sim-send" data-sim-target="send" aria-hidden="true">
          ↑
        </span>
      </div>
      <SimCursor host={hostRef} target={state.cursor.target} pressing={state.cursor.pressing} layoutKey={state} />
    </div>
  );
}

/* ─── Clearance: same question, two answers ───────────────────────────────────── */

type CL = { q: string; a1: string; a2: string; s1: string | null; s2: string | null; done: boolean };
const CL0: CL = { q: "", a1: "", a2: "", s1: null, s2: null, done: false };
const CL_Q = "What did we pay the EDMAS vendor in Q2?";
const CL_A1 = "RWF 184.6M across three invoices [1], the last one settled on 28 June [2].";
const CL_A2 = "A Q2 payment to the EDMAS vendor exists, but the amount is in documents you don’t have access to. Finance owns them [1].";

export function ClearanceSim() {
  const { hostRef, state } = useSim<CL>(
    CL0,
    async (ctx) => {
      await ctx.sleep(500);
      await typeInto(ctx, CL_Q, (t) => ({ q: t }));
      await ctx.sleep(300);
      ctx.set({ s1: "Checking what you can see…", s2: "Checking what you can see…" });
      await ctx.sleep(1100);
      ctx.set({ s1: null });
      await stream(ctx, CL_A1, (t) => ({ a1: t }));
      ctx.set({ s2: null });
      await stream(ctx, CL_A2, (t) => ({ a2: t }));
      ctx.set({ done: true });
      await ctx.sleep(3200);
    },
    { q: CL_Q, a1: CL_A1, a2: CL_A2, done: true },
  );
  const people = [
    { who: "Finance lead", clearance: "Finance · Procurement", a: state.a1, s: state.s1, sources: ["Invoice register Q2.xlsx", "Bank reconciliation · June.pdf"] },
    { who: "Programme intern", clearance: "General", a: state.a2, s: state.s2, sources: ["People directory · Finance team"] },
  ];
  return (
    <div ref={hostRef} className="sim sim-small sim-clearance" role="img" aria-label="Simulation: the same question answered differently for a finance lead and an intern">
      {people.map((p) => (
        <div key={p.who} className="sfig-card">
          <div className="sfig-card-head">
            <span className="sfig-avatar" aria-hidden="true" />
            <span>
              <span className="sfig-who">{p.who}</span>
              <span className="sfig-clear">{p.clearance}</span>
            </span>
          </div>
          {state.q && (
            <div className="sfig-bubble sfig-bubble-user">
              {state.q}
              {!state.s1 && !state.a1 && <Caret />}
            </div>
          )}
          {(p.s || p.a) && (
            <div className="sim-answer sim-answer-tight">
              <Orb size={18} status={p.s} />
              {p.a && (
                <p className="sim-answer-text">
                  <Rich text={p.a} />
                </p>
              )}
              {state.done && (
                <div className="sfig-sources">
                  {p.sources.map((s, i) => (
                    <span key={s} className="sfig-source">
                      {i + 1} · {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Connectors: before (a token form) and after (a catalogue) ──────────────── */

type CN = { token: string; cat: Record<string, "available" | "connecting" | "connected" | "soon">; cursor: { target: string | null; pressing: boolean } };
const CN0: CN = { token: "", cat: { GitHub: "connected", Notion: "available", Slack: "available", Jira: "soon", "Google Drive": "available", Teams: "soon" }, cursor: { target: null, pressing: false } };

export function ConnectorsSim() {
  const { hostRef, state } = useSim<CN>(
    CN0,
    async (ctx) => {
      await ctx.sleep(600);
      await click(ctx, "token");
      await typeInto(ctx, "ghp_4Qx9••••••••••••••••••••••••", (t) => ({ token: t }));
      await ctx.sleep(1400);
      await click(ctx, "connect-Notion", (s) => ({ cat: { ...s.cat, Notion: "connecting" as const } }), 200);
      await ctx.sleep(1300);
      ctx.set((s) => ({ cat: { ...s.cat, Notion: "connected" as const } }));
      await ctx.sleep(900);
      await click(ctx, "connect-Slack", (s) => ({ cat: { ...s.cat, Slack: "connecting" as const } }), 200);
      await ctx.sleep(1300);
      ctx.set((s) => ({ cat: { ...s.cat, Slack: "connected" as const }, cursor: { target: null, pressing: false } }));
      await ctx.sleep(2600);
    },
    { token: "ghp_4Qx9••••••••••••••••••••••••", cat: { ...CN0.cat, Notion: "connected", Slack: "connected" } },
  );
  const label = { available: "Connect", connecting: "Connecting…", connected: "Connected", soon: "Coming soon" } as const;
  return (
    <div ref={hostRef} className="sim sim-connectors" role="img" aria-label="Simulation: the old token form beside the connector catalogue">
      <figure className="sim-pane">
        <figcaption className="t-mono text-grey">Before</figcaption>
        <div className="sim-form">
          <span className="sim-form-title">Connect GitHub</span>
          <label>
            <span>Personal access token</span>
            <span className="sim-input" data-sim-target="token">
              {state.token || <span className="sim-composer-ph">ghp_…</span>}
              {state.token && <Caret />}
            </span>
          </label>
          <label>
            <span>Repository (owner/name)</span>
            <span className="sim-input sim-input-dim">acme/edmas-platform</span>
          </label>
          <span className="sim-form-hint">Create a token under Settings → Developer settings → Tokens (classic) with repo scope.</span>
        </div>
      </figure>
      <figure className="sim-pane">
        <figcaption className="t-mono text-grey">After</figcaption>
        <div className="sim-catalog">
          {Object.entries(state.cat).map(([name, st]) => (
            <div key={name} className={`sim-cat-card sim-cat-${st}`}>
              <span className="sim-cat-icon" aria-hidden="true">
                {name[0]}
              </span>
              <span className="sim-cat-name">{name}</span>
              <span className="sim-cat-btn" data-sim-target={`connect-${name}`}>
                {label[st]}
              </span>
            </div>
          ))}
        </div>
      </figure>
      <SimCursor host={hostRef} target={state.cursor.target} pressing={state.cursor.pressing} layoutKey={state} />
    </div>
  );
}

/* ─── Workflow: Markdown in, guided steps out ─────────────────────────────────── */

const WF_LINES = ["# New supplier onboarding", "", "- [ ] Collect the RDB certificate and TIN", "- [ ] Check the supplier against the blacklist", "- [ ] Draft the contract from the template", "- [ ] Send for legal review", "- [ ] Create the vendor in the finance system"];
type WF = { typed: string; done: number[]; agent: number | null; confirm: boolean; cursor: { target: string | null; pressing: boolean } };
const WF0: WF = { typed: "", done: [], agent: null, confirm: false, cursor: { target: null, pressing: false } };

export function WorkflowSim() {
  const { hostRef, state } = useSim<WF>(
    WF0,
    async (ctx) => {
      await ctx.sleep(500);
      await typeInto(ctx, WF_LINES.join("\n"), (t) => ({ typed: t }));
      await ctx.sleep(900);
      ctx.set({ done: [0] });
      await ctx.sleep(700);
      ctx.set({ done: [0, 1] });
      await ctx.sleep(900);
      await click(ctx, "run-agent", { agent: 2 }, 300);
      await ctx.sleep(1800);
      ctx.set({ confirm: true });
      await ctx.sleep(1200);
      await click(ctx, "approve", { confirm: false, agent: null, done: [0, 1, 2] }, 300);
      ctx.set({ cursor: { target: null, pressing: false } });
      await ctx.sleep(3000);
    },
    { typed: WF_LINES.join("\n"), done: [0, 1, 2] },
  );
  const typedLines = state.typed.split("\n");
  const steps = WF_LINES.filter((l) => l.startsWith("- [ ]")).map((l) => l.slice(6));
  const visibleSteps = typedLines.filter((l) => l.startsWith("- [ ]") && l.length > 6).length;
  const title = typedLines[0]?.replace(/^#\s*/, "") ?? "";
  return (
    <div ref={hostRef} className="sim sim-workflow" role="img" aria-label="Simulation: a Markdown workflow becoming a guided runner, with an agent step approved by a person">
      <pre className="sfig-md">
        {typedLines.map((l, i) => (
          <span key={i} className={l.startsWith("- [ ]") ? "sfig-md-step" : l.startsWith("#") ? "sfig-md-title" : ""}>
            {l || " "}
            {i === typedLines.length - 1 && state.typed.length < WF_LINES.join("\n").length ? <Caret /> : null}
            {"\n"}
          </span>
        ))}
      </pre>
      <div className="sfig-runner">
        <div className="sfig-runner-head">
          <span className="sfig-runner-title">{title || "Untitled workflow"}</span>
          <span className="sfig-runner-progress">
            {state.done.length} of {visibleSteps}
          </span>
        </div>
        <ol>
          {steps.slice(0, visibleSteps).map((t, i) => {
            const st = state.done.includes(i) ? "done" : state.agent === i ? "agent" : "todo";
            return (
              <li key={t} className={`sfig-run-step sfig-run-${st}`}>
                <span className="sfig-run-box" aria-hidden="true" />
                <span className="sfig-run-text">{t}</span>
                {st === "agent" && <span className="sfig-run-badge">Agent drafting…</span>}
              </li>
            );
          })}
        </ol>
        {visibleSteps === steps.length && state.agent === null && state.done.length === 2 && (
          <span className="sfig-btn-primary sim-run-btn" data-sim-target="run-agent">
            Run next step with agent
          </span>
        )}
        {state.confirm && (
          <div className="sfig-confirm">
            <span>Script wants to create “Contract — Akanyaru Tech Partners.docx”</span>
            <span className="sfig-confirm-btns">
              <span className="sfig-btn-ghost">Review</span>
              <span className="sfig-btn-primary" data-sim-target="approve">
                Approve
              </span>
            </span>
          </div>
        )}
      </div>
      <SimCursor host={hostRef} target={state.cursor.target} pressing={state.cursor.pressing} layoutKey={state} />
    </div>
  );
}

/* ─── The thinking orb and its seven states ───────────────────────────────────── */

const ORB_STATES = ["connecting", "searching", "reading", "solving", "weaving", "composing", "breathing"];
type OR = { i: number };
export function OrbSim() {
  const { hostRef, state } = useSim<OR>(
    { i: 0 },
    async (ctx) => {
      for (let k = 0; k < ORB_STATES.length; k++) {
        ctx.set({ i: k });
        await ctx.sleep(1300);
      }
    },
    { i: 6 },
  );
  return (
    <div ref={hostRef} className="sim sim-small sim-orbs" role="img" aria-label="The thinking orb cycling through its seven states">
      <div className={`sim-orb-big sim-orb-${ORB_STATES[state.i]}`} aria-hidden="true" />
      <ul className="sim-orb-list">
        {ORB_STATES.map((s, k) => (
          <li key={s} className={k === state.i ? "sim-orb-on" : ""}>
            <span className="t-mono">{String(k + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Brand: Peter, the wordmark, the orb ─────────────────────────────────────── */

export function BrandFigure() {
  return (
    <div className="sfig sim-brand" aria-label="Script's brand: Peter the chameleon, the wordmark and the thinking orb">
      <div className="sim-brand-tile sim-brand-peter">
        <img src="/media/projects/script/peter.png" alt="Peter, Script's waving chameleon" width={162} height={192} />
        <span className="sfig-pal-hex">Peter · the face of the product</span>
      </div>
      <div className="sim-brand-tile sim-brand-word">
        <span className="sim-wordmark">script.</span>
        <span className="sfig-pal-hex">Inter Display 600 · −2% tracking · always lowercase</span>
      </div>
      <div className="sim-brand-tile sim-brand-orb">
        <span className="sim-orb-big sim-orb-composing" aria-hidden="true" />
        <span className="sfig-pal-hex">The orb · #F97316 · seven states</span>
      </div>
    </div>
  );
}

/* ─── Isometric figures copied from the product (self-contained HTML) ───────── */

export function IsoFigure({ name, title, height = 520 }: { name: string; title: string; height?: number }) {
  return (
    <iframe
      src={`/iso/${name}.html?bare=1`}
      title={title}
      loading="lazy"
      className="sim-iso"
      style={{ height, colorScheme: "light", background: "transparent" }}
    />
  );
}
