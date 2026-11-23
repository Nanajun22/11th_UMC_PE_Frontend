import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/views/movies/search-page";

export const metadata: Metadata = {
  title: "영화 검색 | UMCine",
};

export default function SearchRoutePage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPage />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-12 pb-20">
      <h1 className="mb-8 text-[32px] font-bold">영화 검색</h1>
    </main>
  );
}
