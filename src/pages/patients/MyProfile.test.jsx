import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import PatientProfile from "./MyProfile";
import { AppContext } from "../../context/AppContext";

// ❗️تجهيز mock لطلب Axios
vi.mock("axios");

const mockProfileData = {
  success: true,
  data: {
    fullName: "John Doe",
    userName: "johndoe",
    email: "john@example.com",
    phoneNumbers: ["123456789"],
    profileImagePath: null,
  },
};

const renderPatientProfile = () => {
  const mockContext = {
    backendUrl: "http://localhost:3000",
    token: "fake-token",
  };

  return render(
    <AppContext.Provider value={mockContext}>
      <BrowserRouter>
        <PatientProfile />
      </BrowserRouter>
    </AppContext.Provider>
  );
};

describe("PatientProfile", () => {
  it("renders the profile heading after data loads", async () => {
    axios.get.mockResolvedValueOnce({ data: mockProfileData });

    renderPatientProfile();

    // ننتظر لحد ما البيانات تظهر بعد التحميل
    await waitFor(() =>
      expect(screen.getByText("Your Profile")).toBeInTheDocument()
    );

    // نتحقق من اسم المستخدم ظهر
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email:", { exact: false })).toBeInTheDocument();
  });
});
