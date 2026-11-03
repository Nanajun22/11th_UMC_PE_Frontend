import { useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { readBookmarkIds, saveBookmarkIds } from "./utils/bookmark-storage";

const movies = [
  { id: 1, title: "오디세이", releaseDate: "2026.08.05" },
  { id: 2, title: "토이 스토리 5", releaseDate: "2026.06.17" },
];

export default function App() {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    () => readBookmarkIds(),
  );

  useEffect(() => {
    saveBookmarkIds(bookmarkedIds);
  }, [bookmarkedIds]);

  function handleToggleBookmark(movieId: number) {
    setBookmarkedIds((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    );
  }

  return (
    <main>
      <h1>영화 목록</h1>

      <ul>
        {movies.map((movie) => {
          const isBookmarked = bookmarkedIds.includes(movie.id);

          return (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <button
                aria-pressed={isBookmarked}
                onClick={() => handleToggleBookmark(movie.id)}
              >
                {isBookmarked ? "북마크 해제" : "북마크 추가"}
              </button>
            </li>
          );
        })}
      </ul>

      <ReactQueryDevtools initialIsOpen={false} />
    </main>
  );
}