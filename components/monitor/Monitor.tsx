"use client";

import { useEffect, useRef, useState } from "react";
import { DROP_LIMIT, WINDOW, initialReactors, phDrop, tick, type Reactor, type Status } from "@/lib/monitor";
import { GREETING, criticalMsg, reply, resolvedMsg, suggestions, warningMsg } from "@/lib/assistant";

type Msg = { role: "assistant" | "user"; text: string; alert?: boolean };

const STATUS: Record<Status, { label: string; color: string }> = {
  healthy: { label: "Healthy", color: "#86d08f" },
  warning: { label: "Warning", color: "#f0b429" },
  critical: { label: "Critical", color: "#ef5b5b" },
};

function Sparkline({ r, color }: { r: Reactor; color: string }) {
  const W = 200;
  const H = 56;
  const lo = r.hardLow - 0.6;
  const hi = r.basePh + 0.5;
  const y = (v: number) => H - Math.max(0, Math.min(1, (v - lo) / (hi - lo))) * H;
  const n = r.hist.length;
  const pts = r.hist.map((v, i) => `${((i / (n - 1)) * W).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" x2={W} y1={y(r.hardLow)} y2={y(r.hardLow)} stroke="#ef5b5b" strokeDasharray="4 4" opacity="0.6" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ReactorCard({ r }: { r: Reactor }) {
  const st = STATUS[r.status];
  const drop = phDrop(r);
  return (
    <div
      className="rounded-3xl border bg-forest-800/70 p-5 transition-colors duration-500"
      style={{ borderColor: r.status === "healthy" ? "rgba(201,165,74,0.3)" : st.color }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-xl">{r.name}</p>
          <p className="text-xs text-cream/60">
            {r.process} · <span className="italic">{r.strain}</span>
          </p>
        </div>
        <span
          className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: `${st.color}22`, color: st.color }}
        >
          <span
            className={`h-2 w-2 rounded-full ${r.status === "healthy" ? "" : "animate-pulse"}`}
            style={{ background: st.color }}
          />
          {st.label}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-cream/50">pH</p>
          <p className="font-serif text-5xl leading-none" style={{ color: r.status === "healthy" ? "#f3e9d2" : st.color }}>
            {r.ph.toFixed(2)}
          </p>
        </div>
        <p className="pb-1 text-xs" style={{ color: st.color, opacity: drop >= 0.05 ? 1 : 0 }}>
          −{drop.toFixed(2)} / {WINDOW} s
        </p>
      </div>

      <div className="mt-3">
        <Sparkline r={r} color={st.color} />
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-[11px] uppercase tracking-widest text-cream/50">Temperature</dt>
          <dd className="mt-0.5 text-cream">{r.temp.toFixed(1)} °C</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest text-cream/50">{r.thirdLabel}</dt>
          <dd className="mt-0.5 text-cream">
            {r.third.toFixed(r.thirdDigits)} {r.thirdUnit}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function Monitor() {
  const [reactors, setReactors] = useState<Reactor[]>(() => initialReactors());
  const live = useRef<Reactor[]>(reactors);
  const [selected, setSelected] = useState("r2");
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // simulation clock: one tick per second
  useEffect(() => {
    const id = window.setInterval(() => {
      const events: Msg[] = [];
      const next = live.current.map((r) => {
        const res = tick(r, Math.random);
        if (res.event === "warning") events.push({ role: "assistant", alert: true, text: warningMsg(res.reactor) });
        if (res.event === "critical") events.push({ role: "assistant", alert: true, text: criticalMsg(res.reactor) });
        return res.reactor;
      });
      live.current = next;
      setReactors(next);
      if (events.length) setMsgs((m) => [...m, ...events]);
    }, 1000);
    const pending = timers.current;
    return () => {
      window.clearInterval(id);
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const target = reactors.find((r) => r.id === selected) ?? reactors[0];

  const contaminate = () => {
    const next = live.current.map((r) => (r.id === selected ? { ...r, contaminated: true } : r));
    live.current = next;
    setReactors(next);
  };

  const resetAll = () => {
    const had = live.current.filter((r) => r.contaminated || r.status !== "healthy");
    const next = live.current.map((r) => ({ ...r, contaminated: false }));
    live.current = next;
    setReactors(next);
    if (had.length) {
      setMsgs((m) => [...m, ...had.map((r) => ({ role: "assistant" as const, text: resolvedMsg(r) }))]);
    }
  };

  const send = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const t = window.setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", text: reply(text, live.current) }]);
      setTyping(false);
    }, 650);
    timers.current.push(t);
  };

  const anyBad = reactors.some((r) => r.status !== "healthy");

  return (
    <div>
      {/* reactors */}
      <div className="grid gap-5 md:grid-cols-3">
        {reactors.map((r) => (
          <ReactorCard key={r.id} r={r} />
        ))}
      </div>

      {/* controls */}
      <div className="card mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Control panel</p>
          <p className="mt-2 max-w-md text-sm text-cream/70">
            Detection rule: pH falling faster than {DROP_LIMIT} over {WINDOW} seconds raises a warning, well before the
            hard limit (red dashed line).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full border border-gold/40 p-1" role="group" aria-label="Choose reactor">
            {reactors.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  selected === r.id ? "bg-gold text-forest-950" : "text-cream/70 hover:text-cream"
                }`}
              >
                R{r.id.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={contaminate}
            disabled={target.contaminated}
            className="btn bg-[#f0b429] text-forest-950 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ⚠ Simulate contamination in {target.name}
          </button>
          <button onClick={resetAll} disabled={!anyBad && !reactors.some((r) => r.contaminated)} className="btn btn-ghost disabled:opacity-40">
            Reset all
          </button>
        </div>
      </div>

      {/* assistant */}
      <div className="card mt-5 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="eyebrow">ALGO assistant</p>
          <span className="rounded-full border border-gold/30 px-3 py-1 text-[11px] text-cream/60">Scripted · rule-based</span>
        </div>

        <div
          ref={logRef}
          aria-live="polite"
          className="mt-4 h-72 space-y-3 overflow-y-auto rounded-2xl bg-forest-950/60 p-4"
        >
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gold text-forest-950"
                    : m.alert
                    ? "border border-[#f0b429]/60 bg-[#f0b429]/10 text-cream"
                    : "border border-gold/20 bg-forest-800 text-cream/90"
                }`}
              >
                {m.alert && <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#f0b429]">Auto-alert</p>}
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-gold/20 bg-forest-800 px-4 py-3 text-sm text-cream/60">…</div>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button key={s} onClick={() => send(s)} className="chip border-gold/30 text-xs text-cream/80 hover:border-gold hover:text-cream">
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a reactor, an alert or a product…"
            aria-label="Ask the ALGO assistant"
            className="min-w-0 flex-1 rounded-full border border-gold/30 bg-forest-950/60 px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          <button type="submit" className="btn btn-gold">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
