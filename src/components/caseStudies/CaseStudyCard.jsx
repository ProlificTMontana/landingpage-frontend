import React from "react";

const categoryStyles = {
  Web: "from-[#3F5EFB]/30 to-[#3F5EFB]/10 text-[#9db0ff]",
  Mobile: "from-[#FC466B]/30 to-[#FC466B]/10 text-[#ff9bb2]",
  AI: "from-[#6318F1]/30 to-[#6318F1]/10 text-[#c0a3ff]",
  Blockchain: "from-[#22d3ee]/30 to-[#22d3ee]/10 text-[#8beaf7]",
};

const CaseStudyCard = ({ title, category, summary, year }) => (
  <article className="flex h-full flex-col rounded-2xl bg-gradient-to-l bg-[#110D2E] from-[#110D2E] via-[#110D2E] to-[#fc466a4a] p-6 shadow-lg ring-1 ring-white/10 duration-200 hover:-translate-y-1 hover:ring-[#3F5EFB]/60">
    <div className="flex items-center justify-between gap-x-3">
      <span
        className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold ${
          categoryStyles[category] ?? categoryStyles.Web
        }`}
      >
        {category}
      </span>
      <span className="text-xs text-gray-400">{year}</span>
    </div>

    <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-400">{summary}</p>

    <hr className="my-5 h-px border-0 bg-gradient-to-r from-gray-500 to-gray-800" />

    <button
      type="button"
      className="self-start rounded-full bg-[#6318F1] px-5 py-2 text-sm font-medium text-white duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:shadow-lg"
    >
      View Case Study
    </button>
  </article>
);

export default CaseStudyCard;
