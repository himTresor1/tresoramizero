"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The small runner behind every self-playing simulation on the case-study pages, modelled on
 * Script's own hero demo: a scene state, a `run` script of awaited steps, a cancellable `sleep`,
 * pause when off screen, restart when back, and a finished scene under prefers-reduced-motion.
 */
export type SimCtx<S> = {
  get: () => S;
  set: (patch: Partial<S> | ((s: S) => Partial<S>)) => void;
  sleep: (ms: number) => Promise<void>;
};

export function useSim<S extends object>(initial: S, run: (ctx: SimCtx<S>) => Promise<void>, final?: Partial<S>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<S>(initial);
  const [state, setState] = useState<S>(initial);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const runRef = useRef(run);
  runRef.current = run;

  const update = useCallback((patch: Partial<S> | ((s: S) => Partial<S>)) => {
    stateRef.current = { ...stateRef.current, ...(typeof patch === "function" ? patch(stateRef.current) : patch) };
    setState(stateRef.current);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    const el = hostRef.current;
    const io = el ? new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 }) : null;
    if (el && io) io.observe(el);
    return () => {
      mq.removeEventListener("change", on);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduced) {
      update(() => ({ ...initial, ...(final ?? {}) }));
      return;
    }
    if (!visible) return;
    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => setTimeout(() => (cancelled ? reject(new Error("cancelled")) : resolve()), ms));
    const ctx: SimCtx<S> = {
      get: () => stateRef.current,
      set: (p) => {
        if (!cancelled) update(p);
      },
      sleep,
    };
    (async () => {
      for (;;) {
        ctx.set(() => ({ ...initial }));
        await runRef.current(ctx);
        await sleep(2600);
      }
    })().catch(() => undefined);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduced]);

  return { hostRef, state, reduced };
}

/** Human typing: ~35ms per character with jitter. */
export async function typeInto<S extends object>(ctx: SimCtx<S>, text: string, write: (typed: string) => Partial<S> | ((s: S) => Partial<S>), base = "") {
  for (let i = 1; i <= text.length; i++) {
    ctx.set(write(base + text.slice(0, i)));
    await ctx.sleep(22 + Math.random() * 30);
  }
}

/** Streams `text` token by token (bold spans and [n] chips arrive whole). */
export async function stream<S extends object>(ctx: SimCtx<S>, text: string, write: (streamed: string) => Partial<S> | ((s: S) => Partial<S>)) {
  const tokens = text.match(/\*\*[^*]+\*\*|\[\d+\]|\s+|[^\s*[]+|\*|\[/g) ?? [];
  let acc = "";
  for (const t of tokens) {
    acc += t;
    ctx.set(write(acc));
    if (!/^\s+$/.test(t)) await ctx.sleep(28 + Math.random() * 26);
  }
}

/** Moves the pointer to a `data-sim-target`, presses, applies `then`. */
export async function click<S extends { cursor: { target: string | null; pressing: boolean } }>(ctx: SimCtx<S>, target: string, then?: Partial<S> | ((s: S) => Partial<S>), settle = 350) {
  ctx.set({ cursor: { target, pressing: false } } as Partial<S>);
  await ctx.sleep(700);
  ctx.set({ cursor: { target, pressing: true } } as Partial<S>);
  await ctx.sleep(150);
  ctx.set({ cursor: { target, pressing: false } } as Partial<S>);
  if (then) ctx.set(then);
  await ctx.sleep(settle);
}
