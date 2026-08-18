import React from "react";

const FilterChip = ({ label, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={isActive}
    className={`min-h-[40px] rounded-full px-4 py-2 text-sm font-medium duration-200 focus:outline-none focus:ring-2 focus:ring-[#3F5EFB] ${
      isActive
        ? "bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white shadow-lg"
        : "border border-white/15 text-gray-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:text-white"
    }`}
  >
    {label}
  </button>
);

export default FilterChip;
