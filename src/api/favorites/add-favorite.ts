import { authApi } from "../auth-api";
import type { Favorite } from "./get-favorites";

export interface AddFavoriteRequest {
  movieId: number;
}

interface AddFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite;
}

export function addFavorite(body: AddFavoriteRequest) {
  return authApi.post("favorites", { json: body }).json<AddFavoriteResponse>();
}
