import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { MovieGrid } from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function MovieListPage() {
    const bookmarkedMovieIds = useBookmarkStore(
        (state) => state.bookmarkedMovieIds,
    );

    const toggleBookmark = useBookmarkStore(
        (state) => state.toggleBookmark,
    );

    const [page, setPage] = useState(1);

    const moviesQuery = useQuery({
        queryKey: ["movies", "list", { page }],
        queryFn: () => getMovies({ page }),
    });

    const movies = moviesQuery.data?.results ?? [];
    const totalPages = moviesQuery.data?.total_pages ?? 0;

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
    };

    return (
        <main className="mx-auto w-full max-w-[1200px] px-4 py-12 pb-20">
            <div className="mb-8">
                <h1 className="mb-2 text-[32px] font-bold">
                    영화 목록
                </h1>

                <p className="text-[#888888]">
                    UMCine에서 다양한 영화를 만나보세요.
                </p>
            </div>

            {moviesQuery.isPending ? (
                <p>영화 목록을 불러오는 중이에요.</p>
            ) : moviesQuery.isError ? (
                <p>{moviesQuery.error.message}</p>
            ) : movies.length === 0 ? (
                <p>조건에 맞는 영화가 없어요.</p>
            ) : (
                <>
                    <MovieGrid
                        movies={movies}
                        bookmarkedMovieIds={bookmarkedMovieIds}
                        onBookmark={toggleBookmark}
                    />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </main>
    );
}
