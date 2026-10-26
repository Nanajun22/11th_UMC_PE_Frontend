function Pagination() {
  return (
    <div className="mt-[60px] flex justify-center gap-2">
      <button
        type="button"
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        ‹
      </button>

      <button
        type="button"
        className="h-9 w-9 rounded-[4px] bg-[#111111] text-white"
      >
        1
      </button>

      <button
        type="button"
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        2
      </button>

      <button
        type="button"
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        3
      </button>

      <button
        type="button"
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        4
      </button>

      <button
        type="button"
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        5
      </button>

      <button
        type="button"
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;