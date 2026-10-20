import type { Metadata } from "next";
import { products, references, team } from "@/lib/data";
import ShareButton from "@/components/ShareButton";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Project document",
  description: "ALGO Algae Biorefinery Project: strains, methodology and research references.",
};

const groups = Array.from(new Set(references.map((r) => r.group)));

export default function DocsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-10 pt-14">
      <p className="eyebrow">Algae Biorefinery Project</p>
      <h1 className="display mt-3 text-5xl sm:text-6xl">Project document</h1>
      <p className="mt-4 text-cream/70">
        {team.course} · {team.members.join(", ")}
      </p>

      <div className="no-print mt-8 flex flex-wrap gap-3">
        <ShareButton title="ALGO · Project document" label="Share this page" />
        <a href="/ALGO-project-poster.pdf" download className="btn btn-gold">
          ⬇ Download poster PDF
        </a>
        <PrintButton />
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-3xl">1. Concept</h2>
        <p className="mt-3 text-cream/80">
          ALGO is an integrated microalgal biorefinery concept. Instead of treating algae as one raw material, we match
          each strain&apos;s natural biology to the product it suits best, then tailor cultivation, harvesting and
          processing to it. One platform, multiple products.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">2. Products and strains</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-gold/30">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest-800 text-xs uppercase tracking-widest text-gold">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Strain</th>
                <th className="p-4">Main ingredient</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-t border-gold/15 align-top">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 italic text-cream/80">{p.strain}</td>
                  <td className="p-4 text-cream/80">{p.ingredient}</td>
                </tr>
              ))}
              <tr className="border-t border-gold/15 align-top">
                <td className="p-4 font-medium">EPA-rich oil option</td>
                <td className="p-4 italic text-cream/80">Nannochloropsis sp.</td>
                <td className="p-4 text-cream/80">EPA (not DHA, so it suits a different oil) [3]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">3. Methodology</h2>
        {products.map((p) => (
          <div key={p.slug} className="mt-6">
            <h3 className="font-serif text-xl" style={{ color: p.accent }}>
              {p.name}
            </h3>
            <ol className="mt-3 space-y-2 text-cream/80">
              {p.steps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="w-5 shrink-0 text-cream/40">{i + 1}.</span>
                  <span>
                    <strong className="font-medium text-cream">{s.title}.</strong> {s.desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">4. Status of claims</h2>
        <p className="mt-3 text-cream/80">
          Benefits shown on this site are goals to be validated through testing. They are not proven results.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">5. References</h2>
        {groups.map((g) => (
          <div key={g} className="mt-6">
            <h3 className="eyebrow">{g}</h3>
            <ul className="mt-3 space-y-4 text-sm text-cream/75">
              {references
                .filter((r) => r.group === g)
                .map((r) => (
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
          </div>
        ))}
      </section>
    </article>
  );
}
