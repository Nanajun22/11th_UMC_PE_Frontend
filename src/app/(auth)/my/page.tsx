import type { Metadata } from "next";
import { ProfilePage } from "@/views/profile/profile-page";

export const metadata: Metadata = {
  title: "내 정보 | UMCine",
};

export default function MyRoutePage() {
  return <ProfilePage />;
}
