import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
  bookmarkedMovieIds: number[];
  onBookmark: (id: number) => void;
}

export function MovieGrid({
  movies,
  bookmarkedMovieIds,
  onBookmark,
}: MovieGridProps) {
  return (
    <section className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isBookmarked={bookmarkedMovieIds.includes(movie.id)}
          onBookmark={onBookmark}
        />
      ))}
    </section>
  );
}