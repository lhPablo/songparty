import { render, screen, fireEvent } from "@testing-library/react";
import { CircleButton } from "@/components/ui/CircleButton";
import { Plus, Trash2 } from "lucide-react";

describe("CircleButton", () => {
  it("renders the icon", () => {
    const { container } = render(<CircleButton icon={Plus} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<CircleButton icon={Plus} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary variant by default", () => {
    render(<CircleButton icon={Plus} />);
    expect(screen.getByRole("button").className).toContain("bg-primary");
  });

  it("applies destructive variant", () => {
    render(<CircleButton icon={Plus} variant="destructive" />);
    expect(screen.getByRole("button").className).toContain("bg-red-500");
  });

  it("applies successful variant", () => {
    render(<CircleButton icon={Plus} variant="successful" />);
    expect(screen.getByRole("button").className).toContain("bg-green-500");
  });

  it("applies sm size classes", () => {
    render(<CircleButton icon={Plus} size="sm" />);
    expect(screen.getByRole("button").className).toContain("size-7");
  });

  it("applies lg size classes", () => {
    render(<CircleButton icon={Plus} size="lg" />);
    expect(screen.getByRole("button").className).toContain("size-9");
  });

  it("swaps to hoverIcon on mouse enter", () => {
    const { container } = render(
      <CircleButton icon={Plus} hoverIcon={Trash2} />
    );
    const button = screen.getByRole("button");
    const initialSvg = container.querySelector("svg")?.outerHTML;
    fireEvent.mouseEnter(button);
    const hoveredSvg = container.querySelector("svg")?.outerHTML;
    expect(hoveredSvg).not.toBe(initialSvg);
  });

  it("restores original icon on mouse leave", () => {
    const { container } = render(
      <CircleButton icon={Plus} hoverIcon={Trash2} />
    );
    const button = screen.getByRole("button");
    const initialSvg = container.querySelector("svg")?.outerHTML;
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    expect(container.querySelector("svg")?.outerHTML).toBe(initialSvg);
  });

  it("applies custom className", () => {
    render(<CircleButton icon={Plus} className="my-custom" />);
    expect(screen.getByRole("button").className).toContain("my-custom");
  });
});
