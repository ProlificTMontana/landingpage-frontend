import reducer, {
  activeFeatureToggled,
  selectFeatures,
  selectActiveFeatureId,
  WHY_CHOOSE_US_FEATURES,
} from "../whyChooseUsSlice";

describe("whyChooseUs slice", () => {
  it("seeds the four features with no active card", () => {
    const state = reducer(undefined, { type: "@@INIT" });

    expect(state.features).toHaveLength(4);
    expect(state.activeFeatureId).toBeNull();
  });

  it("exposes every feature with the fields the card needs", () => {
    WHY_CHOOSE_US_FEATURES.forEach((feature) => {
      expect(feature).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          desc: expect.any(String),
        })
      );
    });
  });

  it("activates a card, then deactivates it when toggled again", () => {
    let state = reducer(undefined, { type: "@@INIT" });

    state = reducer(state, activeFeatureToggled("fast-delivery"));
    expect(state.activeFeatureId).toBe("fast-delivery");

    state = reducer(state, activeFeatureToggled("fast-delivery"));
    expect(state.activeFeatureId).toBeNull();
  });

  it("switches straight from one card to another", () => {
    let state = reducer(undefined, activeFeatureToggled("senior-engineers"));
    state = reducer(state, activeFeatureToggled("secure-by-design"));

    expect(state.activeFeatureId).toBe("secure-by-design");
  });

  it("reads through its selectors", () => {
    const state = { whyChooseUs: reducer(undefined, activeFeatureToggled("scalable-teams")) };

    expect(selectFeatures(state)).toHaveLength(4);
    expect(selectActiveFeatureId(state)).toBe("scalable-teams");
  });
});
