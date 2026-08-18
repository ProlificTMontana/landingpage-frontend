import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import caseStudiesReducer from "../../../features/caseStudies/caseStudiesSlice";
import { fetchCaseStudies } from "../../../features/caseStudies/caseStudiesApi";
import CaseStudiesBoard from "../CaseStudiesBoard";

jest.mock("../../../features/caseStudies/caseStudiesApi");

const items = [
  { id: "a", title: "Telehealth Booking", category: "Web", summary: "Appointments for clinics", year: 2024 },
  { id: "b", title: "Fitness Companion", category: "Mobile", summary: "Offline workout sync", year: 2023 },
  { id: "c", title: "Support Copilot", category: "AI", summary: "Drafts replies for agents", year: 2025 },
];

const renderBoard = async () => {
  const store = configureStore({ reducer: { caseStudies: caseStudiesReducer } });
  let utils;

  // Wrapped in act so the mount-time thunk settles inside an act scope.
  await act(async () => {
    utils = render(
      <Provider store={store}>
        <CaseStudiesBoard />
      </Provider>
    );
  });

  return { store, ...utils };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CaseStudiesBoard", () => {
  it("shows animated skeletons while the request is in flight", async () => {
    let resolveRequest;
    fetchCaseStudies.mockReturnValue(new Promise((resolve) => { resolveRequest = resolve; }));

    const { container } = await renderBoard();
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
    expect(screen.queryByText("Telehealth Booking")).not.toBeInTheDocument();

    await act(async () => resolveRequest(items));
    expect(screen.getByText("Telehealth Booking")).toBeInTheDocument();
  });

  it("fetches on mount and renders a card per case study", async () => {
    fetchCaseStudies.mockResolvedValue(items);
    await renderBoard();

    expect(screen.getByText("Telehealth Booking")).toBeInTheDocument();
    expect(fetchCaseStudies).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole("button", { name: /view case study/i })).toHaveLength(3);
    expect(screen.getByText(/showing 3 case studies/i)).toBeInTheDocument();
  });

  it("filters by category and marks the active chip", async () => {
    fetchCaseStudies.mockResolvedValue(items);
    await renderBoard();

    const chip = screen.getByRole("button", { name: "AI" });
    await userEvent.click(chip);

    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Support Copilot")).toBeInTheDocument();
    expect(screen.queryByText("Telehealth Booking")).not.toBeInTheDocument();
    expect(screen.getByText(/showing 1 case study$/i)).toBeInTheDocument();
  });

  it("searches title and summary case-insensitively through Redux", async () => {
    fetchCaseStudies.mockResolvedValue(items);
    const { store } = await renderBoard();

    await userEvent.type(screen.getByRole("searchbox"), "OFFLINE");

    expect(store.getState().caseStudies.filters.query).toBe("OFFLINE");
    expect(screen.getByText("Fitness Companion")).toBeInTheDocument();
    expect(screen.queryByText("Support Copilot")).not.toBeInTheDocument();
  });

  it("shows the empty state and clears the filters again", async () => {
    fetchCaseStudies.mockResolvedValue(items);
    await renderBoard();

    await userEvent.type(screen.getByRole("searchbox"), "quantum submarine");
    expect(screen.getByText(/no case studies match your filters/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /clear filters/i }));
    expect(screen.getByText("Telehealth Booking")).toBeInTheDocument();
  });

  it("shows the error state and refetches when Retry is pressed", async () => {
    fetchCaseStudies.mockRejectedValueOnce(new Error("Network failed"));
    await renderBoard();

    const alert = screen.getByRole("alert");
    expect(within(alert).getByText("Network failed")).toBeInTheDocument();

    fetchCaseStudies.mockResolvedValueOnce(items);
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));

    expect(await screen.findByText("Telehealth Booking")).toBeInTheDocument();
    expect(fetchCaseStudies).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("aborts the in-flight request when unmounted", async () => {
    let capturedSignal;
    fetchCaseStudies.mockImplementation(({ signal } = {}) => {
      capturedSignal = signal;
      return new Promise(() => {});
    });

    const { unmount } = await renderBoard();
    expect(capturedSignal.aborted).toBe(false);

    unmount();
    expect(capturedSignal.aborted).toBe(true);
  });
});
