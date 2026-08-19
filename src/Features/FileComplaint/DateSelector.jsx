import { useState } from "react";
import { Calendar } from "lucide-react";
import DatePickerModal from "./DatePickerModal";

const DateSelector = ({ chosenDate, setChosenDate }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const formatDate = (date) =>
    date
      ? date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  return (
    <div className="flex flex-col gap-y-1">
      <p className="text-base font-semibold">
        Incident Date - (if Date related)
      </p>
      <button
        type="button"
        onClick={() => setIsDatePickerOpen(true)}
        className="w-full flex items-center justify-between border border-[#E1E1E1] rounded-md px-4 py-3 text-left"
      >
        <span className={chosenDate ? "text-[#000]" : "text-[#878787]"}>
          {chosenDate ? formatDate(chosenDate) : "Choose Date"}
        </span>
        <Calendar className="w-4 h-4 text-[#878787]" />
      </button>

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        initialDate={chosenDate}
        onSubmit={(date) => {
          setChosenDate(date);
          setIsDatePickerOpen(false);
        }}
      />
    </div>
  );
};

export default DateSelector;
