import { render, screen } from "@testing-library/react";
import { AddSongsLink } from "@/components/songs/playlist/AddSongsLink";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={String(href)} className={className} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/usePlaylistStore", () => ({
  usePlaylistStore: vi.fn(),
}));

import { usePlaylistStore } from "@/store/usePlaylistStore";

describe("AddSongsLink", () => {
  it("renders the link", () => {
    vi.mocked(usePlaylistStore).mockReturnValue(null);
    render(<AddSongsLink playlistId="abc123" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders the translated label", () => {
    vi.mocked(usePlaylistStore).mockReturnValue(null);
    render(<AddSongsLink playlistId="abc123" />);
    expect(screen.getByText("addSongs")).toBeInTheDocument();
  });

  it("links to search page without token when not owner", () => {
    vi.mocked(usePlaylistStore).mockReturnValue(null);
    render(<AddSongsLink playlistId="abc123" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/playlist/abc123/search"
    );
  });

  it("links to search page with token when owner", () => {
    vi.mocked(usePlaylistStore).mockReturnValue("my-owner-token");
    render(<AddSongsLink playlistId="abc123" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/playlist/abc123/search?token=my-owner-token"
    );
  });
});
