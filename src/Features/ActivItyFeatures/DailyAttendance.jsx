const DailyAttendance = () => {
  return (
    <div className="flex flex-col items-center p-2  bg-[#fff] shadow-lg rounded-lg">
      <div className="flex flex-col items-center p-2 space-y-1 w-full">
        <p className="text-sm text-[#545454]">Daily Attendance</p>
        <p className="text-base capitalize font-semibold">
          Wednesday 27th, 2021
        </p>
        <span className="flex items-center justify-between w-[10vw]">
          <p className="text-[#000] capitalize text-sm">remote</p>
          <button className="bg-[#545454] text-[#fff] text-sm py-2 px-6 rounded-full">
            on-site
          </button>
        </span>
      </div>
      <div className="flex flex-col items-center p-2 bg-[#EBEFFA] rounded-md w-full space-y-2">
        <p className="text-lg capitalize text-[#545454]">Good Morning</p>
        <div className="flex gap-1 items-center">
          <span className="w-6 h-6 bg-[#fff] text-[#000] text-lg font-bold text-center">
            0
          </span>
          <span className="w-6 h-6 bg-[#fff] text-[#000] text-lg font-bold text-center">
            9
          </span>
          <span className="text-[#000] text-lg font-bold">:</span>

          <span className="w-6 h-6 bg-[#fff] text-[#000] text-lg font-bold text-center">
            3
          </span>
          <span className="w-6 h-6 bg-[#fff] text-[#000] text-lg font-bold text-center">
            0
          </span>
        </div>
        <div className="flex items-center bg-[#fff] py-2 px-2 border-t border-b border-t-[#849EE1] border-b-[#849EE1]">
          <p className="text-md text-[#878787]">clock in time </p>
          <span className="text-md text-[#878787]">00:00</span>
        </div>
        <button className="bg-[#4069D0] text-[#fff] mb-3 text-center px-12 rounded-md py-2">
          clock in
        </button>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[#545454] text-md">status:</span>
          <span className="bg-[#fff] text-[#2898A4] text-center rounded-full px-4 py-2">
            present
          </span>
        </div>
      </div>
    </div>
  );
};

export default DailyAttendance;
