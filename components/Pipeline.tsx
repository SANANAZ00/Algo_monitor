"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/data";

export default function Pipeline() {
  const [route, setRoute] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const p = products[route];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= p.steps.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1700);
    return () => clearInterval(id);
  }, [playing, p.steps.length]);

  const pick = (i: number) => {
    setRoute(i);
    setStep(0);
    setPlaying(false);
  };

  const play = () => {
    setStep(0);
    setPlaying(true);
  };

  return (
    <div className="card p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Product route" className="flex flex-wrap gap-2">
          {products.map((x, i) => (
            <button
              key={x.slug}
              role="tab"
              aria-selected={i === route}
              onClick={() => pick(i)}
              className="chip"
              style={{
                borderColor: i === route ? x.accent : "rgba(201,165,74,0.3)",
                background: i === route ? x.accent : "transparent",
                color: i === route ? "#08170f" : "#f3e9d2",
              }}
            >
              {x.name.replace("ALGO ", "")}
            </button>
          ))}
        </div>
        <button onClick={play} className="btn btn-ghost !py-2">
          {playing ? "Playing…" : "▶ Play the route"}
        </button>
      </div>

      <p className="mt-6 text-sm text-cream/60">
        Strain: <span className="text-cream">{p.strain}</span>
      </p>

      {/* stepper */}
      <ol className="mt-6 grid grid-cols-5 gap-2">
        {p.steps.map((s, i) => {
          const done = i <= step;
          return (
            <li key={s.title} className="relative">
              <button
                onClick={() => {
                  setStep(i);
                  setPlaying(false);
                }}
                className="group flex w-full flex-col items-center gap-2 text-center"
                aria-current={i === step}
              >
                <span
                  className="relative z-10 grid h-10 w-10 place-items-center rounded-full border text-sm font-medium transition duration-500 sm:h-12 sm:w-12"
                  style={{
                    borderColor: p.accent,
                    background: done ? p.accent : "#12332a",
                    color: done ? "#08170f" : p.accent,
                    transform: i === step ? "scale(1.15)" : "scale(1)",
                    boxShadow: i === step ? `0 0 28px -4px ${p.accent}` : "none",
                  }}
                >
                  {i + 1}
                </span>
                <span className="hidden text-xs text-cream/70 transition group-hover:text-cream sm:block">
                  {s.title}
                </span>
              </button>
              {i < p.steps.length - 1 && (
                <span
                  className="absolute left-1/2 top-5 h-0.5 w-full sm:top-6"
                  style={{ background: i < step ? p.accent : "rgba(201,165,74,0.25)", transition: "background 500ms" }}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* detail */}
      <div
        key={`${route}-${step}`}
        className="mt-8 rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: `${p.accent}66`, background: `${p.accent}12` }}
      >
        <p className="eyebrow" style={{ color: p.accent }}>
          Step {step + 1} of {p.steps.length}
        </p>
        <h3 className="mt-2 font-serif text-3xl">{p.steps[step].title}</h3>
        <p className="mt-2 max-w-xl text-cream/75">{p.steps[step].desc}</p>
        {step === p.steps.length - 1 && (
          <p className="mt-4 text-sm" style={{ color: p.accent }}>
            → Result: {p.name}
          </p>
        )}
      </div>
    </div>
  );
}
