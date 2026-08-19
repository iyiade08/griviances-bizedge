import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ start, end, total, onPrev, onNext }) => {
  return (
    <div className="flex items-center gap-3 border rounded-md px-3 py-1.5 w-fit text-sm text-gray-600">
      <button
        onClick={onPrev}
        disabled={start <= 1}
        className="disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FaChevronLeft size={12} />
      </button>

      <span>
        {start}-{end} of {total}
      </span>

      <button
        onClick={onNext}
        disabled={end >= total}
        className="disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};

export default Pagination;
