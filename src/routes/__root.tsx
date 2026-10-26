import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { Header } from "../components/layout/header";
import { TmdbAttribution } from "../components/tmdb-attribution";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <TmdbAttribution />
    </div>
  ),
  notFoundComponent: () => (
    <main className="p-10 text-center">
      페이지를 찾을 수 없어요.
    </main>
  ),
});