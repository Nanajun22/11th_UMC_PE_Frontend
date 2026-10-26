import { useEffect, useState } from "react";
import { readBookmarkIds, saveBookmarkIds } from "./utils/bookmark-storage";

const movies = [
  { id: 1, title: "오디세이", releaseDate: "2026.08.05" },
  { id: 2, title: "토이 스토리 5", releaseDate: "2026.06.17" },
];  // isBookmarked는 이제 데이터에서 뺌

export default function App() {
  // ↓ 실습에서 말하는 "useState의 초기값 함수"가 바로 이 줄
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
    </main>
  );
}