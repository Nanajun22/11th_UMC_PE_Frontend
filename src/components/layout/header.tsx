"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";
import { HeaderNav, HeaderNavFallback } from "./header-nav";

export function Header() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto h-16 px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 text-gray-900 font-bold text-xl">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4h-2.5l2-3h1.5v3zm-4.5 0h-3l2-3h3l-2 3zM9.5 8h-3l2-3h3l-2 3zM5 5h1.5l-2 3H5V5zm14 13H5V10h14v8z" />
            </svg>
            <span>UMCine</span>
          </Link>

          <Suspense fallback={<HeaderNavFallback />}>
            <HeaderNav />
          </Suspense>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {!isHydrated ? (
            <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : !accessToken ? (
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : (
            <Link
              href="/my"
              className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              마이페이지
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}