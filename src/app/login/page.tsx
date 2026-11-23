import type { Metadata } from "next";
import { GuestGuard } from "@/components/auth/guest-guard";
import { LoginPage } from "@/views/auth/login-page";

export const metadata: Metadata = {
  title: "로그인 | UMCine",
};

export default function LoginRoutePage() {
  return (
    <GuestGuard>
      <LoginPage />
    </GuestGuard>
  );
}
