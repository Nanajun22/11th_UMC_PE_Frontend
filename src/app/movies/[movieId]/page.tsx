import { MovieDetailPage } from "@/views/movies/movie-detail-page";

export default async function MovieDetailRoutePage({
  params,
}: PageProps<"/movies/[movieId]">) {
  const { movieId } = await params;

  return <MovieDetailPage movieIdParam={movieId} />;
}
