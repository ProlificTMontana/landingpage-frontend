import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCaseStudies as fetchCaseStudiesApi } from "./caseStudiesApi";

export const CASE_STUDY_CATEGORIES = ["All", "Web", "Mobile", "AI", "Blockchain"];

export const fetchCaseStudies = createAsyncThunk(
  "caseStudies/fetchCaseStudies",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await fetchCaseStudiesApi({ signal });
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    category: "All",
    query: "",
  },
};

const caseStudiesSlice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {
    categoryFilterChanged(state, action) {
      state.filters.category = action.payload;
    },
    queryFilterChanged(state, action) {
      state.filters.query = action.payload;
    },
    filtersCleared(state) {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Network failed";
      });
  },
});

export const { categoryFilterChanged, queryFilterChanged, filtersCleared } =
  caseStudiesSlice.actions;

export default caseStudiesSlice.reducer;
