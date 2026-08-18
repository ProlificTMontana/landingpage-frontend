import { configureStore } from "@reduxjs/toolkit";
import caseStudiesReducer from "../features/caseStudies/caseStudiesSlice";
import whyChooseUsReducer from "../features/whyChooseUs/whyChooseUsSlice";

export const store = configureStore({
  reducer: {
    caseStudies: caseStudiesReducer,
    whyChooseUs: whyChooseUsReducer,
  },
});

export default store;
