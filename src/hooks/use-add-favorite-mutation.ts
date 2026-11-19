import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "../api/favorites/add-favorite";

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      // ["favorites"]로 시작하는 캐시(목록, 여부)를 모두 다시 조회해요.
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      alert("즐겨찾기 등록에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
