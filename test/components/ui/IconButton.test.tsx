import { render, screen, fireEvent } from "@testing-library/react";
import { IconButton } from "@/components/ui/IconButton";
import { Settings } from "lucide-react";

describe("IconButton", () => {
  it("renders as a button", () => {
    render(<IconButton icon={Settings} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    const { container } = render(<IconButton icon={Settings} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<IconButton icon={Settings} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<IconButton icon={Settings} className="my-icon-btn" />);
    expect(screen.getByRole("button").className).toContain("my-icon-btn");
  });

  it("applies custom iconClassName to the svg", () => {
    const { container } = render(<IconButton icon={Settings} iconClassName="spin" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain("spin");
  });
});
