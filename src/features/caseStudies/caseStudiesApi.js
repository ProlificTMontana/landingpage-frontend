const CASE_STUDIES = [
  {
    id: "cs-01",
    title: "Telehealth Booking Platform",
    category: "Web",
    summary:
      "A HIPAA-aware appointment platform that cut patient no-shows by 32% with smart reminders.",
    year: 2024,
  },
  {
    id: "cs-02",
    title: "Fitness Companion App",
    category: "Mobile",
    summary:
      "Cross-platform workout tracker with offline sync and wearable integration for 60k users.",
    year: 2023,
  },
  {
    id: "cs-03",
    title: "Retail Demand Forecasting",
    category: "AI",
    summary:
      "Forecasting models that trimmed overstock costs by 21% across 140 retail locations.",
    year: 2024,
  },
  {
    id: "cs-04",
    title: "NFT Marketplace",
    category: "Blockchain",
    summary:
      "Gas-optimised minting and a curated drop calendar for a fast growing creator community.",
    year: 2022,
  },
  {
    id: "cs-05",
    title: "Construction Ops Dashboard",
    category: "Web",
    summary:
      "Real-time site reporting that replaced spreadsheets for 400 field supervisors.",
    year: 2023,
  },
  {
    id: "cs-06",
    title: "Support Copilot",
    category: "AI",
    summary:
      "Retrieval-based assistant that drafts replies and shortened first response time to 2 minutes.",
    year: 2025,
  },
  {
    id: "cs-07",
    title: "Delivery Rider App",
    category: "Mobile",
    summary:
      "Battery-friendly routing and live tracking for a last-mile fleet operating in three cities.",
    year: 2022,
  },
  {
    id: "cs-08",
    title: "Supply Chain Ledger",
    category: "Blockchain",
    summary:
      "Tamper-evident provenance tracking that made supplier audits a same-day process.",
    year: 2025,
  },
  {
    id: "cs-09",
    title: "Sports Fan Portal",
    category: "Web",
    summary:
      "Live scores, ticketing and a loyalty wallet handling 90k concurrent match-day visitors.",
    year: 2024,
  },
];

const REQUEST_DELAY_MS = 800;
const FAILURE_RATE = 0.15;

/**
 * Mock network call: resolves with the seeded case studies after ~800ms and
 * fails roughly 15% of the time. Supports aborting through an AbortSignal.
 */
export function fetchCaseStudies({ signal } = {}) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error("Network failed"));
        return;
      }
      resolve(CASE_STUDIES);
    }, REQUEST_DELAY_MS);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new Error("Request aborted"));
      });
    }
  });
}

export default fetchCaseStudies;
