"use client";

import { useState } from "react";

const animals = [
  { id: "poultry", name: "Poultry", icon: "🐔", type: "Monogastric", note: "Opening Chlorella's tough cell wall is the key to digestibility.", ref: 5 },
  { id: "cattle", name: "Cattle", icon: "🐄", type: "Ruminant", note: "Chemical composition and nutritive value reviewed for ruminants.", ref: 6 },
  { id: "goats", name: "Goats", icon: "🐐", type: "Ruminant", note: "Same ruminant research, tuned by feed evaluation.", ref: 6 },
];

export default function FeedDemo() {
  const [a, setA] = useState(0);
  const [pct, setPct] = useState(4);
  const animal = animals[a];

  return (
    <div className="card grid gap-8 p-6 sm:p-10 md:grid-cols-2">
      <div>
        <p className="eyebrow">Who is it for?</p>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist">
          {animals.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={i === a}
              onClick={() => setA(i)}
              className="chip"
              style={{
                borderColor: i === a ? "#ea9372" : "rgba(201,165,74,0.3)",
                background: i === a ? "#ea9372" : "transparent",
                color: i === a ? "#08170f" : "#f3e9d2",
              }}
            >
              {x.icon} {x.name}
            </button>
          ))}
        </div>

        <div key={animal.id} className="mt-8 flex items-start gap-5">
          <span className="text-7xl animate-float-slow" aria-hidden="true">{animal.icon}</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-coral">{animal.type}</p>
            <p className="mt-2 text-cream/80">{animal.note}</p>
            <p className="mt-2 text-xs text-cream/45">Research ref. [{animal.ref}]</p>
          </div>
        </div>
      </div>

      <div>
        <p className="eyebrow">Try an inclusion level</p>
        <p className="mt-4 font-serif text-5xl">
          {pct}% <span className="text-lg text-cream/50">of the ration</span>
        </p>
        <input
          type="range"
          min={0}
          max={15}
          step={1}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Inclusion level, percent of ration"
          className="mt-5 w-full accent-coral"
        />
        <div className="mt-5 flex h-10 overflow-hidden rounded-xl border border-gold/30">
          <div className="grid place-items-center bg-forest-700 text-xs text-cream/80 transition-all duration-500" style={{ width: `${100 - pct}%` }}>
            Base feed
          </div>
          <div className="grid place-items-center bg-leaf text-xs font-medium text-white transition-all duration-500" style={{ width: `${pct}%` }}>
            {pct >= 4 ? "ALGO" : ""}
          </div>
        </div>
        <p className="mt-3 text-xs text-cream/45">
          Demo only. The real inclusion level will be set by feed evaluation.
        </p>
      </div>
    </div>
  );
}
