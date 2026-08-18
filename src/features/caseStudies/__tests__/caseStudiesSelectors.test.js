import {
  selectFilteredCaseStudies,
  selectVisibleCount,
  selectHasActiveFilters,
} from "../caseStudiesSelectors";

const items = [
  { id: "a", title: "Telehealth Booking", category: "Web", summary: "Appointments for clinics", year: 2024 },
  { id: "b", title: "Fitness Companion", category: "Mobile", summary: "Offline workout SYNC", year: 2023 },
  { id: "c", title: "Demand Forecasting", category: "AI", summary: "Cuts overstock for retail", year: 2024 },
  { id: "d", title: "Supply Ledger", category: "Blockchain", summary: "Provenance tracking", year: 2025 },
];

const makeState = (category = "All", query = "") => ({
  caseStudies: { items, status: "succeeded", error: null, filters: { category, query } },
});

describe("selectFilteredCaseStudies", () => {
  it("returns every item when the filters are untouched", () => {
    expect(selectFilteredCaseStudies(makeState())).toHaveLength(4);
  });

  it("narrows to a single category", () => {
    const result = selectFilteredCaseStudies(makeState("Mobile"));
    expect(result.map((item) => item.id)).toEqual(["b"]);
  });

  it("matches the query against the title, ignoring case", () => {
    const result = selectFilteredCaseStudies(makeState("All", "TELEHEALTH"));
    expect(result.map((item) => item.id)).toEqual(["a"]);
  });

  it("matches the query against the summary, ignoring case", () => {
    const result = selectFilteredCaseStudies(makeState("All", "sync"));
    expect(result.map((item) => item.id)).toEqual(["b"]);
  });

  it("combines the category and the query", () => {
    expect(selectFilteredCaseStudies(makeState("AI", "overstock"))).toHaveLength(1);
    expect(selectFilteredCaseStudies(makeState("Web", "overstock"))).toHaveLength(0);
  });

  it("ignores surrounding whitespace in the query", () => {
    expect(selectFilteredCaseStudies(makeState("All", "   "))).toHaveLength(4);
    expect(selectFilteredCaseStudies(makeState("All", "  ledger  "))).toHaveLength(1);
  });

  it("returns an empty array when nothing matches", () => {
    expect(selectFilteredCaseStudies(makeState("All", "quantum submarine"))).toEqual([]);
  });

  it("is memoized, so an unchanged state yields the same reference", () => {
    const state = makeState("Web");
    expect(selectFilteredCaseStudies(state)).toBe(selectFilteredCaseStudies(state));
  });
});

describe("selectVisibleCount", () => {
  it("counts the items left after filtering", () => {
    expect(selectVisibleCount(makeState())).toBe(4);
    expect(selectVisibleCount(makeState("Web"))).toBe(1);
    expect(selectVisibleCount(makeState("All", "nothing here"))).toBe(0);
  });
});

describe("selectHasActiveFilters", () => {
  it("is false only while both filters are at their defaults", () => {
    expect(selectHasActiveFilters(makeState())).toBe(false);
    expect(selectHasActiveFilters(makeState("All", "  "))).toBe(false);
    expect(selectHasActiveFilters(makeState("AI"))).toBe(true);
    expect(selectHasActiveFilters(makeState("All", "web"))).toBe(true);
  });
});
