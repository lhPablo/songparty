import { render, screen } from "@testing-library/react";
import { NavLink } from "@/components/ui/NavLink";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={String(href)} className={className} {...props}>
      {children}
    </a>
  ),
}));

import { usePathname } from "next/navigation";

describe("NavLink", () => {
  it("renders children", () => {
    render(<NavLink href="/about">About</NavLink>);
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders as an anchor with the correct href", () => {
    render(<NavLink href="/about">About</NavLink>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
  });

  it("applies active styles when pathname matches href", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    render(<NavLink href="/about">About</NavLink>);
    expect(screen.getByRole("link").className).toContain("text-primary");
  });

  it("does not apply active styles when pathname does not match href", () => {
    vi.mocked(usePathname).mockReturnValue("/home");
    render(<NavLink href="/about">About</NavLink>);
    expect(screen.getByRole("link").className).not.toContain("font-bold");
  });

  it("strips query params when comparing pathname", () => {
    vi.mocked(usePathname).mockReturnValue("/playlist/123");
    render(<NavLink href="/playlist/123?token=abc">Playlist</NavLink>);
    expect(screen.getByRole("link").className).toContain("text-primary");
  });
});
