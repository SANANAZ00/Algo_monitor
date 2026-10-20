/* Pure SVG illustrations. No images needed, so the site stays fast and self-contained. */

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#0c2219" stroke="#c9a54a" strokeWidth="2.5" />
      <circle cx="32" cy="26" r="11" fill="#4f9a3b" />
      <circle cx="29" cy="23" r="2.5" fill="#e6f5c8" />
      <circle cx="36" cy="29" r="2" fill="#e6f5c8" />
      <circle cx="34" cy="22" r="1.5" fill="#e6f5c8" />
      <path d="M32 40c0 8 6 12 14 12-1-8-6-12-14-12z" fill="#f3e9d2" />
    </svg>
  );
}

const DOTS: [number, number, number][] = [
  [30, 34, 5], [52, 28, 4], [68, 44, 6], [38, 58, 4], [60, 66, 5],
  [44, 46, 3], [26, 54, 3], [72, 62, 3], [50, 76, 3],
];

export function AlgaeCell({
  className = "",
  color = "#4f9a3b",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill={color} />
      <circle cx="50" cy="50" r="38" fill="#fff" opacity="0.1" />
      {DOTS.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#e6f5c8" opacity="0.85" />
          <circle cx={x} cy={y} r={r * 0.4} fill={color} />
        </g>
      ))}
    </svg>
  );
}

export function Bottle({
  color = "#d9b84a",
  label = "PURE COOKING OIL",
  className = "",
}: {
  color?: string;
  label?: string;
  className?: string;
}) {
  const words = label.split(" ");
  return (
    <svg viewBox="0 0 100 240" className={className} aria-hidden="true">
      <rect x="39" y="4" width="22" height="18" rx="3" fill="#8a7430" />
      <rect x="42" y="22" width="16" height="26" fill={color} opacity="0.9" />
      <path d="M42 48 C42 62 18 62 18 86 L18 216 Q18 232 34 232 L66 232 Q82 232 82 216 L82 86 C82 62 58 62 58 48 Z" fill={color} />
      <path d="M26 86 L26 214" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.28" />
      <rect x="25" y="110" width="50" height="82" rx="6" fill="#f3e9d2" />
      <circle cx="50" cy="128" r="8" fill="#4f9a3b" />
      <circle cx="48" cy="126" r="2" fill="#e6f5c8" />
      <text x="50" y="152" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0c2219" fontFamily="serif">
        ALGO
      </text>
      {words.map((w, i) => (
        <text
          key={i}
          x="50"
          y={165 + i * 8}
          textAnchor="middle"
          fontSize="6"
          fontWeight="600"
          fill="#0c2219"
          opacity="0.75"
        >
          {w}
        </text>
      ))}
    </svg>
  );
}

export function SprayBottle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 240" className={className} aria-hidden="true">
      <path d="M44 8 L84 8 L92 22 L40 22 Z" fill="#2b6a3a" />
      <rect x="30" y="10" width="14" height="6" rx="3" fill="#2b6a3a" />
      <rect x="54" y="22" width="14" height="22" fill="#3a8b4c" />
      <path d="M44 44 L78 44 C92 56 98 70 98 90 L98 222 Q98 234 86 234 L38 234 Q26 234 26 222 L26 90 C26 70 32 56 44 44 Z" fill="#6cc06f" />
      <path d="M36 92 L36 220" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
      <rect x="36" y="118" width="52" height="78" rx="6" fill="#f3e9d2" />
      <circle cx="62" cy="138" r="8" fill="#4f9a3b" />
      <text x="62" y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0c2219" fontFamily="serif">
        ALGO
      </text>
      <text x="62" y="175" textAnchor="middle" fontSize="6" fontWeight="600" fill="#0c2219" opacity="0.75">
        BIOSTIMULANT
      </text>
      <circle cx="104" cy="14" r="2" fill="#86d08f" opacity="0.8" />
      <circle cx="112" cy="22" r="1.6" fill="#86d08f" opacity="0.7" />
      <circle cx="108" cy="30" r="1.4" fill="#86d08f" opacity="0.6" />
    </svg>
  );
}

export function FeedBag({
  color = "#3c7a37",
  label = "HIGH OMEGA MEAL",
  className = "",
}: {
  color?: string;
  label?: string;
  className?: string;
}) {
  const words = label.split(" ");
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true">
      <path d="M14 14 L106 14 L112 24 L112 186 Q112 192 106 192 L14 192 Q8 192 8 186 L8 24 Z" fill={color} />
      <path d="M14 14 L106 14 L112 24 L8 24 Z" fill="#fff" opacity="0.18" />
      <path d="M20 40 L20 180" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.18" />
      <rect x="26" y="66" width="68" height="94" rx="8" fill="#f3e9d2" />
      <circle cx="60" cy="88" r="10" fill="#4f9a3b" />
      <circle cx="57" cy="85" r="2.6" fill="#e6f5c8" />
      <text x="60" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0c2219" fontFamily="serif">
        ALGO
      </text>
      {words.map((w, i) => (
        <text key={i} x="60" y={132 + i * 9} textAnchor="middle" fontSize="7" fontWeight="600" fill="#0c2219" opacity="0.8">
          {w}
        </text>
      ))}
    </svg>
  );
}

/** A seedling in soil. `growth` 0..1 scales the shoot, leaves and roots. */
export function Plant({
  growth,
  className = "",
}: {
  growth: number;
  className?: string;
}) {
  const shoot = 0.42 + growth * 0.58;
  const roots = 0.3 + growth * 0.7;
  const ease = "transform 1000ms cubic-bezier(.2,.8,.2,1)";
  return (
    <svg viewBox="0 0 200 290" className={className} aria-hidden="true">
      {/* soil */}
      <rect x="14" y="170" width="172" height="112" rx="14" fill="#4a3624" />
      <rect x="14" y="170" width="172" height="10" rx="5" fill="#5e452f" />
      {/* roots */}
      <g
        style={{ transform: `scale(${roots})`, transformOrigin: "100px 174px", transition: ease }}
        stroke="#e9dcb8"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M100 174 L100 262" strokeWidth="3.5" />
        <path d="M100 196 C80 204 66 220 58 246" strokeWidth="2.5" />
        <path d="M100 206 C122 214 136 230 142 254" strokeWidth="2.5" />
        <path d="M100 226 C86 232 80 244 78 262" strokeWidth="2" />
        <path d="M100 232 C114 238 120 250 122 266" strokeWidth="2" />
        <path d="M82 214 C70 216 62 224 56 232" strokeWidth="1.6" />
        <path d="M120 222 C132 224 140 232 146 240" strokeWidth="1.6" />
      </g>
      {/* shoot */}
      <g style={{ transform: `scale(${shoot})`, transformOrigin: "100px 172px", transition: ease }}>
        <path d="M100 172 C100 140 100 110 100 62" stroke="#5fae4a" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M100 126 C70 128 44 112 36 84 C68 82 92 98 100 126 Z" fill="#6cc06f" />
        <path d="M100 108 C130 108 156 92 164 64 C132 62 108 78 100 108 Z" fill="#4f9a3b" />
        <path d="M100 66 C84 56 82 34 100 14 C118 34 116 56 100 66 Z" fill="#86d08f" />
      </g>
    </svg>
  );
}

export function ProductArt({ slug, className = "" }: { slug: string; className?: string }) {
  if (slug === "oil") {
    return (
      <div className={`flex items-end justify-center gap-3 ${className}`}>
        <Bottle color="#d6b550" label="PURE COOKING OIL" className="h-40 sm:h-52" />
        <Bottle color="#b3262a" label="FLAVOUR CHILI OIL" className="h-48 sm:h-64" />
        <Bottle color="#cdb870" label="PREMIUM GARLIC OIL" className="h-40 sm:h-52" />
      </div>
    );
  }
  if (slug === "feed") {
    return (
      <div className={`flex items-end justify-center gap-3 ${className}`}>
        <FeedBag color="#3c7a37" label="HIGH OMEGA MEAL" className="h-44 sm:h-60" />
        <FeedBag color="#a58a52" label="COMPLETE PELLET FEED" className="h-36 sm:h-48" />
      </div>
    );
  }
  return (
    <div className={`flex items-end justify-center gap-5 ${className}`}>
      <SprayBottle className="h-44 sm:h-60" />
      <Plant growth={1} className="h-40 sm:h-56" />
    </div>
  );
}
