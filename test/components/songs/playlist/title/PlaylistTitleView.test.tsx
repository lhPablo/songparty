import { render, screen, fireEvent } from "@testing-library/react";
import { PlaylistTitleView } from "@/components/songs/playlist/title/PlaylistTitleView";

describe("PlaylistTitleView", () => {
  it("renders the playlist name", () => {
    render(
      <PlaylistTitleView
        playlistName="My Party"
        isOwner={false}
        startEditing={vi.fn()}
      />
    );
    expect(screen.getByText("My Party")).toBeInTheDocument();
  });

  it("renders the edit icon when isOwner is true", () => {
    const { container } = render(
      <PlaylistTitleView
        playlistName="My Party"
        isOwner={true}
        startEditing={vi.fn()}
      />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not render the edit icon when isOwner is false", () => {
    const { container } = render(
      <PlaylistTitleView
        playlistName="My Party"
        isOwner={false}
        startEditing={vi.fn()}
      />
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("calls startEditing when owner clicks the title container", () => {
    const startEditing = vi.fn();
    render(
      <PlaylistTitleView
        playlistName="My Party"
        isOwner={true}
        startEditing={startEditing}
      />
    );
    fireEvent.click(screen.getByText("My Party").closest("div")!);
    expect(startEditing).toHaveBeenCalledTimes(1);
  });

  it("does not call startEditing when non-owner clicks", () => {
    const startEditing = vi.fn();
    render(
      <PlaylistTitleView
        playlistName="My Party"
        isOwner={false}
        startEditing={startEditing}
      />
    );
    fireEvent.click(screen.getByText("My Party").closest("div")!);
    expect(startEditing).not.toHaveBeenCalled();
  });

  it("applies cursor-pointer when isOwner is true", () => {
    const { container } = render(
      <PlaylistTitleView
        playlistName="My Party"
        isOwner={true}
        startEditing={vi.fn()}
      />
    );
    expect(container.firstElementChild?.className).toContain("cursor-pointer");
  });
});
