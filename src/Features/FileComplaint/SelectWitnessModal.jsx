import { useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";

const employees = [
  {
    id: 1,
    name: "Racheal Patrick",
    role: "Software Engineer",
    department: "Software & Tech",
    avatar: null,
  },
  {
    id: 2,
    name: "Oluwaseun Adekande",
    role: "Product Manager",
    department: "UI/UX",
    avatar: null,
  },
  {
    id: 3,
    name: "Tosin Araba",
    role: "Lead Copywriter",
    department: "Writing",
    avatar: null,
    initial: "T",
  },
  {
    id: 4,
    name: "Tayo Tajudeen",
    role: "Chief of Operations",
    department: "Operation",
    avatar: null,
  },
  {
    id: 5,
    name: "John Tunde",
    role: "Accountant",
    department: "Accounting",
    avatar: null,
  },
];

const SelectWitnessModal = ({ isOpen, onClose, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (!isOpen) return null;

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-[#000]">Select Witness</p>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-[#545454]" />
          </button>
        </div>

        {/* Search + department filter */}
        <div className="flex gap-2 mb-4">
          <div className="flex items-center gap-2 border border-[#E1E1E1] rounded-md px-3 py-2 flex-1">
            <Search className="w-4 h-4 text-[#878787]" />
            <input
              type="text"
              placeholder="Search for employee"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1 border border-[#E1E1E1] rounded-md px-3 py-2 text-sm text-[#545454]"
          >
            Department
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Employee list */}
        <div className="flex flex-col max-h-64 overflow-y-auto scrollbar-hide mb-4">
          {filteredEmployees.map((employee, index) => (
            <button
              type="button"
              key={employee.id}
              onClick={() => setSelectedEmployee(employee)}
              className={`flex items-center justify-between py-3 px-2 rounded-md transition-colors ${
                selectedEmployee?.id === employee.id
                  ? "bg-[#EAF8FA]"
                  : "hover:bg-gray-50"
              } ${index !== filteredEmployees.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="flex items-center gap-3">
                {employee.avatar ? (
                  <img
                    src={employee.avatar}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-9 h-9 rounded-full bg-[#FDEDCE] text-[#946405] font-semibold flex items-center justify-center text-sm">
                    {employee.initial || employee.name[0]}
                  </span>
                )}
                <div className="flex flex-col items-start">
                  <p className="text-sm font-semibold text-[#000]">
                    {employee.name}
                  </p>
                  <p className="text-xs text-[#878787]">{employee.role}</p>
                </div>
              </div>
              <p className="text-sm text-[#878787]">{employee.department}</p>
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          type="button"
          disabled={!selectedEmployee}
          onClick={() => {
            onSubmit(selectedEmployee);
            onClose();
          }}
          className="w-full bg-[#2898A4] disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg hover:bg-[#237884] transition-colors"
        >
          Select Witness
        </button>
      </div>
    </div>
  );
};

export default SelectWitnessModal;
