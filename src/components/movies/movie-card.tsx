import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

interface MovieCardProps {
  movie: TmdbMovieListItem;
  isBookmarked: boolean;
  onBookmark: (id: number) => void;
}

export function MovieCard({
  movie,
  isBookmarked,
  onBookmark,
}: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article className="min-w-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-[8px] bg-[#eeeeee]">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="block h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#eeeeee] text-[13px] text-[#888888]">
              이미지 없음
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={() => onBookmark(movie.id)}
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-white",
            isBookmarked ? "bg-blue-600" : "bg-black/55",
          )}
          aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
        >
          {isBookmarked ? "♥" : "♡"}
        </button>
      </div>

      <div className="pt-3">
        <h2 className="mb-1 text-[18px] font-bold">{movie.title}</h2>

        <p className="mb-2 text-[13px] text-[#888888]">
          {movie.original_title}
        </p>

        <p className="mb-[10px] text-[13px] text-[#666666]">
          {movie.release_date}
        </p>
      </div>
    </article>
  );
}