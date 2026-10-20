/* Simulation engine for the ALGO Monitor demo.
   Everything here is simulated. Thresholds are illustrative, not validated process limits. */

export const PILOT_EMAIL = "sanafa3ima@gmail.com"; // TODO: replace with your real address
export const WINDOW = 8; // seconds (one tick = one second)
export const DROP_LIMIT = 0.2; // pH fall within WINDOW that raises a warning

export type Status = "healthy" | "warning" | "critical";

export type Reactor = {
  id: string;
  name: string;
  process: string;
  strain: string;
  product: string;
  slug: "oil" | "feed" | "biostimulant";
  basePh: number;
  baseTemp: number;
  hardLow: number;
  ph: number;
  temp: number;
  third: number;
  thirdBase: number;
  thirdLabel: string;
  thirdUnit: string;
  thirdDigits: number;
  hist: number[];
  status: Status;
  contaminated: boolean;
  announced: "none" | "warning" | "critical";
};

const HIST_LEN = 40;

function make(
  p: Pick<
    Reactor,
    | "id" | "name" | "process" | "strain" | "product" | "slug"
    | "basePh" | "baseTemp" | "hardLow"
    | "third" | "thirdBase" | "thirdLabel" | "thirdUnit" | "thirdDigits"
  >
): Reactor {
  return {
    ...p,
    ph: p.basePh,
    temp: p.baseTemp,
    hist: Array.from({ length: 20 }, () => p.basePh),
    status: "healthy",
    contaminated: false,
    announced: "none",
  };
}

export function initialReactors(): Reactor[] {
  return [
    make({
      id: "r1", name: "Reactor 1", process: "Fermenter", strain: "Schizochytrium sp.",
      product: "ALGO Oil", slug: "oil",
      basePh: 6.8, baseTemp: 28.0, hardLow: 6.0,
      third: 42, thirdBase: 42, thirdLabel: "Dissolved O₂", thirdUnit: "%", thirdDigits: 0,
    }),
    make({
      id: "r2", name: "Reactor 2", process: "Photobioreactor", strain: "Chlorella vulgaris",
      product: "ALGO Feed", slug: "feed",
      basePh: 7.6, baseTemp: 26.0, hardLow: 6.8,
      third: 0.62, thirdBase: 0.62, thirdLabel: "Turbidity (growth)", thirdUnit: "OD", thirdDigits: 2,
    }),
    make({
      id: "r3", name: "Reactor 3", process: "Photobioreactor", strain: "Chlorella vulgaris",
      product: "ALGO Biostimulant", slug: "biostimulant",
      basePh: 7.65, baseTemp: 26.0, hardLow: 6.8,
      third: 0.58, thirdBase: 0.58, thirdLabel: "Turbidity (growth)", thirdUnit: "OD", thirdDigits: 2,
    }),
  ];
}

export type TickEvent = "warning" | "critical" | "recovered" | null;

export function phDrop(r: Reactor): number {
  return r.hist.length > WINDOW ? r.hist[r.hist.length - 1 - WINDOW] - r.ph : 0;
}

export function tick(r: Reactor, rnd: () => number): { reactor: Reactor; event: TickEvent } {
  const noise = (rnd() - 0.5) * 2; // -1..1
  let { ph, temp, third } = r;
  const isFerm = r.id === "r1";

  if (r.contaminated) {
    ph -= 0.05 + rnd() * 0.04;
    temp += 0.05;
    third = isFerm ? third - 1.5 : third - 0.004;
  } else {
    ph += (r.basePh - ph) * 0.25 + noise * 0.012;
    temp += (r.baseTemp - temp) * 0.2 + noise * 0.04;
    third = isFerm
      ? third + (r.thirdBase - third) * 0.25 + noise * 0.8
      : third + 0.003 + noise * 0.001;
  }

  ph = Math.max(5.0, ph);
  third = isFerm ? Math.max(5, Math.min(60, third)) : Math.max(0.2, Math.min(2, third));

  const hist = [...r.hist, ph].slice(-HIST_LEN);
  const next: Reactor = { ...r, ph, temp, third, hist };
  const drop = phDrop(next);

  let status: Status = "healthy";
  if (ph <= r.hardLow) status = "critical";
  else if (drop >= DROP_LIMIT) status = "warning";
  next.status = status;

  let event: TickEvent = null;
  if (status === "critical" && r.announced !== "critical") {
    event = "critical";
    next.announced = "critical";
  } else if (status === "warning" && r.announced === "none") {
    event = "warning";
    next.announced = "warning";
  } else if (status === "healthy" && r.announced !== "none") {
    event = "recovered";
    next.announced = "none";
  }
  return { reactor: next, event };
}
