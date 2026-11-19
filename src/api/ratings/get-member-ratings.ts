import { apiClient } from "../api-client";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

// 이 API는 공통 형식({ isSuccess, code, message, result })으로 감싸지 않고 배열을 그대로 돌려줘요.
export function getMemberRatings(memberId: number) {
  return apiClient.get(`members/${memberId}/ratings`).json<Rating[]>();
}
