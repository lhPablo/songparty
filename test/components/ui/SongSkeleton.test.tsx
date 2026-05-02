import { render } from "@testing-library/react";
import { SongSkeleton } from "@/components/ui/SongSkeleton";

describe("SongSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<SongSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies animation delay when provided", () => {
    const { container } = render(<SongSkeleton delay="150ms" />);
    expect((container.firstChild as HTMLElement).style.animationDelay).toBe("150ms");
  });

  it("defaults animation delay to 0ms", () => {
    const { container } = render(<SongSkeleton />);
    expect((container.firstChild as HTMLElement).style.animationDelay).toBe("0ms");
  });

  it("has animate-pulse class", () => {
    const { container } = render(<SongSkeleton />);
    expect((container.firstChild as HTMLElement).className).toContain("animate-pulse");
  });
});
