type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPreviousClick,
  onNextClick,
}: PaginationProps) => {
  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={onPreviousClick}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>

      <span>
        Pagina {currentPage} de {totalPages}
      </span>

      <button
        onClick={onNextClick}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
