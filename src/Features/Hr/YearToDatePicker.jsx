import { useState, useRef, useEffect } from "react";

const YearToDatePicker = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Year to date");
  const dropdownRef = useRef(null);

  // generate months from January up to current month, newest first
  const getMonths = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthIndex = new Date().getMonth(); // 0-based
    const months = monthNames.slice(0, currentMonthIndex + 1);
    return months.reverse();
  };

  const months = getMonths();

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (month) => {
    setSelected(month);
    setIsOpen(false);
    if (onSelect) onSelect(month);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 border border-[#E1E1E1] rounded-lg text-[#333] font-medium"
      >
        <span>{selected}</span>
        <svg
          className={`w-4 h-4 text-[#878787] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-[#E1E1E1] rounded-lg shadow-lg z-50 overflow-hidden">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => handleSelect(month)}
              className={`w-full text-left px-4 py-3 text-[#333] hover:bg-[#EAF8FA] hover:text-[#2898A4] ${
                index !== months.length - 1 ? "border-b border-[#F0F0F0]" : ""
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearToDatePicker;
