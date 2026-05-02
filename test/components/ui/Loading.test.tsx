import { render, screen } from "@testing-library/react";
import { Loading } from "@/components/ui/Loading";

describe("Loading", () => {
  it("renders three skeleton items", () => {
    const { container } = render(<Loading />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons).toHaveLength(3);
  });

  it("renders inside a flex container", () => {
    const { container } = render(<Loading />);
    expect((container.firstChild as HTMLElement).className).toContain("flex");
  });
});
