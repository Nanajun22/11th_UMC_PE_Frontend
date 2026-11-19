import { authApi } from "../auth-api";
import type { Rating } from "./get-member-ratings";

export interface UpdateRatingRequest {
  ratingId: number;
  score: number;
  // 빼고 보내면 기존 후기가 null로 덮이므로 항상 함께 보내요.
  comment?: string;
}

interface UpdateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

export function updateRating({ ratingId, ...body }: UpdateRatingRequest) {
  return authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<UpdateRatingResponse>();
}
