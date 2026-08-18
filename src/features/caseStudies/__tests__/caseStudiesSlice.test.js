import reducer, {
  categoryFilterChanged,
  queryFilterChanged,
  filtersCleared,
  fetchCaseStudies,
} from "../caseStudiesSlice";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filters: { category: "All", query: "" },
};

describe("caseStudies reducers", () => {
  it("starts idle with empty items and default filters", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("stores the selected category", () => {
    const next = reducer(initialState, categoryFilterChanged("AI"));
    expect(next.filters.category).toBe("AI");
  });

  it("stores the search query", () => {
    const next = reducer(initialState, queryFilterChanged("ledger"));
    expect(next.filters.query).toBe("ledger");
  });

  it("resets both filters without discarding the loaded items", () => {
    const dirty = {
      ...initialState,
      items: [{ id: "a" }],
      status: "succeeded",
      filters: { category: "Web", query: "ledger" },
    };
    const next = reducer(dirty, filtersCleared());

    expect(next.filters).toEqual(initialState.filters);
    expect(next.items).toEqual([{ id: "a" }]);
    expect(next.status).toBe("succeeded");
  });

  it("never stores a derived filtered list", () => {
    const next = reducer(initialState, categoryFilterChanged("Web"));
    expect(Object.keys(next).sort()).toEqual(["error", "filters", "items", "status"]);
  });
});

describe("fetchCaseStudies lifecycle", () => {
  it("moves to loading and clears a previous error", () => {
    const failed = { ...initialState, status: "failed", error: "Network failed" };
    const next = reducer(failed, { type: fetchCaseStudies.pending.type });

    expect(next.status).toBe("loading");
    expect(next.error).toBeNull();
  });

  it("stores the payload on success", () => {
    const items = [{ id: "a", title: "Telehealth Booking" }];
    const next = reducer(initialState, {
      type: fetchCaseStudies.fulfilled.type,
      payload: items,
    });

    expect(next.status).toBe("succeeded");
    expect(next.items).toEqual(items);
  });

  it("stores the rejectWithValue message on failure", () => {
    const next = reducer(initialState, {
      type: fetchCaseStudies.rejected.type,
      payload: "Network failed",
      error: { message: "Rejected" },
    });

    expect(next.status).toBe("failed");
    expect(next.error).toBe("Network failed");
  });

  it("falls back to the error message when there is no payload", () => {
    const next = reducer(initialState, {
      type: fetchCaseStudies.rejected.type,
      error: { message: "Request aborted" },
    });

    expect(next.error).toBe("Request aborted");
  });

  it("keeps the filters untouched across a fetch", () => {
    const filtered = { ...initialState, filters: { category: "AI", query: "copilot" } };
    const next = reducer(filtered, {
      type: fetchCaseStudies.fulfilled.type,
      payload: [{ id: "a" }],
    });

    expect(next.filters).toEqual({ category: "AI", query: "copilot" });
  });
});
