import { store } from "../store";

describe("store", () => {
  it("registers both feature reducers with their initial state", () => {
    const state = store.getState();

    expect(state.caseStudies).toEqual({
      items: [],
      status: "idle",
      error: null,
      filters: { category: "All", query: "" },
    });
    expect(state.whyChooseUs.features).toHaveLength(4);
    expect(state.whyChooseUs.activeFeatureId).toBeNull();
  });
});
