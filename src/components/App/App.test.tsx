import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";

test("renders Navbar", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const navbarElement = screen.getByTestId("navbar");
  expect(navbarElement).toBeInTheDocument();
});

test("renders Inbox when path is /inbox", () => {
  render(
    <MemoryRouter initialEntries={["/inbox"]}>
      <App />
    </MemoryRouter>
  );

  const inboxElement = screen.getByTestId("inbox");
  expect(inboxElement).toBeInTheDocument();
});

test("renders Files when path is /files", () => {
  render(
    <MemoryRouter initialEntries={["/files"]}>
      <App />
    </MemoryRouter>
  );

  const filesElement = screen.getByTestId("files");
  expect(filesElement).toBeInTheDocument();
});

test('renders "page not exist" when path is not recognized', () => {
  render(
    <MemoryRouter initialEntries={["/unknown"]}>
      <App />
    </MemoryRouter>
  );

  const notExistText = screen.getByText("page not exist");
  expect(notExistText).toBeInTheDocument();
});
