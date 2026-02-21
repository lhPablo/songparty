import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      {children}
      <Footer />
    </div>
  );
}
