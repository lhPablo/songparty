import { render, screen, fireEvent } from "@testing-library/react";
import { SongItemActions } from "@/components/songs/shared/SongItemActions";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("SongItemActions", () => {
  const defaultProps = {
    lyricsUrl: "https://genius.com/song",
    isSelected: false,
    canEdit: true,
    onToggle: vi.fn(),
  };

  it("renders the lyrics link", () => {
    render(<SongItemActions {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://genius.com/song"
    );
  });

  it("opens lyrics link in a new tab", () => {
    render(<SongItemActions {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("renders the toggle button when canEdit is true", () => {
    render(<SongItemActions {...defaultProps} canEdit={true} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("does not render the toggle button when canEdit is false", () => {
    render(<SongItemActions {...defaultProps} canEdit={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onToggle when the toggle button is clicked", () => {
    const onToggle = vi.fn();
    render(<SongItemActions {...defaultProps} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows add button (primary variant) when not selected", () => {
    render(<SongItemActions {...defaultProps} isSelected={false} />);
    expect(screen.getByRole("button").className).toContain("bg-primary");
  });

  it("shows remove button (green variant) when selected", () => {
    render(<SongItemActions {...defaultProps} isSelected={true} />);
    expect(screen.getByRole("button").className).toContain("bg-green-500");
  });
});
