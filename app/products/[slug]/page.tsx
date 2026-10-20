import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products, references } from "@/lib/data";
import { AlgaeCell, ProductArt } from "@/components/art";
import Reveal from "@/components/Reveal";
import ShareButton from "@/components/ShareButton";
import OilDemo from "@/components/demos/OilDemo";
import FeedDemo from "@/components/demos/FeedDemo";
import BioDemo from "@/components/demos/BioDemo";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: `${p.tagline} ${p.pitch}` };
}

const demos = { oil: OilDemo, feed: FeedDemo, biostimulant: BioDemo } as const;
const demoTitles = {
  oil: "Choose your flavour.",
  feed: "Built for the barn.",
  biostimulant: "See the goal.",
} as const;

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const Demo = demos[p.slug];
  const idx = products.findIndex((x) => x.slug === p.slug);
  const next = products[(idx + 1) % products.length];
  const refs = references.filter((r) => p.strainRefs.includes(r.id));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(50rem 30rem at 70% 20%, ${p.accent}55, transparent 70%)` }}
        />
        <AlgaeCell className="absolute -left-14 top-40 h-44 w-44 animate-float opacity-50" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-2 md:pt-16">
          <div>
            <Link href="/#products" className="text-sm text-cream/60 transition hover:text-cream">
              ← All products
            </Link>
            <p className="mt-6 text-xs tracking-[0.35em]" style={{ color: p.accent }}>
              {p.num} · {p.strain}
            </p>
            <h1 className="display mt-3 text-5xl sm:text-7xl">{p.name}</h1>
            <p className="mt-5 max-w-md text-xl text-cream/85">{p.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.goals.map((g) => (
                <span
                  key={g}
                  className="rounded-full border px-4 py-1.5 text-sm"
                  style={{ borderColor: `${p.accent}88`, color: p.accent }}
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#demo" className="btn btn-gold">Try it ↓</a>
              <ShareButton title={`${p.name} · ALGO`} />
            </div>
          </div>
          <div className="flex justify-center">
            <ProductArt slug={p.slug} className="animate-float-slow" />
          </div>
        </div>
      </section>

      {/* MAIN INGREDIENT */}
      <section className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] border p-8 sm:p-14"
            style={{ borderColor: `${p.accent}66`, background: `linear-gradient(135deg, ${p.accent}22, transparent 70%)` }}
          >
            <p className="eyebrow">Main ingredient</p>
            <p className="display mt-3 text-6xl sm:text-8xl" style={{ color: p.accent }}>
              {p.ingredient}
            </p>
            <p className="mt-4 max-w-md text-lg text-cream/80">{p.ingredientLine}</p>
            <p className="mt-6 text-sm text-cream/60">
              From <span className="italic text-cream">{p.strain}</span>. {p.strainNote}{" "}
              <span className="text-cream/45">[{p.strainRefs.join("][")}]</span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* DEMO */}
      <section id="demo" className="mx-auto mt-24 max-w-6xl scroll-mt-24 px-5">
        <Reveal>
          <p className="eyebrow">Interactive</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{demoTitles[p.slug]}</h2>
        </Reveal>
        <Reveal className="mt-8" delay={100}>
          <Demo />
        </Reveal>
      </section>

      {/* HOW IT'S MADE */}
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <Reveal>
          <p className="eyebrow">How it&apos;s made</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Five steps.</h2>
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {p.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 90} className="h-full">
                <div className="h-full rounded-3xl border bg-forest-800/60 p-5" style={{ borderColor: `${p.accent}55` }}>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-forest-950"
                    style={{ background: p.accent }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm text-cream/65">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* SUSTAINABILITY */}
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <Reveal>
          <p className="eyebrow">Sustainability</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Why it&apos;s kinder.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {p.sustain.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <div className="h-full rounded-3xl border border-gold/20 bg-forest-950/40 p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/60">
                <span className="text-4xl" aria-hidden="true">{s.icon}</span>
                <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-cream/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-cream/45">Benefits are goals to be validated through testing.</p>
      </section>

      {/* SOURCES */}
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <details className="card group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between">
            <span className="eyebrow">Research behind this product</span>
            <span className="text-gold transition group-open:rotate-45">＋</span>
          </summary>
          <ul className="mt-5 space-y-4 text-sm text-cream/70">
            {refs.map((r) => (
              <li key={r.id} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-semibold text-forest-950">
                  {r.id}
                </span>
                <span>
                  {r.text}{" "}
                  <a className="break-all text-gold-soft underline" href={r.doi} target="_blank" rel="noreferrer">
                    {r.doi}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* NEXT */}
      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/products/${next.slug}`}
            className="group rounded-3xl border border-gold/30 bg-forest-800/60 p-8 transition hover:-translate-y-1 hover:border-gold"
          >
            <p className="eyebrow">Next product</p>
            <p className="mt-2 font-serif text-3xl">{next.name}</p>
            <p className="mt-1 text-sm transition group-hover:translate-x-1" style={{ color: next.accent }}>
              {next.tagline} →
            </p>
          </Link>
          <Link
            href="/docs"
            className="group rounded-3xl border border-gold/30 bg-forest-800/60 p-8 transition hover:-translate-y-1 hover:border-gold"
          >
            <p className="eyebrow">Details</p>
            <p className="mt-2 font-serif text-3xl">Project document</p>
            <p className="mt-1 text-sm text-gold-soft transition group-hover:translate-x-1">Share or download →</p>
          </Link>
        </div>
      </section>
    </>
  );
}
