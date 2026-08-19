import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react";

const DatePickerModal = ({ isOpen, onClose, onSubmit, initialDate }) => {
  const [viewDate, setViewDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate || null);

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
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

  const prevMonthLastDate = new Date(year, month, 0).getDate();

  const calendarCells = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    calendarCells.push({
      day: prevMonthLastDate - i,
      currentMonth: false,
      date: new Date(year, month - 1, prevMonthLastDate - i),
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({
      day: d,
      currentMonth: true,
      date: new Date(year, month, d),
    });
  }
  let nextDay = 1;
  while (calendarCells.length % 7 !== 0 || calendarCells.length < 42) {
    calendarCells.push({
      day: nextDay,
      currentMonth: false,
      date: new Date(year, month + 1, nextDay),
    });
    nextDay++;
    if (calendarCells.length >= 42) break;
  }

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString();

  const isToday = (date) => isSameDay(date, new Date());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-lg font-bold text-[#000]">Select Date</p>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-[#545454]" />
          </button>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goPrevMonth}
            className="flex items-center gap-1 font-semibold text-[#000]"
          >
            {monthNames[month]} {year}
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevMonth}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#2898A4]" />
            </button>
            <button
              type="button"
              onClick={goNextMonth}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#2898A4]" />
            </button>
          </div>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-2">
          {dayLabels.map((label) => (
            <p
              key={label}
              className="text-xs text-[#878787] text-center font-medium"
            >
              {label}
            </p>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-1 mb-6">
          {calendarCells.map((cell, index) => {
            const selected = isSameDay(cell.date, selectedDate);
            return (
              <button
                type="button"
                key={index}
                onClick={() => setSelectedDate(cell.date)}
                className={`h-9 w-9 mx-auto flex items-center justify-center rounded-full text-sm transition-colors
                  ${!cell.currentMonth ? "text-[#C4C4C4]" : "text-[#000]"}
                  ${selected ? "bg-[#2898A4] text-white font-semibold" : "hover:bg-gray-100"}
                  ${isToday(cell.date) && !selected ? "border border-[#2898A4]" : ""}
                `}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={() => onSubmit(selectedDate)}
          className="w-full bg-[#2898A4] text-white font-semibold py-3 rounded-lg hover:bg-[#237884] transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DatePickerModal;
