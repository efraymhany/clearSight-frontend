import React from "react";

import { describe, it, expect, vi } from "vitest"; // ✅ لازم تستورد expect
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; // ✅ ده بيضيف matcher زي toBeInTheDocument

// Mock useContext داخل React قبل استيراد Login
vi.mock("react", async (importOriginal) => {
  const React = await importOriginal();
  return {
    ...React,
    useContext: () => ({
      backendUrl: "http://localhost:5000",
      login: vi.fn(),
      setLoading: vi.fn(),
    }),
  };
});

// استيراد Login بعد عمل mock
import Login from "./Login";

describe("Login component without AppContext", () => {
  it("renders email and password inputs", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("renders the Login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
