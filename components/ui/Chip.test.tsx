import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Chip } from "./Chip";
import { Info } from "lucide-react";

describe("Chip Component", () => {
  it("renders the label correctly", () => {
    render(<Chip label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { container } = render(<Chip label="Success" variant="success" />);
    const chip = container.firstChild as HTMLElement;
    expect(chip.className).toContain("bg-green-500/10");
  });
});
