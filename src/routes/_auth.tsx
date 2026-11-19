import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

// 로그인한 사용자만 들어갈 수 있는 페이지들의 공통 Layout Route
// _auth 폴더 안의 페이지는 모두 이 검사를 거친 뒤 <Outlet /> 자리에 표시돼요.
export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
