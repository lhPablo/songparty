import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

vi.mock("next-intl", () => ({
  useLocale: vi.fn(() => "en"),
}));

vi.mock("@/actions/locale", () => ({
  setLocale: vi.fn(),
}));

import { useLocale } from "next-intl";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.mocked(useLocale).mockReturnValue("en");
  });

  it("renders the current locale short name", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("does not show the dropdown by default", () => {
    render(<LanguageSwitcher />);
    expect(screen.queryByText("Español")).not.toBeInTheDocument();
  });

  it("opens the dropdown when the button is clicked", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Español")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Français")).toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("English")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("shows a checkmark next to the current locale", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders ES short name for es locale", () => {
    vi.mocked(useLocale).mockReturnValue("es");
    render(<LanguageSwitcher />);
    expect(screen.getByText("ES")).toBeInTheDocument();
  });
});
