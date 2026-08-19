import { useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";

const ComplaintRow = ({
  item,
  checked,
  onCheck,
  isMenuOpen,
  onMenuClick,
  onDelete,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onMenuClick(); // closes it, since parent toggles on the same id
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, onMenuClick]);

  return (
    <div className="flex items-center border-b p-2">
      <div className="w-[16%] flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
        />
        <span className="text-sm text-gray-700">{item.dateReported}</span>
      </div>
      <p className="w-[13%] text-sm text-gray-700">{item.complaintType}</p>
      <p className="w-[13%] text-sm text-gray-700">{item.filedAgainst}</p>
      <p className="w-[13%] text-sm text-gray-700">{item.witness}</p>
      <p className="w-[13%] text-sm text-gray-700">{item.status}</p>
      <p className="w-[13%] text-sm text-gray-700">{item.stage}</p>
      <p className="w-[13%] text-sm text-gray-700">{item.decision}</p>
      <div className="w-[6%] flex justify-end relative" ref={menuRef}>
        <button type="button" onClick={onMenuClick}>
          <FaEllipsisV size={14} className="text-gray-500" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-6 w-32 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50">
            <button
              type="button"
              onClick={onDelete}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintRow;
