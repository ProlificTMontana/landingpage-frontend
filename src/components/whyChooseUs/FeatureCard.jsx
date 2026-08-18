import React from "react";
import { RiTeamLine, RiRocketLine, RiGroupLine, RiShieldCheckLine } from "react-icons/ri";

const ICONS = {
  users: RiTeamLine,
  rocket: RiRocketLine,
  team: RiGroupLine,
  shield: RiShieldCheckLine,
};

const ACCENTS = {
  purple: {
    border: "border-[#a855f7]/40",
    activeBorder: "border-[#a855f7]",
    hoverBorder: "hover:border-[#a855f7]",
    glow: "shadow-[0_0_35px_-10px_#a855f7]",
    icon: "text-[#c084fc]",
    iconBg: "from-[#a855f7]/25 to-transparent border-[#a855f7]/40",
    rule: "bg-[#c084fc]",
  },
  blue: {
    border: "border-[#3F5EFB]/40",
    activeBorder: "border-[#3F5EFB]",
    hoverBorder: "hover:border-[#3F5EFB]",
    glow: "shadow-[0_0_35px_-10px_#3F5EFB]",
    icon: "text-[#6f8bff]",
    iconBg: "from-[#3F5EFB]/25 to-transparent border-[#3F5EFB]/40",
    rule: "bg-[#6f8bff]",
  },
  teal: {
    border: "border-[#2dd4bf]/40",
    activeBorder: "border-[#2dd4bf]",
    hoverBorder: "hover:border-[#2dd4bf]",
    glow: "shadow-[0_0_35px_-10px_#2dd4bf]",
    icon: "text-[#5eead4]",
    iconBg: "from-[#2dd4bf]/25 to-transparent border-[#2dd4bf]/40",
    rule: "bg-[#5eead4]",
  },
  pink: {
    border: "border-[#FC466B]/40",
    activeBorder: "border-[#FC466B]",
    hoverBorder: "hover:border-[#FC466B]",
    glow: "shadow-[0_0_35px_-10px_#FC466B]",
    icon: "text-[#ff7d9c]",
    iconBg: "from-[#FC466B]/25 to-transparent border-[#FC466B]/40",
    rule: "bg-[#ff7d9c]",
  },
};

const FeatureCard = ({ title, desc, icon, accent = "purple", isActive, onSelect }) => {
  const Icon = ICONS[icon] ?? RiTeamLine;
  const styles = ACCENTS[accent] ?? ACCENTS.purple;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`flex h-full w-full flex-col items-center rounded-2xl border bg-[#0b0726]/80 px-6 py-10 text-center duration-300 focus:outline-none focus:ring-2 focus:ring-[#3F5EFB] ${
        isActive
          ? `${styles.activeBorder} ${styles.glow} -translate-y-1`
          : `${styles.border} hover:-translate-y-1 ${styles.hoverBorder}`
      }`}
    >
      <span
        className={`flex h-20 w-20 items-center justify-center rounded-2xl border bg-gradient-to-br ${styles.iconBg}`}
      >
        <Icon className={`h-9 w-9 ${styles.icon}`} />
      </span>

      <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
      <span className={`mt-3 block h-[3px] w-10 rounded-full ${styles.rule}`} />
      <p className="mt-5 text-sm leading-relaxed text-gray-400">{desc}</p>
    </button>
  );
};

export default FeatureCard;
