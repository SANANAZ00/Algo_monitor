import Link from "next/link";
import { products } from "@/lib/data";
import { AlgaeCell, ProductArt } from "@/components/art";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Pipeline from "@/components/Pipeline";
import Loop from "@/components/Loop";

const stats = [
  { to: 1, label: "Platform" },
  { to: 3, label: "Algae strains" },
  { to: 3, label: "Products" },
  { to: 15, label: "Process steps" },
];

const why = [
  { icon: "🎯", title: "Matched, not generic", text: "Each strain goes to the product its biology suits best." },
  { icon: "♻️", title: "Nothing wasted", text: "Oil leftovers become animal feed." },
  { icon: "🔬", title: "Tested before claimed", text: "Every benefit is a goal until our trials say otherwise." },
];

const sustain = [
  { icon: "🐟", title: "Fish-free omega-3", text: "DHA from fermentation tanks, not fishing fleets." },
  { icon: "🔁", title: "Circular by design", text: "Residual biomass returns as feed." },
  { icon: "🌍", title: "Compact growing", text: "Modular photobioreactors, little land." },
  { icon: "🌱", title: "Leaner farming", text: "Goal: better nutrient use per crop." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <AlgaeCell className="absolute -left-16 top-24 h-56 w-56 animate-float opacity-70" />
        <AlgaeCell className="absolute -right-12 top-10 h-72 w-72 animate-float-slow opacity-60" color="#3f7f2c" />
        <AlgaeCell className="absolute right-1/4 top-[26rem] hidden h-20 w-20 animate-drift opacity-60 md:block" color="#6cb34a" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 text-center sm:pt-24">
          <p className="eyebrow">Algae Biorefinery Project</p>
          <h1 className="display mt-5 text-6xl sm:text-8xl">
            Meet <span className="text-gold-soft">ALGO</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream/80">
            One alga is not one raw material. We match each strain to the product it suits best.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cream">
            One platform, multiple products.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="#products" className="btn btn-gold">Explore products ↓</Link>
            <Link href="/docs" className="btn btn-ghost">Read the document</Link>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gold/25 bg-gold/20 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-forest-900/90 px-4 py-6 text-center">
              <p className="font-serif text-4xl text-gold-soft">
                <Counter to={s.to} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-cream/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-5">
        <Reveal>
          <p className="eyebrow">Three products</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Tap one to dive in.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <Link
                href={`/products/${p.slug}`}
                className="group card relative flex h-full flex-col overflow-hidden transition duration-500 hover:-translate-y-2"
              >
                <div
                  className="absolute inset-x-0 top-0 h-48 opacity-20 transition duration-500 group-hover:opacity-40"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${p.accent}, transparent 70%)` }}
                />
                <div className="relative flex h-64 items-end justify-center px-4 pb-4 pt-8 transition duration-500 group-hover:scale-105">
                  <ProductArt slug={p.slug} className="scale-[.8]" />
                </div>
                <div className="relative flex flex-1 flex-col border-t border-gold/20 p-6">
                  <p className="text-xs tracking-[0.3em]" style={{ color: p.accent }}>{p.num}</p>
                  <h3 className="mt-1 font-serif text-3xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-cream/70">{p.pitch}</p>
                  <p className="mt-5 text-sm font-medium transition group-hover:translate-x-1" style={{ color: p.accent }}>
                    Main ingredient: {p.ingredient} →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <div className="grid gap-5 md:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 100}>
              <div className="h-full rounded-3xl border border-gold/20 bg-forest-950/40 p-7">
                <span className="text-3xl" aria-hidden="true">{w.icon}</span>
                <h3 className="mt-4 font-serif text-2xl">{w.title}</h3>
                <p className="mt-2 text-cream/70">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <Reveal>
          <p className="eyebrow">Methodology</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">From strain to shelf.</h2>
          <p className="mt-4 max-w-lg text-cream/70">Pick a product. Press play. Watch its route.</p>
        </Reveal>
        <Reveal className="mt-10" delay={100}>
          <Pipeline />
        </Reveal>
      </section>

      {/* SUSTAINABILITY */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <Reveal>
          <p className="eyebrow">Sustainability</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Built to waste nothing.</h2>
        </Reveal>
        <Reveal className="mt-10" delay={100}>
          <Loop />
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sustain.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-gold/20 bg-forest-800/50 p-6 transition duration-300 hover:border-gold/60">
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <h3 className="mt-3 font-serif text-xl">{s.title}</h3>
                <p className="mt-1 text-sm text-cream/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-cream/45">Benefits are goals to be validated through testing.</p>
      </section>

      {/* DOC CTA */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-gradient-to-br from-forest-700 to-forest-900 p-8 sm:p-14">
            <AlgaeCell className="absolute -right-10 -top-10 h-48 w-48 animate-float-slow opacity-40" />
            <div className="relative max-w-xl">
              <p className="eyebrow">Want the full story?</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">The project document.</h2>
              <p className="mt-4 text-cream/75">Strains, methods and all 8 research references in one shareable page.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/docs" className="btn btn-gold">Open the doc →</Link>
                <a href="/ALGO-project-poster.pdf" download className="btn btn-ghost">⬇ Download PDF</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
