import { useRef, forwardRef, useImperativeHandle } from "react";

const AnnualTimeoffCard = forwardRef((props, ref) => {
  const timeoffCards = [
    {
      id: 1,
      name: "Annual Timeoff",
      days: 20,
      totalDays: 24,
      requestTimeoffBg: "#EBEFFA",
      requestTimeoffTextColor: "#4069D0",
    },
    {
      id: 2,
      name: "Sick Timeoff",
      days: 5,
      totalDays: 10,
      requestTimeoffBg: "#EAF8FA",
      requestTimeoffTextColor: "#2898A4",
    },
    {
      id: 3,
      name: "Sick Timeoff",
      days: 5,
      totalDays: 10,
      requestTimeoffBg: "#EAF8FA",
      requestTimeoffTextColor: "#2898A4",
    },
    {
      id: 4,
      name: "Personal Timeoff",
      days: 10,
      totalDays: 15,
      requestTimeoffBg: "#FDEDCE",
      requestTimeoffTextColor: "#B8860B",
    },
    {
      id: 5,
      name: "Personal Timeoff",
      days: 10,
      totalDays: 15,
      requestTimeoffBg: "#FDEDCE",
      requestTimeoffTextColor: "#B8860B",
    },
    {
      id: 5,
      name: "Personal Timeoff",
      days: 10,
      totalDays: 15,
      requestTimeoffBg: "#FDEDCE",
      requestTimeoffTextColor: "#B8860B",
    },
  ];

  const scrollRef = useRef(null);
  const circumference = 251.2;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 256 + 24; // w-64 (256px) + gap-6 (24px)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Expose scrollLeft/scrollRight functions to the parent component via ref
  useImperativeHandle(ref, () => ({
    scrollLeft: () => scroll("left"),
    scrollRight: () => scroll("right"),
  }));

  return (
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
    >
      {timeoffCards.map((timeoffCard) => {
        const percentage = timeoffCard.days / timeoffCard.totalDays;
        const offset = circumference * (1 - percentage);

        return (
          <div
            key={timeoffCard.id}
            className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-64 shrink-0 snap-start"
          >
            <h3 className="text-gray-800 font-semibold text-lg">
              {timeoffCard.name}
            </h3>

            <div className="relative w-40 h-24 flex items-end justify-center">
              <svg
                viewBox="0 0 200 100"
                className="w-full h-full overflow-visible"
              >
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#F0F0F0"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#2898A4"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 text-center">
                <span className="text-2xl font-bold text-gray-800">
                  {timeoffCard.days}
                </span>
                <span className="text-xs text-gray-400 -mt-1">Days</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 -mt-2">Paid Timeoff</p>

            <button
              className="w-full font-medium py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: timeoffCard.requestTimeoffBg,
                color: timeoffCard.requestTimeoffTextColor,
              }}
            >
              Request Timeoff
            </button>
            <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
              View Policy Details
            </button>
          </div>
        );
      })}
    </div>
  );
});

export default AnnualTimeoffCard;
