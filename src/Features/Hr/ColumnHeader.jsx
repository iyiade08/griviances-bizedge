import { FaArrowDown } from "react-icons/fa";

const ColumnHeader = ({
  label,
  checked,
  onCheck,
  sortDirection,
  onSortClick,
}) => {
  return (
    <div className="flex items-center gap-2 px-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheck}
        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
      />
      <span className="text-sm text-gray-800">{label}</span>
      <button onClick={onSortClick}>
        <FaArrowDown
          size={12}
          className={`text-gray-500 transition-transform ${
            sortDirection === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default ColumnHeader;
