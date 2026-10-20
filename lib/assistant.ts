/* Rule-based assistant for the ALGO Monitor demo.
   Keyword matching only: no AI model, no network calls. */

import { DROP_LIMIT, WINDOW, phDrop, type Reactor } from "./monitor";

const f2 = (n: number) => n.toFixed(2);
const then = (r: Reactor) => r.hist[Math.max(0, r.hist.length - 1 - WINDOW)];

export const GREETING =
  "All reactors stable. I'll explain any incident here in plain language. You can also ask me about the process or the products.";

export const suggestions = [
  "Why did pH drop?",
  "What should I do?",
  "How does detection work?",
  "Which strain makes the oil?",
  "Is this real data?",
];

export function warningMsg(r: Reactor): string {
  return `⚠ ${r.name} (${r.strain}): pH fell ${f2(phDrop(r))} in ${WINDOW} s, from ${f2(then(r))} to ${f2(r.ph)}. The hard limit (${r.hardLow.toFixed(1)}) hasn't been reached, so there is still time to act. A drop this fast often points to contamination or a feed/CO₂ imbalance rather than normal drift. Suggested next steps: isolate the vessel, take a sample for microscopy, and pause feeding.`;
}

export function criticalMsg(r: Reactor): string {
  return `🛑 ${r.name}: pH is ${f2(r.ph)}, below the hard limit of ${r.hardLow.toFixed(1)}. Treat this batch as at risk. Stop inputs, isolate the vessel, and confirm the cause under the microscope before deciding whether to rescue or discard it.`;
}

export function resolvedMsg(r: Reactor): string {
  return `✓ ${r.name} has been reset and pH is returning to its normal range. In a real run you would also log the incident and record what you found.`;
}

export function reply(question: string, reactors: Reactor[]): string {
  const s = question.toLowerCase();
  // short keywords (do, ph, ok…) must match whole words, so "dosage" doesn't trigger "do"
  const has = (...keys: string[]) =>
    keys.some((k) => (k.length <= 3 && /^\w+$/.test(k) ? new RegExp(`\\b${k}\\b`).test(s) : s.includes(k)));
  const bad = reactors.find((r) => r.status !== "healthy");

  if (has("pilot", "book", "contact", "email", "buy", "price")) {
    return "Use the “Book a pilot” button below the demo and it will open an email to the team.";
  }
  if (has("real", "valid", "simulat", "fake", "accurate", "true data", "actual")) {
    return "Everything on this page is simulated, and I'm a rule-based assistant, not a live AI. The thresholds are illustrative, not validated process limits. A real deployment would be calibrated against your own cultures.";
  }
  if (has("rule", "detect", "threshold", "limit", "alert", "how does it", "how do you catch")) {
    return `The rule: if pH falls faster than ${DROP_LIMIT} within ${WINDOW} seconds, a warning is raised, well before the hard limit (illustratively 6.0 for the fermenter and 6.8 for the photobioreactors). Watching the rate of change gives you time to act. Waiting for a fixed limit means the batch is already in trouble.`;
  }
  if (has("why", "ph", "drop", "crash", "acid", "fell", "fall")) {
    if (bad) {
      return `${bad.name} (${bad.strain}) is in ${bad.status} status. pH went from ${f2(then(bad))} to ${f2(bad.ph)} in ${WINDOW} s, and its hard limit is ${bad.hardLow.toFixed(1)}. Competing microbes release acids as they grow, so contamination is a common cause. Here it's the simulated contamination you triggered. Temperature rising while ${bad.thirdLabel.toLowerCase()} falls or stalls supports that reading.`;
    }
    return "Right now every pH is steady. Press “Simulate contamination” and I'll explain the crash as it happens. In general, a sudden pH drop in an algae culture often points to contamination or a feed/CO₂ imbalance, because competing microbes produce acids as they grow.";
  }
  if (has("fix", "do", "next", "action", "respond", "solve", "rescue", "step")) {
    if (bad) {
      return `For ${bad.name}: 1) isolate the vessel so nothing spreads, 2) pause feeding, 3) take a sample and check it under the microscope, 4) compare with the neighbouring reactors, 5) decide whether to rescue or discard. Press “Reset all” when you want to restart the demo.`;
    }
    return "Nothing needs doing right now. If an alert fires, my standard steps are: isolate the vessel, pause feeding, take a sample for microscopy, compare with neighbouring reactors, then decide whether to rescue or discard.";
  }
  if (has("status", "reactor", "how are", "everything", "ok", "stable", "summary", "overview")) {
    return reactors
      .map((r) => `${r.name} (${r.process}): ${r.status}, pH ${f2(r.ph)}, ${r.temp.toFixed(1)} °C`)
      .join(". ") + ".";
  }
  if (has("contaminat", "bacteria", "infect", "foreign", "microbe")) {
    return "Contamination means unwanted microbes competing with your culture. They can lower pH, use up oxygen and stall growth. Catching it early lets you isolate one vessel before it spreads to the rest.";
  }
  if (has("temp", "heat", "warm", "°c")) {
    return "Temperature is tracked alongside pH. A steady climb while pH falls can support a contamination diagnosis, since growing microbes release heat. Treat it as a clue, not proof.";
  }
  if (has("epa", "nannochloropsis")) {
    return "Nannochloropsis is our EPA-rich oil option. EPA is not DHA, so it suits a different oil from the Schizochytrium one.";
  }
  if (has("oil", "dha", "omega", "schizochytrium", "ferment")) {
    return "ALGO Oil comes from Schizochytrium sp., a marine protist grown by fermentation on organic carbon. It's a well-studied DHA producer. DHA content is a goal to be validated in testing.";
  }
  if (has("feed", "animal", "poultry", "cattle", "goat", "chlorella", "protein")) {
    return "ALGO Feed uses Chlorella vulgaris biomass, plus the biomass left over from oil extraction, for poultry, cattle and goats. Cell-wall disruption is planned to improve digestibility, and feed evaluation will set the inclusion level.";
  }
  if (has("biostim", "spray", "seedling", "root", "plant", "crop")) {
    return "ALGO Biostimulant is a spray made from Chlorella extract, aimed at seedling growth, root development and nutrient-use efficiency. A treated vs untreated seedling trial will test it.";
  }
  if (has("sustain", "waste", "fish", "environment", "green", "eco")) {
    return "The sustainability goals: omega-3 without fishing, oil leftovers reused as feed, and compact modular reactors that need little land. All of these are goals to be validated through testing.";
  }
  if (has("who", "team", "course", "made", "built", "student")) {
    return "ALGO is a Food Biotechnology (BTH 638) project by Ifrah Naseem, Sana Naz and Zainab Irfan.";
  }
  if (/\b(hi|hello|hey|help)\b/.test(s)) {
    return "Hi! Ask me about a reactor, a pH alert, the detection rule, or any ALGO product.";
  }
  return "I'm a scripted assistant, so I only know a set of topics: reactor status, pH alerts, the detection rule, contamination, and the three products. Try one of the suggested questions.";
}
