import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import AnnualTimeoffCard from "./AnnualTimeoffCard";

const RequestOtherTimeoffs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    {
      label: "maternity timeoff",
      onClick: () => console.log("Report issue"),
    },
    {
      label: "paterntity timeoff",
      onClick: () => console.log("Expense request"),
    },
    {
      label: "pet time",
      onClick: () => console.log("File complaint"),
    },
  ];

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
    <div className="relative inline-block" ref={dropdownRef}>
      <div className="flex rounded-md overflow-hidden">
        <button
          onClick={() => console.log("More Actions clicked")}
          className="bg-[#2898A4] capitalize text-white font-semibold px-10 py-4 hover:bg-[#237884] transition-colors"
        >
          request other timeoffs
        </button>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-[#2898A4] text-white px-4 py-4 border-l border-l-white/20 hover:bg-[#237884] transition-colors"
        >
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TimeOffRequest = ({ className }) => {
  const cardScrollRef = useRef(null);
  return (
    <div
      className={`${className} flex flex-col  space-y-3 bg-[#fff] rounded-xl shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start gap-2">
          <p className="text-[#000] capitalize text-xl font-bold">timeoff</p>
          <span className="flex gap-3 items-center">
            <button onClick={() => cardScrollRef.current?.scrollLeft()}>
              <FaChevronLeft className="w-8 h-8 bg-[#EAF8FA] p-2 text-[#323232]" />
            </button>
            <button onClick={() => cardScrollRef.current?.scrollRight()}>
              <FaChevronRight className="w-8 h-8 bg-[#EAF8FA] p-2 text-[#323232]" />
            </button>
          </span>
        </div>
        <RequestOtherTimeoffs />
      </div>
      <AnnualTimeoffCard ref={cardScrollRef} />
    </div>
  );
};

export default TimeOffRequest;
