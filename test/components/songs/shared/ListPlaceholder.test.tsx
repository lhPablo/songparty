import { render, screen } from "@testing-library/react";
import { ListPlaceholder } from "@/components/songs/shared/ListPlaceholder";
import { Music } from "lucide-react";

describe("ListPlaceholder", () => {
  it("renders the icon", () => {
    const { container } = render(<ListPlaceholder icon={Music} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a string message", () => {
    render(<ListPlaceholder icon={Music} message="No songs found" />);
    expect(screen.getByText("No songs found")).toBeInTheDocument();
  });

  it("renders a React node message", () => {
    render(
      <ListPlaceholder
        icon={Music}
        message={<span data-testid="custom-msg">Custom message</span>}
      />
    );
    expect(screen.getByTestId("custom-msg")).toBeInTheDocument();
  });

  it("renders without message", () => {
    const { container } = render(<ListPlaceholder icon={Music} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
