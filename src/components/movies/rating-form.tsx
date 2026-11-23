import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMemberRatings } from "@/api/ratings/get-member-ratings";
import { useCreateRatingMutation } from "@/hooks/use-create-rating-mutation";
import { useUpdateRatingMutation } from "@/hooks/use-update-rating-mutation";
import { useDeleteRatingMutation } from "@/hooks/use-delete-rating-mutation";
import { useAuthStore } from "@/stores/auth-store";
import { getMemberId } from "@/utils/get-member-id";

const SCORES = [1, 2, 3, 4, 5];
const DEFAULT_FORM = { score: 5, comment: "" };

interface RatingFormProps {
  movieId: number;
}

export function RatingForm({ movieId }: RatingFormProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberId(accessToken);

  const [form, setForm] = useState(DEFAULT_FORM);
  const [isEditing, setIsEditing] = useState(false);

  const ratingsQuery = useQuery({
    queryKey: ["ratings", memberId],
    queryFn: () => getMemberRatings(memberId as number),
    enabled: memberId !== null,
  });

  const createRatingMutation = useCreateRatingMutation();
  const updateRatingMutation = useUpdateRatingMutation();
  const deleteRatingMutation = useDeleteRatingMutation();

  if (memberId === null) {
    return (
      <section className="mt-10">
        <h2 className="mb-4 text-[20px] font-bold">내 평점</h2>
        <Link href="/login" className="text-sm text-[#2563EB] underline">
          로그인하고 평점 남기기
        </Link>
      </section>
    );
  }

  if (ratingsQuery.isPending) {
    return (
      <section className="mt-10">
        <h2 className="mb-4 text-[20px] font-bold">내 평점</h2>
        <p className="text-sm text-[#888888]">평점을 불러오는 중이에요.</p>
      </section>
    );
  }

  const myRating = ratingsQuery.data?.find(
    (rating) => rating.movieId === movieId,
  );

  const isPending =
    createRatingMutation.isPending ||
    updateRatingMutation.isPending ||
    deleteRatingMutation.isPending;

  const handleEditClick = () => {
    if (!myRating) return;
    setForm({ score: myRating.score, comment: myRating.comment ?? "" });
    setIsEditing(true);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    const comment = form.comment.trim() || undefined;

    if (myRating) {
      updateRatingMutation.mutate(
        { ratingId: myRating.ratingId, score: form.score, comment },
        { onSuccess: () => setIsEditing(false) },
      );
    } else {
      createRatingMutation.mutate({ movieId, score: form.score, comment });
    }
  };

  const handleDelete = () => {
    if (!myRating || isPending) return;
    deleteRatingMutation.mutate(myRating.ratingId, {
      onSuccess: () => setForm(DEFAULT_FORM),
    });
  };

  if (myRating && !isEditing) {
    return (
      <section className="mt-10">
        <h2 className="mb-4 text-[20px] font-bold">내 평점</h2>
        <p className="text-lg font-bold text-[#2563EB]">
          {"★".repeat(myRating.score)}
          {"☆".repeat(5 - myRating.score)}
        </p>
        <p className="mt-2 text-gray-700">
          {myRating.comment || "작성한 후기가 없어요."}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleEditClick}
            disabled={isPending}
            className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-bold text-white disabled:bg-blue-300"
          >
            수정
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg border border-[#E03131] px-4 py-2 text-sm font-bold text-[#E03131] disabled:opacity-50"
          >
            {deleteRatingMutation.isPending ? "삭제 중" : "삭제"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-[20px] font-bold">
        {myRating ? "평점 수정" : "평점 남기기"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          value={form.score}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, score: Number(e.target.value) }))
          }
          className="w-32 rounded-lg border border-gray-200 px-3 py-2"
        >
          {SCORES.map((score) => (
            <option key={score} value={score}>
              {"★".repeat(score)} ({score}점)
            </option>
          ))}
        </select>
        <textarea
          value={form.comment}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, comment: e.target.value }))
          }
          maxLength={500}
          placeholder="후기를 남겨 주세요. (선택, 500자 이하)"
          className="min-h-24 rounded-lg border border-gray-200 px-4 py-3"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-bold text-white disabled:bg-blue-300"
          >
            {isPending ? "저장 중" : myRating ? "저장" : "등록"}
          </button>
          {myRating && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
