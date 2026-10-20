import { AlgaeCell } from "./art";

function Node({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "gold" | "coral" | "mint";
}) {
  const tones = {
    default: "border-gold/30 bg-forest-800/80 text-cream",
    gold: "border-gold bg-gold/90 text-forest-950",
    coral: "border-coral bg-coral/90 text-forest-950",
    mint: "border-mint bg-mint/90 text-forest-950",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-2xl border px-4 py-3 text-sm font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span className="relative mx-1 hidden h-0.5 w-10 shrink-0 overflow-hidden rounded bg-gold/20 sm:block">
      <span className="shimmer-line absolute inset-0" />
    </span>
  );
}

export default function Loop() {
  return (
    <div className="card relative overflow-hidden p-6 sm:p-10">
      <AlgaeCell className="absolute -right-10 -top-10 h-40 w-40 animate-float-slow opacity-30" />
      <div className="relative space-y-10">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Fermentation route</p>
          <div className="flex flex-wrap items-center gap-y-3">
            <Node>Schizochytrium</Node>
            <Arrow />
            <Node tone="gold">ALGO Oil</Node>
            <Arrow />
            <Node>Leftover biomass</Node>
            <Arrow />
            <Node tone="coral">ALGO Feed</Node>
          </div>
          <p className="mt-3 text-sm text-cream/60">The oil is the product. The leftovers are not waste.</p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Photobioreactor route</p>
          <div className="flex flex-wrap items-center gap-y-3">
            <Node>Chlorella</Node>
            <Arrow />
            <Node tone="coral">ALGO Feed</Node>
            <span className="mx-3 text-cream/40">or</span>
            <Node>Extract</Node>
            <Arrow />
            <Node tone="mint">ALGO Biostimulant</Node>
          </div>
          <p className="mt-3 text-sm text-cream/60">One green alga, two jobs on the farm.</p>
        </div>
      </div>
    </div>
  );
}
