"use client";

import { useState } from "react";

export default function ShareButton({
  title = "ALGO · Algae Biorefinery Project",
  label = "Share",
}: {
  title?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled the share sheet, nothing to do */
    }
  };

  return (
    <button onClick={share} className="btn btn-ghost">
      {copied ? "✓ Link copied" : `↗ ${label}`}
    </button>
  );
}
