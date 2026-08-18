import { createSlice } from "@reduxjs/toolkit";

export const WHY_CHOOSE_US_FEATURES = [
  {
    id: "senior-engineers",
    title: "Senior Engineers",
    desc: "Top 5% vetted developers with real production experience",
    icon: "users",
    accent: "purple",
  },
  {
    id: "fast-delivery",
    title: "Fast Delivery",
    desc: "Rapid execution with optimized workflows",
    icon: "rocket",
    accent: "blue",
  },
  {
    id: "scalable-teams",
    title: "Scalable Teams",
    desc: "Easily scale teams based on project needs",
    icon: "team",
    accent: "teal",
  },
  {
    id: "secure-by-design",
    title: "Secure by Design",
    desc: "Security-first architecture and implementation",
    icon: "shield",
    accent: "pink",
  },
];

const initialState = {
  features: WHY_CHOOSE_US_FEATURES,
  activeFeatureId: null,
};

const whyChooseUsSlice = createSlice({
  name: "whyChooseUs",
  initialState,
  reducers: {
    activeFeatureToggled(state, action) {
      state.activeFeatureId =
        state.activeFeatureId === action.payload ? null : action.payload;
    },
  },
});

export const { activeFeatureToggled } = whyChooseUsSlice.actions;

export const selectFeatures = (state) => state.whyChooseUs.features;
export const selectActiveFeatureId = (state) => state.whyChooseUs.activeFeatureId;

export default whyChooseUsSlice.reducer;
