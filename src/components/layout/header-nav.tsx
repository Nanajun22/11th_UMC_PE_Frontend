"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { href: "/", label: "영화" },
  { href: "/search", label: "검색" },
  { href: "/my", label: "내 정보" },
] as const;

const ACTIVE_CLASS_NAME =
  "font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5";
const INACTIVE_CLASS_NAME = "text-gray-600 hover:text-gray-900 font-medium";

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav() {
  const pathname = usePathname();

  return <NavLinks pathname={pathname} />;
}

export function HeaderNavFallback() {
  return <NavLinks pathname={null} />;
}

function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <nav className="flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            pathname !== null && isActivePath(pathname, item.href)
              ? ACTIVE_CLASS_NAME
              : INACTIVE_CLASS_NAME,
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
