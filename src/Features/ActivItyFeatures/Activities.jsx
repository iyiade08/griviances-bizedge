const Activities = ({ className }) => {
  const activityTabs = [
    {
      name: " Sam Johnson Requested for 5 Sick days off",
      status: "Accept request",
      label: "view",
    },
    {
      name: " Sam Johnson Requested for 5 Sick days off",
      status: "Accept request",
      label: "view",
    },
    {
      name: " Micheal Request for 40 Days Annual Leave",
      status: "Accept request",
      label: "view",
    },
    {
      name: " Review Mar. 3 2022 - April 27, 2022 Payroll",
      label: "view",
    },
    {
      name: " Set up Performance Goals for March",
      label: "view",
    },
  ];

  return (
    <div
      className={`flex flex-col p-2  bg-[#fff] shadow-lg rounded-lg space-y-4 ${className}`}
    >
      <div className="flex gap-2 items-center">
        <p className="text-[#000] capitalize text-[20px] font-bold ">
          Activities
        </p>
        <span className="w-6 h-6 rounded-full bg-[#FF6666] text-center text-[#fff] animate-pulse">
          s
        </span>
      </div>
      <div className="flex flex-col space-y-3">
        {activityTabs.map((activityTab) => (
          <div
            key={activityTab.id}
            className="bg-[#fff] flex shadow-lg py-2 z-10 w-full justify-between"
          >
            <p className="text-[#545454] text-base">{activityTab.name}</p>
            <button>
              <span className="text-sm text-[#4069D0]">
                {activityTab.status}
              </span>
            </button>
            <button>
              <span className="text-sm text-[#4069D0]">
                {activityTab.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
