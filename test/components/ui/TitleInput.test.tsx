import { render, screen, fireEvent } from "@testing-library/react";
import { TitleInput } from "@/components/ui/TitleInput";

describe("TitleInput", () => {
  it("renders an input element", () => {
    render(<TitleInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with provided value", () => {
    render(<TitleInput value="My Playlist" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("My Playlist")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<TitleInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New Title" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders placeholder text", () => {
    render(<TitleInput placeholder="Enter name..." />);
    expect(screen.getByPlaceholderText("Enter name...")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<TitleInput className="extra" />);
    expect(screen.getByRole("textbox").className).toContain("extra");
  });
});
