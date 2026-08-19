import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const complaintTypes = [
  "Hostile work environment",
  "Violation of health and safety regulations",
  "Unsustainable workload",
  "Theft",
  "Ambiguously defined employee role",
  "Not enough personal time off",
  "Favouritism",
  "Disconnect with line manager",
  "Others - Please specify in the description section",
];

const ComplaintTypeSelect = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-y-1 ">
      <p className="text-base font-semibold">Select complaint type*</p>

      <div className="relative" ref={dropdownRef} aria-required>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between border border-[#E1E1E1] rounded-md px-4 py-3 text-left"
        >
          <span className={selected ? "text-[#000]" : "text-[#878787]"}>
            {selected || "Select complaint type*"}
          </span>
          <ChevronDown
            size={18}
            className={`text-[#878787] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute scrollbar-hide left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 max-h-72 overflow-y-auto">
            {complaintTypes.map((type, index) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setSelected(type);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  selected === type
                    ? "bg-[#EAF8FA] text-[#2898A4]"
                    : "text-gray-700 hover:bg-gray-50"
                } ${
                  index !== complaintTypes.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintTypeSelect;
