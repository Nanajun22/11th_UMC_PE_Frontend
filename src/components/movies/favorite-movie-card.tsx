import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMovieDetail } from "@/api/movies/get-movie-detail";
import { getTmdbPosterUrl } from "@/utils/movies/tmdb-image";

interface FavoriteMovieCardProps {
  movieId: number;
}

export function FavoriteMovieCard({ movieId }: FavoriteMovieCardProps) {
  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
  });

  if (movieDetailQuery.isPending) {
    return <div className="aspect-[2/3] animate-pulse rounded-lg bg-gray-200" />;
  }

  if (movieDetailQuery.isError) {
    return (
      <div className="flex aspect-[2/3] items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
        영화 정보를 불러오지 못했어요.
      </div>
    );
  }

  const movie = movieDetailQuery.data;
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3">
        {posterUrl && (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h3 className="font-bold text-gray-900 truncate">{movie.title}</h3>
      <p className="text-sm text-gray-400">{movie.release_date}</p>
    </Link>
  );
}
