"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn btn-ghost">
      🖨 Print / save PDF
    </button>
  );
}
