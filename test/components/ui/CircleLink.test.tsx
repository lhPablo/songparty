import { render, screen } from "@testing-library/react";
import { CircleLink } from "@/components/ui/CircleLink";
import { MicVocal } from "lucide-react";

describe("CircleLink", () => {
  it("renders as an anchor element", () => {
    render(<CircleLink icon={MicVocal} href="/test" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("sets the href attribute", () => {
    render(<CircleLink icon={MicVocal} href="/my-link" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/my-link");
  });

  it("renders the icon", () => {
    const { container } = render(<CircleLink icon={MicVocal} href="/" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<CircleLink icon={MicVocal} href="/" />);
    expect(screen.getByRole("link").className).toContain("bg-primary");
  });

  it("applies transparent variant", () => {
    render(<CircleLink icon={MicVocal} href="/" variant="transparent" />);
    expect(screen.getByRole("link").className).toContain("bg-gray-100");
  });

  it("applies sm size classes", () => {
    render(<CircleLink icon={MicVocal} href="/" size="sm" />);
    expect(screen.getByRole("link").className).toContain("size-7");
  });

  it("applies lg size classes", () => {
    render(<CircleLink icon={MicVocal} href="/" size="lg" />);
    expect(screen.getByRole("link").className).toContain("size-9");
  });

  it("applies custom className", () => {
    render(<CircleLink icon={MicVocal} href="/" className="extra-class" />);
    expect(screen.getByRole("link").className).toContain("extra-class");
  });
});
