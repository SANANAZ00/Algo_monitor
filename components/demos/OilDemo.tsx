"use client";

import { useState } from "react";
import { Bottle } from "../art";

const flavours = [
  { id: "classic", name: "Classic", full: "Pure Cooking Oil", label: "PURE COOKING OIL", color: "#d6b550", icon: "🫒", note: "Clean, neutral. Made for everyday cooking." },
  { id: "chili", name: "Chili", full: "Flavour Chili Oil", label: "FLAVOUR CHILI OIL", color: "#b3262a", icon: "🌶️", note: "A warm kick, built on the same algae base." },
  { id: "garlic", name: "Garlic", full: "Premium Garlic Oil", label: "PREMIUM GARLIC OIL", color: "#cdb870", icon: "🧄", note: "Rich, aromatic finishing oil with a gentle garlic bite." },
];

export default function OilDemo() {
  const [i, setI] = useState(0);
  const f = flavours[i];

  return (
    <div className="card grid items-center gap-8 p-6 sm:p-10 md:grid-cols-2">
      <div className="relative mx-auto grid h-72 w-full max-w-xs place-items-center">
        <div
          className="absolute inset-6 rounded-full blur-3xl transition-colors duration-700"
          style={{ background: f.color, opacity: 0.35 }}
        />
        <div key={f.id} className="relative animate-float">
          <Bottle color={f.color} label={f.label} className="h-64" />
        </div>
        <span className="absolute right-2 top-2 text-4xl" aria-hidden="true">{f.icon}</span>
      </div>

      <div>
        <p className="eyebrow">Pick a flavour</p>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist">
          {flavours.map((x, idx) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={idx === i}
              onClick={() => setI(idx)}
              className="chip"
              style={{
                borderColor: idx === i ? x.color : "rgba(201,165,74,0.3)",
                background: idx === i ? x.color : "transparent",
                color: idx === i ? "#fff" : "#f3e9d2",
              }}
            >
              {x.name}
            </button>
          ))}
        </div>
        <h3 className="mt-6 font-serif text-3xl">{f.full}</h3>
        <p className="mt-2 text-cream/70">{f.note}</p>

        <div className="mt-8">
          <div className="flex justify-between text-xs uppercase tracking-widest text-cream/60">
            <span>Omega-3 DHA</span>
            <span>Target: DHA-rich</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-forest-950">
            <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-leaf to-gold-soft" />
          </div>
          <p className="mt-2 text-xs text-cream/45">Illustrative. DHA content is a goal to be validated in testing.</p>
        </div>
      </div>
    </div>
  );
}
