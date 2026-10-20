import Link from "next/link";
import { team } from "@/lib/data";
import { Logo } from "./art";

export default function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-gold/20 bg-forest-950/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="font-serif text-2xl">ALGO</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-cream/60">
            Algae Biorefinery Project. One platform, multiple products.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li><Link className="hover:text-gold-soft" href="/products/oil">Algae Oil</Link></li>
            <li><Link className="hover:text-gold-soft" href="/products/feed">Algae Feed</Link></li>
            <li><Link className="hover:text-gold-soft" href="/products/biostimulant">Algae Biostimulant</Link></li>
            <li><Link className="hover:text-gold-soft" href="/docs">Project document</Link></li>
            <li><Link className="hover:text-gold-soft" href="/monitor">Monitor</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">{team.course}</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {team.members.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-gold/10 py-5 text-center text-xs text-cream/45">
        Benefits are goals to be validated through testing.
      </p>
    </footer>
  );
}
