import tmdbLogo from "../assets/tmdb-logo.svg";

export function TmdbAttribution() {
  return (
    <footer className="flex items-center justify-end gap-2 bg-white px-20 py-4">
      <img src={tmdbLogo} alt="TMDB 로고" className="h-6 w-6" />

      <p className="text-[12px] leading-[14px] text-[#606774]">
        This product uses the TMDB API but is not endorsed or certified by
        TMDB.
      </p>
    </footer>
  );
}