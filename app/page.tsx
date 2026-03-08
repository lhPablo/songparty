import { getTranslations } from "next-intl/server";
import { HomeClient } from "./HomeClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: "SongParty - ¡Crea tu lista de música!",
    description: t("tagline"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <HomeClient
      t={{
        tagline: t("tagline"),
        createPlaylist: t("createPlaylist"),
        creating: t("creating"),
      }}
    />
  );
}
