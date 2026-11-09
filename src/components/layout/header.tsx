import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface HeaderProps {
  // 로그인 상태 관리가 구현되어 있다면 props나 Zustand store로 대체할 수 있습니다.
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  // 테스트용 상태 (실제 서비스에서는 zustand 전역 상태 등으로 대체)
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto h-16 px-6 flex items-center justify-between">
        
        {/* 좌측: 로고 & 메뉴 */}
        <div className="flex items-center gap-10">
          {/* UMCine 로고 */}
          <Link to="/" className="flex items-center gap-2 text-gray-900 font-bold text-xl">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4h-2.5l2-3h1.5v3zm-4.5 0h-3l2-3h3l-2 3zM9.5 8h-3l2-3h3l-2 3zM5 5h1.5l-2 3H5V5zm14 13H5V10h14v8z" />
            </svg>
            <span>UMCine</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              activeProps={{
                className: "font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5",
              }}
              inactiveProps={{
                className: "text-gray-600 hover:text-gray-900 font-medium",
              }}
            >
              영화
            </Link>
            <Link
              to="/search"
              activeProps={{
                className: "font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5",
              }}
              inactiveProps={{
                className: "text-gray-600 hover:text-gray-900 font-medium",
              }}
            >
              검색
            </Link>
            <Link
              to="/profile"
              activeProps={{
                className: "font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5",
              }}
              inactiveProps={{
                className: "text-gray-600 hover:text-gray-900 font-medium",
              }}
            >
              내 정보
            </Link>
          </nav>
        </div>

        {/* 우측: 검색 아이콘 버튼 & 로그인/마이페이지 버튼 */}
        <div className="flex items-center gap-3">
          {/* 검색 아이콘 버튼 */}
          <Link
            to="/search"
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

          {/* 로그인 / 마이페이지 분기 버튼 */}
          {loggedIn ? (
            <Link
              to="/profile"
              className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              마이페이지
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm transition-colors"
            >
              로그인
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}