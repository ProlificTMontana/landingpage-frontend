import { createSelector } from "@reduxjs/toolkit";

export const selectCaseStudiesState = (state) => state.caseStudies;
export const selectAllCaseStudies = (state) => state.caseStudies.items;
export const selectCaseStudiesStatus = (state) => state.caseStudies.status;
export const selectCaseStudiesError = (state) => state.caseStudies.error;
export const selectCaseStudiesFilters = (state) => state.caseStudies.filters;
export const selectCategoryFilter = (state) => state.caseStudies.filters.category;
export const selectQueryFilter = (state) => state.caseStudies.filters.query;

export const selectFilteredCaseStudies = createSelector(
  [selectAllCaseStudies, selectCategoryFilter, selectQueryFilter],
  (items, category, query) => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      return (
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery)
      );
    });
  }
);

export const selectVisibleCount = createSelector(
  [selectFilteredCaseStudies],
  (items) => items.length
);

export const selectHasActiveFilters = createSelector(
  [selectCategoryFilter, selectQueryFilter],
  (category, query) => category !== "All" || query.trim() !== ""
);
