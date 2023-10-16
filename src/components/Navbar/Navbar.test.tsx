import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the navbar links correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const inboxLink = screen.getByText("Inbox");
    const filesLink = screen.getByText("Files");

    expect(inboxLink).toBeInTheDocument();
    expect(filesLink).toBeInTheDocument();
  });

  it("applies 'active' class to the active link", () => {
    render(
      <MemoryRouter initialEntries={["/inbox"]}>
        <Navbar />
      </MemoryRouter>
    );

    const inboxLink = screen.getByText("Inbox");
    const filesLink = screen.getByText("Files");

    expect(inboxLink).toHaveClass("active");
    expect(filesLink).not.toHaveClass("active");
  });
});
