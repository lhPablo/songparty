import { render, screen } from "@testing-library/react";
import { PlaylistMetaInfo } from "@/components/songs/playlist/title/PlaylistMetaInfo";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) return `${key}:${JSON.stringify(values)}`;
    return key;
  },
  useLocale: () => "en",
}));

describe("PlaylistMetaInfo", () => {
  const now = new Date("2026-01-01T12:00:00Z");

  beforeEach(() => {
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders createdAt with formatted date", () => {
    render(
      <PlaylistMetaInfo
        createdAt="2025-12-01T00:00:00Z"
        expiresAt="2026-02-01T00:00:00Z"
      />
    );
    expect(screen.getByText(/createdAt/)).toBeInTheDocument();
  });

  it("renders expiresAt info", () => {
    render(
      <PlaylistMetaInfo
        createdAt="2025-12-01T00:00:00Z"
        expiresAt="2026-02-01T00:00:00Z"
      />
    );
    expect(screen.getByText(/expiresAt/)).toBeInTheDocument();
  });

  it("shows 0 remaining days when expiry is in the past", () => {
    render(
      <PlaylistMetaInfo
        createdAt="2025-11-01T00:00:00Z"
        expiresAt="2025-12-01T00:00:00Z"
      />
    );
    const expiresEl = screen.getByText(/expiresAt/);
    expect(expiresEl.textContent).toContain('"days":0');
  });

  it("calculates correct remaining days for future expiry", () => {
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 5);
    render(
      <PlaylistMetaInfo
        createdAt="2025-12-01T00:00:00Z"
        expiresAt={futureDate.toISOString()}
      />
    );
    const expiresEl = screen.getByText(/expiresAt/);
    expect(expiresEl.textContent).toContain('"days":5');
  });
});
