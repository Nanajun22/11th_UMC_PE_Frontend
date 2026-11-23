import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { TmdbAttribution } from "@/components/tmdb-attribution";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "UMCine에서 다양한 영화를 만나보세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header />

            <div className="flex-1">{children}</div>

            <TmdbAttribution />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
