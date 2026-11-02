
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { BookmarkButton } from "../../components/bookmark-button";

function formatRuntime(runtime: number | null) {
  if (runtime === null) {
    return "상영 시간 정보가 없어요.";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({
    from: "/movies/$movieId",
  });

  const movieId = Number(movieIdParam);

  const isValidMovieId =
    Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
  });

  if (!isValidMovieId) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-4 py-20">
        <p className="text-center text-[#888888]">
          올바르지 않은 영화 번호예요.
        </p>
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-4 py-20">
        <p className="text-center text-[#888888]">
          영화 정보를 불러오는 중이에요.
        </p>
      </main>
    );
  }

  if (movieDetailQuery.isError) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-4 py-20">
        <p className="text-center text-[#888888]">
          {getMovieDetailErrorMessage(movieDetailQuery.error)}
        </p>
      </main>
    );
  }

  const movie = movieDetailQuery.data;

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-12 pb-20">
      <Link
        to="/"
        className="mb-8 inline-block text-sm text-[#555555] no-underline"
      >
        ← 영화 목록
      </Link>

      <div className="overflow-hidden rounded-[10px] bg-[#111111] text-white">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="h-[300px] w-full object-cover opacity-70"
          />
        ) : (
          <div className="flex h-[300px] w-full items-center justify-center bg-[#eeeeee] text-[13px] text-[#888888]">
            이미지 없음
          </div>
        )}

        <div className="flex flex-col gap-8 p-8 md:flex-row">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="w-full max-w-[240px] self-center rounded-[8px] object-cover md:self-start"
            />
          ) : (
            <div className="flex aspect-[2/3] w-full max-w-[240px] items-center justify-center self-center rounded-[8px] bg-[#eeeeee] text-[13px] text-[#888888] md:self-start">
              이미지 없음
            </div>
          )}

          <div className="relative flex-1">
            <div className="absolute right-0 top-0">
              <BookmarkButton movieId={movie.id} />
            </div>

            <h1 className="pr-12 text-[32px] font-bold">
              {movie.title}
            </h1>

            <p className="mt-2 text-[#aaaaaa]">
              {movie.original_title}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-sm text-[#cccccc]">
              <span>{movie.release_date}</span>
              <span>·</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span>·</span>
              <span>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </span>
            </div>

            <h2 className="mt-8 text-[20px] font-bold">
              {movie.tagline}
            </h2>

            <p className="mt-4 leading-7 text-[#dddddd]">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
