import { render, screen, fireEvent } from "@testing-library/react";
import { StatusToggle } from "@/components/ui/StatusToggle";
import { Lock, Unlock } from "lucide-react";

const trueOption = {
  label: "Locked",
  icon: Lock,
  activeBg: "bg-amber-500",
  activeShadow: "shadow-amber-500/20",
  inactiveText: "text-amber-500/50",
};
const falseOption = {
  label: "Open",
  icon: Unlock,
  activeBg: "bg-green-500",
  activeShadow: "shadow-green-500/20",
  inactiveText: "text-green-500/50",
};

describe("StatusToggle", () => {
  it("renders both option labels", () => {
    render(
      <StatusToggle
        checked={false}
        onChange={vi.fn()}
        trueOption={trueOption}
        falseOption={falseOption}
      />
    );
    expect(screen.getByText("Locked")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("calls onChange when the container is clicked", () => {
    const onChange = vi.fn();
    const { container } = render(
      <StatusToggle
        checked={false}
        onChange={onChange}
        trueOption={trueOption}
        falseOption={falseOption}
      />
    );
    fireEvent.click(container.firstChild as HTMLElement);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("applies green background when unchecked (falseOption active)", () => {
    const { container } = render(
      <StatusToggle
        checked={false}
        onChange={vi.fn()}
        trueOption={trueOption}
        falseOption={falseOption}
      />
    );
    expect((container.firstChild as HTMLElement).className).toContain("bg-green-100");
  });

  it("applies amber background when checked (trueOption active)", () => {
    const { container } = render(
      <StatusToggle
        checked={true}
        onChange={vi.fn()}
        trueOption={trueOption}
        falseOption={falseOption}
      />
    );
    expect((container.firstChild as HTMLElement).className).toContain("bg-amber-100");
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatusToggle
        checked={false}
        onChange={vi.fn()}
        trueOption={trueOption}
        falseOption={falseOption}
        className="w-full"
      />
    );
    expect((container.firstChild as HTMLElement).className).toContain("w-full");
  });
});
