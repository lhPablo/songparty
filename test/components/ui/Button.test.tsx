import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button").className).toContain("bg-primary");
  });

  it("applies secondary variant", () => {
    render(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole("button").className).toContain("bg-primary/10");
  });

  it("applies destructive variant", () => {
    render(<Button variant="destructive">Test</Button>);
    expect(screen.getByRole("button").className).toContain("bg-red-500/10");
  });

  it("applies transparent variant", () => {
    render(<Button variant="transparent">Test</Button>);
    expect(screen.getByRole("button").className).toContain("text-gray-400");
  });

  it("is disabled when loading prop is set", () => {
    render(<Button loading>Test</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Test</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders icon when provided", () => {
    const { container } = render(<Button icon={Star}>Test</Button>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick handler", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole("button").className).toContain("custom-class");
  });
});
