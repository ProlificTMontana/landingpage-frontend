import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import whyChooseUsReducer from "../../../features/whyChooseUs/whyChooseUsSlice";
import WhyChooseUs from "../WhyChooseUs";

const renderSection = () => {
  const store = configureStore({ reducer: { whyChooseUs: whyChooseUsReducer } });
  return { store, ...render(<Provider store={store}><WhyChooseUs /></Provider>) };
};

describe("WhyChooseUs", () => {
  it("renders a card for every feature held in the slice", () => {
    renderSection();

    ["Senior Engineers", "Fast Delivery", "Scalable Teams", "Secure by Design"].forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  it("renders the heading and the call to action", () => {
    renderSection();

    expect(screen.getByRole("heading", { name: /why companies choose us/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start your project/i })).toHaveAttribute("href", "#contact");
  });

  it("marks a card active in Redux when it is clicked, and clears it when clicked again", async () => {
    const { store } = renderSection();
    const card = screen.getByRole("button", { name: /fast delivery/i });

    await userEvent.click(card);
    expect(store.getState().whyChooseUs.activeFeatureId).toBe("fast-delivery");
    expect(card).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(card);
    expect(store.getState().whyChooseUs.activeFeatureId).toBeNull();
    expect(card).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps only one card active at a time", async () => {
    renderSection();

    await userEvent.click(screen.getByRole("button", { name: /senior engineers/i }));
    await userEvent.click(screen.getByRole("button", { name: /secure by design/i }));

    expect(screen.getByRole("button", { name: /senior engineers/i })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /secure by design/i })).toHaveAttribute("aria-pressed", "true");
  });
});
