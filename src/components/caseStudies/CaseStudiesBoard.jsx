import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CASE_STUDY_CATEGORIES,
  categoryFilterChanged,
  fetchCaseStudies,
  filtersCleared,
  queryFilterChanged,
} from "../../features/caseStudies/caseStudiesSlice";
import {
  selectCaseStudiesError,
  selectCaseStudiesStatus,
  selectCategoryFilter,
  selectFilteredCaseStudies,
  selectQueryFilter,
  selectVisibleCount,
} from "../../features/caseStudies/caseStudiesSelectors";
import FilterChip from "./FilterChip";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudiesSkeleton from "./CaseStudiesSkeleton";
import CaseStudiesError from "./CaseStudiesError";
import CaseStudiesEmpty from "./CaseStudiesEmpty";

const CaseStudiesBoard = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCaseStudiesStatus);
  const error = useSelector(selectCaseStudiesError);
  const category = useSelector(selectCategoryFilter);
  const query = useSelector(selectQueryFilter);
  const caseStudies = useSelector(selectFilteredCaseStudies);
  const visibleCount = useSelector(selectVisibleCount);

  useEffect(() => {
    const promise = dispatch(fetchCaseStudies());
    return () => promise.abort();
  }, [dispatch]);

  const isLoading = status === "loading" || status === "idle";

  return (
    <section id="case-study" className="container mx-auto px-4 py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-y-3 text-center">
          <h2 className="text-3xl font-semibold text-white">Case Studies</h2>
          <p className="max-w-2xl text-gray-400">
            A selection of products we have designed, built and shipped across web,
            mobile, AI and blockchain.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {CASE_STUDY_CATEGORIES.map((option) => (
              <FilterChip
                key={option}
                label={option}
                isActive={category === option}
                onClick={() => dispatch(categoryFilterChanged(option))}
              />
            ))}
          </div>

          <div className="w-full lg:w-72">
            <label htmlFor="case-study-search" className="sr-only">
              Search case studies
            </label>
            <input
              id="case-study-search"
              type="search"
              value={query}
              onChange={(event) => dispatch(queryFilterChanged(event.target.value))}
              placeholder="Search case studies..."
              className="min-h-[44px] w-full rounded-full border border-white/15 bg-[#110D2E] px-5 py-2 text-white placeholder-gray-500 duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3F5EFB]"
            />
          </div>
        </div>

        {status === "succeeded" && (
          <p className="mt-4 text-sm text-gray-400" aria-live="polite">
            Showing {visibleCount} {visibleCount === 1 ? "case study" : "case studies"}
          </p>
        )}

        <div className="mt-8">
          {isLoading && <CaseStudiesSkeleton />}

          {status === "failed" && (
            <CaseStudiesError
              message={error ?? "Network failed"}
              onRetry={() => dispatch(fetchCaseStudies())}
            />
          )}

          {status === "succeeded" && visibleCount === 0 && (
            <CaseStudiesEmpty onClearFilters={() => dispatch(filtersCleared())} />
          )}

          {status === "succeeded" && visibleCount > 0 && (
            <div
              key={`${category}-${query}`}
              className="grid animate-in grid-cols-1 gap-6 fade-in duration-500 md:grid-cols-2 lg:grid-cols-3"
            >
              {caseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.id} {...caseStudy} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesBoard;
