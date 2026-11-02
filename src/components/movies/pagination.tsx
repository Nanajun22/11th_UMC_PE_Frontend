
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-[60px] flex justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        ‹
      </button>

      {Array.from(
        { length: Math.min(totalPages, 5) },
        (_, index) => index + 1,
      ).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-9 w-9 rounded-[4px] ${
            currentPage === page
              ? "bg-[#111111] text-white"
              : "text-[#555555]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-9 w-9 rounded-[4px] text-[#555555]"
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;
