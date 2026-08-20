import { useState, useEffect } from "react";
import { X, Search, ChevronDown } from "lucide-react";
import { getEmployees } from "../../utils/api";
import Spinner from "../../component/Spinner.jsx";

const SelectPersonModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Select Employee",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await getEmployees(searchTerm);
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchEmployees, 300);
    return () => clearTimeout(timeout);
  }, [isOpen, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-[#000]">{title}</p>
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
          {loading ? (
            <Spinner loading={loading} />
          ) : employees.length === 0 ? (
            <p className="text-sm text-[#878787] text-center py-4">
              No employees found.
            </p>
          ) : (
            employees.map((employee, index) => (
              <button
                type="button"
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className={`flex items-center justify-between py-3 px-2 rounded-md transition-colors ${
                  selectedEmployee?.id === employee.id
                    ? "bg-[#EAF8FA]"
                    : "hover:bg-gray-50"
                } ${index !== employees.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-3">
                  {employee.avatar_url ? (
                    <img
                      src={employee.avatar_url}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-[#FDEDCE] text-[#946405] font-semibold flex items-center justify-center text-sm">
                      {employee.full_name[0]}
                    </span>
                  )}
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-semibold text-[#000]">
                      {employee.full_name}
                    </p>
                    <p className="text-xs text-[#878787]">
                      {employee.role_title}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#878787]">
                  {employee.department || "N/A"}
                </p>
              </button>
            ))
          )}
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
          {title}
        </button>
      </div>
    </div>
  );
};

export default SelectPersonModal;
