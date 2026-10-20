import Link from "next/link";
import type { Metadata } from "next";
import Monitor from "@/components/monitor/Monitor";
import { products } from "@/lib/data";
import { PILOT_EMAIL } from "@/lib/monitor";

export const metadata: Metadata = {
  title: "ALGO Monitor",
  description: "Live monitoring and early contamination alerts for algae cultivation. Simulated demo.",
};

export default function MonitorPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-14 text-center sm:pt-20">
        <p className="eyebrow">ALGO Monitor</p>
        <h1 className="display mt-4 text-5xl sm:text-7xl">
          Never lose a batch to a <span className="text-gold-soft">pH crash.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">
          Live monitoring and early contamination alerts for algae cultivation.
        </p>
        <a href="#demo" className="btn btn-gold mt-8">
          See it catch a crash ↓
        </a>
      </section>

      <section id="demo" className="mx-auto max-w-6xl scroll-mt-24 px-5">
        <h2 className="font-serif text-3xl sm:text-4xl">Watch it catch a crash, before it happens.</h2>
        <p className="mt-2 text-sm text-cream/60">Simulated readings. Pick a reactor, trigger contamination, then ask the assistant.</p>
        <div className="mt-8">
          <Monitor />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <p className="eyebrow">What the reactors make</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-3xl border border-gold/25 bg-forest-800/50 p-6 transition hover:-translate-y-1 hover:border-gold"
            >
              <p className="text-xs tracking-[0.3em]" style={{ color: p.accent }}>{p.num}</p>
              <p className="mt-1 font-serif text-2xl">{p.name}</p>
              <p className="mt-1 text-sm text-cream/65">{p.tagline}</p>
              <p className="mt-4 text-sm transition group-hover:translate-x-1" style={{ color: p.accent }}>
                Open product page →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="rounded-[2rem] border border-gold/40 bg-gradient-to-br from-forest-700 to-forest-900 p-8 text-center sm:p-14">
          <h2 className="display text-4xl sm:text-5xl">Ready to try it on your reactors?</h2>
          <p className="mx-auto mt-4 max-w-md text-cream/75">Tell us about your setup and we&apos;ll plan a pilot.</p>
          <a
            href={`mailto:${PILOT_EMAIL}?subject=${encodeURIComponent("ALGO pilot")}`}
            className="btn btn-gold mt-8"
          >
            Book a pilot
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-cream/45">
          Demo only. Readings are simulated, the assistant is rule-based, and thresholds are illustrative, not validated
          process limits.
        </p>
      </section>
    </>
  );
}
