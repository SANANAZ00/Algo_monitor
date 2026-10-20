"use client";

import { useState } from "react";
import { Plant } from "../art";

export default function BioDemo() {
  const [treated, setTreated] = useState(false);

  return (
    <div className="card p-6 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Seedling trial, as designed</p>
          <p className="mt-2 text-cream/70">Same soil. Same light. One spray.</p>
        </div>
        <div className="inline-flex rounded-full border border-gold/40 p-1" role="group" aria-label="Treatment">
          <button
            onClick={() => setTreated(false)}
            className={`rounded-full px-5 py-2 text-sm transition ${!treated ? "bg-cream text-forest-950" : "text-cream/70"}`}
          >
            Untreated
          </button>
          <button
            onClick={() => setTreated(true)}
            className={`rounded-full px-5 py-2 text-sm transition ${treated ? "bg-mint text-forest-950" : "text-cream/70"}`}
          >
            Treated
          </button>
        </div>
      </div>

      <div className="mt-8 grid items-end gap-6 sm:grid-cols-2">
        <figure className="rounded-2xl bg-forest-950/60 p-4 text-center">
          <Plant growth={0} className="mx-auto h-64" />
          <figcaption className="mt-2 text-xs uppercase tracking-widest text-cream/60">Untreated</figcaption>
        </figure>
        <figure
          className="rounded-2xl p-4 text-center transition-colors duration-700"
          style={{ background: treated ? "rgba(134,208,143,0.14)" : "rgba(8,23,15,0.6)" }}
        >
          <Plant growth={treated ? 1 : 0} className="mx-auto h-64" />
          <figcaption className="mt-2 text-xs uppercase tracking-widest" style={{ color: treated ? "#86d08f" : "rgba(243,233,210,0.6)" }}>
            {treated ? "Treated" : "Treated: press the toggle"}
          </figcaption>
        </figure>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["Shoot growth", "Root development", "Nutrient-use efficiency"].map((t) => (
          <span key={t} className="rounded-full bg-mint/15 px-3 py-1 text-xs text-mint">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-cream/45">
        Illustration of the goal. Results will be validated in our treated vs untreated seedling trial.
      </p>
    </div>
  );
}
