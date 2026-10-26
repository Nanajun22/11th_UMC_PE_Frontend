import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b border-[#eeeeee]">
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-4">
        <Link
          to="/"
          className="text-[28px] font-bold text-[#111111] no-underline"
        >
          UMCine
        </Link>

        <nav className="flex gap-8">
          <Link
            to="/"
            className="text-[#222222] no-underline"
          >
            영화
          </Link>

          <Link
            to="/search"
            className="text-[#222222] no-underline"
          >
            검색
          </Link>
        </nav>
      </div>
    </header>
  );
}