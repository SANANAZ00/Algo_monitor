"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/lib/data";
import { Logo } from "./art";

const links = [
  ...products.map((p) => ({ href: `/products/${p.slug}`, label: p.name.replace("ALGO ", "") })),
  { href: "/docs", label: "Docs" },
  { href: "/monitor", label: "Monitor" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print sticky top-0 z-50 transition duration-300 ${
        scrolled || open ? "border-b border-gold/20 bg-forest-950/85 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="ALGO home">
          <Logo className="h-9 w-9" />
          <span className="font-serif text-2xl tracking-wide text-cream">ALGO</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active ? "bg-gold/15 text-gold-soft" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className="rounded-full border border-gold/40 px-4 py-2 text-sm md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-5 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-2xl border border-gold/20 px-4 py-3 text-cream/90"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
