import React from "react";

const CaseStudiesError = ({ message, onRetry }) => (
  <div
    role="alert"
    className="mx-auto max-w-lg rounded-2xl border border-[#FC466B]/40 bg-[#110D2E] p-8 text-center"
  >
    <h3 className="text-lg font-semibold text-white">We couldn't load the case studies</h3>
    <p className="mt-2 text-sm text-gray-400">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 min-h-[44px] rounded-full bg-[#6318F1] px-6 py-2 font-medium text-white duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:shadow-lg"
    >
      Retry
    </button>
  </div>
);

export default CaseStudiesError;
