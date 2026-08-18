import React from "react";

const CaseStudiesEmpty = ({ onClearFilters }) => (
  <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-[#110D2E] p-8 text-center">
    <h3 className="text-lg font-semibold text-white">No case studies match your filters</h3>
    <p className="mt-2 text-sm text-gray-400">
      Try a different category, or search for another keyword.
    </p>
    <button
      type="button"
      onClick={onClearFilters}
      className="mt-6 min-h-[44px] rounded-full border border-white/20 px-6 py-2 font-medium text-white duration-200 hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40"
    >
      Clear filters
    </button>
  </div>
);

export default CaseStudiesEmpty;
