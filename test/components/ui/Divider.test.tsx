import { render } from "@testing-library/react";
import { Divider } from "@/components/ui/Divider";

describe("Divider", () => {
  it("renders without crashing", () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(<Divider className="my-divider" />);
    expect((container.firstChild as HTMLElement).className).toContain("my-divider");
  });

  it("renders the horizontal line element", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector(".border-t")).toBeInTheDocument();
  });
});
