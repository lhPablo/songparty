import { render, screen } from "@testing-library/react";
import { Chip } from "@/components/ui/Chip";
import { Star } from "lucide-react";

describe("Chip", () => {
  it("renders the label", () => {
    render(<Chip label="Active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies info variant by default", () => {
    const { container } = render(<Chip label="Info" />);
    expect(container.querySelector("span")?.className).toContain("bg-blue-500/10");
  });

  it("applies success variant", () => {
    const { container } = render(<Chip label="OK" variant="success" />);
    expect(container.querySelector("span")?.className).toContain("bg-green-500/10");
  });

  it("applies warning variant", () => {
    const { container } = render(<Chip label="Warn" variant="warning" />);
    expect(container.querySelector("span")?.className).toContain("bg-amber-500/10");
  });

  it("applies error variant", () => {
    const { container } = render(<Chip label="Error" variant="error" />);
    expect(container.querySelector("span")?.className).toContain("bg-red-500/10");
  });

  it("renders icon when provided", () => {
    const { container } = render(<Chip label="Stars" icon={Star} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders without icon when not provided", () => {
    const { container } = render(<Chip label="No icon" />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
