import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  useEffect,
  useState,
  type SubmitEvent,
} from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../../components/bookmark-button";

export function SearchPage() {
  const { query } = useSearch({
    from: "/search",
  });

  const navigate = useNavigate({
    from: "/search",
  });

  const [searchText, setSearchText] = useState(
    query ?? "",
  );

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim() ?? "";

  useEffect(() => {
    let ignore = false;

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [normalizedQuery]);

  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery
        ? { query: nextQuery }
        : {},
    });
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-12 pb-20">
      <h1 className="mb-8 text-[32px] font-bold">
        영화 검색
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 flex gap-2"
      >
        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          placeholder="영화 제목을 검색해보세요."
          className="h-10 w-full max-w-[400px] rounded-[6px] border border-[#dddddd] px-3 outline-none focus:border-[#111111]"
        />

        <button
          type="submit"
          className="h-10 rounded-[6px] bg-[#111111] px-5 text-white"
        >
          검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="text-[#888888]">
          검색어를 입력해 주세요.
        </p>
      ) : isLoading ? (
        <p className="text-[#888888]">
          검색 결과를 불러오는 중이에요.
        </p>
      ) : errorMessage ? (
        <p className="text-[#888888]">{errorMessage}</p>
      ) : (
        <>
          <h2 className="mb-2 text-[24px] font-bold">
            ‘{query}’ 검색 결과
          </h2>

          <p className="mb-8 text-[#666666]">
            영화 {movies.length}편
          </p>

          {movies.length === 0 ? (
            <p className="text-[#888888]">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {movies.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <li
                    key={movie.id}
                    className="relative overflow-hidden rounded-[10px] bg-white"
                  >
                    <Link
                      to="/movies/$movieId"
                      params={{
                        movieId: String(movie.id),
                      }}
                      className="block"
                    >
                      {posterUrl ? (
                        <img
                          src={posterUrl}
                          alt={`${movie.title} 포스터`}
                          className="h-[300px] w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-[300px] w-full items-center justify-center bg-[#eeeeee] text-[13px] text-[#888888]">
                          이미지 없음
                        </div>
                      )}

                      <div className="p-4">
                        <h3 className="mb-1 text-[18px] font-bold">
                          {movie.title}
                        </h3>

                        <p className="mb-2 text-[13px] text-[#888888]">
                          {movie.original_title}
                        </p>

                        <p className="mb-3 text-[13px] text-[#666666]">
                          {movie.release_date}
                        </p>

                        <p className="line-clamp-3 text-sm text-[#555555]">
                          {movie.overview}
                        </p>
                      </div>
                    </Link>

                    <div className="absolute right-3 top-3">
                      <BookmarkButton movieId={movie.id} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </main>
  );
}