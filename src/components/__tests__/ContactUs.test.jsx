import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactUs from "../ContactUs";

// The mock submit waits ~600ms before confirming; fake timers keep that
// deterministic and let the suite run without real waits.
let user;

beforeEach(() => {
  jest.useFakeTimers();
  user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<ContactUs />);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const field = (label) => screen.getByLabelText(label);

const fill = async (label, value) => {
  await user.clear(field(label));
  await user.type(field(label), value);
};

const fillValidForm = async () => {
  await fill(/full name/i, "Ada Lovelace");
  await fill(/your email/i, "ada@example.com");
  await fill(/message/i, "We would like to discuss a new platform build.");
};

const submitButton = () => screen.getByRole("button", { name: /send messages|sending/i });

const settleSubmit = async () => {
  await act(async () => {
    jest.advanceTimersByTime(600);
  });
};

describe("ContactUs validation", () => {
  it("disables the submit button until every required field is valid", async () => {
    expect(submitButton()).toBeDisabled();

    await fillValidForm();
    expect(submitButton()).toBeEnabled();
  });

  it("reports each required field once it has been touched", async () => {
    await user.click(field(/full name/i));
    await user.tab();
    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();

    await user.click(field(/message/i));
    await user.tab();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
  });

  it("rejects a malformed email address", async () => {
    await fill(/your email/i, "not-an-email");
    await user.tab();

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(field(/your email/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("clears the error once the email becomes valid", async () => {
    await fill(/your email/i, "not-an-email");
    await user.tab();
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();

    await fill(/your email/i, "ada@example.com");
    expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
    expect(field(/your email/i)).toHaveAttribute("aria-invalid", "false");
  });

  it("blocks an invalid submit and surfaces every error at once", async () => {
    // The button is disabled, so submit the form directly the way Enter would.
    fireEvent.submit(submitButton().closest("form"));

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a sending state while the mock submit is in flight", async () => {
    await fillValidForm();
    await user.click(submitButton());

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    await settleSubmit();
  });

  it("confirms a valid submit and resets the fields", async () => {
    await fillValidForm();
    await user.click(submitButton());
    await settleSubmit();

    expect(screen.getByRole("status")).toHaveTextContent(/your message has been sent/i);
    expect(field(/full name/i)).toHaveValue("");
    expect(field(/your email/i)).toHaveValue("");
    expect(field(/message/i)).toHaveValue("");
  });

  it("hides the confirmation again as soon as the user edits the form", async () => {
    await fillValidForm();
    await user.click(submitButton());
    await settleSubmit();
    expect(screen.getByRole("status")).toBeInTheDocument();

    await user.type(field(/full name/i), "A");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
