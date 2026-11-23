import type { Metadata } from "next";
import { SignupPage } from "@/views/auth/signup-page";

export const metadata: Metadata = {
  title: "회원가입 | UMCine",
};

export default function SignupRoutePage() {
  return <SignupPage />;
}
