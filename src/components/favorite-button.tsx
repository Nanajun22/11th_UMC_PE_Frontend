import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getFavoriteStatus } from "@/api/favorites/get-favorite-status";
import { useAddFavoriteMutation } from "@/hooks/use-add-favorite-mutation";
import { useRemoveFavoriteMutation } from "@/hooks/use-remove-favorite-mutation";
import { useAuthStore } from "@/stores/auth-store";

interface FavoriteButtonProps {
  movieId: number;
}

export function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);

  // 토큰이 있을 때만 이 영화의 즐겨찾기 여부를 조회해요.
  const favoriteStatusQuery = useQuery({
    queryKey: ["favorites", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken),
  });

  const addFavoriteMutation = useAddFavoriteMutation();
  const removeFavoriteMutation = useRemoveFavoriteMutation();

  if (!accessToken) {
    return (
      <Link to="/login" className="text-sm text-white underline">
        로그인하고 즐겨찾기
      </Link>
    );
  }

  const isFavorite = favoriteStatusQuery.data === true;
  const isPending =
    favoriteStatusQuery.isLoading ||
    addFavoriteMutation.isPending ||
    removeFavoriteMutation.isPending;

  const handleClick = () => {
    if (isPending) return;

    if (isFavorite) {
      removeFavoriteMutation.mutate(movieId);
    } else {
      addFavoriteMutation.mutate({ movieId });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-xl text-white disabled:opacity-50"
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
