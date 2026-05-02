import { render, screen, fireEvent } from "@testing-library/react";
import { PlaylistTitleEdit } from "@/components/songs/playlist/title/PlaylistTitleEdit";
import { createRef } from "react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("PlaylistTitleEdit", () => {
  const defaultProps = {
    tempName: "Test Playlist",
    setTempName: vi.fn(),
    handleSave: vi.fn(),
    handleKeyDown: vi.fn(),
    inputRef: createRef<HTMLInputElement>(),
  };

  it("renders the input with current value", () => {
    render(<PlaylistTitleEdit {...defaultProps} />);
    expect(screen.getByDisplayValue("Test Playlist")).toBeInTheDocument();
  });

  it("calls setTempName when input changes", () => {
    const setTempName = vi.fn();
    render(<PlaylistTitleEdit {...defaultProps} setTempName={setTempName} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New Name" },
    });
    expect(setTempName).toHaveBeenCalledWith("New Name");
  });

  it("calls handleSave when input loses focus", () => {
    const handleSave = vi.fn();
    render(<PlaylistTitleEdit {...defaultProps} handleSave={handleSave} />);
    fireEvent.blur(screen.getByRole("textbox"));
    expect(handleSave).toHaveBeenCalledTimes(1);
  });

  it("calls handleKeyDown on key press", () => {
    const handleKeyDown = vi.fn();
    render(<PlaylistTitleEdit {...defaultProps} handleKeyDown={handleKeyDown} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("renders the save button", () => {
    render(<PlaylistTitleEdit {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls handleSave when save button is mouse-downed", () => {
    const handleSave = vi.fn();
    render(<PlaylistTitleEdit {...defaultProps} handleSave={handleSave} />);
    fireEvent.mouseDown(screen.getByRole("button"));
    expect(handleSave).toHaveBeenCalledTimes(1);
  });
});
