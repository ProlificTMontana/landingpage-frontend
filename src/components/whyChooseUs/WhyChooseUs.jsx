import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeFeatureToggled,
  selectActiveFeatureId,
  selectFeatures,
} from "../../features/whyChooseUs/whyChooseUsSlice";
import FeatureCard from "./FeatureCard";

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const features = useSelector(selectFeatures);
  const activeFeatureId = useSelector(selectActiveFeatureId);

  return (
    <section id="why-choose-us" className="container mx-auto px-4 py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-[#a855f7]/50 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-white">
            WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Why Companies{" "}
            <span className="bg-gradient-to-r from-[#a855f7] via-[#3F5EFB] to-[#2dd4bf] bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-gray-400">
            We deliver scalable, secure, and future-ready solutions.
          </p>

          <span className="mt-6 block h-[3px] w-32 rounded-full bg-gradient-to-r from-[#a855f7] to-[#2dd4bf]" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              isActive={activeFeatureId === feature.id}
              onSelect={() => dispatch(activeFeatureToggled(feature.id))}
            />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center">
          <a
            href="#contact"
            className="inline-flex min-h-[48px] items-center gap-x-3 rounded-xl bg-gradient-to-r from-[#6318F1] to-[#FC466B] px-8 py-3 text-lg font-semibold text-white duration-200 hover:scale-105 hover:shadow-lg"
          >
            Start Your Project
            <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="mt-4 text-sm text-gray-400">
            Let's build something amazing together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
