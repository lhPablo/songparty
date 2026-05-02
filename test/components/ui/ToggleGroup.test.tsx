import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { Music, List } from "lucide-react";

const options = [
  { value: "music", label: "Music", icon: Music },
  { value: "list", label: "List", icon: List },
];

describe("ToggleGroup", () => {
  it("renders all option labels", () => {
    render(
      <ToggleGroup name="view" options={options} value="music" onChange={vi.fn()} />
    );
    expect(screen.getByText("Music")).toBeInTheDocument();
    expect(screen.getByText("List")).toBeInTheDocument();
  });

  it("checks the radio that matches the value prop", () => {
    render(
      <ToggleGroup name="view" options={options} value="list" onChange={vi.fn()} />
    );
    const listRadio = screen.getByDisplayValue("list");
    expect(listRadio).toBeChecked();
  });

  it("does not check unselected radio", () => {
    render(
      <ToggleGroup name="view" options={options} value="list" onChange={vi.fn()} />
    );
    expect(screen.getByDisplayValue("music")).not.toBeChecked();
  });

  it("calls onChange with the correct value when an option is clicked", () => {
    const onChange = vi.fn();
    render(
      <ToggleGroup name="view" options={options} value="music" onChange={onChange} />
    );
    fireEvent.click(screen.getByText("List"));
    expect(onChange).toHaveBeenCalledWith("list");
  });

  it("renders icons when provided", () => {
    const { container } = render(
      <ToggleGroup name="view" options={options} value="music" onChange={vi.fn()} />
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(2);
  });

  it("applies active styles to selected label", () => {
    render(
      <ToggleGroup name="view" options={options} value="music" onChange={vi.fn()} />
    );
    const musicLabel = screen.getByText("Music").closest("label");
    expect(musicLabel?.className).toContain("bg-primary");
  });

  it("does not apply active styles to unselected label", () => {
    render(
      <ToggleGroup name="view" options={options} value="music" onChange={vi.fn()} />
    );
    const listLabel = screen.getByText("List").closest("label");
    expect(listLabel?.className).not.toContain("bg-primary");
  });
});
